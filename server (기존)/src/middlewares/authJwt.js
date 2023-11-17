const jwt = require("jsonwebtoken");
const db = require("../models");
const { JWT_SECRET_KEY } = require("../common");
const { makeToken, refreshVerify, verify } = require("../utils/token.utils");

// 토큰 검증 미들웨어
exports.verifyToken = async (req, res, next) => {
  try {
    const accessToken = req.headers["x-access-token"];
    console.log("VerifyToken Middleware");
    console.log("accessToken : ", accessToken);
    if (!accessToken) {
      console.log("Access token missing");
      return res.json({ message: "Access token missing" });
    }

    const authResult = verify(accessToken);
    const decoded = jwt.decode(accessToken, JWT_SECRET_KEY);
    if (authResult.ok === false && authResult.message === "jwt expired") {
      console.log("accessToken 토큰 만료");
      const refreshToken = req.headers.refresh;
      console.log("refreshToken : ", refreshToken);
      const refreshResult = await refreshVerify(refreshToken, decoded.id);
      if (refreshResult === false) {
        console.log("refreshResult 토큰 만료");
        return res.json({ message: "No authorized! 다시 로그인해주세요." });
      } else {
        console.log("refreshResult 토큰 살아있음");
        req.refreshToken = refreshToken;
        req.decoded = decoded;
        next();
      }
    }
    req.decoded = decoded;
    next();
  } catch (error) {
    console.log(error);
  }
};
