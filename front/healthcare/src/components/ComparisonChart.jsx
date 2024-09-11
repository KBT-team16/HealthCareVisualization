import React, { useState, useEffect, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler } from 'chart.js';
import { UserContext } from './UserContext.jsx';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

const ComparisonChart = ({ onPercentileCalculated }) => {
    const { userid } = useContext(UserContext);
    const [inbodyScores, setInbodyScores] = useState([]);
    const [peopleCount, setPeopleCount] = useState([]);
    const [age, setAge] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [myInbodyScore, setMyInbodyScore] = useState(null);
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        // 나이 데이터를 먼저 가져오기

        // 환경변수 처리하기 : http://localhost:8080/
        fetch('http://localhost:8080/api/inbody-data/first')
            .then(response => response.json())
            .then(data => {
                const currentYear = new Date().getFullYear();
                const calculatedAge = currentYear - parseInt(data.birth_year, 10);
                setAge(calculatedAge);
                setMyInbodyScore(parseInt(data.inbody_score));
            })
            .catch(error => {
                console.error("Error fetching age and inbody score data:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (age !== null && myInbodyScore !== null) {
            // 나이에 따른 API 주소 결정
            const ageGroup = Math.floor(age / 10) * 10; // 10대, 20대, 30대 등으로 그룹화
            const apiUrl = `http://localhost:8080/api/inbody-data/${ageGroup}`;

            // API에서 인바디 데이터 가져오기
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const scores = data[0].map(Number);
                    const counts = data[1];

                    // inbodyScores를 오름차순으로 정렬하고, peopleCount를 그에 맞게 정렬
                    const combinedData = scores.map((score, index) => ({
                        score: score,
                        count: counts[index]
                    }));

                    combinedData.sort((a, b) => a.score - b.score); // 점수 기준 오름차순 정렬

                    const sortedScores = combinedData.map(item => item.score);
                    const sortedCounts = combinedData.map(item => item.count);

                    setInbodyScores(sortedScores);
                    setPeopleCount(sortedCounts);

                    // 상위 몇 %인지 계산
                    const percentile = calculatePercentile(myInbodyScore, sortedScores, sortedCounts);

                    // 부모 컴포넌트로 상위 % 전달
                    if (onPercentileCalculated) {
                        onPercentileCalculated(percentile);
                    }

                    setLoading(false); // 데이터 로딩 완료
                })
                .catch(error => {
                    console.error("Error fetching inbody data:", error);
                    setLoading(false);
                });
        }
    }, [age, myInbodyScore]);

    const calculatePercentile = (score, scores, counts) => {
        let cumulativeCount = 0;
        let totalCount = counts.reduce((acc, count) => acc + count, 0);

        for (let i = 0; i < scores.length; i++) {
            if (scores[i] <= score) {
                cumulativeCount += counts[i];
            }
        }

        // 상위 몇 %인지 계산
        const percentile = ((1 - (cumulativeCount / totalCount)) * 100).toFixed(2);
        return percentile;
    };

    // 화면 크기에 맞게 차트 옵션 설정
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const isSmallScreen = width < 768;

            setChartOptions({
                responsive: true,
                maintainAspectRatio: false,  
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: isSmallScreen ? 10 : 14,
                            },
                        },
                    },
                    title: {
                        display: true,
                        text: '인바디 점수 분포도',
                        font: {
                            size: isSmallScreen ? 14 : 18, // 작은 화면에서는 타이틀 폰트 크기 줄이기
                        },
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: '인바디 점수',
                            font: {
                                size: isSmallScreen ? 10 : 14, 
                            },
                        },
                        type: 'linear', 
                        position: 'bottom',
                    },
                    y: {
                        title: {
                            display: true,
                            text: '사람 수',
                            font: {
                                size: isSmallScreen ? 10 : 14, 
                            },
                        },
                        beginAtZero: true,
                    },
                },
                elements: {
                    point: {
                        radius: isSmallScreen ? 4 : 8,
                    },
                },
            });
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // 처음 로드될 때도 실행

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (loading) {
        return <div>Loading...</div>; 
    }

    // 인바디 점수와 사람 수 데이터를 기반으로 그래프를 그리기 위한 데이터 생성
    const pointData = inbodyScores
        .map((score, index) => ({
            x: score,
            y: peopleCount[index]
        }))
        .filter(point => point.y > 0); // y값이 0보다 큰 경우에만 포함

    const chartData = {
        datasets: [
            {
                label: '회원님의 인바디 점수',
                data: [{ x: myInbodyScore, y: peopleCount[inbodyScores.indexOf(myInbodyScore)] || 0 }],
                backgroundColor: 'rgba(0, 0, 255, 1)', // 파란색 점
                borderColor: 'rgba(0, 0, 255, 1)',
                pointRadius: 8, // 회원님의 점 크기 유지
                pointHoverRadius: 8, // 호버 시 회원님 점 크기 유지
                showLine: false, // 선 그리지 않음
                type: 'scatter', // scatter 차트 타입 사용
                order: 1, // 파란 점이 먼저 렌더링되도록 설정
            },
            {
                label: '인바디 점수 분포',
                data: pointData, // 인바디 점수와 사람 수에 해당하는 점 데이터
                backgroundColor: 'rgba(255, 99, 132, 0.5)', // 채운 영역 색상
                borderColor: 'rgba(255, 99, 132, 1)', // 선 색상
                borderWidth: 2,
                fill: true, // 그래프 아래 영역 채우기
                tension: 0.4, // 부드러운 곡선 설정
                pointRadius: 0, // 점 크기 0으로 설정
                pointHoverRadius: 0, // 호버 시 점 크기 0으로 설정
                order: 2, // 빨간 선이 나중에 렌더링되도록 설정
            }
        ]
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '400px' }}> {/* 차트 크기 지정 */}
            <Line data={chartData} options={chartOptions} />
        </div>
    );
};

export default ComparisonChart;
