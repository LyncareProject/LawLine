import { useEffect } from "react";
import iconcall from "./../../components/images/iconcall.png";
import "./CounselResult.css";
import { useLocation } from "react-router";
import Title from "../../components/Title/Title";
import TextAreaWrap from "../../components/TextAreaWrap/TextAreaWrap";
import Text from "../../components/Text/Text";
import ImmutableTextWrap from "../../components/ImmutableTextWrap/ImmutableTextWrap";

const CounselResult = () => {
  const { state } = useLocation();

  return (
    <div className="Wrap">
      <Title title={"내 문의 조회하기"} margin={"50px 0"} />

      <div className=" Phone_number">
        <p>
          <img src={iconcall} alt="전화기아이콘" />
          전화번호
        </p>
        <input type="text" placeholder={state.phone} />
      </div>
      <ImmutableTextWrap
        label={"문의내용"}
        value={state.desc}
        margin={"25px 0"}
      />
      <Text
        text={"문의 접수가 완료되었습니다"}
        textAlign={"center"}
        fontSize={25}
        fontWeight={700}
        fontColor={"#00c126"}
        margin={"25px"}
      />
    </div>
  );
};
export default CounselResult;
