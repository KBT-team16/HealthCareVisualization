import React from "react";
import MainUserInput from "../components/MainUserInput";
import OtherUsersInfo from "../components/OtherUsersInfo";
import JwtFetcher from "../components/JwtFetcher"; // 올바른 경로로 수정
import "./analyze.css";

function Mainpage() {
  return (
    <div className="body">
      <div className="body-container">
        <MainUserInput />
        <OtherUsersInfo />
      </div>
      <JwtFetcher />
    </div>
  );
}

export default Mainpage;
