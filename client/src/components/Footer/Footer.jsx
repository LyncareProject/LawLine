import FooterLogo from "../../assets/images/FooterLogo.png";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.wrap}>
        <div className={styles.head}>
          <a href="/provison">서비스 이용약관</a>
          <span>|</span>
          <a href="/privacy">개인정보처리방침안내</a>
        </div>
        <div className={styles.body}>
          <div className={styles.left}>
            <p>
              본 웹사이트는 일반적인 정보 제공의 목적으로 제작된 것으로 법률적
              자문이나 해석을 위하여 제공되는 것이 아닙니다. 본 웹사이트에서
              취득한 정보로 인해 문제가 발생하여 직·간접적인 손해를 입었다
              하더라도 위바이브(주)는 어떠한 법적 책임을 지지 않습니다. 본
              웹사이트에서 취득한 정보를 바탕으로 하여 어떠한 조치를 취하시기에
              앞서 반드시 법률전문가와 충분한 상담을 진행하시기 바랍니다.
              <br />
              모든 법률상담은 로라인에 가입한 변호사 회원이 직접 진행합니다.
              로라인에 표시된 변호사 회원의 정보는 해당 변호사 회원이 직접
              제공한 것이며, 모든 변호사 회원은 소속 법률사무소에서 독립적으로
              업무를 수행합니다.
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
              로라인의 상담 신청을 통해 진행해 주시기 바랍니다.
            </p>
            <p>(C) wevibe Inc. All Rights Reserved</p>
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
