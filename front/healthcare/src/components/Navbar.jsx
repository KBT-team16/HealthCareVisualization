import { Link } from 'react-router-dom';
import React from 'react';
import './Navbar.css';

function Navbar() {
    return (
        <div className="navbar-container">
            <div className='navbar-logo'>
                <Link to="/" className="nav-link" style={{fontSize: "20px", fontWeight: "bolder"}}>Health Care</Link>
            </div>
            <div className="nav-list">
                <ul className="navbar-nav">
                    <li className='nav-item'>
                        <button className='login-btn'>
                            <Link className="nav-link" to='/sign-in'>로그인</Link>
                        </button>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to='/user/mypage'>My Page</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to='/inbody/analyze'>Solution</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to='/notification'>Notice</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;