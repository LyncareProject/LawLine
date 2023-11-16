import Text from "../Text/Text";
import './ImmutableTextWrap.css'

const ImmutableTextWrap = (props) => {
  return (
    <div className="InputWrap" style={{ margin: props.margin }}>
      <label htmlFor={props.id}>
        <Text
          textAlign={"left"}
          fontSize={20}
          fontWeight={400}
          fontColor={"#2b2d2f"}
          margin={"10px 0"}
          text={props.label}
        />
      </label>
      <div className="ImmutableTextArea">{props.value}</div>
    </div>
  );
};

export default ImmutableTextWrap;