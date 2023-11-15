import "./MobileHeader.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import hamburger_icon from "../../components/images/hamburger_icon.png";
import x_icon from "../../components/images/x_icon.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { toast } from "react-toastify";

const MobileHeader = () => {
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
    navigate("/");
  };
  return (
    <div className="MobileHeader">
      <img className="Logo" src={Logo} alt="Logo" />
    </div>
  );
};

export default MobileHeader;
