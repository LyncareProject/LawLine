import { useEffect, useState } from "react";
import { findAllCounsel } from "../../services/counselService";

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
    <div>
      findAllCounsel
      {!loading &&
        data.map((a, i) => (
          <a href={`/counsel/${a._id}`}>
            <p key={i}>{a.title}</p>
          </a>
        ))}
    </div>
  );
};
export default CounselList;
