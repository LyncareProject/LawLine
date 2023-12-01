const mongoose = require("mongoose");
const moment = require("moment-timezone");

const requestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  counselId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Counsel",
    required: true,
  },
  desc: { type: String },
  createdAt: {
    type: String,
    default: () => moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss"),
  },
  updatedAt: { type: String },
});

const Request = mongoose.model("request", requestSchema);

module.exports = Request;