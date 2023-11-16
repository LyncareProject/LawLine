import { Routes, Route } from "react-router-dom";

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

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const dispatch = useDispatch();

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
    try {
      const Tokens = JSON.parse(localStorage.getItem("Tokens"));
      if (Tokens) {
        const verifyAuth = async () => {
          await getAuth();
          const response = await getAuth();
          if (response.message === "No authorized! 다시 로그인해주세요.") {
            dispatch(logout());
            localStorage.removeItem("Tokens");
            return;
          }
        };
        verifyAuth();
      }
    } catch (error) {
      dispatch(logout());
      localStorage.removeItem("Tokens");
    }
  }, [dispatch]);

  return (
    <div className="App">
      <ToastContainer />
      {windowWidth >= 768 ? <Header /> : <MobileHeader />}

      <Routes>
        <Route path="/" element={<Main />} />
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
        <Route path="/not-found" element={<NotFound />} />

        <Route path="/:path" element={<ForwardingLink />} />
      </Routes>
    </div>
  );
}

export default App;
