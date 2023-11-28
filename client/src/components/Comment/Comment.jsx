import { useState } from "react";
import "./Comment.css";
import { deleteComment, updateComment } from "../../services/commentService";
import { toast } from "react-toastify";
import { faL } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";

const Comment = (props) => {
  const [mode, setMode] = useState(false);
  const [content, setContent] = useState("");
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
  return (
    <div className="CommentWrap">
      <div
        className="CommentHead"
        style={
          props.name === "로라인 AI"
            ? { backgroundColor: "rgba(0, 193, 38, 0.15)", color: "#00C126" }
            : { backgroundColor: "#F4F4F4" }
        }
      >
        <p>
          {props.name} {props.userRole === "Admin" && "관리자"}{" "}
          {props.userRole === "Lawyer" && "변호사"}
        </p>
        {!props.updatedAt ? (
          <p>작성일 : {props.createdAt}</p>
        ) : (
          <p>수정일 : {props.updatedAt}</p>
        )}
      </div>

      {props.userId === props.currentUser.id && (
        <div>
          <button onClick={() => modifyBtn({ data: props.content })}>
            수정
          </button>
          <button onClick={deleteBtn}>삭제</button>
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
            {props.name === "로라인 AI" && (
              <Button
                pressButton={() => {}}
                buttonColor={"#00C126"}
                buttonTextColor={"#FFF"}
                buttonMargin={"30px 0"}
                buttonName={"변호사 상담 신청"}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
