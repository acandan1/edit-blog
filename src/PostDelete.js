import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const PostDelete = () => {
    const [token, setToken] = useState("");

    const navigate = useNavigate();
    const { id } = useParams();

    const handleDelete = (e) => {
        e.preventDefault();
        
        const requestOptions = {
            mode: 'cors',
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        };

        fetch(`https://old-lake-2938.fly.dev/blog/posts/${id}/delete`, requestOptions)
            .then(response => response.json())
            .then((data) => {
                navigate('/posts');
            });
    }

    useEffect(() => {
        if (token === "") {
            setToken(localStorage.getItem("token"));
            if (localStorage.getItem('token') === "") {
                navigate('/');
            }
        }
    })

    return (
        <div className="delete">
            <h1 id="head">Are you sure you want to delete this Post?</h1>
            <button className="edit-button" id="delete-home" onClick={ () => { navigate(`/posts/${id}`)} }>NO</button>
            <button className="edit-button" id="delete-edit" onClick={ handleDelete }>YES</button>
        </div>
    )
}

export default PostDelete;
