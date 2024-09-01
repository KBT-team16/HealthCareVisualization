import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import "./login.css"; // 스타일링을 위한 CSS 파일

// 쿠키를 가져오는 유틸리티 함수
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 쿠키 확인
    const accessToken = getCookie("AuthorizationAccess");
    if (accessToken) {
      // 쿠키에 토큰이 있으면 mainPage_login으로 이동
      navigate("/mainpage_login");
    }
  }, [navigate]); // navigate 의존성 추가

  // 네이버 로그인 요청을 보내는 함수
  const handleNaverLogin = () => {
    window.location.href = "http://localhost:8081/oauth2/authorization/naver";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok || response.status === 304) {
        // 304 상태 코드도 포함
        login();
        // 로그인 성공 시 mainPage_login으로 이동
        navigate("/mainpage_login");
      } else {
        setLoginError(data.message);
      }
    } catch (error) {
      setLoginError("An error occurred during login");
    }
  };

  return (
    <div>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <h2>로그인</h2>
            <hr className="divider" />
            <label>아이디</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ID"
              required
            />
          </div>
          <div className="input-container">
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              required
            />
          </div>
          <button type="submit" className="login-button">
            로그인
          </button>
          {loginError && <p style={{ color: "red" }}>{loginError}</p>}
          <hr className="divider" />
          <div className="input-container">
            <button type="button" className="social-login google-login">
              구글 로그인
            </button>
            <button type="button" className="social-login kakao-login">
              카카오 로그인
            </button>
            <button
              type="button"
              className="social-login naver-login"
              onClick={handleNaverLogin}
            >
              네이버 로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
