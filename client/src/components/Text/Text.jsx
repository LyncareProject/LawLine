import "./Text.css";

const Text = (props) => {
  return (
    <div>
      <p className="ComponentText">{props.text}</p>
    </div>
  );
};

export default Text;
