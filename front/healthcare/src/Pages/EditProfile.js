import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../Components/apiClient";
import "../Components/navbar.css";

export default function EditProfile() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // 컴포넌트가 마운트될 때 회원 정보 가져오기
  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        // apiClient 인스턴스를 사용하여 요청
        const response = await apiClient.get("/member/info");
        const { height, weight } = response.data;

        setHeight(height);
        setWeight(weight);
        setLoading(false); // 로딩 완료
      } catch (err) {
        console.error("Failed to fetch member info:", err);
        setError("회원 정보를 가져오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchMemberInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "height") setHeight(value);
    else if (name === "weight") setWeight(value);
  };

  // 저장 버튼 클릭 시 처리 함수
  const handleSave = async () => {
    try {
      // apiClient 인스턴스를 사용하여 요청
      await apiClient.patch("/member/info", {
        height,
        weight,
      });
      console.log("저장 완료: ", { height, weight });
      navigate("/mypage"); // 저장 후 마이페이지로 이동
    } catch (err) {
      console.error("Failed to update member info:", err);
      setError("회원 정보를 수정하는 중 오류가 발생했습니다.");
    }
  };

  const handleCancel = () => {
    navigate("/mypage");
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="navbar">
      <h2>회원정보 수정</h2>
      <div className="navbar-links">
        <label>
          키 (cm):
          <input
            type="number"
            name="height"
            value={height}
            onChange={handleInputChange}
            placeholder="키 입력"
          />
        </label>
        <label>
          몸무게 (kg):
          <input
            type="number"
            name="weight"
            value={weight}
            onChange={handleInputChange}
            placeholder="몸무게 입력"
          />
        </label>
        <div className="button-group">
          <button onClick={handleSave} className="save-button">
            저장
          </button>
          <button onClick={handleCancel} className="cancel-button">
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
