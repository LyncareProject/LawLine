const db = require("../models");

const { room: Room } = db;

// Create
exports.createRoom = async (req, res) => {
  try {
    const { userId, title } = req.body;
    if(!userId && !title){
      const newRoom = new Room({});
      await newRoom.save();
      return res.status(200).json(newRoom);
    } else {
      const newRoom = new Room({
        userId,
        title,
      });
      await newRoom.save();
      return res.status(200).json(newRoom);
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Read
exports.findRoom = async (req, res) => {
  try {
    const { user_id } = req.params
    console.log(user_id)
    const result = await Room.find({ userId : user_id }).sort({ _id: -1 });
    console.log(result)
    res.status(200).json(result);
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// Read
exports.findOneRoom = async (req, res) => {
  try {
    const { room_id } = req.params;
    const result = await Room.findOne({ _id: room_id });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// Update
exports.updateRoom = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// Delete
exports.deleteRoom = async (req, res) => {
  try {
    await Room.deleteOne({ _id: req.params.room_id });
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};
