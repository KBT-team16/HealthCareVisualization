import React from 'react';
import './Comparison.css';
import SolutionCard from './SolutionCard';

function Comparison() {
  return (
    <div className="comparison">
      <h3>집합군 비교 분석</h3>
      <p>비슷한 몸 상태를 가진 분들을 상위 30%에 위치해있습니다.</p>
      <div className="comparison-chart">
        {/* 여기에 실제 Chart.js 또는 다른 차트 라이브러리를 사용할 수 있습니다 */}
        <div className="chart-placeholder">여기에 차트가 들어갑니다.</div>
      </div>
      <div className="recommendations">
        <h5>회원님과 비슷한 스펙을 가진 다른 회원님들이 이런 운동/식단을 병행하고 있습니다.</h5>
        <div className="recommendation-cards">
          {/* 여기에 실제 카드 컴포넌트를 추가할 수 있습니다 */}
          <SolutionCard title="2 Nights PACKAGE All Inclusive" imgSrc="image7.jpg" />
          <SolutionCard title="2 Nights PACKAGE All Inclusive" imgSrc="image8.jpg" />
          <SolutionCard title="2 Nights PACKAGE All Inclusive" imgSrc="image8.jpg" />
        </div>
      </div>
    </div>
  );
}

export default Comparison;
