import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const InbodyChart = () => {
    const [userData, setUserData] = useState(null);

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

                // 데이터를 상태에 저장
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
        userData.goalMuscle,
        null
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
                barThickness: 30,
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
                barThickness: 30,
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.2)',
                hoverBorderColor: 'rgb(75, 192, 192)',
                hoverBorderWidth: 0.3
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
                text: 'Inbody Data Visualization',
            },
        },
    };

    return (
        <div>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default InbodyChart;
