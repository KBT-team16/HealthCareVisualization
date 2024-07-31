import React, { useState } from 'react';
import './Recommendation.css';
//import axios from 'axios';
import SolutionCard from './SolutionCard';

const Recommendation = ({inbodyScore}) => {
    // const [solutions, setSolutions] = useState([]);

    // 이부분 잠시 넣은거
    //const Recommendation = ({ inbodyScore }) => {
    const [solutions, setSolutions] = useState([
        { title: '추천 운동 1', imgSrc: 'image1.jpg', description: 'This is a description for 운동 1.' },
        { title: '추천 운동 2', imgSrc: 'image2.jpg', description: 'This is a description for 운동 2.' },
        { title: '추천 운동 3', imgSrc: 'image3.jpg', description: 'This is a description for 운동 3.' },
        { title: '추천 식단 1', imgSrc: 'image4.jpg', description: 'This is a description for 식단 1.' },
        { title: '추천 식단 2', imgSrc: 'image5.jpg', description: 'This is a description for 식단 2.' },
        { title: '추천 식단 3', imgSrc: 'image6.jpg', description: 'This is a description for 식단 3.' }
        ]);
/*
    useEffect(() => {
        const fetchSolutions = async () => {
            const response = await axios.get('http://http://localhost:5000/api/solutions');
            setSolutions(response.data);
        };

        fetchSolutions();
    }, []);
*/
    const getRecommendationMessage = (score) => {
        if (score >= 30) { // 고도 비만일 때,
            return '현재 고도 비만 상태이므로, 저강도 유산소 및 식단을 추천드립니다.';
        } else if (score >= 25) { // 중등도 비만일 때,
            return '현재 중등도 비만 상태이므로, 중간 강도의 운동 및 식단을 추천드립니다.';
        } else if (score >= 20) { // 경도 비만 일때,
            return '현재 경도 비만 상태 이므로, 고강도 운동 및 식단을 추천드립니다.';
        }
    };

    const renderSolutions = (type) => {
        return solutions
            .filter(solution => solution.title.includes(type))
            .map((solution, index) => (
                <SolutionCard
                    key={index}
                    title={solution.title}
                    imgSrc={solution.imgSrc}
                    description={solution.description}
                />
            ));
    };

    return (
        <div>
          <h3>추천 솔루션</h3>
          <p>{getRecommendationMessage(30)}</p>
          
          <div>
            <h5>추천 운동</h5>
            <div className="solution-container">
              {renderSolutions('추천 운동')}
            </div>
          </div>
    
          <div>
            <h5>추천 식단</h5>
            <div className="solution-container">
              {renderSolutions('추천 식단')}
            </div>
          </div>
        </div>
      );
    };
export default Recommendation;
