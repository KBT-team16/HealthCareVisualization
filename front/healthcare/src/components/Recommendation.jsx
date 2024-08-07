import React, { useState } from 'react';
import './Recommendation.css';
import SolutionCard from './SolutionCard';
import axios from 'axios';
import runningImage from '/Users/minseopark/Desktop/KTBproject/Healthcare/HealthCareVisualization/front/healthcare/src/img/running.jpg'

const Recommendation = ({ inbodyScore }) => {
    //const [solutions, setSolutions] = useState([]);

    const [solutions, setSolutions] = useState([
        { title: '추천 운동 1', imgSrc: runningImage, description: '추천 운동 1에 대한 설명' },
        { title: '추천 운동 2', imgSrc: runningImage, description: '추천 운동 2에 대한 설명' },
        { title: '추천 운동 3', imgSrc: runningImage, description: '추천 운동 3에 대한 설명' },
        { title: '추천 식단 1', imgSrc: runningImage, description: '추천 식단 1에 대한 설명' },
        { title: '추천 식단 2', imgSrc: runningImage, description: '추천 식단 2에 대한 설명' },
        { title: '추천 식단 3', imgSrc: runningImage, description: '추천 식단 3에 대한 설명' }
        ]);
    /*useEffect(() => {
        const fetchSolutions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/solutions');
                setSolutions(response.data);
            } catch (error) {
                console.error('Error fetching solutions data:', error);
            }
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
        } else {
            return '현재 정상 체중 상태입니다.';
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
            <p style={{textAlign: "center", fontStyle: "italic"}}>{getRecommendationMessage(inbodyScore)}</p>

            <div>
                <h4 style={{margin: "20px 0"}}>추천 운동</h4>
                <div className="solution-container">
                    {renderSolutions('추천 운동')}
                </div>
            </div>

            <div>
                <h4 style={{margin: "20px 0"}}>추천 식단</h4>
                <div className="solution-container">
                    {renderSolutions('추천 식단')}
                </div>
            </div>
        </div>
    );
};

export default Recommendation;
