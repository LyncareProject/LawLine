import "./MobileHeader.css";
import Logo from "../../assets/images/Logo.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { toast } from "react-toastify";
import IconComponent from "../IconComponent/IconComponent";
import { useState } from "react";
import Text from "../Text/Text";

const MobileHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [sidebar, setSidebar] = useState(false);

  const user = useSelector((state) => state.user.value);
  const logoutBtn = () => {
    dispatch(logout());
    localStorage.removeItem("Tokens");
    toast.success(<h3>로그아웃 되었습니다.</h3>, {
      position: "top-center",
      autoClose: 2000,
    });
    navigate("/");
  };
  return (
    <>
      <div className="MobileHeader">
        <IconComponent
          icon={"iconHamburger"}
          onClick={() => {
            setSidebar(!sidebar);
          }}
        />
        <a href="/">
          <img className="Logo" src={Logo} alt="Logo" />
        </a>
        {!user.isLogined ? (
          <IconComponent
            icon={"iconLogin"}
            width={"25px"}
            onClick={() => {
              navigate("/login");
            }}
          />
        ) : (
          <IconComponent
            icon={"iconLogout"}
            width={"25px"}
            onClick={logoutBtn}
          />
        )}
      </div>
      <Sidebar marginTop={sidebar ? "0" : "-300px"} />
    </>
  );
};

const Sidebar = (props) => {
  return (
    <div className="Sidebar" style={{ marginTop: props.marginTop }}>
      <a href="/">
        <Text
          textAlign={"center"}
          fontSize={"20px"}
          fontWeight={700}
          fontColor={"#191919"}
          margin={"10px 0"}
          text={"홈"}
        />
      </a>
      <a href="/counsel/list">
        <Text
          textAlign={"center"}
          fontSize={"20px"}
          fontWeight={700}
          fontColor={"#191919"}
          margin={"10px 0"}
          text={"상담 사례"}
        />
      </a>
      <a href="/counsel">
        <Text
          textAlign={"center"}
          fontSize={"20px"}
          fontWeight={700}
          fontColor={"#191919"}
          margin={"10px 0"}
          text={"상담 신청"}
        />
      </a>
      <a href="/counsel/search">
        <Text
          textAlign={"center"}
          fontSize={"20px"}
          fontWeight={700}
          fontColor={"#191919"}
          margin={"10px 0"}
          text={"상담 조회"}
        />
      </a>
    </div>
  );
};

export default MobileHeader;
