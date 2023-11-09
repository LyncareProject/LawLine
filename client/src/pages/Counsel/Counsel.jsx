import { useEffect, useState } from "react";
import { getAuth } from "../../services/authService";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { toast } from "react-toastify";
import { createCounsel } from "../../services/counselService";
import { useNavigate } from "react-router-dom";

const Counsel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    title: "",
    name: "",
    phone: "",
    password: "",
    desc: "",
  });

  const { title, name, phone, password, desc } = inputs;

  const handleInputs = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const sendBtn = async () => {
    try {
      const response = await createCounsel({
        title,
        name,
        phone,
        password,
        desc,
      });
      console.log(response)
      if (response.data.message === "Success") {
        toast.success(<h3>상담 신청이 완료되었습니다.</h3>, {
          position: "top-center",
          autoClose: 2000,
        });
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    try {
      const Tokens = JSON.parse(localStorage.getItem("Tokens"));
      if (Tokens) {
        const verifyAuth = async () => {
          await getAuth();
          const response = await getAuth();
          if (response.message === "No authorized! 다시 로그인해주세요.") {
            dispatch(logout());
            localStorage.removeItem("Tokens");
            return;
          }
        };
        verifyAuth();
      }
    } catch (error) {
      dispatch(logout());
      localStorage.removeItem("Tokens");
    }
  }, []);

  return (
    <div className="Page">
      <div className="Wrap">
        <div className="Block">
          <h2 className="Title">
            제목 <span className="Gray">{"(10자 이상)"}</span>
            <span className="Red">*</span>
          </h2>
          <input
            className="Input"
            name="title"
            value={title}
            type="text"
            placeholder="1개의 질문을 구체적으로 입력해주세요."
            onChange={handleInputs}
          />
        </div>
        <div className="Block">
          <h2 className="Title">
            이름
            <span className="Red">*</span>
          </h2>
          <input
            className="Input"
            name="name"
            value={name}
            type="text"
            placeholder="이름을 입력해주세요."
            onChange={handleInputs}
          />
        </div>
        <div className="Block">
          <h2 className="Title">
            전화번호
            <span className="Red">*</span>
          </h2>
          <input
            className="Input"
            type="text"
            name="phone"
            value={phone}
            placeholder="'-' 를 제외한 숫자를 입력해주세요"
            onChange={handleInputs}
          />
        </div>
        <div className="Block">
          <h2 className="Title">
            비밀번호 <span className="Gray">{"(숫자 4자리)"}</span>
            <span className="Red">*</span>
          </h2>
          <input
            className="Input"
            type="text"
            name="password"
            value={password}
            placeholder="비밀번호를 입력해주세요."
            onChange={handleInputs}
          />
        </div>
        <div className="Block">
          <h2 className="Title">
            내용 <span className="Gray">{"(200자 이상)"}</span>
            <span className="Red">*</span>
          </h2>
          <textarea
            className="TextArea"
            name="desc"
            value={desc}
            placeholder="시간 순서에 따라 구체적으로 설명해주세요."
            onChange={handleInputs}
          />
        </div>
        <button className="Button" onClick={sendBtn}>
          상담 신청
        </button>
      </div>
    </div>
  );
};

export default Counsel;
