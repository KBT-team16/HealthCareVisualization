import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"; // 스타일링을 위한 CSS 파일
import axios from "axios";

export default function Login() {
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  // 네이버 로그인 요청을 보내는 함수
  const handleKakaoLogin = () => {
    const naverAuthUrl = "http://localhost:8081/oauth2/authorization/naver";
    window.location.href = naverAuthUrl;
  };

  return (
    <div>
      <div className="login-container">
        <form>
          <div className="input-container">
            <h2>로그인</h2>
            <hr className="divider" />
          </div>
          {loginError && <p style={{ color: "red" }}>{loginError}</p>}
          <hr className="divider" />
          <div className="input-container">
            <button
              type="button"
              className="social-login naver-login"
              onClick={handleKakaoLogin}
            >
              네이버 로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
