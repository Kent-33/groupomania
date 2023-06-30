import React from 'react'
import axios from 'axios'

const LikePost = ({likes, dislikes, postId, user}) => {
    console.log(likes)

    async function postLiked(e, like) {        
        const userId = user

        try{
            const url = `http://localhost:3000/api/post/${postId}/like`
            const JWT = localStorage.getItem("token")
            await axios.post(url, {   
             userId, like 
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JWT}`
                }
            })
           
        }
        catch(e) {
            console.log(e);
        }
    }
       
    return (
        <div className='posts__preview__like'>
            <div className='posts__preview__like__btn' onClick={e => postLiked(e, 1)}><i className="fa-solid fa-thumbs-up"></i> {likes}</div>
            <div className='posts__preview__like__btn' onClick={e => postLiked(e, -1)}><i className="dislike fa-solid fa-thumbs-up"></i> {dislikes}</div>
        </div>
    );
};

export default LikePost;