import React, { useState, useEffect } from 'react';
import './OtherUsersInfo.css';
import MemberCard from './MemberCard';
import profileImage from '../img/bear.jpeg';

const OtherUsersInfo = () => {


    const [members, setMembers] = useState ([
        { name: '회원 1', imgSrc: profileImage, sex: '여', age: 25, activity: '러닝', diet: '채식' },
        { name: '회원 2', imgSrc: profileImage, sex: '남', age: 25, activity: '러닝', diet: '채식' },
        { name: '회원 3', imgSrc: profileImage, sex: '남', age: 25, activity: '러닝', diet: '채식' },
        
    ])
    const [members1, setMembers1] = useState ([
        { name: '회원 4', imgSrc: profileImage, sex: '남', age: 25, activity: '러닝', diet: '채식' } ,
        { name: '회원 5', imgSrc: profileImage, sex: '남', age: 25, activity: '러닝', diet: '채식' },
        { name: '회원 6', imgSrc: profileImage, sex: '남', age: 25, activity: '러닝', diet: '채식' },
    ])

        // 백엔드에서 데이터를 받아오는 함수
        const fetchMembers = async () => {
          try {
            // 백엔드 API로부터 데이터를 받아오는 부분
            const response = await fetch('https:/localhost:8080/api/physical-stats/random');
            const data = await response.json();
            
            // 받아온 데이터를 상태로 저장 (첫 번째 그룹)
            setMembers(data.membersGroup1);
    
            // 받아온 데이터를 상태로 저장 (두 번째 그룹)
            setMembers1(data.membersGroup2);
          } catch (error) {
            console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
          }
        };
    
        useEffect(() => {
          // 컴포넌트가 마운트될 때 데이터를 가져옵니다.
          fetchMembers();
        }, []);
    
    const renderMembersList = (membersList) => {
      return membersList.map((member, index) => (
          <MemberCard
            key={index}
            name={member.name}
            imgSrc={member.imgSrc}
            description={`${member.sex}, 만 ${member.age}세`}
            activity={member.activity}
            diet={member.diet}
          />
      ));
  };

    return (
      <div>
        <h5 style={{ textAlign: "center", margin: "20px 0" }}>
          오늘 다른 회원님들은 이런 운동과 식단을 하고 있습니다.
        </h5>
        <div className="member-cards">
          {renderMembersList(members)}
        </div>
        <div className="member-cards">
          {renderMembersList(members1)}
        </div>
      </div>
    );
  };
  
  export default OtherUsersInfo;