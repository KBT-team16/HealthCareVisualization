import axios from "axios";

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: "http://localhost:8081", // 백엔드 서버의 기본 URL 설정
  withCredentials: true, // 쿠키를 포함하여 요청을 보내기 위한 설정
});

// 요청 인터셉터 추가
apiClient.interceptors.request.use(
  (config) => {
    // 요청을 보내기 전에 로컬 스토리지에서 토큰을 가져옴
    const token = localStorage.getItem("accessToken");

    if (token) {
      // 모든 요청의 Authorization 헤더에 토큰을 추가
      config.headers["authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // 요청 오류가 발생한 경우
    return Promise.reject(error);
  }
);

export default apiClient;
