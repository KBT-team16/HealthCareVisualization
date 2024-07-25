import { Link } from 'react-router-dom';
import React from 'react';
import './Navbar.css';

function Navbar() {
    return (
        <div className='header'>
            <div className='navbar'>
                <Link className='navbarMenu' to={'/pages/main'}>메인 페이지</Link>
                <Link className='navbarMenu' to={'/pages/mypage'}>마이 페이지</Link>
                <Link className='navbarMenu' to={'/pages/notice'}>알림</Link>
                <Link className='navbarMenu' to={'/pages/solution'}>솔루션 제공</Link>
            </div>
        </div>
    );
}

export default Navbar;