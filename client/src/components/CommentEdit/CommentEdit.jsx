import { useState } from "react"
import { createComment } from "../../services/commentService"

const CommentEdit = (props)=>{
  const [comment, setComment ] = useState('')
  const sendCommentBtn = async ()=>{
    try {
      await createComment({
        name: props.username,
        content : comment,
        userId: props.userId,
        counselId : props.counselId,
      })
    } catch(error){
      console.log(error);
    }
  }
  return(
    <div>
      <input type="text" value={comment} onChange={(e)=>{
        setComment(e.target.value)
      }} />
      <button onClick={sendCommentBtn}>입력</button>
    </div>
  )
}
export default CommentEdit