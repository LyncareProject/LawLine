import Text from "../Text/Text";
import "./InputWrap.css";
import IconKey from "../../assets/images/IconKey.png";
import IconPhone from "../../assets/images/IconPhone.png";

const InputWrap = (props) => {
  const handleIcon = () => {
    if (props.icon === "IconKey") {
      return IconKey;
    }
    if (props.icon === "IconPhone") {
      return IconPhone;
    }
  };
  return (
    <div className="InputWrap" style={{ margin : props.margin}}>
      <label htmlFor={props.id}>
        {props.icon && <img src={handleIcon()} alt="Icon" />}
        <Text
          textAlign={"left"}
          fontSize={20}
          fontWeight={400}
          fontColor={"#2b2d2f"}
          margin={"20px 0"}
          text={props.label}
        />
      </label>
      <input
        id={props.id}
        type={props.type || "text"}
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
