import React, { useState } from 'react';
import './Comparison.css';
import MemberCard from './MemberCard';
import profileImage from '/Users/minseopark/Desktop/KTBproject/Healthcare/HealthCareVisualization/front/healthcare/src/img/bear.jpeg';

const Comparison = ({ inbodyScore }) => {
  const [members, setMembers] = useState([
    { title: '회원 1', imgSrc: profileImage, description: '운동 : 러닝'},
    { title: '회원 2', imgSrc: profileImage, description: '운동 : 러닝' },
    { title: '회원 3', imgSrc: profileImage, description: '운동 : 러닝' }
  ]);

  // 문자열에 'include'가 아니라 'includes' 사용
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
      <p style={{ textAlign: "center", fontStyle: "italic" }}>
        비슷한 몸 상태를 가진 분들을 상위 30%에 위치해있습니다.
      </p>
      <div className="comparison-chart">
        {/* 여기에 실제 Chart.js 또는 다른 차트 라이브러리를 사용할 수 있습니다 */}
        <div className="chart-placeholder">집합군 비교 분석 그래프</div>
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
