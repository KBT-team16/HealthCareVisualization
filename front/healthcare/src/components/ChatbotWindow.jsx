import React from 'react';
import './ChatbotWindow.css';
import { FiXCircle } from "react-icons/fi";

function ChatbotWindow({ isOpen, toggleChatbot }) {
  return (
    isOpen && (
      <div className="chatbot-window">
        <div className="chatbot-header">
          <h1>HealthCare</h1>
          <button onClick={toggleChatbot} className='closeButton'><FiXCircle style={{fontSize:"20px"}}/></button>
        </div>
        <div className="chatbot-content">
          <p>Hello, We are goorm, creating a growth-oriented ecosystem for developers.</p>
          <button className='startButton'>채팅을 시작하세요!</button>
        </div>
      </div>
    )
  );
}

export default ChatbotWindow;
