const db = require("../models");
const bcrypt = require("bcrypt");
const moment = require("moment-timezone");

const { user: User } = db;
const { counsel: Counsel } = db;

exports.createCounsel = async (req, res) => {
  try {
    const { title, name, phone, password, userId, desc } = req.body;
    const newCounsel = new Counsel({ title, name, phone, password, userId, desc });
    await newCounsel.save();
    res.status(200).json({ message: "Success", newCounsel });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.findAllCounsel = async (req, res) => {
  try {
    const result = await Counsel.find().sort({ createdAt: -1 });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.readCounsel = async (req, res) => {
  try {
    const result = await Counsel.findOne({ _id: req.params.counsel_id });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.searchCounsel = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const result = await Counsel.findOne({ phone: phone }).sort({
      createdAt: -1,
    });
    if (!result) {
      return res
        .status(404)
        .json({ message: "입력된 정보로 상담 신청된 내역이 없습니다." });
    }
    if (result.password !== password) {
      return res.status(404).json({ message: "비밀번호 오류" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.updateCounsel = async (req, res) => {
  try {
    req.body.updatedAt = moment()
      .tz("Asia/Seoul")
      .format("YYYY-MM-DD HH:mm:ss");
    await Counsel.findOneAndUpdate({ _id: req.params.counsel_id }, req.body);
    res.json({ message: "Updated" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteCounsel = async (req, res) => {
  try {
    await Counsel.deleteOne({ _id: req.params.counsel_id });
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.findUserCounsel = async (req, res) => {
  try {
    const _id = req.params.user_id;
    const user = await User.findOne({ _id });
    const result = await Counsel.find({ phone : user.phone }).sort({ createdAt: -1 });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};
