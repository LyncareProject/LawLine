import { useState } from "react";
import "./Login.css";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SocialKakao from "../../components/SocialKakao/SocialKakao";
import { toast } from "react-toastify";
import { signIn } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAutoLogin, setisAutoLogin] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  const sendBtn = async () => {
    try {
      const response = await signIn({ email, password, isAutoLogin });
      dispatch(
        login({
          isLogined: true,
          isAutoLogin,
          email: response.email,
          username: response.username,
          profileImg: response.profileImg,
          signUpPath: response.signUpPath,
          roles: response.roles,
        })
      );
      toast.success(<h3>{response.username}님 반갑습니다</h3>, {
        position: "top-center",
        autoClose: 2000,
      });
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };
  return (
    <>
      <form>
        <div className="LoginInput">
          <label htmlFor="email">이메일</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="아이디를 입력해주세요."
            value={email}
            onChange={(e) => {
              setInputs({
                ...inputs,
                [e.target.name]: e.target.value,
              });
            }}
          />
        </div>
        <div className="LoginInput">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            autoComplete="off"
            onChange={(e) => {
              setInputs({
                ...inputs,
                [e.target.name]: e.target.value,
              });
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                return sendBtn();
              }
            }}
          />
        </div>
      </form>
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
        <Link  className="FindBtn" to="/findpassword">
          비밀번호 찾기
        </Link>
      </div>
      <button className="FetchBtn" onClick={sendBtn}>
        로그인
      </button>
      <div className="Or">
        <p>또는</p>
      </div>
      <SocialKakao />
      <div className="CheckFindWrap MT-30">
        <p className="RegistWord">아직 로라인 회원이 아니신가요?</p>
        <a className="RegistBtn" href="/regist">
          회원가입
        </a>
      </div>
    </>
  );
};

const LawyerLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAutoLogin, setisAutoLogin] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  const sendBtn = async () => {
    try {
      const response = await signIn({ email, password, isAutoLogin });
      if (response.roles === "654c5c890907ba343cdcf2ee") {
        dispatch(
          login({
            isLogined: true,
            isAutoLogin,
            email: response.email,
            username: response.username,
            profileImg: response.profileImg,
            roles: response.roles,
          })
        );
        toast.success(<h3>{response.username} 변호사님 반갑습니다</h3>, {
          position: "top-center",
          autoClose: 2000,
        });
        navigate("/");
      } else {
        toast.error(
          <h3>변호사 회원이 아니거나, 아직 승인 대기 중에 있습니다.</h3>,
          {
            position: "top-center",
            autoClose: 2000,
          }
        );
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };
  return (
    <>
      <div className="LoginInput">
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="아이디를 입력해주세요."
          value={email}
          onChange={(e) => {
            setInputs({
              ...inputs,
              [e.target.name]: e.target.value,
            });
          }}
        />
      </div>
      <div className="LoginInput">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          autoComplete="off"
          onChange={(e) => {
            setInputs({
              ...inputs,
              [e.target.name]: e.target.value,
            });
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              return sendBtn();
            }
          }}
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
      <button className="FetchBtn" onClick={sendBtn}>
        로그인
      </button>
      <div className="CheckFindWrap MT-30">
        <p className="RegistWord">변호사님 아직 가입 안하셨나요?</p>
        <a className="RegistBtn" href="/regist/lawyer">
          변호사 회원 가입
        </a>
      </div>
    </>
  );
};

export default Login;
