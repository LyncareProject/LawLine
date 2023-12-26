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
      {
        role: "system",
        content:
          "1차적으로\n해당 사안의 쟁점이 어떤 형사 사건 구성요건에 해당하는 형사소송인지, 민사 소송의 쟁점도 포함돼 있는지 판단해 주세요. 민사소송에 해당하는 경우, 이혼, 상속, 증여, 재산분할 등 가사소송과 관련 여부도 판단해 주면 됩니다. 그 밖에 해당 사안이 다른 법률 소송에 해당하는지 여부도 검토해 주세요.\n\n2차적으로\n이 사안을 해결하기 위한 법률적 조언으로서 해당 사안에 적용 가능한 1)법률조문과  2)대법원 판례 근거를 들어서 신고절차, 법률적 조취 취하는 방법, 해당 분야 전문 변호사 도움받기 등에 대한 조언을 해주세요.\n\n마지막으로 해당 사안에 가장 최신의 각 지방법원 하급심 판례가 있으면 나열해 주세요. 검토 순서는 문의 의뢰자의 주소를 기준으로 아래와 같이 검토하여 주세요.\n1) 서울의 경우: 서울고등법원, 서울중앙지방법원, 서울가정법원, 서울행정법원, 서울회생법원, 서울동부지방법원, 서울남부지방법원, 서울북부지방법원, 서울서부지방법원\n2) 인천, 경기도의 경우: 수원고등법원, 의정부지방법원, 인천지방법원, 인천가정법원, 수원지방법원, 수원가정법원, 수원회생법원\n3) 강원도의 경우: 춘천지방법원\n4) 충청북도의 경우: 청주지방법원\n5) 대전, 세종, 충청남도의 경우, 대전고등법원, 대전지방법원, 대전가정법원, 특허법원\n6) 대구, 경상북도의 경우: 대구고등법원, 대구지방법원\n7) 부산, 울산, 경상남도의 경우: 부산고등법원, 부산지방법원, 부산가정법원, 부산회생법원, 울산지방법원, 울산가정법원, 창원지방법원\n8) 광주, 전라남도의 경우: 광주고등법원, 광주지방법원, 광주가정법원\n9) 전락북동의 경우: 전주지방법원\n10) 제주도의 경우:  제주지방법원\n\n문의 사안의 해당 하급심 판례가 없으면, 추가 질문 또는 도움이 필요한 경우를 물어봐 주세요.\n",
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

