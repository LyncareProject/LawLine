import { useEffect, useReducer, useRef, useState } from "react";
import Text from "../../components/Text/Text";
import styles from "./ChatRoom.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faComment, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";

function chatReducer(state, action) {
  switch (action.type) {
    // 유저가 Input 값에 값을 넣을 때
    case "INPUT_USER_MESSAGE":
      return { ...state, message: action.payload.message };
    // 유저가 Send 버튼을 눌렀을 때
    case "ADD_USER_MESSAGE":
      return {
        ...state,
        chatLogs: [...state.chatLogs, action.payload],
        message: "",
      };
    case "ADD_AI_MESSAGE_PART":
      return {
        ...state,
        message: "",
        streamMessage: state.streamMessage + action.payload,
      };
    case "COMMIT_AI_MESSAGE":
      return {
        ...state,
        chatLogs: [
          ...state.chatLogs,
          { role: "AI", message: state.streamMessage },
        ],
        streamMessage: "",
      };
    default:
      return state;
  }
}

const ChatRoom = () => {
  const chatContentsRef = useRef(null);
  const User = "User";
  const [state, dispatch] = useReducer(chatReducer, {
    message: "",
    chatLogs: [
      {
        role: "AI",
        message:
          "안녕하세요, AI 법률비서 로라인봇(LawLine Bot)입니다.\n법률 관련해서 질문을 주시면 답변을 드리겠습니다.\n답변을 드리는 과정에서 로앤봇을 조금만 기다려주시면 감사하겠습니다.\n질문은 하나씩 구체적으로 주시면 좋습니다. ",
      },
    ],
    streamMessage: "",
  });

  const [ws, setWs] = useState(null);
  const [textareaRows, setTextareaRows] = useState(1);
  const [room, setRoom] = useState([
    {
      id: 1,
      title: "반가워요",
    },
    {
      id: 2,
      title: "궁금해요",
    },
  ]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const handleInput = (e) => {
    const numberOfLineBreaks = (e.target.value.match(/\n/g) || []).length;
    const newRows = Math.min(Math.max(numberOfLineBreaks + 1, 1), 7);
    setTextareaRows(newRows);
  };

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8081");
    setWs(socket);
    socket.addEventListener("open", () => {
      console.log("WebSocket 연결이 열렸습니다.");
    });
    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data.roomId !== selectedRoom) return;
      if (data.answer) {
        dispatch({ type: "ADD_AI_MESSAGE_PART", payload: data.answer });
      }
      if (data.status && data.status === "completed") {
        dispatch({ type: "COMMIT_AI_MESSAGE" });
      }
    });
    return () => {
      socket.close();
    };
  }, [selectedRoom]);

  useEffect(() => {
    const element = chatContentsRef.current;
    element.scrollTop = element.scrollHeight;
  }, [state.chatLogs]);

  const handleMessage = (e) => {
    dispatch({
      type: "INPUT_USER_MESSAGE",
      payload: { role: User, message: e.target.value },
    });
  };

  const sendMessage = () => {
    if (state.message.trim() === "") return;
    const messageData = { text: state.message, roomId: selectedRoom };
    ws.send(JSON.stringify(messageData));
    dispatch({
      type: "ADD_USER_MESSAGE",
      payload: { role: User, message: state.message },
    });
  };

  return (
    <div className={styles.ChatRoom}>
      <div className={styles.ChatRoomHeader}>
        <Link to={"/"}>
          <img src={Logo} alt="Logo" className={styles.ChatRoomLogo} />
        </Link>
      </div>
      <div className={styles.ChatRoomBody}>
        <div className={styles.ChatRoomSidebar}>
          <div
            onClick={() => {
              setSelectedRoom(null);
            }}
            className={styles.ChatRoomNewListBtn}
          >
            <p className={styles.ChatRoomListTitle}>새로운 채팅</p>
          </div>
          {room.map((data) => (
            <div
              key={data.id}
              onClick={() => {
                setSelectedRoom(data.id);
              }}
              className={
                data.id === selectedRoom
                  ? styles.ChatRoomActiveList
                  : styles.ChatRoomList
              }
            >
              <FontAwesomeIcon icon={faComment} />
              <p className={styles.ChatRoomListTitle}>{data.title}</p>
            </div>
          ))}
        </div>
        <div className={styles.ChatRoomContent}>
          <div className={styles.ChatRoomMessageWrap} ref={chatContentsRef}>
            {state.chatLogs &&
              state.chatLogs.map((data) => (
                <>
                  <div
                    className={
                      data.role === "AI"
                        ? styles.ChatRoomAIMessage
                        : styles.ChatRoomUserMessage
                    }
                  >
                    {data.message}
                  </div>
                  {/* {data.role === "AI" && <button className={styles.ChatRoomCounselButton}>변호사에게 문의하기</button>} */}
                </>
              ))}
            {state.streamMessage && (
              <div className={styles.ChatRoomAIMessage}>
                {state.streamMessage}
              </div>
            )}
          </div>
          <div className={styles.ChatRoomInput}>
            <textarea
              type="text"
              rows={textareaRows}
              value={state.message}
              placeholder="메세지를 입력해주세요"
              onInput={handleInput}
              onChange={handleMessage}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage();
                  e.target.value = "";
                }
              }}
            />
            <button onClick={sendMessage}>전송</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatRoom;
