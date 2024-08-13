import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { startSession } from 'mongoose';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ComparisonChart = () => {
    // 예시 데이터 - 실제 데이터로 교체
    const inbodyScores = [45, 50, 55, 60, 65, 70, 75, 80, 85]; // 인바디 점수
    const peopleCount = [200, 500, 1300, 3000, 5500, 4000, 2500, 1100, 500]; // 각 점수에 해당하는 사람 수

    const chartData = {
        labels: inbodyScores,
        datasets: [
            {
                label: '인바디 점수 분포',
                data: peopleCount,
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // 채운 영역 색상
                borderColor: 'rgba(255, 99, 132, 1)', // 라인 색상
                borderWidth: 2,
                pointBackgroundColor: 'rgba(255, 99, 132, 1)', // 점 색상
                fill: 'start', // 그래프 아래 영역 채우기
                tension: 0.4 // 부드러운 곡선 설정 (선택사항)
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
