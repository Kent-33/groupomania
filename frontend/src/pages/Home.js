import React from 'react';
import Header from '../componants/Header';
import GetPosts from '../componants/GetPosts';
const Home = () => {
    const JWT = localStorage.getItem("token")
    if(JWT){
    return (
        <main className='home'>
            <Header />
            <h1>Les dernières infos</h1>
            <GetPosts />
        </main>
    );
    }
    else {
        window.location = "/login"
    }
};

export default Home;