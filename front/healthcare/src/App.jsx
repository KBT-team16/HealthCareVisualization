import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Analyze from "./pages/analyze";
import History from "./pages/history";
import EditProfile from "./pages/EditProfile";
import MyPage from "./pages/mypage";
import Notice from "./pages/notice";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import Mainpage from "./pages/mainpage";
import Navbar from "./components/Navbar";
import ChatbotButton from "./components/ChatbotButton";
import ChatbotWindow from "./components/ChatbotWindow";

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/inbody/analyze" element={<Analyze />} />
        <Route path="/inbody/history" element={<History />} />
        <Route path="/inbody/edit-profile" element={<EditProfile />} />
        <Route path="/user/mypage" element={<MyPage />} />
        <Route path="/notification" element={<Notice />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
      <ChatbotButton toggleChatbot={toggleChatbot} />
      <ChatbotWindow isOpen={isChatbotOpen} toggleChatbot={toggleChatbot} />
    </BrowserRouter>
  );
}

export default App;
