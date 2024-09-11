import React from 'react';
import './ChatbotButton.css';
import { HiAnnotation } from "react-icons/hi"; // 기본 아이콘
import { FiXCircle } from "react-icons/fi"; // X 아이콘

function ChatbotButton({ toggleChatbot, isOpen }) {
  return (
    <button className="chatbot-button" onClick={toggleChatbot}>
      {isOpen ? (
        <FiXCircle style={{ fontSize: "25px" }} /> // 챗봇 창이 열렸을 때 X 아이콘
      ) : (
        <HiAnnotation style={{ fontSize: "25px" }} /> // 챗봇 창이 닫혔을 때 메시지 아이콘
      )}
    </button>
  );
}

export default ChatbotButton;
