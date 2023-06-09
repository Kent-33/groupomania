import React, { useState } from "react";
import axios from 'axios';

const AddPost = () => {
    const [postContent, setPostContent] = useState('')
    const [postIllus, setPostIllus] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    async function submit(e) {
        e.preventDefault();

        try{
            const token = localStorage.getItem('token');
            await axios.post("http://localhost:3000/api/post/createPost", {
            headers: {'Authorization': token},    
            data: [postContent, postIllus]
            })
        }
        catch(e) {
            console.log(e);
        }
    }
    return isOpen ? (
            <div className='popup'>
                <div className="popup__container">
                    <div className="popup__header">
                        <h2>Créer un post</h2>
                        <button className='btn btn=primary' onClick={() => setIsOpen(false)}>X</button>
                    </div>               
                    <form action="POST" className='form' id="post__form">
                        <textarea className="form__input" onChange={e => setPostContent(e.target.value)}  id="postContent" placeholder="Contenu du post" />
                        <input type="text" className="form__input" onChange={e => setPostIllus(e.target.value)} id="postIllus" placeholder="Text 2" />
                        <button className="btn btn__primary" onClick={submit}>Poster</button>
                    </form>
                </div>
            </div>
        
    ) : <button className='btn btn-primary' onClick={() => setIsOpen(true)}>+</button>;
};

export default AddPost;