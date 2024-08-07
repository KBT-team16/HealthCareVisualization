import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SolutionCard.css'; // SolutionCard.css를 추가로 임포트합니다.

const SolutionCard = ({ title, imgSrc, description }) => {
  return (
    <div className="solution-card" style={{ width: '18rem', margin: '10px' }}>
      <img src={imgSrc} className="solution-card-img" alt={title} />
      <div className="solution-card-body">
        <h5 className="solution-card-title">{title}</h5>
        <p className="solution-card-text">{description}</p>
      </div>
    </div>
  );
};

export default SolutionCard;
