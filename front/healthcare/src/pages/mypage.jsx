import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/Navbar.css";
import apiClient from "../components/AxiosInterceptor";
import EditProfile from "./EditProfile";

export default function Mypage() {
  const navigate = useNavigate();

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
    // 로컬 스토리지에서 토큰 값 가져오기
    const token = localStorage.getItem("accessToken");
    console.log("Authorization Token: ", token);

    if (!token) {
      alert("토큰이 없습니다. 다시 로그인해주세요.");
      navigate("/login");
      return;
    }

    try {
      // 실제 API 요청을 보내도록 설정
      const response = await apiClient.get("api/member/info");
      if (response.status === 200) {
        // 요청이 성공하면 페이지 이동
        navigate("/inbody/edit-profile");
      }
    } catch (error) {
      console.error("회원정보 수정 페이지로 이동 중 오류 발생:", error);
    }
  };
  // 인바디 히스토리 조회 페이지로 이동
  const handleInBodyHistory = async () => {
    // 로컬 스토리지에서 토큰 값 가져오기
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("토큰이 없습니다. 다시 로그인해주세요.");
      navigate("/login");
      return;
    }

    try {
      // 실제 API 요청을 보내도록 설정
      const response = await apiClient.get("api/member/inbody-history");
      if (response.status === 200) {
        // 요청이 성공하면 페이지 이동
        navigate("/inbody/history");
      }
    } catch (error) {
      console.error("회원정보 수정 페이지로 이동 중 오류 발생:", error);
    }
  };

  return (
    <div className="body">
        <div className="body-container"  style={{marginBottom:"130px"}}>
          <EditProfile />
        </div>
      </div>
  );
}

/*
        <button onClick={handleLogout} className="navbar-link logout-button">
          로그아웃
        </button>
        */
