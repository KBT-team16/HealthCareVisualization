import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const InbodyChart = () => {
    const userData = {
        user_number: "CB5111727AD7D353E0535F00A8C0F052",
        weight: 79,
        body_fat: 21.8,
        skeletal_muscle_mass: 32,
        inbody_score: 68,
        weight_control: -11.3,
        fat_control: -11.6,
        muscle_control: 0.3
    };

    const actualValues = [
        userData.weight,
        userData.body_fat,
        userData.skeletal_muscle_mass,
        userData.inbody_score
    ];

    const targetValues = [
        userData.weight + userData.weight_control,
        userData.body_fat + userData.fat_control,
        userData.skeletal_muscle_mass + userData.muscle_control,
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
