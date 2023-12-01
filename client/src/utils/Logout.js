import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { KakaoLogout } from "../services/authService";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const performLogout = async (signUpPath) => {
    dispatch(logout());
    localStorage.removeItem("Tokens");

    if (signUpPath === "Kakao") {
      const kakaoClientId = "a60ee48260fdb8d3ccb0741463dace7f";
      const YOUR_LOGOUT_REDIRECT_URI = "https://lawline.co.kr/auth/kakao/logout"
      await axios.get(`https://kauth.kakao.com/oauth/logout?client_id=${kakaoClientId}&logout_redirect_uri=${YOUR_LOGOUT_REDIRECT_URI}`)
    }

    navigate("/");
  };

  return performLogout;
};

export default useLogout;