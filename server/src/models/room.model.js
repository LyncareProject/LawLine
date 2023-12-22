const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    userId: { type: String, ref: "User" },
    title: { type: String, },
  },
  { timestamps: true }
);

const Room = mongoose.model("room", roomSchema);

module.exports = Room;
