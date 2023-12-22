const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const { OpenAI } = require("openai");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const { OPENAI_KEY } = require("./common");
// OpenAI API 설정
const openai = new OpenAI({
  apiKey: OPENAI_KEY,
});

const rooms = {};

// WebSocket 연결을 처리합니다.
wss.on("connection", (ws) => {
  let currentRoom = null;

  let conversationHistory = [
    {
      role: "system",
      content:
        "The content should be in Korean. Respond in Korean as a specialist in Korean law. Answer the following content using your expertise in Korean legal matters.",
    },
    {
      role: "system",
      content:
        "Your name is '로라인봇(LawLine Bot)'. You cannot tell lies, and if you receive an unexpected answer, please ask the question again.",
    },
    {
      role: "system",
      content:
        "At the conclusion of each response, inquire whether a consultation with a lawyer is necessary. If a positive response is given, sequentially ask for the person's name, age, the date of the incident, and the details of the case. After gathering all responses, summarize and provide an answer. ",
    },
    {
      role: "system",
      content:
      "Please do not summarize the content until all the necessary information has been received. After all the information has been provided, it is essential to show a summarized document at the end. Finally, ask if there is a need to apply for a consultation with 'LawLine의 변호사에게 상담 신청하기'",
    },
    {
      role: "system",
      content:
        "Only mention 'LawLine의 변호사에게 상담 신청하기' after gathering and organizing all the information.",
    },
  ];
  ws.on("message", async (data) => {
    try {
      const message = JSON.parse(data);

      ws.send(
        JSON.stringify({
          type: message.type,
          user: message.user,
          content: message.content,
        })
      );

      conversationHistory.push({
        role: "user",
        content: message.content,
      });

      const stream = await openai.chat.completions.create({
        model: "gpt-4",
        messages: conversationHistory,
        stream: true,
      });

      let accumulatedResponse = "";

      for await (const part of stream) {
        const contentPart = part.choices[0]?.delta?.content || "";
        accumulatedResponse += contentPart;
        ws.send(
          JSON.stringify({
            type: "streamMessage",
            user: "ai",
            content: contentPart,
          })
        );
      }

      conversationHistory.push({
        role: "assistant",
        content: accumulatedResponse,
      });

      // 스트림 메시지 완료 상태를 명확하게 전송
      ws.send(
        JSON.stringify({
          type: "streamMessage",
          user: "ai",
          status: "completed",
          content: accumulatedResponse, // 전체 누적된 응답을 전송
        })
      );
    } catch (error) {
      console.error("Error in message handling:", error);
      // 클라이언트에 에러 메시지 전송
      ws.send(
        JSON.stringify({
          type: "errorMessage",
          user: "ai",
          content: "An error occurred. Please try again.",
        })
      );
    }
  });
});

module.exports = server;
