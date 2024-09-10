import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function SignUp() {
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  // 네이버 로그인 요청을 보내는 함수
  const onNaverLogin = () => {
    window.location.href = "http://localhost:8081/oauth2/authorization/naver";
  };
  useEffect(() => {
    // 현재 URL에서 인증 성공 여부 확인
    console.log("JIWON");
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationToken = urlParams.get("Authorization");

    if (authorizationToken) {
      // Authorization 토큰이 있으면 mainPage로 이동
      navigate("/mainPage_login");
    } else {
      console.log("토큰 없음, 다시 로그인 시도 필요.");
    }
  }, [navigate]);
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
              onClick={onNaverLogin}
            >
              네이버 로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
