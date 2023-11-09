import { Routes, Route } from "react-router-dom";

import "./App.css";
import Main from "./pages/Main/Main";
import Counsel from "./pages/Counsel/Counsel";
import Login from "./pages/Login/Login";
import Header from "./components/Header/Header";
import Regist from "./pages/Regist/Regist";
import { ToastContainer } from "react-toastify";
function App() {
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
