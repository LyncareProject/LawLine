const jwt = require("jsonwebtoken");
const db = require("../models");
const { JWT_SECRET_KEY } = require("../common");
const { makeToken, refreshVerify, verify } = require("../utils/token.utils");

// 토큰 검증 미들웨어
exports.verifyToken = async (req, res, next) => {
  try {
    const accessToken = req.headers["x-access-token"];

    // Early return if access token is missing
    if (!accessToken) {
      console.log("Access token missing");
      return res.status(401).json({ message: "Access token missing" });
    }

    // Verify access token
    const authResult = verify(accessToken);
    if (authResult.ok) {
      req.decoded = jwt.decode(accessToken, JWT_SECRET_KEY);
      return next();
    }

    // Handle expired access token
    if (authResult.message === "jwt expired") {
      console.log("Access token expired");
      const refreshToken = req.headers.refresh;
      const refreshResult = await refreshVerify(
        refreshToken,
        jwt.decode(accessToken, JWT_SECRET_KEY).id
      );

      if (!refreshResult) {
        console.log("Refresh token expired");
        return res
          .status(401)
          .json({ message: "Not authorized! Please log in again." });
      }

      console.log("Refresh token valid");
      req.refreshToken = refreshToken;
      req.decoded = jwt.decode(accessToken, JWT_SECRET_KEY);
      return next();
    }

    // If the token is neither valid nor expired
    return res.status(401).json({ message: "Invalid access token" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
