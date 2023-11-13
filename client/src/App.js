import { Routes, Route } from "react-router-dom";

import "./App.css";
import Main from "./pages/Main/Main";
import Inquiry from "./pages/Inquiry/Inquiry";
import Completed from "./pages/Completed/Completed";
import View from "./pages/View/View";
import View_completed from "./pages/View_completed/View_completed";
import Counsel from "./pages/Counsel/Counsel";
import Login from "./pages/Login/Login";
import Header from "./components/Header/Header";
import Regist from "./pages/Regist/Regist";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { getAuth } from "./services/authService";
import { useDispatch } from "react-redux";
import { logout } from "./redux/userSlice";
import CounselList from "./pages/CounselList/CounselList";
import CounselDoc from "./pages/CounselDoc/CounselDoc";
import CounselConfirm from "./pages/CounselConfirm/CounselConfirm";
import CounselSearch from "./pages/CounselSearch/CounselSearch";
import CounselResult from "./pages/CounselResult/CounselResult";

function App() {
  const dispatch = useDispatch();
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
      <Header> </Header>

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Inquiry" element={<Inquiry />} />
        {/* <Route path="/Completed" element={<Completed />} /> */}
        {/* <Route path="/View" element={<View />} />
        <Route path="/View_completed" element={<View_completed />} /> */}
        <Route path="/counsel" element={<Counsel />} />
        <Route path="/counsel/confirm" element={<CounselConfirm />} />
        <Route path="/counsel/search" element={<CounselSearch />} />
        <Route path="/counsel/result" element={<CounselResult />} />
        <Route path="/counsel/list" element={<CounselList />} />
        <Route path="/counsel/:counselId" element={<CounselDoc />} />
        <Route path="/login" element={<Login />} />
        <Route path="/regist" element={<Regist />} />
      </Routes>
    </div>
  );
}

export default App;
