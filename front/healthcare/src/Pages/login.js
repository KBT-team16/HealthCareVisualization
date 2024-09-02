import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext"; // useAuth 훅을 import
import apiClient from "../Components/apiClient"; // apiClient import
import { useState } from "react";
import "./login.css"; // 스타일링을 위한 CSS 파일

export default function Login() {
  const { login } = useAuth();
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  // 네이버 로그인 요청을 보내는 함수
  const handleNaverLogin = () => {
    // 캐시 방지를 위한 쿼리 파라미터 생성
    const cacheBuster = `cacheBuster=${new Date().getTime()}`;

    // 백엔드 서버의 엔드포인트로 리다이렉트하여 네이버 인증 시작
    window.location.href = `http://localhost:8081/oauth2/authorization/naver?${cacheBuster}`;
  };

  // 로그인 요청을 보내는 함수
  const handleLogin = async () => {
    try {
      const response = await apiClient.post("/auth/login", {
        /* 필요한 데이터 */
      });
      if (response.status === 200) {
        // 로그인 성공 시 mainPage_login으로 이동
        navigate("/mainpage_login");
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      setLoginError("로그인에 실패했습니다. 다시 시도해주세요.");
    }
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
