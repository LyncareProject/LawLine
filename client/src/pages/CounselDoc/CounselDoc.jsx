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
import InputWrap from "../../components/InputWrap/InputWrap";
import { toast } from "react-toastify";
import "./CounselDoc.css";

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
  console.log(comments)
  const navigate = useNavigate();

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const authBtn = () => {
    if (!password) {
      return alert("비밀번호를 입력하세요");
    }
    if (password.length !== 4) {
      toast.error(<h3>비밀번호는 4자리입니다</h3>, {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    if (password !== data.password) {
      toast.error(<h3>비밀번호가 일치하지 않습니다</h3>, {
        position: "top-center",
        autoClose: 2000,
      });
      setPassword("");
      return;
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
          <Title title={data.title} margin={"20px 0"}/>
          <Text text={data.desc} />
          <div className="CounselInfo">
            <p className="CounselInfoPhone">
              전화번호 : <span>{data.phone}</span>
            </p>
            <p className="CounselInfoCreateAt">
              작성일 : <span>{data.createdAt}</span>
            </p>
          </div>
          <hr style={{ border: "none", height: "2px", backgroundColor: "#CFCFCF" }} />
          {(user.roles === "Laywer" || user.roles === "Admin") && (
            <CommentEdit
              username={user.username}
              counselId={data._id}
              userId={user.id}
              userRole={user.roles}
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
                userRole={comment.userRole}
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
        <VerifyPassword
          password={password}
          title={data.title}
          handlePassword={handlePassword}
          authBtn={authBtn}
        />
      )}
    </>
  );
};

const VerifyPassword = (props) => {
  return (
    <div className="Wrap">
      <Text
        textAlign={"left"}
        fontSize={25}
        fontWeight={600}
        fontColor={"#000"}
        margin={"35px 0px"}
        text={props.title}
      />
      <Text
        textAlign={"left"}
        fontSize={18}
        fontWeight={800}
        fontColor={"#03C126"}
        margin={"0px 0px 35px 0px"}
        text={"비밀번호 확인 후 게시물 열람이 가능합니다"}
      />
      <InputWrap
        id={"password"}
        label={"비밀번호"}
        placeholder={"비밀번호를 입력해주세요"}
        onChange={props.handlePassword}
        maxLength={4}
        value={props.password}
        icon={"IconKey"}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            return props.authBtn();
          }
          if (e.target.value.length === 4) {
            return props.authBtn();
          }
        }}
      />
    </div>
  );
};
export default CounselDoc;
