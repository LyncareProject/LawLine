import { useEffect, useState } from "react";
import { getAuth } from "../../services/authService";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { toast } from "react-toastify";
import { createCounsel } from "../../services/counselService";
import { useNavigate } from "react-router-dom";
import { createAIComment } from "../../services/commentService";
import Button from "../../components/Button/Button";
import Text from "../../components/Text/Text";
import { findUser } from "../../services/userService";

const Counsel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [isLogined, setIsLogined] = useState(false);
  const [inputs, setInputs] = useState({
    userId: null,
    title: "",
    name: "",
    phone: "",
    password: "",
    desc: "",
  });

  const { userId, title, name, phone, password, desc } = inputs;

  const handleInputs = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const sendBtn = async () => {
    try {
      console.log(title, name, phone, password, userId, desc);
      const response = await createCounsel({
        title,
        name,
        phone,
        password,
        userId,
        desc,
      });

      if (response.data.message === "Success") {
        createAIComment({
          title,
          content: desc,
          counselId: response.data.newCounsel._id,
        });
        toast.success(<h3>상담 신청이 완료되었습니다.</h3>, {
          position: "top-center",
          autoClose: 2000,
        });
        navigate("/counsel/confirm", { state: desc });
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const Tokens = JSON.parse(localStorage.getItem("Tokens"));
        if (Tokens) {
          const auth = await getAuth();
          const userData = await findUser({ id: auth.id });
          setInputs(prevInputs => ({
            ...prevInputs,
            userId: userData.data._id,
            name: userData.data.username,
            phone: userData.data.phone,
          }));
          setIsLogined(true);
        }
      } catch (error) {
        dispatch(logout());
        localStorage.removeItem("Tokens");
      } finally {
        setLoading(false);
      }
    };
    verifyAuth();
  }, [dispatch, setInputs, setIsLogined, setLoading]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="Page">
      <div className="Wrap">
        <Text
          textAlign={"center"}
          fontSize={22}
          fontWeight={400}
          fontColor={"#000"}
          margin={"60px 0 15px 0"}
          text={"어려운 법률이야기\n혼자서 해결하기 힘드시죠?"}
        />
        <Text
          textAlign={"center"}
          fontSize={30}
          fontWeight={700}
          fontColor={"#000"}
          margin={"0 0 15px 0"}
          text={"전문가가 도와드리겠습니다"}
        />
        <div className="Block">
          <h2 className="Title">
            제목 <span className="Red">*</span>
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
            이름 <span className="Red">*</span>
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
            전화번호 <span className="Red">*</span>
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
        {!isLogined && (
          <div className="Block">
            <h2 className="Title">
              비밀번호 <span className="Gray">{"(숫자 4자리)"}</span>{" "}
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
        )}
        <div className="Block">
          <h2 className="Title">
            문의 내용 <span className="Red">*</span>
          </h2>
          <textarea
            className="TextArea"
            name="desc"
            value={desc}
            placeholder="시간 순서에 따라 구체적으로 설명해주세요."
            onChange={handleInputs}
          />
        </div>
        <Button
          buttonName={"접수하기"}
          buttonColor={"#00C126"}
          buttonTextColor={"#FFF"}
          buttonMargin={"10px 0"}
          pressButton={sendBtn}
        />
      </div>
    </div>
  );
};

export default Counsel;
