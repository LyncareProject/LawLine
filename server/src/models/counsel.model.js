const mongoose = require("mongoose");
const moment = require("moment-timezone");

const counselSchema = new mongoose.Schema({
  title: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String },
  password: { type: String },
  desc: { type: String },
  createdAt: {
    type: String,
    default: () => moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss"),
  },
  updatedAt: { type: String },
  comment: { type: String },
});

const Counsel = mongoose.model("counsel", counselSchema);

module.exports = Counsel;
