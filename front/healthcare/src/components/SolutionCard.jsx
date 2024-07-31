import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SolutionCard = ({ title, imgSrc, description }) => {
  return (
    <div className="card" style={{ width: '18rem', margin: '10px' }}>
      <img src={imgSrc} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
};

export default SolutionCard;
