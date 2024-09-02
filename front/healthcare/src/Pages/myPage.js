import React from "react";
import { useNavigate } from "react-router-dom";
import "../Components/navbar.css";
import apiClient from "../Components/apiClient";
import { useCookies } from "react-cookie";

export default function Mypage() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["AuthorizationAccess"]); // 쿠키의 정확한 이름을 사용

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      localStorage.removeItem("accessToken");
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 회원정보 수정 페이지로 이동
  const handleEditProfile = async () => {
    const token = cookies.AuthorizationAccess; // 쿠키에서 토큰 값 가져오기
    console.log("Authorization Token: ", token);

    if (!token) {
      alert("토큰이 없습니다. 다시 로그인해주세요.");
      navigate("/login");
      return;
    }

    try {
      await apiClient.get("/edit-profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      navigate("/edit-profile");
    } catch (error) {
      console.error("회원정보 수정 페이지로 이동 중 오류 발생:", error);
    }
  };

  // 인바디 히스토리 조회 페이지로 이동
  const handleInBodyHistory = async () => {
    const token = cookies.AuthorizationAccess; // 쿠키에서 토큰 값 가져오기

    if (!token) {
      alert("토큰이 없습니다. 다시 로그인해주세요.");
      navigate("/login");
      return;
    }

    try {
      await apiClient.get("/inbody-history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/inbody-history");
    } catch (error) {
      console.error("인바디 히스토리 조회 페이지로 이동 중 오류 발생:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">홈</a>
      </div>
      <div className="navbar-links">
        <button onClick={handleEditProfile} className="navbar-link">
          회원정보 수정
        </button>
        <button onClick={handleInBodyHistory} className="navbar-link">
          인바디 히스토리 조회
        </button>
        <button onClick={handleLogout} className="navbar-link logout-button">
          로그아웃
        </button>
      </div>
    </nav>
  );
}
