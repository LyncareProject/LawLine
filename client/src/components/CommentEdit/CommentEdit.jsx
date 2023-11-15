import { useEffect, useState } from "react";
import { createComment } from "../../services/commentService";
import { getAuth } from "../../services/authService";
import "./CommentEdit.css";

const CommentEdit = (props) => {
  const [comment, setComment] = useState("");
  const sendCommentBtn = async () => {
    try {
      props.setLoading(true);
      await createComment({
        name: props.username,
        content: comment,
        userId: props.userId,
        userRole: props.userRole,
        counselId: props.counselId,
      });
    } catch (error) {
      console.log(error);
    } finally {
      props.setLoading(false);
    }
  };
  return (
    <div className="CommentEdit">
      <textarea
        type="text"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendCommentBtn();
          }
        }}
      />
      <div className="CommentEditButtonWrap">
        <button onClick={sendCommentBtn}>입력</button>
      </div>
    </div>
  );
};
export default CommentEdit;
