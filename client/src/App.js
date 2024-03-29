import { Routes, Route, Outlet } from "react-router-dom";

import "./App.css";
import Main from "./pages/Main/Main";
import Inquiry from "./pages/Inquiry/Inquiry";
import Counsel from "./pages/Counsel/Counsel";
import Login from "./pages/Login/Login";
import Header from "./components/Header/Header";
import Regist from "./pages/Regist/Regist";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { getAuth } from "./services/authService";
import { useDispatch } from "react-redux";
import { logout } from "./redux/userSlice";
import CounselList from "./pages/CounselList/CounselList";
import CounselDoc from "./pages/CounselDoc/CounselDoc";
import CounselConfirm from "./pages/CounselConfirm/CounselConfirm";
import CounselSearch from "./pages/CounselSearch/CounselSearch";
import CounselResult from "./pages/CounselResult/CounselResult";
import MyPage from "./pages/MyPage/MyPage";
import ForwardingLink from "./utils/ForwardingLink/ForwardingLink";
import NotFound from "./pages/NotFound/NotFound";
import LawyerRegist from "./pages/LawyerRegist/LawyerRegist";
import MobileHeader from "./components/MobileHeader/MoblieHeader";
import Footer from "./components/Footer/Footer";
import Provision from "./pages/Provision/Provision";
import Privacy from "./pages/Privacy/Privacy";
import CounselUser from "./pages/CounselUser/CounselUser";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import MobileFooter from "./components/MobileFooter/MoblieFooter";
import ScrollToTop from "./utils/ScrollToTop/ScrollToTop";
import FindPassword from "./pages/FindPassword/FindPassword";

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();

  const Layout = () => {
    return (
      <div>
        <Outlet />
        {windowWidth >= 768 ? <Footer /> : null}
      </div>
    );
  };

  // 브라우저 넓이 측정
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 유저 권한
  useEffect(() => {
    const Tokens = JSON.parse(localStorage.getItem("Tokens"));
    if (Tokens) {
      const verifyAuth = async () => {
        try {
          await getAuth();
          // 여기서 별도의 로그아웃 처리는 필요하지 않음
        } catch (error) {
          // getAuth에서 예외 발생 시 로그아웃 처리
          dispatch(logout());
          localStorage.removeItem("Tokens");
        }
      };
      verifyAuth();
    }
  }, [dispatch]);

  return (
    <ScrollToTop>
      <div className="App">
        <ToastContainer />
        {windowWidth >= 768 ? <Header /> : <MobileHeader />}
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Main />} />
          </Route>
          <Route path="/Inquiry" element={<Inquiry />} />
          <Route path="/counsel" element={<Counsel />} />
          <Route path="/counsel/confirm" element={<CounselConfirm />} />
          <Route path="/counsel/search" element={<CounselSearch />} />
          <Route path="/counsel/result" element={<CounselResult />} />
          <Route path="/counsel/list" element={<CounselList />} />
          <Route path="/counsel/:counselId" element={<CounselDoc />} />
          <Route path="/login" element={<Login />} />
          <Route path="/regist" element={<Regist />} />
          <Route path="/regist/lawyer" element={<LawyerRegist />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/counsel" element={<CounselUser />} />
          <Route path="/mypage/password" element={<ChangePassword />} />
          <Route path="/provison" element={<Provision />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/lawbot/chat" element={<ChatRoom />} />
          <Route path="/findpassword" element={<FindPassword />} />
          <Route path="/not-found" element={<NotFound />} />

          <Route path="/:path" element={<ForwardingLink />} />
        </Routes>
        {windowWidth <= 768 ? <MobileFooter /> : null}
      </div>
    </ScrollToTop>
  );
}

export default App;
