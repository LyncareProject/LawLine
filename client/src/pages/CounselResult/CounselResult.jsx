import { useEffect } from "react";
import iconcall from "./../../components/images/iconcall.png";
import './CounselResult.css'
import { useLocation } from "react-router";

const CounselResult = () => {
  const { state } = useLocation();

  return (
    <div className="View_completed">
      <p className="Ball"></p>
      <h2>내 문의 조회하기</h2>
      <div></div>
      <div className=" Phone_number">
        <p>
          <img src={iconcall} alt="전화기아이콘" />
          전화번호
        </p>
        <input type="text" placeholder={state.phone} />
      </div>
      <div className="Inquiry_details">
        <h4>문의내용</h4>
        <textarea name="" id="" cols="30" rows="10" value={state.desc}></textarea>
      </div>
      <h5>문의 접수가 완료되었습니다</h5>
    </div>
  );
};
export default CounselResult;
