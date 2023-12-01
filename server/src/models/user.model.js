const mongoose = require("mongoose");
const moment = require("moment-timezone");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  profileImg: {
    type: String,
    default:
      "https://lawline-bucket.s3.ap-northeast-2.amazonaws.com/NoUser.png",
  },
  phone: { type: String },
  callNumber: { type: String },
  registNumber: { type: String },
  password: { type: String },
  createdAt: {
    type: String,
    default: () => moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss"),
  },
  updatedAt: { type: String },
  signUpPath: { type: String, required: true },
  roles: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
