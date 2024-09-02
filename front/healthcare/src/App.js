// App.js
import React from "react";
import { Route, Routes } from "react-router-dom"; // Router 제거
import { AuthProvider } from "./context/authContext";

import MainPage from "./Pages/mainPage";
import MainPageLogin from "./Pages/mainPage_login";
import Login from "./Pages/login";
import SignUp from "./Pages/signUp";
import Navbar from "./Components/navbar";
import Mypage from "./Pages/myPage";
import EditProfile from "./Pages/EditProfile";
import InBodyHistory from "./Pages/InbodyHistory";

function App() {
  return (
    <AuthProvider>
      {/* Router 제거 */}
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/mainpage_login" element={<MainPageLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/inbody-history" element={<InBodyHistory />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
