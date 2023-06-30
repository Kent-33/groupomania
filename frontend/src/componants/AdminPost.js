import React, { useState } from 'react';

const AdminPost = () => {
    const [isEdit, setIsEdit] = useState()
    const [isDelete, setIsDelete] = useState()

    // async function deletePost() {
    //     await axios.delete("http://localhost:3000/api/post/", {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${JWT}`
    //         }
    //     })
    //     .then(function(response) {
    //        setPosts(response.data)           
    //     })
    // }
    return (
        <div>
            {/* <i className="posts__preview__edit fa-solid fa-pen" onClick={e => isEdit(e, 1)}></i> <i className="posts__preview__edit fa-solid fa-trash" onClick={deletePost}></i> */}
        </div>
    );
};

export default AdminPost;