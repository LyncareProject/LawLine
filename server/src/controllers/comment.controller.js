const db = require("../models");
const bcrypt = require("bcrypt");
const moment = require("moment");

const { user: User } = db;
const { comment: Comment } = db;

exports.createComment = async (req, res) => {
  try {
    const { name, content, userId, counselId } = req.body;
    const newComment = new Comment({ title, name, phone, password, desc });
    await newComment.save();
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.findAllComment = async (req, res) => {
  try {
    console.log("findAllCounsel");
    const result = await Comment.find().sort();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.readComment = async (req, res) => {
  try {
    console.log(req.params.counsel_id)
    const result = await Comment.findOne({ _id: req.params.counsel_id });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.updateComment = async (req, res) => {
  try {
    req.body.updatedAt = moment().format("YYYY-MM-DD hh:mm:ss");
    await Comment.findOneAndUpdate({ _id: req.params.counsel_id }, req.body);
    res.json({ message: "Updated" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    await Comment.deleteOne({ _id: req.params.counsel_id });
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};
