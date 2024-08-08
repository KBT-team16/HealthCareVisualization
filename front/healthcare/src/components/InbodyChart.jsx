import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const InbodyChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/inbody/user/CAD4E5E5AE8D7CACE0535F00A8C075E0');
                const data = response.data;
                console.log("Fetched data : ", data);

                if (data && data.length > 0) {
                    const lastData = data[data.length - 1];

                    const mappedData = {
                        userNumber: lastData.user_number,
                        date: lastData.date,
                        time: lastData.time,
                        sex: lastData.sex,
                        birthYear: lastData.birth_year,
                        weight: lastData.weight,
                        bodyFat: lastData.body_fat,
                        skeletalMuscleMass: lastData.skeletal_muscle_mass,
                        bodyFatPercentage: lastData.body_fat_percentage,
                        inbodyScore: lastData.inbody_score,
                        weightControl: lastData.weight_control,
                        fatControl: lastData.fat_control,
                        muscleControl: lastData.muscle_control,
                        basalMetabolicRate: lastData.basal_metabolic_rate,
                        visceralFatLevel: lastData.visceral_fat_level,
                        obesity: lastData.obesity
                    };

                    const actualValues = [
                        mappedData.weight,
                        mappedData.bodyFat,
                        mappedData.skeletalMuscleMass,
                        mappedData.inbodyScore
                    ];
                    const targetValues = [
                        mappedData.weight + mappedData.weightControl,
                        mappedData.bodyFat + mappedData.fatControl,
                        mappedData.skeletalMuscleMass + mappedData.muscleControl,
                        null // Inbody score has no control value
                    ];

                    setChartData({
                        labels: ['체중', '체지방량', '골격근량', '인바디 점수'],
                        datasets: [
                            {
                                label: 'Actual Values',
                                data: actualValues,
                                backgroundColor: 'blue',
                            },
                            {
                                label: 'Target Values',
                                data: targetValues,
                                backgroundColor: 'red',
                                barThickness: 12,
                                hoverBackgroundColor: 'rgba(255, 0, 0, 0.7)'
                            }
                        ]
                    });
                } else {
                    // 데이터가 없을 경우 빈 데이터셋으로 초기화
                    setChartData({
                        labels: ['체중', '체지방량', '골격근량', '인바디 점수'],
                        datasets: [
                            {
                                label: 'Actual Values',
                                data: [0, 0, 0, 0],
                                backgroundColor: 'blue',
                            },
                            {
                                label: 'Target Values',
                                data: [0, 0, 0, null],
                                backgroundColor: 'red',
                                barThickness: 12,
                                hoverBackgroundColor: 'rgba(255, 0, 0, 0.7)'
                            }
                        ]
                    });
                }
            } catch (error) {
                console.error('Error fetching data', error);
                // 데이터 로딩 실패 시 빈 데이터셋으로 초기화
                setChartData({
                    labels: ['체중', '체지방량', '골격근량', '인바디 점수'],
                    datasets: [
                        {
                            label: '현재 몸 상태',
                            data: [0, 0, 0, 0],
                            backgroundColor: 'blue',
                        },
                        {
                            label: '목표치',
                            data: [0, 0, 0, null],
                            backgroundColor: 'red',
                            barThickness: 12,
                            hoverBackgroundColor: 'rgba(255, 0, 0, 0.7)'
                        }
                    ]
                });
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Inbody Data Visualization</h2>
            <Bar 
                data={chartData} 
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: false,
                            text: 'Inbody Data Visualization',
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: false,
                                text: 'Measurement',
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Value',
                            },
                        },
                    },
                }} 
            />
        </div>
    );
};

export default InbodyChart;
