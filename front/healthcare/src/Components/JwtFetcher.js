// src/components/JwtFetcher.js

import React, { useState } from "react";
import axios from "axios";

// axios 인스턴스 생성 및 설정
const apiClient = axios.create({
  baseURL: "http://localhost:8081", // 백엔드 API 서버 주소
  withCredentials: true, // 쿠키를 포함하여 요청 보내기
});

export default function JwtFetcher() {
  const [jwtToken, setJwtToken] = useState("");

  const fetchJwtToken = async () => {
    try {
      // 쿠키를 포함한 요청을 백엔드로 전송
      const response = await apiClient.get("/your-endpoint");

      // 응답에서 JWT를 헤더에서 추출
      const token = response.headers["authorization"];
      console.log("JWT Token:", token);

      // JWT를 상태로 저장하고 로컬 스토리지에 저장
      if (token) {
        const formattedToken = token.replace("Bearer ", "");
        setJwtToken(formattedToken);
        localStorage.setItem("accessToken", formattedToken);
      }
    } catch (error) {
      console.error("Error fetching JWT token:", error);
    }
  };

  return (
    <div>
      <h2>JWT Fetcher</h2>
      <button onClick={fetchJwtToken}>Get JWT Token</button>
      {jwtToken && (
        <div>
          <p>Received JWT: {jwtToken}</p>
        </div>
      )}
    </div>
  );
}
