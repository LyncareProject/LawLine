import { useEffect, useState } from "react";
import { findAllCounsel } from "../../services/counselService";
import { useLocation, useNavigate } from "react-router-dom";
import Text from "../../components/Text/Text";
import "./CounselList.css";
import IconAI from "../../assets/images/IconAI.png";
import IconLawyer from "../../assets/images/IconLawyer.png";
import { toast } from "react-toastify";
import Pagination from "../../components/Pagination/Pagination";

const CounselList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const phone = queryParams.get("phone");
  let limit = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await findAllCounsel();
        let dataToSet = response.data;
        if (phone) {
          const filteredData = dataToSet.filter((data) => data.phone === phone);
          if (filteredData.length === 0) {
            toast.error(<h1>해당 전화번호로 신청된 상담 사례가 없습니다.</h1>, {
              position: "top-center",
              autoClose: 2000,
            });
            navigate("/counsel/search");
            return;
          }
          dataToSet = filteredData;
        }
        setData(dataToSet);
        setPost(
          dataToSet.slice((currentPage - 1) * limit, currentPage * limit)
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [phone, navigate, currentPage, limit]);

  return (
    <div className="Page">
      <div className="Wrap">
        <div className="CounselHead">
          <Text
            textAlign={"left"}
            fontSize={25}
            fontWeight={600}
            fontColor={"#000"}
            margin={"35px 0"}
            text={"상담사례"}
          />
          <Text
            textAlign={"left"}
            fontSize={25}
            fontWeight={600}
            fontColor={"#000"}
            margin={"35px 0"}
            text={data && `총 ${data.length}건`}
          />
        </div>
        <div className="CounselTable">
          {!loading &&
            post.map((action, index) => (
              <div className="CounselList" key={index}>
                <a className="CounselTitle" href={`/counsel/${action._id}`}>
                  <p>{action.title}</p>
                </a>

                {!action.comment && (
                  <div className="CommentStatus">
                    <Text
                      textAlign={"left"}
                      fontSize={14}
                      fontWeight={700}
                      fontColor={"#777"}
                      margin={"0"}
                      text={"접수완료"}
                    />
                  </div>
                )}
                {action.comment === "AIComment" && (
                  <div className="CommentStatus">
                    <img src={IconAI} alt="IconAI" />
                    <Text
                      textAlign={"left"}
                      fontSize={14}
                      fontWeight={700}
                      fontColor={"#00C126"}
                      margin={"0"}
                      text={"AI 답변완료"}
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
                      margin={"0"}
                      text={"변호사 답변완료"}
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
        <Pagination
          totalPosts={data.length}
          postsPerPage={limit}
          currentPage={currentPage}
          setPage={setCurrentPage}
        />
      </div>
    </div>
  );
};
export default CounselList;
