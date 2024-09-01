import React from "react";
import { useNavigate } from "react-router-dom";
import "../Components/navbar.css";
import apiClient from "../Components/apiClient"; // API 요청을 위한 Axios 인스턴스

export default function Mypage() {
  const navigate = useNavigate();

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      // 로그아웃 시 클라이언트 측에서 JWT 토큰을 삭제
      localStorage.removeItem("accessToken");

      // 로그아웃 후 로그인 페이지로 리다이렉트
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">홈</a> {/* 로고나 메인 페이지 링크 */}
      </div>
      <div className="navbar-links">
        <a href="/edit-profile">회원정보 수정</a>
        <a href="/inbody-history">인바디 히스토리 조회</a>
        <button
          onClick={handleLogout}
          className="navbar-link logout-button" // CSS 클래스 추가
        >
          로그아웃
        </button>
      </div>
    </nav>
  );
}
