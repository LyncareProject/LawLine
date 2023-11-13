import { useState } from "react";
import "./Comment.css";
import { deleteComment, updateComment } from "../../services/commentService";
import { toast } from "react-toastify";
import { faL } from "@fortawesome/free-solid-svg-icons";

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
      <div className="CommentHead">
        <p>{props.name}</p>
        <p>{props.createdAt}</p>
        {props.updatedAt && <p>{props.updatedAt}</p>}
        {props.userId === props.currentUser.id && (
          <>
            <button onClick={() => modifyBtn({ data: props.content })}>
              수정
            </button>
            <button onClick={deleteBtn}>삭제</button>
          </>
        )}
        {}
      </div>
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
          <p>{props.content}</p>
        )}
      </div>
    </div>
  );
};

export default Comment;
