import React from "react";
import './analyze.css';
import '../App.css';
import { Link } from "react-router-dom";
import RecWorkout from "../components/RecWorkout";
import RecDiet from "../components/RecDiet";

const Analyze = () => {
    return (
        <div className="body">
            <div className="body-container">
                <InbodyGraph />
            </div>
            <div className="body-container">
                <RecommandSolution />
            </div>
            <div className="body-container">
                <CompareInbody />
            </div>
        </div>
    );
}

function InbodyGraph() {
    return (
        <>
        <div className="analyze-top">
            <div className="analyze-title">
                <h3>인바디 분석 그래프</h3>
            </div>
            <div className="history-btn">
                <button>
                    <Link to='/inbody/history' style={{textDecoration: "none", color: "black"}}>상세 분석 및 나의 히스토리</Link>
                </button>
            </div>
        </div>
        <div className="analyze-body">
            <p>
                하이요 하이요
            </p>
        </div>

        </>       
    )
}

function RecommandSolution() {
    return (
        <>
        <div className="analyze-title">
            <h3>추천 솔루션</h3>
        </div>
        <div className="analyze-body">
            <RecWorkout />
            <RecDiet />
        </div>
        </>
    )
}

function CompareInbody() {
    return (
        <>
        <div className="analyze-title">
            <h3>집합군 비교 분석</h3>
        </div> 
        <div className="analyze-body">
            <p>
                하이요 하이요
            </p>
        </div>
        </>
    )
}

export default Analyze;
