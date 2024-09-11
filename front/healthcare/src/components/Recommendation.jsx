import React, { useEffect, useState, useContext } from 'react';
import './Recommendation.css';
import SolutionCard from './SolutionCard';
import { UserContext } from "./UserContext.jsx";

import aerobics from '../imgSolution/aquaAerobics_low.jpeg';
import badminton from '../imgSolution/badminton_medium.png';
import bycycleL from '../imgSolution/bycycle_low.jpeg';
import bycycle from '../imgSolution/bycycle_medium_high.jpeg';
import dance from '../imgSolution/dance_low_medium.jpeg';
import jumpRope from '../imgSolution/jumpRope_high.jpeg';
import mountain from '../imgSolution/mountain_medium_high.webp';
import running from '../imgSolution/running_high.jpg';
import skate from '../imgSolution/skate_high.jpeg';
import squash from '../imgSolution/squash_high.png';
import stair from '../imgSolution/stair_medium.jpeg';
import swim from '../imgSolution/swim_high.jpeg';
import walkM from '../imgSolution/walk_medium.jpeg';
import walkL from '../imgSolution/walking_low.jpeg';
import avocadoToast from '../imgSolution/avocadoToast.jpg';
import chickenSalad from '../imgSolution/chickenSalad.jpg';
import salmonBowl from '../imgSolution/salmonBowl.jpg';
import tortillaWrap from '../imgSolution/tortillaWrap.jpg';
import tofuVege from '../imgSolution/tofuVege.jpg';
import chickenPasta from '../imgSolution/chickenPasta.png';
import eggFrittata from '../imgSolution/eggFrittata.jpeg';
import peanutButter from '../imgSolution/peanutButter.avif';
import salmonRoll from '../imgSolution/salmonRoll.jpeg';
import steakandpotato from '../imgSolution/steakandpotato.avif';
import chickenWrap from '../imgSolution/chickenWrap.jpeg';
import greekYogurt from '../imgSolution/greekYogurt.jpeg';
import lentilBean from '../imgSolution/lentilBean.jpeg';
import vegeSoup from '../imgSolution/vegeSoup.jpeg';
import stirFriedVege from '../imgSolution/stirFriedVege.jpeg';

const Recommendation = () => {

    const { userid } = useContext(UserContext);  // 전역 userid 가져오기

    const [inbodyData, setInbodyData] = useState({
        body_fat_percentage: null,
        gender: ''
    });
    const [exerciseRecommendations, setExerciseRecommendations] = useState([]);
    const [dietRecommendations, setDietRecommendations] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        console.log('나 실행중 ㅎㅎ')
        const fetchInbodyData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/inbody-data/first');
                const data = await response.json();

                setInbodyData({
                    body_fat_percentage: parseFloat(data.body_fat_percentage),
                    gender: data.sex === 'F' ? 'female' : 'male'
                });
            } catch (error) {
                console.error('Error fetching inbody data:', error);
            }
        };

        fetchInbodyData();
    }, [userid]);

    const lowIntensityExercises = [
        { title: '걷기', imgSrc: walkL, description: '- 하루 30분 ~ 1시간\n- 심폐 기능을 개선하고 혈액 순환을 촉진하는 저강도 운동입니다.'},
        { title: '자전거 타기(느린 속도)', imgSrc: bycycleL, description: '- 하루 30분 ~ 1시간\n- 가벼운 자전거 타기로 심신의 부담을 줄이고 건강을 유지합니다.' },
        { title: '느린 춤', imgSrc: dance, description: '- 하루 20분 ~ 30분\n- 리듬에 맞춰 느리게 춤추며 스트레스를 해소하고 유연성을 기릅니다.' },
        { title: '아쿠아 에어로빅', imgSrc: aerobics, description: '- 하루 1시간 ~ 2시간\n- 물 속에서 운동하여 관절에 무리를 주지 않고 체력을 향상시킵니다.' }
    ];

    const mediumIntensityExercises = [
        { title: '빠르게 걷기', imgSrc: walkM, description: '- 하루 30분 ~ 45분\n- 일정한 속도로 걷기 운동을 하여 심폐 기능과 체력을 강화합니다.' },
        { title: '자전거 타기(보통 속도)', imgSrc: bycycle, description: '- 하루 30분 ~ 45분\n- 중간 속도로 자전거를 타며 심혈관 건강을 개선합니다.' },
        { title: '계단 오르기', imgSrc: stair, description: '- 하루 20분 ~ 30분\n- 계단을 오르내리며 하체 근력을 강화하고 칼로리를 소모합니다.' },
        { title: '빠른 춤', imgSrc: dance, description: '- 하루 30분 ~ 45분\n- 활발한 춤으로 심박수를 높여 체력을 증진시키고 기분을 좋게합니다.' },
        { title: '배드민턴', imgSrc: badminton, description: '- 하루 30분 ~ 1시간\n- 신속한 반응과 민첩성을 요구하는 스포츠로 체력과 협응력을 향상시킵니다.' },
        { title: '낮은 산 오르기', imgSrc: mountain, description: '- 하루 1시간 ~ 2시간\n- 낮은 산을 오르며 심폐 지구력을 키웁니다.' }
    ];

    const highIntensityExercises = [
        { title: '달리기', imgSrc: running, description: '- 하루 20분 ~ 30분\n- 빠르게 달리며 심폐 기능을 강화하고 체지방을 효과적으로 태웁니다.' },
        { title: '자전거 타기', imgSrc: bycycle, description: '- 하루 30분 ~ 45분\n- 빠른 속도로 자전거를 타며 근육과 심혈관 건강을 동시에 향상시킵니다.' },
        { title: '인라인/아이스 스케이트', imgSrc: skate, description: '- 하루 30분 ~ 45분\n- 빠르게 스케이팅하며 전신 운동과 균형 감각을 기릅니다.' },
        { title: '줄넘기', imgSrc: jumpRope, description: '- 하루 15분 ~ 20분\n- 빠른 속도로 줄넘기를 하여 전신의 지구력과 협응력을 개선합니다.' },
        { title: '수영', imgSrc: swim, description: '- 하루 30분 ~ 45분\n- 전신을 사용하여 수영을 하며 근력을 강화하고 유연성을 기릅니다.' },
        { title: '스쿼시', imgSrc: squash, description: '- 하루 30분 ~ 1시간\n- 빠르고 강렬한 스쿼시 게임으로 체력을 기르고 반사 신경을 향상시킵니다.' },
        { title: '등반', imgSrc: mountain, description: '- 하루 1시간 ~ 2시간\n- 등산을 통해 근력과 인내심을 기르고 전신을 강화합니다.' }
    ];

    const lowIntensityDiets = [
        { title: '현미밥과 닭가슴살 채소볶음', imgSrc: stirFriedVege, description: '- 현미밥 1/2 공기 \n- 닭가슴살 100-150g (구워서) \n- 브로콜리, 당근, 양파, 피망 \n- 저염 간장 1스푼과 마늘로 맛을 낸 볶음' },
        { title: '렌틸콩 샐러드와 구운 연어', imgSrc: lentilBean, description: '- 구운 연어 100g과 렌틸콩 1/2컵 \n- 로메인 상추, 시금치, 양배추 \n- 방울토마토, 오이, 파프리카 \n- 올리브 오일 1스푼 + 발사믹 식초 드레싱 \n- 곁들임: 아보카도 1/4' },
        { title: '그릭 요거트 보울', imgSrc: greekYogurt, description: '- 플레인 그릭 요거트 1컵 \n- 베리류(블루베리, 딸기 등) 1/2컵 \n- 견과류 약간 + 치아씨드 1스푼 \n- 꿀이나 메이플 시럽 약간 \n- 곁들임: 통밀빵 1조각 또는 오트밀 쿠키' },
        { title: '닭가슴살 또띠아 랩', imgSrc: chickenWrap, description: '- 통밀 또띠아 1장 \n- 구운 닭가슴살 100g \n- 시금치, 양상추, 토마토, 오이 \n- 저지방 그릭 요거트 또는 허니 머스타드 \n- 곁들임: 아보카도 슬라이스 또는 야채 스틱' },
        { title: '두부와 채소 스프', imgSrc: vegeSoup, description: '- 두부 100g \n- 브로콜리, 당근, 양배추, 버섯 \n- 저염된 된장이나 간장으로 맛을 낸 국물 \n- 마늘과 생강 약간으로 향을 더함 \n- 곁들임: 현미밥 1/2공기 또는 통곡물빵.' }
    ];

    const mediumIntensityDiets = [
        { title: '땅콩버터 바나나 토스트', imgSrc: peanutButter, description: '- 통밀빵 2조각 \n- 땅콩버터 2스푼 \n- 바나나 1개 + 꿀 약간 \n- (선택) 그릭 요거트 1컵 + 꿀과 견과류' },
        { title: '소고기 스테이크와 구운 감자', imgSrc: steakandpotato, description: '- 소고기 스테이크 150-200g \n- 올리브 오일에 구운 감자 1개 \n- 버터를 곁들인 아스파라거스, 브로콜리 \n- 아보카도 1/4 \n- (디저트) 고칼로리 과일 + 요거트' },
        { title: '연어 아보카도 롤', imgSrc: salmonRoll, description: '- 연어 100g + 아보카도 1/2 \n- 밥 1공기 + 김 2장 \n- 간장 소스와 고추냉이 약간 \n- 된장국 또는 미소 된장국' },
        { title: '닭가슴살 크림 파스타', imgSrc: chickenPasta, description: '- 통밀 파스타 1컵 \n- 구운 닭가슴살 150g \n- 크림 소스(저지방 우유+치즈로 만듦) \n- 시금치와 마늘 볶음 + 치즈 약간 \n- 채소 샐러드와 올리브 오일' },
        { title: '계란 프리타타와 고구마', imgSrc: eggFrittata, description: '- 계란 3개 + 치즈 30g \n- 시금치, 양파, 토마토, 버섯 등 \n- 올리브 오일 약간 + 고구마 1개 \n- 사과 1개 또는 신선한 과일' }
    ];

    const highIntensityDiets = [
        { title: '그릴드 치킨 샐러드', imgSrc: chickenSalad, description: '- 그릴드 치킨 가슴살 150g \n- 로메인 상추, 시금치, 양상추 \n- 방울토마토 5-6개 \n- 아보카도 1/4와 올리브오일 \n- 발사믹 식초 드레싱 + 통밀빵 1조각' },
        { title: '연어와 퀴노아 보울', imgSrc: salmonBowl, description: '- 구운 연어 100-150g \n- 퀴노아 1/2 + 아보카도 1/4 \n- 브로콜리, 당근, 아스파라거스 \n- 참깨 또는 약간의 간장 드레싱' },
        { title: '치킨 또띠아 랩', imgSrc: tortillaWrap, description: '- 통밀 또띠아 1장 \n- 그릴드 치킨 가슴살 100g \n- 아보카도 1/4, 시금치, 양상추, 토마토 \n- 그릭 요거트 2스푼 + 레몬즙' },
        { title: '계란과 아보카도 토스트', imgSrc: avocadoToast, description: '- 통밀빵 1-2조각 + 아보카도 1/2 \n- 계란 2개, 시금치, 루꼴라 \n- 체리 토마토 5-6개' },
        { title: '통곡물 밥과 두부 야채 볶음', imgSrc: tofuVege, description: '- 현미밥 1/2 공기와 두부 100g \n- 브로콜리, 당근, 양배추, 피망 \n- 저염 간장 또는 고추장 간장' }
    ];

    // 카테고리 결정 함수
    const getCategory = (bodyFatPercentage, gender) => {
        if (gender === 'male') {
            if (bodyFatPercentage <= 6) return '저체중';
            if (bodyFatPercentage > 6 && bodyFatPercentage <= 24) return '정상 체중';
            if (bodyFatPercentage > 24 && bodyFatPercentage <= 29) return '과체중';
            if (bodyFatPercentage >= 30) return '비만';
        } else if (gender === 'female') {
            if (bodyFatPercentage <= 14) return '저체중';
            if (bodyFatPercentage > 14 && bodyFatPercentage <= 30) return '정상 체중';
            if (bodyFatPercentage > 30 && bodyFatPercentage <= 36) return '과체중';
            if (bodyFatPercentage >= 37) return '비만';
        }
        return null;
    };

    // 현재 몸 상태(Category)에 따른 운동 추천
    const getExercise = (category) => {
        switch (category) {
            case '저체중': // 저체중이면 저강도
                return lowIntensityExercises;
            case '정상 체중':
            case '과체중': // 정상체중 또는 과체중이면 중강도
                return mediumIntensityExercises;
            case '비만': // 비만이면 고강도
                return highIntensityExercises;
            default:
                return [];
        }
    };

    // 현재 몸 상태(Category)에 따른 식단 추천
    const getDiet = (category) => {
        switch (category) {
            case '저체중': // 저체중이면 고단백 식단
                return highIntensityDiets;
            case '정상 체중': // 정상체중이면 중단백 식단
                return mediumIntensityDiets;
            case '과체중':
            case '비만': // 과체중 또는 비만이면 저단백 식단
                return lowIntensityDiets;
            default:
                return [];
        }
    };

    // 현재 몸 상태에 대한 메세지
    const getMessage = (category) => {
        switch (category) {
            case '저체중':
                return '회원님은 현재 저체중입니다.\n체중 증가가 필요하므로 고칼로리 음식과 함께 저강도 운동을 추천드립니다.';
            case '정상 체중':
                return '회원님은 현재 정상 체중입니다.\n현재 체중을 유지하기 위해 적절한 운동과 균형 잡힌 식단을 추천드립니다.';
            case '과체중':
                return '회원님은 현재 과체중입니다.\n체중 감소를 위해 중강도 운동과 건강한 저칼로리 식단을 추천드립니다.';
            case '비만':
                return '회원님은 현재 비만입니다.\n체중 감소를 위해 고강도 운동과 저칼로리 식단을 강력히 추천드립니다.';
            default:
                return '';
        }
    };

    // 랜덤으로 3개 아이템 선택
    const getRandomItems = (list) => {
        const shuffled = list.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    };

    useEffect(() => {
        if (inbodyData.body_fat_percentage !== null && inbodyData.gender) {
            const category = getCategory(inbodyData.body_fat_percentage, inbodyData.gender);
            const exerciseRec = getExercise(category);
            const dietRec = getDiet(category);
            const messageRec = getMessage(category);

            const randomExercises = getRandomItems(exerciseRec);
            const randomDiets = getRandomItems(dietRec);

            setExerciseRecommendations(randomExercises);
            setDietRecommendations(randomDiets);
            setMessage(messageRec);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inbodyData]);

    const renderSolutions = (list) => {
        return list.map((solution, index) => (
            <SolutionCard
                key={index}
                title={solution.title}
                imgSrc={solution.imgSrc}
                description={solution.description}
            />
        ));
    };

    return (
        <div style={{ whiteSpace: 'pre-wrap' }}>
            <h3>추천 솔루션</h3>
            <h5 style={{ textAlign: "center", margin: "40px" }}>
                {message}
            </h5>

            <div>
                <h4 style={{ margin: "20px 0" }}>추천 운동</h4>
                <div className="solution-container">
                    {renderSolutions(exerciseRecommendations)}
                </div>
            </div>

            <div>
                <h4 style={{ margin: "20px 0" }}>추천 식단</h4>
                <div className="solution-container">
                    {renderSolutions(dietRecommendations)}
                </div>
            </div>
        </div>
    );
};

export default Recommendation;
