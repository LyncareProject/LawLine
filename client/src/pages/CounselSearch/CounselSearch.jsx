import "./CounselSearch.css";
import iconcall from "./../../components/images/iconcall.png";
import iconkey from "./../../components/images/iconkey.png";
import { useState } from "react";
import { searchCounsel } from "../../services/counselService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CounselSearch = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const searchBtn = async () => {
    try {
      const data = await searchCounsel({ phone, password });
      // toast.success(<h3>{data.username}님 반갑습니다</h3>, {
      //   position: "top-center",
      //   autoClose: 2000,
      // });
      navigate("/counsel/result", { state: data.data });
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };
  return (
    <div className="View">
      <p className="Ball"></p>
      <h2>내 문의 조회하기</h2>
      <div></div>
      <div className=" Phone_number">
        <p>
          <img src={iconcall} alt="전화기아이콘" />
          전화번호
        </p>
        <input
          type="text"
          placeholder="전화번호를 입력해주세요."
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <hr />
      </div>
      <div className=" Passwor">
        <p>
          <img src={iconkey} alt="비밀번호" />
          비밀번호
        </p>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <hr />
      </div>

      <p className="Check_b">
        <button onClick={searchBtn}>조회하기</button>
      </p>
    </div>
  );
};
export default CounselSearch;
