import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { forwardPath } from "../../services/forwardService";

const ForwardingLink = () => {
  const { path } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if(path === '유튜브맨' || path === '여의도정보맨' || path === '앤젤천사'){
      const forwarding = async () => {
        await forwardPath({ path });
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
