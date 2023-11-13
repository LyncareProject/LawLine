import { useEffect, useState } from "react";
import { createComment } from "../../services/commentService";
import { getAuth } from "../../services/authService";

const CommentEdit = (props) => {
  const [comment, setComment] = useState("");
  const sendCommentBtn = async () => {
    try {
      props.setLoading(true)
      console.log(props.userId);
      await createComment({
        name: props.username,
        content: comment,
        userId: props.userId,
        counselId: props.counselId,
      });
    } catch (error) {
      console.log(error);
    } finally {
      props.setLoading(false)
    }
  };
  return (
    <>
      <div>
        <input
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
        <button onClick={sendCommentBtn}>입력</button>
      </div>
    </>
  );
};
export default CommentEdit;
