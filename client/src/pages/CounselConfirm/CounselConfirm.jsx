import "./CounselConfirm.css";
import iconcall from "./../../components/images/iconcall.png";
import iconkey from "./../../components/images/iconkey.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import Text from "../../components/Text/Text";
import ImmutableTextWrap from "../../components/ImmutableTextWrap/ImmutableTextWrap";
import Button from "../../components/Button/Button";

const CounselConfirm = () => {
  const { state } = useLocation();

  const navigate = useNavigate();
  return (
    <div className="Wrap">
      <Text
        text={"문의 접수가 완료되었습니다"}
        textAlign={"center"}
        fontSize={25}
        fontWeight={700}
        fontColor={"#00c126"}
        margin={"25px"}
      />
      <ImmutableTextWrap label={"문의내용"} value={state} margin={"25px 0"} />
      <Button
        buttonName={"조회하기"}
        buttonColor={"#00C126"}
        buttonTextColor={"#FFF"}
        buttonMargin={"10px 0"}
        pressButton={() => {
          navigate("/counsel/search");
        }}
      />
    </div>
  );
};
export default CounselConfirm;
