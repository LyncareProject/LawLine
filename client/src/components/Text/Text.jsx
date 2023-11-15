import "./Text.css";

const Text = (props) => {
  return (
    <div>
      <p
        style={{
          textAlign: props.textAlign,
          fontSize: props.fontSize,
          fontWeight: props.fontWeight,
          color: props.fontColor,
          margin: props.Margin,
          lineHeight: "1.5em",
          whiteSpace: "pre-wrap"
        }}
      >
        {props.text}
      </p>
    </div>
  );
};

export default Text;
