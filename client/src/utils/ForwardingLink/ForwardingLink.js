import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { forwardPath } from "../../services/forwardService";

const ForwardingLink = () => {
  const { path } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if(path === 'counsel.cafe' || path === 'counsel.you' ){
      const forwarding = async () => {
        await forwardPath({ path })
        // const response = await forwardPath({ path });
        // if(response.data.pathToken){
        //   console.log("response.data.pathToken", response.data.pathToken)
        //   localStorage.setItem('pathToken', response.data.pathToken);
        // }
      };
      forwarding();
      navigate("/");
      return
    }
    navigate("/not-found");
  }, [navigate, path]);

  return;
};
export default ForwardingLink;
