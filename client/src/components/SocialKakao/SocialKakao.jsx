import KakaoLogin from "react-kakao-login";
import "./SocialKakao.css";
import { KakaoAuth } from "../../services/authService";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SocialKakao = () => {
  const kakaoClientId = "a60ee48260fdb8d3ccb0741463dace7f";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const kakaoOnSuccess = async (data) => {
    try {
      const response = await KakaoAuth(data);
      dispatch(
        login({
          isLogined: true,
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

  const kakaoOnFailure = (error) => {
    console.log(error);
  };

  return (
    <>
      <KakaoLogin
        className="KakaoLoginBtn"
        token={kakaoClientId}
        onSuccess={kakaoOnSuccess}
        onFail={kakaoOnFailure}
      />
    </>
  );
};

export default SocialKakao;
