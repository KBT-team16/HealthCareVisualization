import React, { useState, useEffect } from 'react';
import './Comparison.css';
import ComparisonChart  from './ComparisonChart';

const Comparison = ({ inbodyScore }) => {
  const [percentile, setPercentile] = useState(null);

  return (
    <div>
      <h3>집합군 비교 분석</h3>
      <h5 style={{ textAlign: "center" }}>
        비슷한 나이대의 다른 회원님들 중에 회원님은 상위 {percentile !== null ? `${percentile}%` : '...'}에 위치해있습니다.
      </h5>
      <div className="comparison-chart">
        <ComparisonChart 
          onPercentileCalculated={setPercentile} // 퍼센트 계산된 결과 받음
        />
      </div>
    </div>
  );
}

export default Comparison;
