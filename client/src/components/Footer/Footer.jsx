import FooterLogo from '../../assets/images/FooterLogo.png'
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.head}>
          <a href="/provision">서비스 이용약관</a>
          <span>|</span>
          <a href="/privacy">개인정보처리방침안내</a>
        </div>
        <div className={styles.body}>
          <div className={styles.left}>
            <p>
              위바이브 주식회사는 법률상담 및 소송 수행의 주체가 아니며,
              이용자와 변호사간 법률상담 여부 및 내용, 수임여부, 비용 등에 일체
              관여하지 않습니다.
              <br />
              따라서, 변호사회원이 이용자에게 제공하는 서비스의 내용에 대하여
              어떠한 법적 책임도 부담하지 않습니다.
            </p>
            <p>CEO | 김종식, 김수은</p>
            <p>사업자번호 | 477-87-01651</p>
            <p>wevibeinc@gmail.com</p>
            <p>통신번호 | 제 2023-서울금천-1254 호</p>
            <p>
              주소 | 서울특별시 금천구 가산디지털2로 67, 9층 902호(가산동,
              에이스 하이엔드타워7)
            </p>
            <p>
              위바이브 주식회사는 법률상담의 주체가 아니므로, 법률상담은
              홈페이지의 상담 신청을 통해 진행해 주시기 바랍니다.
            </p>
          </div>
          <div className={styles.right}>
            <img src={FooterLogo} alt="FooterLogo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
