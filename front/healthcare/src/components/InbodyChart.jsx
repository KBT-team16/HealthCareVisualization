import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const InbodyChart = () => {

    // 테스트를 위해 임의로 넣은 값들
    
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
    
    // api를 통해서 데이터를 가져오는 부분
    /*
    const [userData, setUserData] = useState(null);
    // setUserData는 상태를 업데이트하는 함수

    // useEffect 훅을 사용하여 컴포넌트가 처음 렌더링될 때 API 호출
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('API_ENDPOINT'); // API_ENDPOINT를 실제 API URL로 변경
                const data = await response.json();
                setUserData(data); // 가져온 데이터를 userDate 상태에 저장한다
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    // API 데이터가 아직 로드되지 않았다면 로딩 표시를 반환
    if (!userData) {
        return <div>Loading...</div>;
    }
    */

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
