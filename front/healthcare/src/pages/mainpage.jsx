import React from "react";
import MainUserInput from "../components/MainUserInput";
import OtherUsersInfo from "../components/OtherUsersInfo";
import './analyze.css';

function Mainpage() {
    return (
        <div className="body">
            <div className="body-container">
                <MainUserInput />
                <OtherUsersInfo />
            </div>
        </div>
    );
}

export default Mainpage;
