import { useSelector } from "react-redux";
import styles from "./Main.module.css";
import MainBannerImg from "../../assets/images/MainBannerImg.png";
import AiComment from "../../assets/images/AiComment.png";
import KOMember from "../../assets/images/KO_Member.png";
import Text from "../../components/Text/Text";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";

const Main = () => {
  // const isLogined = useSelector((state) => state.user.value.isLogined);
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.MainBanner}>
        <Text
          textAlign={"center"}
          fontSize={"22px"}
          fontWeight={"700"}
          fontColor={"0c0b35"}
          margin={"0 0 27px 0"}
          text={"어려운 법률이야기\n혼자서 해결하기 힘드시죠?"}
        />
        <Text
          textAlign={"center"}
          fontSize={"30px"}
          fontWeight={"800"}
          fontColor={"0c0b35"}
          margin={"0 0 20px 0"}
          text={"전문가가 도와드리겠습니다"}
        />
        <img src={MainBannerImg} alt="MainBannerImg" />
      </div>
      <div className={styles.Section01}>
        <div className={styles.Wrap}>
          <Button
            pressButton={() => {
              navigate("/counsel");
            }}
            buttonColor={"#000"}
            buttonTextColor={"#FFF"}
            buttonMargin={"0"}
            buttonName={"상담하기"}
          />
          <Link to={"/lawbot/chat"}>
            <img className={styles.AiComment} src={AiComment} alt="AiComment" />
          </Link>
        </div>
      </div>
      <div className={styles.Section02}>
        <div className={styles.Wrap}>
          <img className={styles.KOMember} src={KOMember} alt="AiComment" />
          <Text
            textAlign={"center"}
            fontSize={"34px"}
            fontWeight={"800"}
            fontColor={"#00C126"}
            margin={"27px 0 0 0"}
            text={"안녕하세요"}
          />
          <Text
            textAlign={"center"}
            fontSize={"34px"}
            fontWeight={"800"}
            fontColor={"1B1B1B"}
            margin={"0 0 28px 0"}
            text={"변호사 임영준입니다"}
          />
          <ul className={styles.Profile}>
            <li>변호사 약력</li>
            <li>
              현{")"}법무법인 정곡 <span>서울사무소 대표변호사</span>
            </li>
            <li>
              제 2017-168호 <span>이혼상속 등 전문분야 등록</span>
            </li>
            <li>
              현{")"}서울 양천구청 <span>법률고문 위촉</span>
            </li>
            <li>
              현{")"}서울특별시 <span>공익변호사단</span>
            </li>
            <li>
              현{")"}공정거래위원회 <span>가맹거래사</span>
            </li>
            <li>
              현{")"}충청북도 <span>마을변호사</span>
            </li>
            <li>
              전{")"}대법원 <span>국선변호인</span>
            </li>
            <li>
              전{")"}서울남부지방법원 <span>소송구조 지정변호사</span>
            </li>
            <li>
              전{")"}서울남부지방법원 <span>논스톱 국선 변호인</span>
            </li>
            <li>
              전{")"}대한가정법률복지상담원 <span>인천지부 법무이사</span>
            </li>
            <li>
              전{")"}인천지방법원 <span>국선변호인(성폭력 전담부)</span>
            </li>
            <li>
              전{")"}서울창업진흥원 <span>청년창업지원센터 법률자문위원</span>
            </li>
            <li>
              전{")"}온라인유통센터 <span>법률자문위원</span>
            </li>
            <li>
              전{")"}중앙해양심판원<span>해양사고조사심판변론인</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Main;
