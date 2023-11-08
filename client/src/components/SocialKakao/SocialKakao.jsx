import KakaoLogin from "react-kakao-login";
import './SocialKakao.css'
// import { KakaoAuth } from "../../services/authService";
// import { useDispatch } from "react-redux";
// import { login } from "../../redux/userSlice";

const SocialKakao = () => {
  const kakaoClientId = "c4d68488f697be25db43792afc0c46f1";
  // const dispatch = useDispatch()
  const kakaoOnSuccess = async (data) => {
    try {
      // const response = await KakaoAuth(data)
      // if(response.message === 'Success'){
      //   console.log(response)
      //   dispatch(login({
      //     isLogined : true,
      //     email: response.email,
      //     username: response.username,
      //     profileImg : response.profileImg,
      //     role : response.role
      //   }))
      // }
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
