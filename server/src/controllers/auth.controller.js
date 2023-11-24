const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../common");
const {
  makeRefreshToken,
  makeRefreshTokenInfinite,
  makeAccessToken,
} = require("../utils/token.utils");

const { role: Role } = db;
const { user: User } = db;
const { token: Token } = db;

exports.signIn = async (req, res) => {
  try {
    const { email, password, isAutoLogin } = req.body;

    const user = await User.findOne({ email });

    // UserDB에 해당 이메일이 없는 경우
    if (!user) {
      return res.status(401).json({ message: "존재하지 않는 이메일입니다." });
    }

    // UserDB에 해당 이메일은 있지만 비밀번호가 일치하지 않는 경우
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    // AccessToken 생성
    accessToken = await makeAccessToken({ id: user._id, roles: user.roles });

    // RefreshToken 생성
    if (isAutoLogin) {
      refreshToken = await makeRefreshTokenInfinite({ id: user._id });
    } else {
      refreshToken = await makeRefreshToken({ id: user._id });
    }
    res.status(200).json({
      message: "Success",
      accessToken,
      refreshToken,
      email: user.email,
      username: user.username,
      roles: user.roles,
    });
  } catch (error) {
    console.error("Error during signing:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAuth = async (req, res) => {
  try {
    console.log("getAuth");
    const { id, roles } = req.decoded;
    const refreshToken = req.refreshToken;

    const newAccessToken = await makeAccessToken({ id, roles });
    const userData = await User.findOne({ _id: id });
    console.log("userData", userData);
    // DB에서 모든 역할 찾기
    const rolesData = await Role.findOne({ _id: { $in: roles } });
    console.log("rolesData : ", rolesData);
    // 클라이언트에 전송할 역할 데이터 생성
    // const clientRoles = rolesData.map((role) => role.name); // role 객체의 'name' 속성을 사용하여 배열 생성
    // console.log("clientRoles : ", clientRoles);
    res.status(200).json({
      newAccessToken,
      refreshToken,
      id: userData._id,
      name: userData.username,
      roles: rolesData.name,
    });
  } catch (error) {
    console.error("Error in getAuth:", error); // 에러 로깅
    res.send("Unauthorized"); // 401 Unauthorized 응답 전송
  }
};

exports.Kakao = async (req, res) => {
  try {
    const { kakao_account } = req.body.data.profile;
    const { profile_image_url } = req.body.data.profile.kakao_account.profile;

    const formatPhone = (phoneNumber) => {
      phoneNumber = phoneNumber.replace("+82 ", "0");
      phoneNumber = phoneNumber.replace(/-/g, "");
      return phoneNumber;
    };
    const existingUser = await User.findOne({ email: kakao_account.email });
    if (!existingUser) {
      const userRole = await Role.findOne({ name: "User" });
      const newUser = new User({
        email: kakao_account.email,
        username: kakao_account.name,
        phone: formatPhone(kakao_account.phone_number),
        profileImg: profile_image_url,
        roles: [userRole._id],
      });

      await newUser.save();

      const user = await User.findOne({ email: kakao_account.email });
      accessToken = await makeAccessToken({
        id: user._id,
        roles: user.roles,
      });
      refreshToken = await makeRefreshToken({ id: user._id });
      res.status(200).json({
        message: "Success",
        accessToken,
        refreshToken,
        profileImg: user.profileImg,
        email: user.email,
        username: user.username,
        roles: user.roles,
      });
      return;
    }

    accessToken = await makeAccessToken({
      id: existingUser._id,
      roles: existingUser.roles,
    });

    refreshToken = await makeRefreshToken({ id: existingUser._id });

    res.status(200).json({
      message: "Success",
      accessToken,
      refreshToken,
      profileImg: profile_image_url,
      email: existingUser.email,
      username: existingUser.username,
      roles: existingUser.roles,
    });
  } catch (error) {
    console.error("Error in getAuth:", error); // 에러 로깅
    res.status(401).send("Unauthorized"); // 401 Unauthorized 응답 전송
  }
};
