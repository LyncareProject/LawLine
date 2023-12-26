import { useEffect, useReducer, useRef, useState } from "react";
import Text from "../../components/Text/Text";
import styles from "./ChatRoom.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faComment, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import { getAuth } from "../../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { createRoom, findRoom } from "../../services/roomService";
import { toast } from "react-toastify";
import { createChat } from "../../services/chatService";

const WS_URL = "ws://127.0.0.1:8081";

const ChatRoom = () => {
  const dispatch = useDispatch();
  const isLogined = useSelector((state) => state.user.value.isLogined);

  const [room, setRoom] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [userId, setUserId] = useState(null);
  const [textareaRows, setTextareaRows] = useState(1);
  const socketRef = useRef(null);

  socketRef.current = useWebSocket(WS_URL, {
    onOpen: () => {},
    shouldReconnect: (closeEvent) => true,
  });

  const { sendMessage, lastMessage, readyState } = socketRef.current;

  const fetchRoomList = async (userId) => {
    const response = await findRoom({ userId });
    setRoom(response);
  };

  useEffect(() => {
    const Tokens = JSON.parse(localStorage.getItem("Tokens"));
    if (Tokens) {
      const verifyAuth = async () => {
        try {
          const responseAuth = await getAuth();
          setUserId(responseAuth._id);
          fetchRoomList(responseAuth._id);
        } catch (error) {
          dispatch(logout());
          localStorage.removeItem("Tokens");
        }
      };
      verifyAuth();
    }
  }, [dispatch]);

  useEffect(() => {
    if (lastMessage !== null) {
      console.log(lastMessage)
      const data = JSON.parse(lastMessage.data);
      setChatHistory((prev) => [...prev, data]);
    }
  }, [lastMessage]);

  const createRoomBtn = async () => {
    if (!isLogined) {
      toast.error(<h3>해당 서비스는 로그인이 필요한 서비스입니다.</h3>, {
        position: "top-center",
        autoClose: 2000,
      });
    }
    if (chatHistory.length >= 1) {
      await createRoom({ userId, title: "일단 넣어놓은 제목" });
      // await fetchRoomList({ userId });
    }
  };

  const handleInput = (e) => {
    const numberOfLineBreaks = (e.target.value.match(/\n/g) || []).length;
    const newRows = Math.min(Math.max(numberOfLineBreaks + 1, 1), 7);
    setTextareaRows(newRows);
  };

  const sendMessageBtn = async () => {
    if (message.trim() && readyState === ReadyState.OPEN) {
      if (chatHistory.length === 0) {
        const response = await createRoom({});
        setSelectedRoom(response.data._id);
        await sendMessage(
          JSON.stringify({
            type: "message",
            user: "User",
            content: message,
          })
        );
        await createChat({
          roomId: response.data._id,
          role: "User",
          content: message,
        });
        setMessage("");
        return;
      }
      await sendMessage(
        JSON.stringify({
          type: "message",
          user: "User",
          content: message,
        })
      );
      await createChat({
        roomId: selectedRoom,
        role : "User",
        content: message,
      });
      setMessage("");
    }
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
          <div onClick={createRoomBtn} className={styles.ChatRoomNewListBtn}>
            <p className={styles.ChatRoomListTitle}>새로운 채팅</p>
          </div>
          {room.length >= 1 &&
            room.map((data) => (
              <div
                key={data._id}
                onClick={() => {
                  setSelectedRoom(data._id);
                }}
                className={
                  data._id === selectedRoom
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
          <div className={styles.ChatRoomInput}>
            <textarea
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
                  sendMessageBtn();
                }
              }}
            />
            <button onClick={sendMessageBtn}>전송</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatRoom;
