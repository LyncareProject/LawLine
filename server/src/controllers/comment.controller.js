const db = require("../models");
const bcrypt = require("bcrypt");
const moment = require("moment-timezone");
const { OpenAI } = require("openai");
const { OPENAI_KEY } = require("../common");
const mongoose = require("mongoose");

const { user: User } = db;
const { counsel: Counsel } = db;
const { comment: Comment } = db;

const openai = new OpenAI({
  apiKey: OPENAI_KEY,
});

exports.createAIComment = async (req, res) => {
  try {
    let conversationHistory = [
      {
        role: "system",
        content:
          "This response begins with '이 답변은 당사 데이터를 기반으로 LawLine AI를 통해 작성된 글입니다.\n\n' and ends with '\n\nAI를 통해 작성된 글로 자세한 상담은 변호사 상담을 이용해주세요.'. The content should be in Korean. Respond in Korean as a specialist in Korean law. Answer the following content using your expertise in Korean legal matters.",
      },
    ];
    const { title, content, counselId } = req.body;
    console.log(req.body)
    const doc = `Title : ${title}, Content : ${content}`
    console.log(doc)
    conversationHistory.push({
      role: "user",
      content: doc,
    });
    const chatCompletion = await openai.chat.completions.create({
      messages: conversationHistory,
      model: "gpt-4",
    });
    const newComment = new Comment({
      name: "로라인 AI",
      content: chatCompletion.choices[0].message.content,
      userId: "654c84efcc81edaef7ae7203",
      counselId: counselId,
    });
    await newComment.save();
    await Counsel.findOneAndUpdate(
      { _id: counselId },
      {
        $set: {
          comment: "AIComment",
        },
      }
    );
    console.log("createAIComment Completed");
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createComment = async (req, res) => {
  try {
    const { name, content, userId, userRole, counselId } = req.body;
    const newComment = new Comment({
      name,
      content,
      userId,
      userRole,
      counselId,
    });
    await newComment.save();
    await Counsel.findOneAndUpdate(
      { _id: counselId },
      {
        $set: {
          comment: "LawyerComment",
        },
      }
    );
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.findAllComment = async (req, res) => {
  try {
    const result = await Comment.find().sort();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.readComment = async (req, res) => {
  try {
    const result = await Comment.find({
      counselId: req.params.comment_id,
    }).sort();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateComment = async (req, res) => {
  try {
    req.body.updatedAt = moment()
      .tz("Asia/Seoul")
      .format("YYYY-MM-DD HH:mm:ss");
    await Comment.findOneAndUpdate({ _id: req.params.comment_id }, req.body);
    res.json({ message: "Updated" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    await Comment.deleteOne({ _id: req.params.comment_id });
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};
