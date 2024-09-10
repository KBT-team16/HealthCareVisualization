import React, { useState, useEffect } from 'react';
import './OtherUsersInfo.css';
import MemberCard from './MemberCard';
import profileImage from '../img/bear.jpeg';

const OtherUsersInfo = () => {

    const [members, setMembers] = useState ([
        { title: '회원 1', imgSrc: profileImage, description: '여, 만 25세'},
        { title: '회원 2', imgSrc: profileImage, description: '남, 만 30세' },
        { title: '회원 3', imgSrc: profileImage, description: '여, 만 28세' },
        
    ])
    const [members1, setMembers1] = useState ([
      { title: '회원 1', imgSrc: profileImage, description: '운동 : 러닝'},
        { title: '회원 2', imgSrc: profileImage, description: '운동 : 러닝' },
        { title: '회원 3', imgSrc: profileImage, description: '운동 : 러닝' },
    ])

    const renderMembersList = (membersList) => {
      return membersList.map((member, index) => (
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