const mongoose = require("mongoose");
const moment = require("moment-timezone");

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String },
  createdAt: {
    type: String,
    default: () => moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss"),
  },
  updatedAt: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userRole: {
    type: String,
  },
  counselId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Counsel",
    required: true,
  },
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
