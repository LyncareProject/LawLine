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
    id: "",
    roles: "",
  });
  const [password, setPassword] = useState("");
  const [comments, setComments] = useState([]);
  
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
        // await setUser(verityAuth.data);
        await setData(response.data);
        await setComments(commentResponse.data);
        // Token이 있을 때 검증
        const Tokens = JSON.parse(localStorage.getItem("Tokens"));
        if (Tokens) {
          const authResponse = await getAuth();
          console.log(authResponse);
          setUser({
            username: authResponse.name,
            id: authResponse.id,
            roles: authResponse.roles,
          });
          if (
            authResponse.roles === "Laywer" ||
            authResponse.roles === "Admin"
          ) {
            setAuth(true);
          }
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [counselId, loading]);

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
          {(user.roles === "Laywer" || user.roles === "Admin") && (
            <CommentEdit
              username={user.username}
              counselId={data._id}
              userId={user.id}
              setLoading={setLoading}
            />
          )}

          {comments &&
            comments.map((comment, index) => (
              <Comment
                key={index}
                commentId={comment._id}
                counselId={comment.counselId}
                userId={comment.userId}
                currentUser={user}
                name={comment.name}
                content={comment.content}
                createdAt={comment.createdAt}
                updatedAt={comment.updatedAt}
                setLoading={setLoading}
              />
            ))}
        </div>
      ) : (
        <VerifyPassword handlePassword={handlePassword} authBtn={authBtn} />
      )}
    </>
  );
};
const VerifyPassword = (props) => {
  return (
    <div className="Wrap">
      <input
        type="password"
        onChange={props.handlePassword}
        name="password"
        maxLength={4}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            props.authBtn();
          }
        }}
      />
      <button className="passwordBtn" onClick={props.authBtn}>
        입력
      </button>
    </div>
  );
};
export default CounselDoc;
