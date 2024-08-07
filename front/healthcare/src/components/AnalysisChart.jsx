import React from 'react';
import './AnalysisChart.css';
import { Link } from "react-router-dom";

function AnalysisChart() {
  return (
    <div className="analysis-chart">
        <h3>인바디 분석 그래프</h3>
        <div className="chart">
            {/* 여기에 실제 Chart.js 또는 다른 차트 라이브러리를 사용할 수 있습니다 */}
            <div className="chart-placeholder">인바디 분석 그래프</div>
        </div>
        <Link className="nav-link" to='/inbody/history'>
            <button className="details-button">상세 분석 & 나의 히스토리 확인하기</button>
        </Link>
    </div>
  );
}

export default AnalysisChart;
