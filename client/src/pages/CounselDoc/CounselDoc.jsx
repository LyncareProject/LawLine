import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readCounsel } from "../../services/counselService";
import CommentEdit from "../../components/CommentEdit/CommentEdit";
import CommentList from "../../components/CommentList/CommentList";
import { getAuth } from "../../services/authService";

const CounselDoc = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const { counselId } = useParams();
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({
    username: "",
    _id: "",
  });
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const authBtn = () => {
    if (!password) {
      return alert("비밀번호를 입력하세요");
    }
    if (password.length !== 4) {
      return alert("비밀번호는 4자리입니다.");
    }
    if (password !== data.password) {
      return alert("비밀번호가 일치하지 않습니다");
    }
    if (password === data.password) {
      return setAuth(true);
    }
  };
  useEffect(() => {
    try {
      setLoading(true);
      const fetchData = async () => {
        const response = await readCounsel({ counselId });
        const verityAuth = await getAuth();
        setUser(verityAuth.data);
        setData(response.data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {auth ? (
        <div>
          <h1>{data.title}</h1>
          <p>{data.name}</p>
          <p>{data.phone}</p>
          <p>{data.desc}</p>
          <CommentEdit
            username={user.username}
            counselId={data._id}
            userId={user._id}
          />
          <CommentList />
        </div>
      ) : (
        <>
          <input
            type="password"
            onChange={handlePassword}
            name="password"
            maxLength={4}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                authBtn();
              }
            }}
          />
          <button className="passwordBtn" onClick={authBtn}>
            입력
          </button>
        </>
      )}
    </>
  );
};
export default CounselDoc;
