const db = require("../models");
const bcrypt = require("bcrypt");
const moment = require("moment-timezone");

const { user: User } = db;
const { role: Role } = db;

exports.createUser = async (req, res) => {
  try {
    const { email, username, password, phone, callNumber, registNumber } =
      req.body;

    // 해당 이메일로 가입한 유저가 있는지 확인
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "이미 존재하는 이메일입니다." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = await Role.findOne({ name: "User" });
    const newUser = new User({
      email,
      username,
      phone,
      callNumber,
      registNumber,
      password: hashedPassword,
      roles: userRole._id,
    });
    await newUser.save();
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.findUser = async (req, res) => {
  const id = req.params.id;
  const resultUser = await User.findOne({ _id: id });
  res.json(resultUser);
};

exports.updateUser = async (req, res) => {
  try {
    req.body.updatedAt = moment()
      .tz("Asia/Seoul")
      .format("YYYY-MM-DD HH:mm:ss");
    const { phone, updatedAt } = req.body;
    console.log(req.params.id)
    console.log(typeof phone)
    console.log(typeof updatedAt)
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { phone, updatedAt } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Updated", user: updatedUser });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};
