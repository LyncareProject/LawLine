import "./Header.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import hamburger_icon from "../../components/images/hamburger_icon.png";
import x_icon from "../../components/images/x_icon.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { toast } from "react-toastify";
import NoUser from "../../assets/images/NoUser.png";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [userControl, setUserControl] = useState(false);
  const logoutBtn = () => {
    dispatch(logout());
    setUserControl(false);
    localStorage.removeItem("Tokens");
    toast.success(<h3>로그아웃 되었습니다.</h3>, {
      position: "top-center",
      autoClose: 2000,
    });
    navigate("/");
  };

  return (
    <div className="Header">
      <img
        className="hamburger_icon"
        src={hamburger_icon}
        alt="hamburger_icon"
      />
      <img className="x_icon" src={x_icon} alt="x_icon" />
      <div className="HeaderWrap">
        <div className="HeaderLeft">
          <a href="/">
            <img className="Logo" src={Logo} alt="Logo" />
          </a>

          <div className="Menu">
            <Link to="/counsel/list">상담 사례</Link>
            <Link to="/counsel">상담 신청</Link>
            <Link to={!user.isLogined ? "/counsel/search" : "/mypage/counsel"}>
              상담 조회
            </Link>
          </div>
        </div>
        <div className="RightNav">
          {user.isLogined ? (
            <div
              className="ProfileImg"
              onClick={() => {
                setUserControl(!userControl);
              }}
            >
              <img src={user.profileImg || NoUser} alt="profileImg" />
            </div>
          ) : (
            <Link className="LoginBtn" to="login">
              로그인
            </Link>
          )}
          {userControl && (
            <UserControl
              userName={user.username}
              userPhone={user.phone}
              logoutBtn={logoutBtn}
              setUserControl={setUserControl}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const UserControl = (props) => {
  return (
    <div className="UserControl">
      <div className="UserControlHead">
        <p>{props.userName} 님</p>
      </div>
      <Link
        className="UserControlMenu"
        to={"/mypage/counsel"}
        onClick={() => {
          props.setUserControl(false);
        }}
      >
        상담 내역
      </Link>
      <Link
        className="UserControlMenu"
        to="/mypage"
        onClick={() => {
          props.setUserControl(false);
        }}
      >
        마이페이지
      </Link>
      <div className="UserControlMenu" onClick={props.logoutBtn}>
        로그아웃
      </div>
    </div>
  );
};
export default Header;
