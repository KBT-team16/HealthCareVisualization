import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

const ComparisonChart = () => {
    const [inbodyScores, setInbodyScores] = useState([]);
    const [peopleCount, setPeopleCount] = useState([]);
    const [age, setAge] = useState(null);
    const [loading, setLoading] = useState(true); 
    const myInbodyScore = 65; // 이 값은 나중에 입력받을 예정

    useEffect(() => {
        // 나이 데이터를 먼저 가져오기
        fetch('http://localhost:8080/inbody-data/first')
            .then(response => response.json())
            .then(data => {
                const currentYear = new Date().getFullYear();
                const calculatedAge = currentYear - parseInt(data.birth_year, 10);
                setAge(calculatedAge);
            })
            .catch(error => {
                console.error("Error fetching age data:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (age !== null) {
            // 나이에 따른 API 주소 결정
            const ageGroup = Math.floor(age / 10) * 10; // 10대, 20대, 30대 등으로 그룹화
            const apiUrl = `http://localhost:8080/inbody-data/${ageGroup}`;

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
                    setLoading(false); // 데이터 로딩 완료
                })
                .catch(error => {
                    console.error("Error fetching inbody data:", error);
                    setLoading(false); 
                });
        }
    }, [age]);

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

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '인바디 점수 분포도',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: '인바디 점수',
                },
                type: 'linear', // x축을 선형 스케일로 설정
                position: 'bottom',
            },
            y: {
                title: {
                    display: true,
                    text: '사람 수',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default ComparisonChart;
