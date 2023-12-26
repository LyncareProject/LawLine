const jwt = require("jsonwebtoken");
const db = require("../models");

const { user: User } = db;
const { token: Token } = db;

const { JWT_SECRET_KEY } = require("../common");

// Create Access Token
exports.makeAccessToken = ({ id, roles }) => {
  const accessToken = jwt.sign(
    {
      id,
      roles,
    },
    JWT_SECRET_KEY,
    {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: "15m",
    }
  );
  return accessToken;
};

// Create Refresh Token
exports.makeRefreshToken = async ({ id }) => {
  const refreshToken = jwt.sign({}, JWT_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "24h",
  });
  const user = await Token.findOne({ id });
  if (user) {
    user.token = refreshToken;
    await user.save();
  } else {
    const refreshTokenObj = new Token({
      id,
      token: refreshToken,
    });
    await refreshTokenObj.save();
  }

  return refreshToken;
};

exports.makeRefreshTokenInfinite = async ({ id }) => {
  const refreshToken = jwt.sign({}, JWT_SECRET_KEY, {
    algorithm: "HS256",
  });
  const user = await Token.findOne({ id });
  if (user) {
    user.token = refreshToken;
    await user.save();
  } else {
    const refreshTokenObj = new Token({
      id,
      token: refreshToken,
    });
    await refreshTokenObj.save();
  }

  return refreshToken;
};
exports.refreshVerify = async (token, id) => {
  try {
    const user = await Token.findOne({ id });
    console.log('user : ', user)
    if (user.token === token) {
      try {
        jwt.verify(token, JWT_SECRET_KEY);
        return true;
      } catch (err) {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

// access token 유효성 검사
exports.verify = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    return {
      ok: true,
      id: decoded.id,
      roles: decoded.roles,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
};
