import styles from "./Privacy.module.css";

const Privacy = () => {
  return (
    <div className={styles.Privacy}>
      <h2 className={styles.Title}>개인정보처리방침</h2>
      <h3 className={styles.SubTitle}>
        위바이브(주){"< 로라인 >"}{"('https://lawline.co.kr/'이하 '로라인')"}은{"(는)"}
        「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와
        관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이
        개인정보 처리방침을 수립·공개합니다.
      </h3>
      <p className={styles.Desc}>
        본 약관은 위바이브 주식회사{"(이하 “회사”라 합니다)"}가 제공하는 LawLine
        서비스{"(이하 “LawLine”이라 합니다)"}의 이용과 관련하여 회사와 회원의 권리,
        의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
      </p>
    </div>
  );
};

export default Privacy;
