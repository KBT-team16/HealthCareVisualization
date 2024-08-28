import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const InbodyChart = () => {
    const [userData, setUserData] = useState(null);
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        fetch('http://localhost:8080/inbody-data/first')
            .then(response => response.json())
            .then(data => {
                const weight = parseFloat(data.weight);
                const bodyFat = parseFloat(data.body_fat);
                const skeletalMuscleMass = parseFloat(data.skeletal_muscle_mass);
                const inbodyScore = parseFloat(data.inbody_score);
                const goalWeight = parseFloat(data.weight) + parseFloat(data.weight_control);
                const goalFat = parseFloat(data.body_fat) + parseFloat(data.fat_control);
                const goalMuscle = parseFloat(data.skeletal_muscle_mass) + parseFloat(data.muscle_control);

                setUserData({
                    weight,
                    bodyFat,
                    skeletalMuscleMass,
                    inbodyScore,
                    goalWeight,
                    goalFat,
                    goalMuscle
                });
            })
            .catch(error => {
                console.error("Error fetching inbody data:", error);
            });

        // 차트 옵션을 창 크기에 따라 조정
        const handleResize = () => {
            const width = window.innerWidth;
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
                        text: 'Inbody Data Visualization',
                        font: {
                            size: isSmallScreen ? 14 : 18,
                        },
                    },
                },
                scales: {
                    x: {
                        ticks: {
                            font: {
                                size: isSmallScreen ? 10 : 14,
                            },
                        },
                    },
                    y: {
                        ticks: {
                            font: {
                                size: isSmallScreen ? 10 : 14,
                            },
                        },
                    },
                },
                barThickness: isSmallScreen ? 10 : 30,
            });
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // 처음 로드될 때도 적용

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    const actualValues = [
        userData.weight,
        userData.bodyFat,
        userData.skeletalMuscleMass,
        userData.inbodyScore
    ];

    const targetValues = [
        userData.goalWeight,
        userData.goalFat,
        userData.goalMuscle
    ];

    const chartData = {
        labels: ['체중', '체지방량', '골격근량', '인바디 점수'],
        datasets: [
            {
                label: '현재 몸 상태',
                data: actualValues,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 0.3,
                hoverBackgroundColor: 'rgba(255, 159, 64, 0.2)',
                hoverBorderColor: 'rgb(255, 159, 64)',
                hoverBorderWidth: 0.3
            },
            {
                label: '목표치',
                data: targetValues,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 0.3,
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.2)',
                hoverBorderColor: 'rgb(75, 192, 192)',
                hoverBorderWidth: 0.3
            }
        ]
    };

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default InbodyChart;
