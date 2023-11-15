import { useEffect, useState } from "react";
import { findAllCounsel } from "../../services/counselService";
import Text from "../../components/Text/Text";
import "./CounselList.css";
import IconAI from "../../assets/images/IconAI.png";
import IconLawyer from "../../assets/images/IconLawyer.png";

const CounselList = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    try {
      setLoading(true);
      const fetchData = async () => {
        const response = await findAllCounsel();
        setData(response.data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <div className="Wrap">
      <div className="CounselHead">
        <Text
          textAlign={"left"}
          fontSize={25}
          fontWeight={600}
          fontColor={"#000"}
          Margin={"35px 0"}
          text={"상담사례"}
        />
        <Text
          textAlign={"left"}
          fontSize={25}
          fontWeight={600}
          fontColor={"#000"}
          Margin={"35px 0"}
          text={data && `총 ${data.length}건`}
        />
      </div>
      <div className="CounselTable">
        {!loading &&
          data.map((action, index) => (
            <div className="CounselList">
              <a
                className="CounselTitle"
                href={`/counsel/${action._id}`}
                key={index}
              >
                <p>{action.title}</p>
              </a>
              <div>
                {!action.comment && <p>접수 완료</p>}
                {action.comment === "AIComment" && (
                  <div className="CommentStatus">
                    <img src={IconAI} alt="IconAI" />
                    <Text
                      textAlign={"left"}
                      fontSize={14}
                      fontWeight={700}
                      fontColor={"#00C126"}
                      Margin={"0"}
                      text={"답변완료"}
                    />
                  </div>
                )}
                {action.comment === "LawyerComment" && (
                  <div className="CommentStatus">
                    <img src={IconLawyer} alt="IconLawyer" />
                    <Text
                      textAlign={"left"}
                      fontSize={14}
                      fontWeight={700}
                      fontColor={"#000"}
                      Margin={"0"}
                      text={"답변완료"}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default CounselList;
