import React from 'react';
import logo from '../assets/img/logo.svg';
import AddPost from './AddPost';

const Header = () => {
    return (
        <header>
            <img src={logo} className='logo' alt="Logo Groupomania" />
            <AddPost />
        </header>
    );
};

export default Header;