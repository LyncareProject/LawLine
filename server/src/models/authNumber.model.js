const mongoose = require("mongoose");
const moment = require("moment-timezone");

const authNumberSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: Number, required: true },
  createdAt: {
    type: String,
    default: () => moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss"),
  },
  expiresAt: {
    type: String,
    default: () =>
      moment().tz("Asia/Seoul").add(5, "minutes").format("YYYY-MM-DD HH:mm:ss"),
  },
});

const authNumber = mongoose.model("authnumber", authNumberSchema);

module.exports = authNumber;
