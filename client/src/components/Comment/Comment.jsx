import "./Comment.css";

const Comment = (props) => {
  return (
    <div className="CommentWrap">
      <div className="CommentHead">
        <p>{props.name}</p>
        <p>{props.createdAt}</p>
        {props.updatedAt && <p>{props.updatedAt}</p>}
      </div>
      <div className="CommentBody">
        <p>{props.content}</p>
      </div>
    </div>
  );
};

export default Comment;
