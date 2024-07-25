import { Link } from 'react-router-dom';
import React from 'react';
import './Nav.css';

function Nav() {
    return (
        <div>
            <div className="navbar">
                <Link className="navbarMenu" to={'/'}>메인 페이지</Link>
                <Link className="navbarMenu" to={'/solution'}>솔루션 제공</Link>
                <Link className="navbarMenu" to={'/notice'}>알림</Link>
                <Link className="navbarMenu" to={'/mypage'}>마이 페이지</Link>
            </div>
        </div>
    );
}

export default Nav;