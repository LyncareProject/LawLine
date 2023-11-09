import { Routes, Route } from "react-router-dom";

import "./App.css";
import Main from "./pages/Main/Main";
import Counsel from "./pages/Counsel/Counsel";
import Login from "./pages/Login/Login";
import Header from "./components/Header/Header";
import Regist from "./pages/Regist/Regist";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { getAuth } from "./services/authService";
import { useDispatch } from "react-redux";
import { logout } from "./redux/userSlice";

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
  }, []);
  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/counsel" element={<Counsel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/regist" element={<Regist />} />
      </Routes>
    </div>
  );
}

export default App;
