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

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const logoutBtn = () => {
    dispatch(logout());
    localStorage.removeItem("Tokens");
    toast.success(<h3>로그아웃 되었습니다.</h3>, {
      position: "top-center",
      autoClose: 2000,
    });
    navigate('/')

  };
  return (
    <div className="Header">
          <img className="hamburger_icon" src={hamburger_icon} alt="hamburger_icon" />
            <img className="x_icon" src={x_icon} alt="x_icon" />
      <div className="HeaderWrap">
        <div className="HeaderLeft">
          <a href="/">
            <img className="Logo" src={Logo} alt="Logo" />
        

          </a>
          
          <div className="Menu">
            {/* <Link to="/">홈</Link> */}
            {/* <Link to="/lawyers">변호사</Link> */}
            <Link to="/counsel/list">상담 사례</Link>
            <Link to="/counsel">상담 신청</Link>
            <Link to="/view">상담 조회</Link>
          </div>
        </div>
        {user.isLogined ? (
          <div className="LoginBtn" onClick={logoutBtn}>
            로그아웃
          </div>
        ) : (
          <Link className="LoginBtn" to="login">
            로그인
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
