import { useState } from "react";
import { searchCounsel } from "../../services/counselService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Title from "../../components/Title/Title";
import InputWrap from "../../components/InputWrap/InputWrap";
import Button from "../../components/Button/Button";
import Layout from "../../components/Layout/Layout";

const CounselSearch = () => {
  const [phone, setPhone] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const searchBtn = async () => {
    try {
      // const data = await searchCounsel({ phone, password });
      // navigate("/counsel/result", { state: data.data });
      navigate(`/counsel/list?phone=${phone}`);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };
  return (
    <Layout>
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
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            return searchBtn();
          }
        }}
        margin={"30px 0"}
        maxLength={11}
      />
      <Button
        pressButton={searchBtn}
        buttonColor={"#00c126"}
        buttonTextColor={"#FFF"}
        buttonMargin={"30px 0"}
        buttonName={"조회하기"}
      />
    </Layout>
  );
};
export default CounselSearch;
