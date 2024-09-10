import React from "react";
import MainUserInput from "../components/MainUserInput";
import OtherUsersInfo from "../components/OtherUsersInfo";
import './analyze.css';

function Mainpage() {
    return (
        <div className="body">
            <div className="body-container"  style={{marginBottom:"130px"}}>
                <MainUserInput />
            </div>
            <div>
                <OtherUsersInfo />
            </div>
        </div>
    );
}

export default Mainpage;
