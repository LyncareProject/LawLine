import "./Header.css";
import { Link } from "react-router-dom";
import Favicon from '../../assets/images/Favicon.png'

const Header = () => {
  return (
    <div className="Header">
      <div className="HeaderWrap">
        <div className="HeaderLeft">
          <img className="Favicon" src={Favicon} alt="Favicon" />
          <p className="Logo">LawLine</p>
          <div className="Menu">
            <Link to="/">홈</Link>
            <Link to="/lawyers">변호사</Link>
            <Link to="/counsel">상담 사례</Link>
          </div>
        </div>
        <Link className="LoginBtn" to="login">
          로그인
        </Link>
      </div>
    </div>
  );
};

export default Header;
