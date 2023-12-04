import "./MobileHeader.css";
import Logo from "../../assets/images/Logo.png";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { toast } from "react-toastify";
import IconComponent from "../IconComponent/IconComponent";
import { useState } from "react";
import Text from "../Text/Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronUp,
  faRightFromBracket,
  faRightToBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import NoUser from "../../assets/images/NoUser.png";

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
        <FontAwesomeIcon
          className="Icon"
          icon={faBars}
          onClick={() => {
            setSidebar(!sidebar);
          }}
        />
        {!user.isLogined ? (
          <p
            style={{ fontSize: "18px", fontWeight: "800" }}
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </p>
        ) : (
          <Link to='/mypage' className="ProfileImg">
            <img src={user.profileImg || NoUser} alt="profileImg" />
          </Link>
        )}
      </div>
      <Sidebar marginTop={sidebar ? "0" : "-300px"} setSidebar={setSidebar} />
    </>
  );
};

const Sidebar = (props) => {
  return (
    <div className="Sidebar" style={{ marginTop: props.marginTop }}>
      <Link
        to="/"
        onClick={() => {
          props.setSidebar(false);
        }}
      >
        <Text
          textAlign={"center"}
          fontSize={"20px"}
          fontWeight={700}
          fontColor={"#191919"}
          margin={"10px 0"}
          text={"홈"}
        />
      </Link>
      <Link
        to="/counsel/list"
        onClick={() => {
          props.setSidebar(false);
        }}
      >
        <Text
          textAlign={"center"}
          fontSize={"20px"}
          fontWeight={700}
          fontColor={"#191919"}
          margin={"10px 0"}
          text={"상담 사례"}
        />
      </Link>
      <Link
        to="/counsel"
        onClick={() => {
          props.setSidebar(false);
        }}
      >
        <Text
          textAlign={"center"}
          fontSize={"20px"}
          fontWeight={700}
          fontColor={"#191919"}
          margin={"10px 0"}
          text={"상담 신청"}
        />
      </Link>
      <Link
        to="/counsel/search"
        onClick={() => {
          props.setSidebar(false);
        }}
      >
        <Text
          textAlign={"center"}
          fontSize={"20px"}
          fontWeight={700}
          fontColor={"#191919"}
          margin={"10px 0"}
          text={"상담 조회"}
        />
      </Link>
      <FontAwesomeIcon
        onClick={() => {
          props.setSidebar(false);
        }}
        icon={faChevronUp}
      />
    </div>
  );
};

export default MobileHeader;
