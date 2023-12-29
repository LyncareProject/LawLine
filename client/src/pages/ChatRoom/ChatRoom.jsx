import { useEffect, useRef, useState } from "react";
import { getAuth } from "../../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { createRoom, findRoom } from "../../services/roomService";
import styles from "./ChatRoom.module.css";
import Header from "../../components/Header/Header";
import AiBot from "../../assets/images/AiImg.png";
import { createCounselByAi } from "../../services/counselService";
import WebSocket_URL from "../../services/websocketConfig";
import MobileHeader from "../../components/MobileHeader/MoblieHeader";

const ChatRoom = () => {
  // useHooks
  const navigate = useNavigate();
  const chatContentsRef = useRef(null);

  // useState
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [aiLoading, setAiLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState("");
  const [stream, setStream] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      type: "message",
      user: "ai",
      content:
        "AI 법률비서 로라인봇(LawLine Bot)입니다. 법률 관련 질문이 있으신가요?",
    },
  ]);
  const [textareaRows, setTextareaRows] = useState(1);
  const [counsel, setCounsel] = useState(false);

  // textArea 줄 바꿈 처리
  const handleInput = (e) => {
    const numberOfLineBreaks = (e.target.value.match(/\n/g) || []).length;
    const newRows = Math.min(Math.max(numberOfLineBreaks + 1, 1), 7);
    setTextareaRows(newRows);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 화면 접속시 회원 검증
  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const response = await getAuth();
        setUserId(response.id);
        // 회원 인증 후 이전 방이 있는지 찾아보기
        const responseRoom = await findRoom({ userId });

        if (!responseRoom || responseRoom.data.length === 0) {
          console.log("방이 없음");
        }
        if (responseRoom.data.length >= 1) {
          console.log("방이 있음");
          // console.log(responseRoom);
        }
        // 있으면 이전 내용을 불러올 것인지 확인 후 불러오기 or 새로 이어서 작성
      } catch (error) {
        toast.error(<h3>해당 서비스는 로그인이 필요한 서비스입니다.</h3>, {
          position: "top-center",
          autoClose: 2000,
        });
        navigate("/login");
      }
    };
    fetchAuth();
  }, [navigate]);

  // 웹 소캣 연결
  const socketRef = useRef(null);

  socketRef.current = useWebSocket(WebSocket_URL, {
    onOpen: () => {},
    shouldReconnect: (closeEvent) => true,
  });
  const { sendMessage, lastMessage, readyState } = socketRef.current;

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      console.log(data);

      if (data.type === "message") {
        setChatHistory((prev) => [...prev, data]);
      } else if (data.type === "streamMessage") {
        if (data.status === "completed") {
          setStream(false);
          // 스트림이 완료되었을 때만 채팅 기록 업데이트
        } else {
          setStream(true);
          updateChatHistory(data);
        }
      }
    }
  }, [lastMessage]);

  const updateChatHistory = (data) => {
    setChatHistory((prev) => {
      const newHistory = [...prev];
      if (
        newHistory.length > 0 &&
        newHistory[newHistory.length - 1].user === "ai"
      ) {
        newHistory[newHistory.length - 1].content += data.content;
      } else {
        newHistory.push({
          type: "message",
          user: "ai",
          content: data.content,
        });
      }
      return newHistory;
    });
  };

  useEffect(() => {
    const element = chatContentsRef.current;
    element.scrollTop = element.scrollHeight;
    if (chatHistory.length > 0) {
      const lastMessage = chatHistory[chatHistory.length - 1];
      if (
        lastMessage.user === "ai" &&
        lastMessage.content.includes("LawLine 변호사 상담 신청")
      ) {
        setCounsel(true);
      }
    }
  }, [chatHistory]);

  // 전송 버튼 클릭시
  const sendMessageBtn = async () => {
    // message 칸이 비어있는지, 웹소캣이 연결되어있는지 검증
    if (message === "신청") {
      alert("신청하기");
      return;
    }
    if (message.trim() && readyState === ReadyState.OPEN) {
      // 첫번째 메세지인지 확인
      if (chatHistory.length === 0) {
        // const response = await createRoom({ userId });
      }
      await sendMessage(
        JSON.stringify({
          type: "message",
          user: "User",
          content: message,
        })
      );
      setMessage("");
      setTextareaRows(1);
    }
  };
  const CounselBtn = async () => {
    try {
      setAiLoading(true);
      await createCounselByAi({
        userId,
        desc: JSON.stringify(chatHistory),
      });
      // const lastMessage = chatHistory[chatHistory.length - 1];

      // await createCounselByAi({
      //   userId,
      //   desc: JSON.stringify(lastMessage.content),
      // });
      toast.success(<h3>상담 신청이 완료 되었습니다.</h3>, {
        position: "top-center",
        autoClose: 2000,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.message, {
        position: "top-center",
        autoClose: 2000,
      });
    } finally {
      setAiLoading(false);
    }
  };
  return (
    <div className={styles.ChatRoom}>
      {aiLoading && <AILoading />}
      {windowWidth >= 768 ? <Header /> : <MobileHeader />}
      <div className={styles.Wrap}>
        <div className={styles.ChatWrap} ref={chatContentsRef}>
          {chatHistory.length >= 1 &&
            chatHistory.map((chat, index) => (
              <div
                key={index}
                className={chat.user === "User" ? styles.User : styles.Ai}
              >
                {chat.user === "ai" && (
                  <img className={styles.AiImage} src={AiBot} alt="AI" />
                )}
                <p
                  className={
                    chat.user === "User" ? styles.ChatUser : styles.ChatAI
                  }
                >
                  {chat.content}
                </p>
              </div>
            ))}
          {counsel && (
            <button className={styles.CounselBtn} onClick={CounselBtn}>
              변호사 상담 신청
            </button>
          )}
        </div>
        <div className={styles.MessageInputWrap}>
          <textarea
            className={styles.MessageInput}
            type="text"
            rows={textareaRows}
            value={message}
            placeholder="메세지를 입력해주세요"
            onInput={handleInput}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.nativeEvent.isComposing === false) {
                if (stream) {
                  return;
                }
                e.preventDefault();
                sendMessageBtn();
              }
            }}
          />
          <button
            disabled={stream}
            className={`${stream && styles.Disabled} ${styles.MessageBtn}`}
            onClick={sendMessageBtn}
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

const AILoading = () => {
  return (
    <div className={styles.AILoading}>
      <h2 className={styles.AILoadingText}>
        AI가 상담 내용을 분석 및 정리 하고 있습니다. 이 작업은 최대 3분 정도
        소요됩니다.
      </h2>
    </div>
  );
};

export default ChatRoom;
