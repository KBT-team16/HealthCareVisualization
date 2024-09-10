import React, { useState } from 'react';
import './MainUserInput.css';

const MainUserInput = () => {
    
    return (
        <form className='userInput'>
            <h3>오늘의 상태 입력</h3>

            <div className='inBlock'>
                <label>체중 : 
                    <input type="text" placeholder='체중을 입력하세요' name="weight" />
                </label>
                <label>키 : 
                    <input type="text" placeholder='키를 입력하세요' name="" />
                </label>
            </div>

            <h6>체중과 키를 입력하지 않는다면, 기존의 체중과 키로 반영됩니다.</h6>

            <div className='inBlock'>
                <label>오늘의 식단 : 
                    <input type="text" placeholder="식단을 입력하세요" name="diet" />
                </label>
                <label>오늘의 운동 : 
                    <input type="text" placeholder='운동을 입력하세요' name="exercise" />
                </label>
            </div>

            <h6>오늘의 식단과 운동을 입력해주세요.</h6>

            <button type="submit" className='subitButton'>제출</button>
        </form>
    );
};

export default MainUserInput;
