import React, { useState, useEffect } from "react";
import apiClient from "../components/AxiosInterceptor";

import "../components/inbody.css";

export default function InBodyHistory() {
  const [inBodyHistories, setInBodyHistories] = useState([]); // 인바디 히스토리 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHistory, setSelectedHistory] = useState(null); // 선택된 인바디 히스토리 상태

  // 컴포넌트가 마운트될 때 인바디 히스토리 가져오기
  useEffect(() => {
    const fetchInBodyHistories = async () => {
      try {
        const response = await apiClient.get("api/member/inbody-history"); // 서버에서 인바디 히스토리 가져오기
        setInBodyHistories(response.data.inbodyHistories); // 상태에 저장 (inbodyHistories 리스트에 접근)
        setLoading(false); // 로딩 완료
      } catch (err) {
        console.error("Failed to fetch InBody histories:", err);
        setError("인바디 히스토리를 가져오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchInBodyHistories();
  }, []);

  // 히스토리 행 클릭 시 처리 함수
  const handleRowClick = (history) => {
    setSelectedHistory(history); // 선택된 히스토리 설정
  };

  // 로딩 중일 때 화면에 표시할 내용
  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  // 오류 발생 시 화면에 표시할 내용
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container">
      <h2 className="inbody-title">인바디 히스토리</h2>
      <div className="inbody-table-container">
        {inBodyHistories.length > 0 ? (
          <>
            <table className="inbody-table">
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>체지방률 (%)</th>
                  <th>근육량 (kg)</th>
                  <th>BMI</th>
                  <th>인바디 점수</th>
                </tr>
              </thead>
              <tbody>
                {inBodyHistories.map((entry, index) => (
                  <tr
                    key={index}
                    onClick={() => handleRowClick(entry)}
                    className="clickable-row"
                  >
                    <td>
                      {new Date(entry.evaluationDate).toLocaleDateString()}
                    </td>
                    <td>{entry.bodyFatPercentage}</td>
                    <td>{entry.muscleMass}</td>
                    <td>{entry.bmi}</td>
                    <td>{entry.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 선택된 히스토리의 자세한 정보를 표시 */}
            {selectedHistory && (
              <div className="inbody-details">
                <h3>상세 정보</h3>
                <p>
                  날짜:{" "}
                  {new Date(
                    selectedHistory.evaluationDate
                  ).toLocaleDateString()}
                </p>
                <p>체지방률: {selectedHistory.bodyFatPercentage}%</p>
                <p>근육량: {selectedHistory.muscleMass} kg</p>
                <p>BMI: {selectedHistory.bmi}</p>
                <p>인바디 점수: {selectedHistory.score}</p>
                {/* 닫기 버튼 추가 */}
                <button
                  onClick={() => setSelectedHistory(null)}
                  className="close-button"
                >
                  닫기
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="no-data">인바디 히스토리가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
