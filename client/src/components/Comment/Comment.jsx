import { useEffect, useState } from "react";
import "./Comment.css";
import { deleteComment, updateComment } from "../../services/commentService";
import { toast } from "react-toastify";
import { faL, faPhone } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import { findUser } from "../../services/userService";
import IconAI from "../../assets/images/IconAI.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { requestLawyerCounsel } from "../../services/requestService";

const Comment = (props) => {
  const [mode, setMode] = useState(false);
  const [content, setContent] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [introduce, setIntroduce] = useState(null);

  useEffect(() => {
    if (props.name === "로라인 AI") {
      setProfileImg(IconAI);
      setIntroduce(
        "이 답변은 당사 데이터를 기반으로 로라인 AI가 작성한 답변이에요"
      );
    }
    if (props.userRole === "Lawyer" || props.userRole === "Admin") {
      const fetchData = async () => {
        const response = await findUser({ id: props.userId });
        setProfileImg(response.data.profileImg);
        if (response.data.introduce) {
          setIntroduce(response.data.introduce);
        }
      };
      fetchData();
    }
  }, [props.name, props.userId, props.userRole]);

  const modifyBtn = () => {
    setMode(!mode);
    setContent(props.content);
  };
  const updateBtn = async () => {
    try {
      props.setLoading(true);
      await updateComment({
        commentId: props.commentId,
        name: props.name,
        content,
        userId: props.userId,
        counselId: props.counselId,
      });
      toast.success(<h3>댓글 수정이 완료되었습니다.</h3>, {
        position: "top-center",
        autoClose: 2000,
      });
      setMode(false);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 2000,
      });
    } finally {
      props.setLoading(false);
    }
  };
  const deleteBtn = async () => {
    try {
      if (window.confirm("댓글을 삭제하시겠습니까?")) {
        props.setLoading(true);
        await deleteComment({
          commentId: props.commentId,
        });
        toast.success(<h3>댓글이 삭제 되었습니다.</h3>, {
          position: "top-center",
          autoClose: 2000,
        });
        setMode(false);
      } else {
        return;
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 2000,
      });
    } finally {
      props.setLoading(false);
    }
  };
  const requestCounselBtn = async () => {
    try {
      const response = await requestLawyerCounsel({
        userId: props.userId,
        counselId: props.counselId,
      });
      toast.success(<h3>{response.data.message}</h3>, {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };
  return (
    <div className="CommentWrap">
      <div
        className="CommentHead"
        style={
          props.name === "로라인 AI"
            ? { backgroundColor: "rgba(0, 193, 38, 0.15)", color: "#00C126" }
            : { backgroundColor: "#F2F4FF" }
        }
      >
        <div className="CommentUserInfoWrap">
          <div
            className={
              props.name === "로라인 AI" ? "CommentAiInfo" : "CommentUserInfo"
            }
          >
            <img src={profileImg} alt="profileImg" />
            <p>
              {props.name} {props.userRole === "Admin" && "관리자"}{" "}
              {props.userRole === "Lawyer" && "변호사"}
            </p>
          </div>
          <p>{introduce}</p>
        </div>
        <div>
          {!props.updatedAt ? (
            <p>작성일 : {props.createdAt}</p>
          ) : (
            <p>수정일 : {props.updatedAt}</p>
          )}
        </div>
      </div>
      {props.userId === props.currentUser.id && (
        <div className="CommentControlWrap">
          <button onClick={() => modifyBtn({ data: props.content })}>
            수정
          </button>
          <button onClick={deleteBtn}>삭제</button>
        </div>
      )}

      {props.userRole === "Lawyer" && (
        <div className="RequestLaywerCounsel">
          <p>추가 상담이 필요하십니까?</p>
          <button onClick={requestCounselBtn}>
            <FontAwesomeIcon icon={faPhone} className="iconPhone" /> 전화 상담
            신청
          </button>
        </div>
      )}
      <div className="CommentBody">
        {mode ? (
          <>
            <input
              type="text"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <button onClick={updateBtn}>수정 완료</button>
          </>
        ) : (
          <div
            className="ComentBodyDesc"
            style={
              props.name === "로라인 AI"
                ? {
                    borderLeft: "1px solid #00C126",
                  }
                : { borderLeft: "1px solid #000" }
            }
          >
            <p
              style={
                props.name === "로라인 AI"
                  ? {
                      fontWeight: 400,
                    }
                  : { fontWeight: 700 }
              }
            >
              {props.content}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
