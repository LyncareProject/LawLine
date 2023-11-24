import { useEffect, useState } from "react";
import { getAuth } from "../../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NoUser from "../../assets/images/NoUser.png";
import { useDispatch } from "react-redux";
import { deleteUser, findUser, updateUser } from "../../services/userService";
import styles from "./MyPage.module.css";
import { logout } from "../../redux/userSlice";
import Button from "../../components/Button/Button";

const MyPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [phone, setPhone] = useState("");
  const [phoneChange, setPhoneChange] = useState(false);
  const dispatch = useDispatch();
  console.log(userInfo);
  useEffect(() => {
    const varityAuth = async () => {
      try {
        const auth = await getAuth();
        const userData = await findUser({ id: auth.id });
        setUserInfo(userData.data);
      } catch (error) {
        toast.error(<h1>로그인이 필요한 서비스입니다.</h1>, {
          position: "top-center",
          autoClose: 2000,
        });
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    varityAuth();
  }, [navigate]);

  const changePhoneBtn = (item) => {
    setPhoneChange(true);
    setPhone(item);
  };

  const deleteUserBtn = async () => {
    if (
      window.confirm(
        "회원 탈퇴를 하시겠습니까? 모든 상담 내역 및 회원 정보가 삭제됩니다."
      )
    ) {
      await deleteUser({ id: userInfo._id })
        .then(() => {
          toast.success(<h3>회원탈퇴가 완료되었습니다.</h3>, {
            position: "top-center",
            autoClose: 2000,
          });
          dispatch(logout());
          localStorage.removeItem("Tokens");
          navigate("/");
        })
        .catch((error) => {
          toast.error(<h3>회원 탈퇴 요청에 실패했습니다.</h3>, {
            position: "top-center",
            autoClose: 2000,
          });
        });
    } else {
    }
  };

  const handleInputChange = (e) => {
    const onlyNumber = e.target.value.replace(/[^0-9]/g, "");
    setPhone(onlyNumber);
  };

  const updatePhoneBtn = async () => {
    try {
      const response = await updateUser({ id: userInfo._id, phone });
      setUserInfo(response.data.user);
      toast.success(<h3>전화번호 수정이 완료되었습니다.</h3>, {
        position: "top-center",
        autoClose: 2000,
      });
      setPhoneChange(false);
    } catch (error) {
      toast.error(<h3>전화번호 수정을 실패했습니다.</h3>, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };
  const logoutBtn = () => {
    dispatch(logout());
    localStorage.removeItem("Tokens");
    toast.success(<h3>로그아웃 되었습니다.</h3>, {
      position: "top-center",
      autoClose: 2000,
    });
    navigate("/");
  };
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={styles.Page}>
      <div className={styles.Wrap}>
        <div className={styles.Head}>
          <img src={userInfo.profileImg || NoUser} alt="" />
          <p>{userInfo.username} 님 계정 정보</p>
        </div>
        <div className={styles.Info}>
          <p className={styles.Title}>정보</p>
          <div>
            <p>이메일</p>
            <p>{userInfo.email}</p>
          </div>
          <div>
            <p>휴대전화번호</p>
            {userInfo.phone && userInfo.phone.length === 11 && !phoneChange && (
              <div className={styles.PhoneWrap}>
                <p>
                  {userInfo.phone.slice(0, 3)}-{userInfo.phone.slice(3, 7)}-
                  {userInfo.phone.slice(7, 11)}
                </p>
                <button
                  onClick={() => {
                    changePhoneBtn(userInfo.phone);
                  }}
                >
                  수정
                </button>
              </div>
            )}

            {(!userInfo.phone ||
              userInfo.phone.length !== 11 ||
              phoneChange) && (
              <div className={styles.Input}>
                <input
                  type="text"
                  placeholder="숫자만 입력해주세요."
                  onChange={handleInputChange}
                  value={phone}
                  maxLength={11}
                />
                <button onClick={updatePhoneBtn}>수정</button>
              </div>
            )}
          </div>
          <div>
            <p>서비스 가입일</p>
            <p>{userInfo.createdAt}</p>
          </div>
        </div>
        <div className={styles.Service}>
          <p className={styles.Title}>서비스</p>
          <div
            onClick={() => {
              navigate("/mypage/counsel");
            }}
          >
            <p>내 상담</p>
            <p>{">"}</p>
          </div>
          <div
            onClick={() => {
              navigate("/mypage/password", { state: userInfo._id });
            }}
          >
            <p>비밀번호 변경</p>
            <p>{">"}</p>
          </div>
          <div onClick={deleteUserBtn}>
            <p>회원 탈퇴</p>
            <p>{">"}</p>
          </div>
          <button className={styles.LogoutBtn} onClick={logoutBtn}>로그아웃</button>
        </div>
      </div>
    </div>
  );
};
export default MyPage;
