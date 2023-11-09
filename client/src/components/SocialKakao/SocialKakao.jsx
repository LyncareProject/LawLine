import KakaoLogin from "react-kakao-login";
import './SocialKakao.css'
import { KakaoAuth } from "../../services/authService";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
// import { login } from "../../redux/userSlice";

const SocialKakao = () => {
  const kakaoClientId = "1f0d197bc959c71086816a4efe5e1e0c";
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const kakaoOnSuccess = async (data) => {
    try {
      const response = await KakaoAuth(data)
      if(response.message === 'Success'){
        dispatch(login({
          isLogined : true,
          email: response.email,
          username: response.username,
          profileImg : response.profileImg,
          role : response.role
        }))
      }
      navigate('/')
    } catch (error) {
      console.log(error);
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
