import axios from "axios";

// axios 인스턴스를 생성할 때 withCredentials 옵션을 설정합니다.
const apiClient = axios.create({
  baseURL: "http://localhost:8081/api", // API 서버의 기본 URL
  withCredentials: true, // 쿠키를 요청에 포함
});

// 이 인스턴스를 export합니다.
export default apiClient;
