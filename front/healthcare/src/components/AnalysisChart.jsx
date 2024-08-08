import React from 'react';
import './AnalysisChart.css';
import { Link } from "react-router-dom";
import InbodyChart from './InbodyChart'; // Import the InbodyChart component

function AnalysisChart() {
  return (
    <div className="analysis-chart">
        <h3>인바디 분석 그래프</h3>
        <div className="chart">
            <InbodyChart />
        </div>
        <Link className="nav-link" to='/inbody/history'>
            <button className="details-button">상세 분석 & 나의 히스토리 확인하기</button>
        </Link>
    </div>
  );
}

export default AnalysisChart;
