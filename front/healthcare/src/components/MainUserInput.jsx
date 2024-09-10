import React, { useState, useContext } from 'react';
import { UserContext } from "./UserContext.jsx";
import './MainUserInput.css';

const MainUserInput = () => {
    const { userid } = useContext(UserContext);  // 전역 userid 가져오기
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [diet, setDiet] = useState('');
    const [exercise, setExercise] = useState('');

    // 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 보내려는 데이터 객체 생성
        const formData = {
            userid,  // 전역 userid 포함
            weight: weight || 'defaultWeight', // 키를 입력하지 않았을 경우 기본 값
            height: height || 'defaultHeight', // 체중을 입력하지 않았을 경우 기본 값
            diet,
            exercise,
        };

        try {
            // 백엔드에 POST 요청 보내기 (예: /api/submit에 POST 요청)
            const response = await fetch('/api/submit', {  // 적절한 API 엔드포인트 설정
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('데이터가 성공적으로 전송되었습니다.');
                // 성공적인 전송 후에 추가 동작
            } else {
                console.error('데이터 전송에 실패했습니다.');
            }
        } catch (error) {
            console.error('에러 발생:', error);
        }
    };

    return (
        <form className='userInput' onSubmit={handleSubmit}>
            <h3>오늘의 상태 입력</h3>

            <div className='inBlock'>
                <label>체중 : 
                    <input 
                        type="text" 
                        placeholder='체중을 입력하세요' 
                        name="weight" 
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                </label>
                <label>키 : 
                    <input 
                        type="text" 
                        placeholder='키를 입력하세요' 
                        name="height" 
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                </label>
            </div>

            <h6>체중과 키를 입력하지 않는다면, 기존의 체중과 키로 반영됩니다.</h6>

            <div className='inBlock'>
                <label>오늘의 식단 : 
                    <input 
                        type="text" 
                        placeholder="식단을 입력하세요" 
                        name="diet" 
                        value={diet}
                        onChange={(e) => setDiet(e.target.value)}
                    />
                </label>
                <label>오늘의 운동 : 
                    <input 
                        type="text" 
                        placeholder='운동을 입력하세요' 
                        name="exercise" 
                        value={exercise}
                        onChange={(e) => setExercise(e.target.value)}
                    />
                </label>
            </div>

            <h6>오늘의 식단과 운동을 입력해주세요.</h6>

            <button type="submit" className='submitButton'>제출</button>
        </form>
    );
};

export default MainUserInput;
