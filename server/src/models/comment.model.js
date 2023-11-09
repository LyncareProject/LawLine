const mongoose = require("mongoose");
const moment = require("moment");

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String },
  createdAt: { type: String, default: moment().format("YYYY-MM-DD hh:mm:ss") },
  updatedAt: { type: String },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  },
  counselId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Counsel', 
    required: true
  },
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
