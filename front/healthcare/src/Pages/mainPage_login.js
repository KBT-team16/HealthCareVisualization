import React from "react";
import JwtFetcher from "../Components/JwtFetcher"; // 올바른 경로로 수정
import { useLocation } from "react-router-dom";

export default function MainPage_login() {
  const location = useLocation();
  const loginDto = location.state; // Register에서 전달된 state로부터 LoginDto를 가져옴

  return (
    <div>
      <h1>MainPage</h1>
      <p>
        Welcome to 'i6 World'!
        <br />
        <br />
        로그인한 mainPage입니다.
      </p>
      <JwtFetcher />
    </div>
  );
}
