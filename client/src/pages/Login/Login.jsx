import { useState } from "react";
import "./Login.css";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SocialKakao from "../../components/SocialKakao/SocialKakao";

const Login = () => {
  const [category, setCategory] = useState("User");
  return (
    <div className="Login">
      <div className="CategoryWrap">
        <div
          className={category === "User" ? "CategoryActive" : "Category"}
          onClick={() => {
            setCategory("User");
          }}
        >
          로그인
        </div>
        <div
          className={category === "Lawyer" ? "CategoryActive" : "Category"}
          onClick={() => {
            setCategory("Lawyer");
          }}
        >
          변호사로 로그인
        </div>
      </div>
      {category === "User" ? <UserLogin /> : <LawyerLogin />}
    </div>
  );
};

const UserLogin = () => {
  const [isAutoLogin, setisAutoLogin] = useState(false);
  return (
    <>
      <div className="LoginInput">
        <label htmlFor="id">아이디</label>
        <input
          type="text"
          name="id"
          id="id"
          placeholder="아이디를 입력해주세요."
        />
      </div>
      <div className="LoginInput">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="비밀번호를 입력해주세요."
        />
      </div>
      <div className="CheckFindWrap">
        <div
          className="CheckWrap"
          onClick={() => {
            setisAutoLogin(!isAutoLogin);
          }}
        >
          <FontAwesomeIcon
            className={isAutoLogin ? "CheckIconActive" : "CheckIcon"}
            icon={faCheck}
          />
          <p className={isAutoLogin ? "CheckLabelActive" : "CheckLabel"}>
            로그인 상태 유지
          </p>
        </div>
        <a className="FindBtn" href="/">
          아이디/비밀번호 찾기
        </a>
      </div>
      <button className="FetchBtn">로그인</button>
      <div className="Or">
        <p>또는</p>
      </div>
      <SocialKakao />
      <div className="CheckFindWrap MT-30">
        <p className="RegistWord">아직 로라인 회원이 아니신가요?</p>
        <a className="RegistBtn" href="/">
          회원가입
        </a>
      </div>
    </>
  );
};

const LawyerLogin = () => {
  const [isAutoLogin, setisAutoLogin] = useState(false);
  return (
    <>
      <div className="LoginInput">
        <label htmlFor="id">아이디</label>
        <input
          type="text"
          name="id"
          id="id"
          placeholder="아이디를 입력해주세요."
        />
      </div>
      <div className="LoginInput">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="비밀번호를 입력해주세요."
        />
      </div>
      <div className="CheckFindWrap">
        <div
          className="CheckWrap"
          onClick={() => {
            setisAutoLogin(!isAutoLogin);
          }}
        >
          <FontAwesomeIcon
            className={isAutoLogin ? "CheckIconActive" : "CheckIcon"}
            icon={faCheck}
          />
          <p className={isAutoLogin ? "CheckLabelActive" : "CheckLabel"}>
            로그인 상태 유지
          </p>
        </div>
        <a className="FindBtn" href="/">
          아이디/비밀번호 찾기
        </a>
      </div>
      <button className="FetchBtn">로그인</button>
      <div className="CheckFindWrap MT-30">
        <p className="RegistWord">변호사님 아직 가입 안하셨나요?</p>
        <a className="RegistBtn" href="/">
          변호사 회원 가입
        </a>
      </div>
    </>
  );
};

export default Login;
