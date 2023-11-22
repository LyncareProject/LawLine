const db = require("../models");
const bcrypt = require("bcrypt");

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
  console.log(req.body);
};
exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  console.log(id);
};
