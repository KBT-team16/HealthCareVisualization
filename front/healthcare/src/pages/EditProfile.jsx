import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../components/AxiosInterceptor";

export default function EditProfile() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // 회원 정보 가져오기
  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const response = await apiClient.get("api/member/info");
        const { height, weight } = response.data;
        setHeight(height);
        setWeight(weight);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch member info:", err);
        setError("회원 정보를 가져오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchMemberInfo();
  }, []);

  // 저장 버튼 클릭 시 처리
  const handleSave = async () => {
    try {
      await apiClient.patch("/member/info", { height, weight });
      console.log("저장 완료:", { height, weight });
      navigate("/mypage");
    } catch (err) {
      console.error("Failed to update member info:", err);
      setError("회원 정보를 수정하는 중 오류가 발생했습니다.");
    }
  };

  // 로딩 중일 때 화면에 표시할 내용
  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 오류 발생 시 화면에 표시할 내용
  if (error) {
    return <div>{error}</div>;
  }

  return (
      <>
        <label>
          키 (cm):
          <input
            type="number"
            name="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="키 입력"
          />
        </label>
        <label>
          몸무게 (kg):
          <input
            type="number"
            name="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="몸무게 입력"
          />
        </label>
        <div className="button-group">
          <button onClick={handleSave} className="save-button">
            저장
          </button>
        </div>
    </>
  );
}
