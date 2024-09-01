import axios from "axios";

// JWT 토큰을 로컬 스토리지 또는 다른 저장소에서 가져오기
const accessToken = localStorage.getItem("accessToken");

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: "http://localhost:8081/api", // 백엔드 API 서버 주소
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsInN1YmplY3QiOiJhazQ2ODZAbmF2ZXIuY29tIiwiZXhwIjoxODI1MTAwNTYxfQ.ZwoN4GiJGEpjAGurtNzogwdcT6sPAzT2J0QHCDuZFq9Jo-disFJMHZHGAVB_9uwv6n1b--KJtKWKi67Q8WE3jg`, // 모든 요청에 토큰 추가
  },
  withCredentials: true, // 쿠키를 포함한 요청 설정
});

export default apiClient;
