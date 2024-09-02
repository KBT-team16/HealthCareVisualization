import { Link } from 'react-router-dom';
import React from 'react';
import './Navbar.css';
import Complete from './Complete';

function Navbar() {
    return (
        <div className="navbar">
            <div className='navLogo'>
                <Link to="/" className="nav-link" style={{fontSize: "20px", fontWeight: "bolder"}}>Health Care</Link>
            </div>
            <div className="navList">
                <ul>
                    <li>
                        <Link className="nav-link" to='/inbody/analyze'>Solution</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to='/user/mypage'>My Page</Link>
                    </li>
                    <li>
                        <Complete />
                    </li>
                    <li>
                        
                        <button className='loginButton'>
                            <Link className="nav-link" to='/sign-in'>로그인</Link>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;