const Rectext = () => {

    const userProgram = {
        now: "고도 비만", // 현재 상태 데이터 받아오기
        activity: "저강도 유산소 3과 무산소 7의 비율로 운동", // 운동 솔루션 데이터 받아오기
        diet: "600-700kcal 정도를 섭취해주시고 간식은 줄여주세요." // 식단 솔루션 데이터 받아오기
    }

    return (
        <div className="detail" style={{textAlign: "center", paddingTop: "20px", paddingBottom: "30px"}}>
            <p>현재 {userProgram.now}이므로, {userProgram.activity}을 추천드립니다</p>
            <p>식단의 경우, {userProgram.diet}</p>
        </div>
        
    );
};

export default Rectext;