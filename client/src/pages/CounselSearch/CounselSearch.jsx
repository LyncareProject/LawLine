import { useState } from "react";
import { searchCounsel } from "../../services/counselService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Title from "../../components/Title/Title";
import InputWrap from "../../components/InputWrap/InputWrap";
import Button from "../../components/Button/Button";

const CounselSearch = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const searchBtn = async () => {
    try {
      const data = await searchCounsel({ phone, password });
      navigate("/counsel/result", { state: data.data });
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };
  return (
    <div className="Wrap">
      <Title title={"내 문의 조회하기"} margin={"50px 0"} />
      <InputWrap
        icon={"IconPhone"}
        id={"phone"}
        label={"전화번호"}
        value={phone}
        placeholder={"전화번호를 입력해주세요."}
        onChange={(e) => {
          setPhone(e.target.value);
        }}
        margin={"30px 0"}
        maxLength={11}
      />
      <InputWrap
        icon={"IconKey"}
        id={"password"}
        type={"password"}
        label={"비밀번호"}
        value={password}
        placeholder={"비밀번호를 입력해주세요."}
        margin={"30px 0"}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        maxLength={4}
      />
      <Button
        pressButton={searchBtn}
        buttonColor={"#00c126"}
        buttonTextColor={"#FFF"}
        buttonMargin={"30px 0"}
        buttonName={"조회하기"}
      />
    </div>
  );
};
export default CounselSearch;
