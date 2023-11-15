import Text from "../Text/Text";
import "./InputWrap.css";
import IconKey from "../../assets/images/IconKey.png";

const InputWrap = (props) => {
  return (
    <div className="InputWrap">
      <label htmlFor={props.id}>
        <img src={IconKey} alt="Icon" />
        <Text
          textAlign={"left"}
          fontSize={20}
          fontWeight={400}
          fontColor={"#2b2d2f"}
          Margin={"10px 0"}
          text={props.label}
        />
      </label>
      <input
        id={props.id}
        type="text"
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        maxLength={props.maxLength}
        onKeyUp={props.onKeyUp}
      />
    </div>
  );
};

export default InputWrap;
