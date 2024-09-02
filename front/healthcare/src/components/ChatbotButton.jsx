import React from 'react';
import './ChatbotButton.css';
import { HiAnnotation } from "react-icons/hi";

function ChatbotButton({ toggleChatbot }) {
  return (
    <button className="chatbot-button" onClick={toggleChatbot}><HiAnnotation style={{fontSize:"25px"}}/></button>
  );
}

export default ChatbotButton;