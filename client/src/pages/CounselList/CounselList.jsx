import { useEffect, useState } from "react";
import { findAllCounsel } from "../../services/counselService";
import "./CounselList.css"
import Group10 from './../../components/images/Group10.png'
import Group11 from './../../components/images/Group11.png'

const CounselList = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

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
    <div className="CounselList">
      <p className="Ball"></p>
      <h3>상담사례</h3>
      <hr />
      {!loading &&
        data.map((a, i) => (
          <a href={`/counsel/${a._id}`}>
            <p key={i}>{a.title} {/*<span className="ai" ><img src={Group10}alt="ai답변완료" />ai답변완료</span>*/}{/*<span className="im"><img src={Group11}alt="임영준변호사답변완료" />임영준변호사답변완료</span>*/}</p>
          </a>
        ))}
      <hr />
    </div>
  );
};
export default CounselList;
