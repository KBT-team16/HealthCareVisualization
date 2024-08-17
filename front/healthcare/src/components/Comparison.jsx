import React, { useState, useEffect } from 'react';
import './Comparison.css';
import MemberCard from './MemberCard';
import profileImage from '../img/bear.jpeg';
import ComparisonChart  from './ComparisonChart';

const Comparison = ({ inbodyScore }) => {
  const [members, setMembers] = useState([
    { title: '회원 1', imgSrc: profileImage, description: '운동 : 러닝'},
    { title: '회원 2', imgSrc: profileImage, description: '운동 : 러닝' },
    { title: '회원 3', imgSrc: profileImage, description: '운동 : 러닝' }
  ]);

  // 나의 인바디 점수가 상위 몇 프로인지를 알기 위해 인바디 점수와 성별, 나이 정보가 필요하다. 초기값으로 빈 공간 생성
  const [inbodyData, setInbodyData] = useState({
    inbody_score: null, // 인바디 점수
    age: null, // 나이
    gender: '' // 성별
  });

  const nowYear = new Date().getFullYear();

  // 인바디 점수를 가져옴 api 주소를 통해서
  useEffect(() => { // API에서 데이터를 가져옴
    const fetchInbodyData = async () => {
        try {
            const response = await fetch('API_ENDPOINT_URL'); // 이 부분에 실제 데이터를 가져올 api 주소 적기
            const data = await response.json(); // JSON 응답을 파싱

            // API에서 가져온 데이터로 상태 업데이트
            setInbodyData({
                inbody_score: data.inbody_score,
                age: nowYear - data.birth_year,
                gender: data.sex === 'F' ? 'female' : 'male'
            });
        } catch (error) {
            console.error('Error fetching inbody Data:', error);
        }
    };
      fetchInbodyData(); // 함수 호출
  }, []);

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
         비슷한 나이대의 다른 회원님들 중에 회원님은 상위 {}에 위치해있습니다.
      </p>
      <div className="comparison-chart">
        <ComparisonChart />
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
