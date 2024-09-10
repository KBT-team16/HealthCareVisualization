import React, { useState, useEffect } from "react";
import axios from "axios";

// axios 인스턴스 생성 및 설정
const apiClient = axios.create({
  baseURL: "http://localhost:8081", // 백엔드 API 서버 주소
  withCredentials: true, // 쿠키를 포함하여 요청 보내기
});

export default function JwtFetcher() {
  const [jwtToken, setJwtToken] = useState("");

  // 페이지가 로드될 때 JWT 토큰을 자동으로 가져오기 위한 useEffect 훅
  useEffect(() => {
    const fetchJwtToken = () => {
      // 쿠키를 포함한 요청을 백엔드로 전송
      axios
        .get("http://localhost:8081/api/token", { withCredentials: true }) // 백엔드 URL로 직접 요청
        .then((response) => {
          // 응답에서 JWT를 헤더에서 추출
          const token = response.headers["authorization"];
          console.log("JWT Token:", token);

          // JWT를 상태로 저장하고 로컬 스토리지에 저장
          if (token) {
            const formattedToken = token.replace("Bearer ", "");
            setJwtToken(formattedToken);
            localStorage.setItem("accessToken", formattedToken);
          }
        })
        .catch((error) => {
          console.error("Error fetching JWT token:", error);
        });
    };

    // 컴포넌트가 마운트될 때 fetchJwtToken 호출
    fetchJwtToken();
  }, []); // 빈 배열은 이 훅이 컴포넌트가 마운트될 때만 실행되도록 함
}
