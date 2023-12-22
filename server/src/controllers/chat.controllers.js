const db = require("../models");

const { chat: Chat } = db;

// Create
exports.createChat = async (req, res) => {
  try {
    const { roomId, role, content } = req.body;
    console.log({ roomId, role, content });
    const newChat = new Chat({
      roomId,
      role,
      content,
    });
    await newChat.save();
    res.status(200).json(newChat);
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Read
exports.readChat = async (req, res) => {
  const { room_id } = req.params;
  console.log(room_id);
  const result = await Chat.find({ roomId: room_id });
  console.log(result);
  res.status(200).json(result);
  try {
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// Update
exports.updateChat = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// Delete
exports.deleteChat = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};
