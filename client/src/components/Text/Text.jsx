import "./Text.css";

const Text = (props) => {
  return (
    <div>
      <p
        style={{
          fontSize: props.fontSize,
          fontWeight: props.fontWeight,
          color: props.fontColor,
          margin: props.Margin,
          lineHeight: "1.25em",
        }}
      >
        {props.text}
      </p>
    </div>
  );
};

export default Text;
