import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readCounsel } from "../../services/counselService";
import CommentEdit from "../../components/CommentEdit/CommentEdit";
import Comment from "../../components/Comment/Comment";
import { getAuth } from "../../services/authService";
import { readComment } from "../../services/commentService";
import SubTitle from "../../components/SubTitle/SubTitle";
import Title from "../../components/Title/Title";
import Text from "../../components/Text/Text";

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
  const [comments, setComments] = useState([]);
  console.log(comments);
  const navigate = useNavigate();

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const authBtn = () => {
    console.log(data.password);
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
        const commentResponse = await readComment({ commentId: counselId });
        // const verityAuth = await getAuth();
        // setUser(verityAuth.data);
        await setData(response.data);
        await setComments(commentResponse.data);
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
      {auth && data ? (
        <div className="Wrap">
          <Title title={data.title} />
          <SubTitle subTitle={data.name} />
          <SubTitle subTitle={data.phone} />
          <Text text={data.desc} />
          <CommentEdit
            username={user.username}
            counselId={data._id}
            userId={user._id}
          />

          {comments &&
            comments.map((comment, index) => (
              <Comment
                key={index}
                name={comment.name}
                content={comment.content}
                createdAt={comment.createdAt}
                updatedAt={comment.updatedAt}
              />
            ))}
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
