import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MemberCard.css';

const MemberCard = ({ name, imgSrc, description, activity, diet }) => {
  return (
    <div className="member-card mb-3">
      <div className="member-card-container">
        <div className="member-card-upper">
          <img src={imgSrc} className="member-card-img" alt={imgSrc} />
          <div className="member-card-body">
            <h5 className="member-card-title">{name}</h5>
            <p className="member-card-text"><small className="text-body-secondary">{description}</small></p>
            
          </div>
        </div>
        <div className="member-card-lower">
          <div className="circle-container">
            <div className="circle">{activity}</div>
            <div className="circle">{diet}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
