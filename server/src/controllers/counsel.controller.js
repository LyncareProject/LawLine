const db = require("../models");
const bcrypt = require("bcrypt");
const moment = require("moment-timezone");
const { OpenAI } = require("openai");
const { OPENAI_KEY } = require("../common");

const { user: User } = db;
const { counsel: Counsel } = db;

const openai = new OpenAI({
  apiKey: OPENAI_KEY,
});

exports.createCounsel = async (req, res) => {
  try {
    const { title, name, phone, password, userId, desc } = req.body;
    const newCounsel = new Counsel({
      title,
      name,
      phone,
      password,
      userId,
      desc,
    });
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
    const result = await Counsel.find({ userId: _id }).sort({ createdAt: -1 });
    // const user = await User.findOne({ _id });
    // const result = await Counsel.find({ phone : user.phone }).sort({ createdAt: -1 });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.createCounselByAi = async (req, res) => {
  try {
    const { userId, desc } = req.body;

    let conversationTitle = [
      {
        role: "system",
        content:
          "The content should be in Korean. Respond in Korean as a specialist in Korean law. Answer the following content using your expertise in Korean legal matters.",
      },
    ];
    let conversationDesc = [
      {
        role: "system",
        content:
          "The content should be in Korean. Respond in Korean as a specialist in Korean law. Answer the following content using your expertise in Korean legal matters.",
      },
    ];

    conversationTitle.push({
      role: "user",
      content: `${desc}를 한줄의 제목으로 만들어줘. 여기에는 상담이나 신청에 관한 이야기가 들어가지 말아야 해.`,
    });

    const userData = await User.findOne({ _id: userId });

    const titleByAi = await openai.chat.completions.create({
      messages: conversationTitle,
      model: "gpt-4",
    });

    conversationDesc.push({
      role: "user",
      content: `${desc}를 정리해서 매끄러운 문장으로 만들어줘. 여기에는 상담이나 신청에 관한 이야기가 들어가지 말아야 해.`,
    });

    const descByAi = await openai.chat.completions.create({
      messages: conversationDesc,
      model: "gpt-4",
    });

    const newCounsel = new Counsel({
      title : titleByAi.choices[0].message.content,
      name: userData.username,
      phone: userData.phone,
      userId,
      desc: descByAi.choices[0].message.content,
    });

    await newCounsel.save();

    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};
