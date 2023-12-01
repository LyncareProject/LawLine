import { useState } from "react";
import styles from "./FindPassword.module.css";
import { toast } from "react-toastify";
import { verifyAuthNumber, verityMail } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const FindPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [authInput, setAuthInput] = useState(false);
  const [authNumber, setAuthNumber] = useState("");

  const sendAuthNumber = async () => {
    try{
      setAuthInput(true);
      toast.success(<h3>인증번호가 발송되었습니다.</h3>, {
        position: "top-center",
        autoClose: 2000,
      });
      await verityMail({ email });
    } catch(error){
      toast.error(error.response.data, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const confirmAuthNumber = async () => {
    try{
      const response = await verifyAuthNumber({ email, code: authNumber });
      toast.success(<h3>{response.message}</h3>, {
        position: "top-center",
        autoClose: 2000,
      });
      navigate('/mypage/password', {state : response._id})
    } catch(error){
      toast.error(error.response.data, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };
  return (
    <div className={styles.FindPassword}>
      <label className={styles.label} htmlFor="email">
        이메일
      </label>
      <div className={styles.inputWrap}>
        <input
          type="text"
          placeholder="이메일을 입력해주세요"
          value={email}
          className={styles.input}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {!authInput && (
          <button
            className={styles.button}
            onClick={sendAuthNumber}
            disabled={authInput && true}
          >
            인증번호 발송
          </button>
        )}
      </div>
      {authInput && (
        <div className={styles.inputWrap}>
          <input
            type="text"
            placeholder="인증번호 6자리를 입력해주세요."
            value={authNumber}
            className={styles.input}
            onChange={(e) => {
              setAuthNumber(e.target.value);
            }}
          />
          <button className={styles.button} onClick={confirmAuthNumber}>
            인증번호 확인
          </button>
        </div>
      )}
    </div>
  );
};
export default FindPassword;
