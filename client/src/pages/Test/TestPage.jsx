import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./TestPage.module.css";

function parseXMLToJSON(xmlString) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlString, "text/xml");
  const precElements = xml.getElementsByTagName("prec");

  const jsonData = Array.from(precElements).map((prec) => {
    const precData = {};

    precData.id = prec.getAttribute("id");
    precData.판례일련번호 =
      prec.getElementsByTagName("판례일련번호")[0]?.textContent;
    precData.사건명 = prec.getElementsByTagName("사건명")[0]?.textContent;
    precData.사건번호 = prec.getElementsByTagName("사건번호")[0]?.textContent;
    precData.선고일자 = prec.getElementsByTagName("선고일자")[0]?.textContent;
    precData.법원명 = prec.getElementsByTagName("법원명")[0]?.textContent;
    precData.사건종류명 =
      prec.getElementsByTagName("사건종류명")[0]?.textContent;
    precData.판결유형 = prec.getElementsByTagName("판결유형")[0]?.textContent;
    precData.선고 = prec.getElementsByTagName("선고")[0]?.textContent;
    precData.판례상세링크 =
      prec.getElementsByTagName("판례상세링크")[0]?.textContent;

    return precData;
  });

  return jsonData;
}

const TestPage = () => {
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);

  const searchBtn = async () => {
    const response = await axios.get(
      `http://www.law.go.kr/DRF/lawSearch.do?OC=test&target=prec&type=XML&search=2&query=${keyword}&display=100&org=400201`
    );
    const jsonData = parseXMLToJSON(response.data);
    setData(jsonData);
  };

  return (
    <div className={styles.TestPage}>
      <h1>TestPage</h1>
      <input
        type="text"
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      />
      <button onClick={searchBtn}>검색</button>
      <div>
        {data &&
          data.map((data, index) => (
            <div key={index}>
              <p>판례일련번호 : {data.판례일련번호}</p>
              <p>법원명 : {data.법원명}</p>
              <p>사건명 : {data.사건명}</p>
              <p>사건번호 : {data.사건번호}</p>
              <p>선고일자 : {data.선고일자}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TestPage;
