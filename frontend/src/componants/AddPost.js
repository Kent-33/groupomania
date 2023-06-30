import React, { useState } from "react";
import axios from 'axios';

const AddPost = () => {
    const [postContent, setPostContent] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    
    async function submit(e) {
        e.preventDefault()
        let formData = new FormData()
        let input = e.target.querySelector('input')
        let file = input.files[0]    
        formData.append("file", file)   
        formData.append("postContent", postContent) 
    
        try{
            const JWT = localStorage.getItem("token")
            console.log(formData.get("file"))
            await axios.post("http://localhost:3000/api/post/createPost", {
                formData: {formData}
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${JWT}`
                }
            })
            setIsOpen(true)
           
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
                    <form action="/upload" methode="POST" className='form' id="post__form" encType="multipart/form-data" onSubmit={submit}>
                        <textarea className="form__input"  id="postContent" placeholder="Contenu du post" />
                        <input type="file" className="form__input" name="postIllus" id="postIllus" placeholder="Illustration du post" accept="image/png, image/jpeg" />
                        <button type="submit" className="btn btn__primary" >Poster</button>
                    </form>
                </div>
            </div>
        
    ) : <button className='btn btn-primary' onClick={() => setIsOpen(true)}>+</button>;
};

export default AddPost;