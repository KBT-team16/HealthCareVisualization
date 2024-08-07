import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MemberCard.css'; // MemberCard.css를 추가로 임포트합니다.

const MemberCard = ({ title, imgSrc, description }) => {
  return (
    <div className="member-card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={imgSrc} className="member-card-img img-fluid rounded-start" alt={title} />
        </div>
        <div className="col-md-8">
          <div className="member-card-body">
            <h5 className="member-card-title">{title}</h5>
            <p className="member-card-text"><small className="text-body-secondary">{description}</small></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
