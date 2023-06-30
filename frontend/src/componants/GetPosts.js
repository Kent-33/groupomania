import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import DatePost from './DatePost';
import defaultImg from '../assets/img/groupomania_default.jpg';
import LikePost from './LikePost';
import AdminPost from './AdminPost';

const GetPosts = () => {    
    const JWT = localStorage.getItem("token")
    const isUser = 1
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/api/post/", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JWT}`
            }
        })
        .then(function(response) {
           setPosts(response.data)           
        })
    }, [])


    return (
        <section className='posts'>
            {posts.map(({_id, postContent, postIllus, likes, dislikes, datePost, userId}) => (
                <div className='posts__preview' key={_id} id={_id} >
                    <img src={postIllus} alt="" />
                    <div className='posts__preview__infos'>
                        <p className='posts__preview__content'>{postContent}</p>
                        <div className='posts__preview__items'>
                            <DatePost date={datePost}/>
                            <LikePost likes={likes} dislikes={dislikes} postId={_id} user={userId} />
                            {/* {isUser ? <AdminPost /> : null} */}
                        </div>
                        
                    </div>             
                </div>
            ))}
        </section>
    );
};

export default GetPosts;