import Text from "../Text/Text";
import "./TextAreaWrap.css";

const TextAreaWrap = (props) => {
  return (
    <div className="InputWrap" style={{ margin: props.margin }}>
      <label htmlFor={props.id}>
        <Text
          textAlign={"left"}
          fontSize={20}
          fontWeight={400}
          fontColor={"#2b2d2f"}
          Margin={"10px 0"}
          text={props.label}
        />
      </label>
      <textarea
        rows={1}
        className="ComponentTextArea"
        id={props.id}
        type={props.type || "text"}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.handleChange}
        maxLength={props.maxLength}
        onKeyUp={props.onKeyUp}
      />
    </div>
  );
};

export default TextAreaWrap;
