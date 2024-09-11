import React, { useState } from 'react';
import ChatbotButton from './ChatbotButton'; // 버튼 컴포넌트 임포트
import './ChatbotWindow.css';

function ChatbotWindow() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen); // 챗봇 열고 닫기 상태 변경
  };

  return (
    <div>
      <ChatbotButton toggleChatbot={toggleChatbot} isOpen={isOpen} /> {/* 상태와 toggle 함수 전달 */}
      
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>안녕하세요👋</h3>
            <h4>당신의 건강을 함께 챙기는 <span style={{ color: "#0077b6", fontWeight:"bold"}}>"iCare6챗"</span>입니다.</h4> {/* 여기서 색상 변경 */}
          </div>
          <div className="chatbot-container">
            <p style={{marginBottom: "60px", marginTop:"30px"}}>당신의 건강 상태나 추천 운동과 식단,<br />
                iCare6 사용법이 궁금하다면,<br />
               [시작하기] 버튼을 클릭해보세요! 😊</p>
            <button className='startButton'>채팅을 시작하세요!</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatbotWindow;
