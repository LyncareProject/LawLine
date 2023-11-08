import { Routes, Route } from "react-router-dom";

import "./App.css";
import Main from "./pages/Main/Main";
import Counsel from "./pages/Counsel/Counsel";
import Login from "./pages/Login/Login";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/counsel" element={<Counsel />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
