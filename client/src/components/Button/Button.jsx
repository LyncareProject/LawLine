import "./Button.css";

const Button = (props) => {
  return (
    <button
      className="ComponentButton"
      onClick={props.pressButton}
      style={{
        backgroundColor: props.buttonColor,
        color: props.buttonTextColor,
        margin: props.buttonMargin,
      }}
    >
      {props.buttonName}
    </button>
  );
};

export default Button;
