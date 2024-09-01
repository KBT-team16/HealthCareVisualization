// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";

import MainPage from "./Pages/mainPage";
import MainPageLogin from "./Pages/mainPage_login"; // 올바른 대소문자와 경로로 import
import Login from "./Pages/login";
import SignUp from "./Pages/signUp";
import Navbar from "./Components/navbar";
import Mypage from "./Pages/myPage";
import EditProfile from "./Pages/EditProfile";
import InBodyHistory from "./Pages/InbodyHistory";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/mainpage_login" element={<MainPageLogin />} />{" "}
          {/* 경로가 정확히 일치하는지 확인 */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/edit-profile" element={<EditProfile />} />{" "}
          <Route path="/inbody-history" element={<InBodyHistory />} />{" "}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
