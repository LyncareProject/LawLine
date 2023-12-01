const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment-timezone");
const { JWT_SECRET_KEY, EMAIL_USER } = require("../common");
const {
  makeRefreshToken,
  makeRefreshTokenInfinite,
  makeAccessToken,
} = require("../utils/token.utils");
const smtpTransport = require("../config/email");

const { role: Role } = db;
const { user: User } = db;
const { token: Token } = db;
const { authNumber: AuthNumber } = db;

const generateRandomNumber = (min, max) => {
  const randNum = Math.floor(Math.random() * (max - min + 1) + min);
  console.log(randNum);
  return randNum;
};

exports.signIn = async (req, res) => {
  try {
    const { email, password, isAutoLogin } = req.body;

    const user = await User.findOne({ email });

    // UserDB에 해당 이메일이 없는 경우
    if (!user) {
      return res.status(401).json({ message: "존재하지 않는 이메일입니다." });
    }
    if (user && user.signUpPath !== "LawLine") {
      return res.status(400).json({
        message: `${user.signUpPath} 로그인 방식으로 가입하신 회원이십니다.`,
      });
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
      profileImg: user.profileImg,
      signUpPath: user.signUpPath,
      roles: user.roles,
    });
  } catch (error) {
    console.error("Error during signing:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAuth = async (req, res) => {
  try {
    const { id, roles } = req.decoded;
    const refreshToken = req.refreshToken;
    const newAccessToken = await makeAccessToken({ id, roles });
    const userData = await User.findOne({ _id: id });
    const rolesData = await Role.findOne({ _id: { $in: roles } });

    res.status(200).json({
      newAccessToken,
      refreshToken,
      id: userData._id,
      name: userData.username,
      signUpPath: userData.signUpPath,
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
      if (phoneNumber) {
        phoneNumber = phoneNumber.replace("+82 ", "0");
        phoneNumber = phoneNumber.replace(/-/g, "");
        return phoneNumber;
      } else {
        return null;
      }
    };

    const existingUser = await User.findOne({ email: kakao_account.email });

    if (!existingUser) {
      const userRole = await Role.findOne({ name: "User" });
      const newUser = new User({
        email: kakao_account.email,
        username: kakao_account.name,
        phone: formatPhone(kakao_account.phone_number),
        profileImg: profile_image_url,
        signUpPath: "Kakao",
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
        signUpPath: user.signUpPath,
        roles: user.roles,
      });
      return;
    }

    if (existingUser && existingUser.signUpPath !== "Kakao") {
      return res.status(400).json({
        message: `${existingUser.signUpPath} 로그인 방식으로 가입하신 회원이십니다.`,
      });
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
      signUpPath: existingUser.signUpPath,
      roles: existingUser.roles,
    });
  } catch (error) {
    console.error("Error in getAuth:", error); // 에러 로깅
    res.status(401).send("Unauthorized"); // 401 Unauthorized 응답 전송
  }
};

exports.verityMail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .send("해당 이메일로 가입한 이력이 없습니다.");
    }
    if (user && user.signUpPath !== "LawLine") {
      return res.status(400).send(`${user.signUpPath} 로그인 방식으로 가입하신 회원이십니다.`);
    }

    const code = generateRandomNumber(111111, 999999);

    await smtpTransport.sendMail({
      from: EMAIL_USER,
      to: email,
      subject: `[LawLine] ${user.username} 님 인증 번호 안내드립니다.`,
      html: `<table style="margin:40px auto 20px;text-align:left;border-collapse:collapse;border:0;width:600px;padding:64px 16px;box-sizing:border-box">
      <tbody>
        <tr>
          <td>
            <a href="https://lawline.co.kr/" style="display:inline-block;width:145px" target="_blank">
              <img style="width: 150px;" src="https://lawline-bucket.s3.ap-northeast-2.amazonaws.com/Logo.png" alt="fastcampus" class="CToWUd" data-bit="iit">
            </a>
            <p style="padding-top:48px;font-weight:700;font-size:20px;line-height:1.5;color:#222">
              이메일 주소를 <span class="il">인증</span>해주세요.
            </p>
            <p style="font-size:16px;font-weight:400;line-height:1.5;padding-top:16px">
              진행하시던 화면으로 돌아가 아래 <span class="il">인증</span><span class="il">번호</span>를 입력하시면 <span class="il">인증</span>이 완료됩니다.
            </p>
            <div style="margin-top:48px;font-size:16px;font-weight:400;line-height:1.5;border-radius:8px;background:#d3ffdb;color:#595959;padding:16px 20px">
              <span class="il">인증</span><span class="il">번호</span><br>
              <b style="font-size:24px;color:#222;font-weight:700;letter-spacing:1.92px">${code}</b>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding-top:48px" colspan="2">
            <div style="padding:24px;background:#f2f2f2;border-radius:8px">
              <span style="font-size:14px;font-weight:400;line-height:1.5;color:#222">
                본 메일은 발신전용으로 회신되지 않습니다.<br>
                문의사항은 로라인 고객센터를 이용해주세요!
              </span>
              <hr style="margin:20px 0;border-color:#d9d9d9;border-style:solid;border-width:1px 0 0 0">
              <span style="display:block;font-size:14px;line-height:1.5;color:#595959">
                <b style="margin-right:14px">고객센터 운영시간</b>
                <p style="margin-bottom:16px">평일 10:00~18:00 (주말 및 공휴일 제외/점심시간 12:00~13:00)</p>
                <a href="https://lawline.co.kr/" rel="noreferrer" style="background:#404040;text-decoration:none;padding:5px 12px;font-size:14px;color:#fff;font-weight:400;border-radius:4px" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://day1fastcampussupport.zendesk.com/hc/ko&amp;source=gmail&amp;ust=1701484995160000&amp;usg=AOvVaw0URRCXBKT0636XK3mtRetw">고객센터 문의하기</a>
              </span>
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td style="padding-top:48px">
            <hr style="margin:8px 0;border-color:#d9d9d9;border-style:solid;border-width:1px 0 0 0">
          </td>
        </tr>
        <tr>
          <td style="padding-top:8px;font-size:12px;font-style:normal;font-weight:400;line-height:1.5;color:#222">
            <img style="width: 100px;" src="https://lawline-bucket.s3.ap-northeast-2.amazonaws.com/Logo.png" alt="fastcampus" class="CToWUd" data-bit="iit">
            <p>위바이브(주)</p>
            <p>서울특별시 금천구 가산디지털2로 67, 9층 902호(가산동, 에이스 하이엔드타워7)</p>
          </td>
        </tr>
      </tfoot>
    </table>`,
    });
    const authNumber = new AuthNumber({
      email,
      code,
    });
    await authNumber.save();

    res.status(200).json({ message: "Compeleted" });
  } catch (error) {
    console.error("Error in findPassword:", error); // 에러 로깅
    res.status(401).send("Error"); // 401 Unauthorized 응답 전송
  }
};

exports.verityAuthNumber = async (req, res) => {
  try { 
    const {email, code} = req.body
    const verificationCode = await AuthNumber.findOne({ email, code });

    if (!verificationCode) {
      return res.status(401).send("잘못된 인증번호입니다."); // 401 Unauthorized 응답 전송
    }

    const now = moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");
    if (verificationCode.expiresAt && moment(verificationCode.expiresAt).isBefore(now)) {
      return res.status(401).send("인증번호가 만료되었습니다. 다시 시도해주세요."); 
    }

    const user = await User.findOne({ email });
    res.status(200).json({ _id : user._id, message: "인증번호가 확인되었습니다." });
  } catch (error) {
    console.error("Error in verityAuthNumber:", error); // 에러 로깅
    res.status(401).send("Error"); // 401 Unauthorized 응답 전송
  }
};
