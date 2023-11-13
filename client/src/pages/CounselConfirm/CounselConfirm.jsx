import "./CounselConfirm.css";
import iconcall from "./../../components/images/iconcall.png";
import iconkey from "./../../components/images/iconkey.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

const CounselConfirm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  return (
    <div className="Completed">
      <p className="Ball"></p>
      <p className="Check_b">
        <button
          onClick={() => {
            navigate("/counsel/search");
          }}
        >
          조회하기
        </button>
      </p>

      <div className="Inquiry_details">
        <h4>문의내용</h4>
        <textarea name="" id="" cols="30" rows="10" value={state.desc}></textarea>
      </div>
      <h5>문의 접수가 완료되었습니다</h5>
    </div>
  );
};
export default CounselConfirm;
