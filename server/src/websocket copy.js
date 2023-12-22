const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { OpenAI } = require('openai');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const { OPENAI_KEY } = require('./common')
// OpenAI API 설정
const openai = new OpenAI({
    apiKey: OPENAI_KEY,
});

// WebSocket 연결을 처리합니다.
wss.on('connection', (ws) => {
    let conversationHistory = [
        {
            role: 'system',
            content: "ends with '\n\nAI를 통해 작성된 글로 자세한 상담은 변호사 상담을 이용해주세요.'. The content should be in Korean. Respond in Korean as a specialist in Korean law. Answer the following content using your expertise in Korean legal matters."
        },
    ];
    ws.on('message', async (message) => {
        try {
            const { text } = JSON.parse(message);
            conversationHistory.push({
                role: 'user',
                content: text,
            });
            
            const stream = await openai.chat.completions.create({
                model: 'gpt-4',
                messages: conversationHistory,
                stream: true,
            });

            let accumulatedResponse = '';

            for await (const part of stream) {
                const contentPart = part.choices[0]?.delta?.content || '';
                accumulatedResponse += contentPart
                ws.send(JSON.stringify({ answer: contentPart }))
            }

            conversationHistory.push({
                role: 'assistant',
                content: accumulatedResponse,
            });

            ws.send(JSON.stringify({ status: 'completed' }));

        } catch (error) {
            console.error('OpenAI API 호출 중 오류 발생:', error);
        }
    });
});

module.exports = server

