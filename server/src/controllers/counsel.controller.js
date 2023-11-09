const db = require("../models");
const bcrypt = require("bcrypt");
const moment = require("moment");

const { user: User } = db;
const { counsel: Counsel } = db;

exports.createCounsel = async (req, res) => {
  try {
    const { title, name, phone, password, desc } = req.body;
    const newCounsel = new Counsel({ title, name, phone, password, desc });
    await newCounsel.save();
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.findAllCounsel = async (req, res) => {
  try {
    console.log("findAllCounsel");
    const result = await Counsel.find().sort();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.readCounsel = async (req, res) => {
  try {
    console.log(req.params.counsel_id)
    const result = await Counsel.findOne({ _id: req.params.counsel_id });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.updateCounsel = async (req, res) => {
  try {
    req.body.updatedAt = moment().format("YYYY-MM-DD hh:mm:ss");
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
