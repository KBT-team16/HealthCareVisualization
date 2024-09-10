import React, { useState, useEffect } from 'react';
import './Comparison.css';
import MemberCard from './MemberCard';
import profileImage from '../img/bear.jpeg';
import ComparisonChart  from './ComparisonChart';

const Comparison = ({ inbodyScore }) => {
  const [members, setMembers] = useState([
    { title: '회원 5', imgSrc: profileImage, description: '운동 : 러닝'},
    { title: '회원 2', imgSrc: profileImage, description: '운동 : 러닝' },
    { title: '회원 3', imgSrc: profileImage, description: '운동 : 러닝' }
  ]);

  const [percentile, setPercentile] = useState(null);

  const renderMembers = (type) => {
    return members
      .filter(member => member.title.includes(type)) // 'include' -> 'includes'
      .map((member, index) => (
        <MemberCard
          key={index}
          title={member.title}
          imgSrc={member.imgSrc}
          description={member.description}
        />
      ));
  };

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
      <div>
        <h5 style={{textAlign: "center", margin: "20px 0"}}>
          회원님과 비슷한 스펙을 가진 다른 회원님들은 이런 운동/식단을 병행하고 있습니다.
        </h5>
        <div className="member-cards">
          {renderMembers('회원')}
        </div>
      </div>
    </div>
  );
}

export default Comparison;
