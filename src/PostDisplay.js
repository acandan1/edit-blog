import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PostDisplay = () => {
    const { id } = useParams();
    const [data, setData] = useState("");
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    const getPost = () => {
        const requestOptions = {
            mode: 'cors',
            method: 'GET'
        };

        fetch(`https://old-lake-2938.fly.dev/blog/posts/${id}`, requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log(data.result);
                setData(data.result);
            })
            .catch((err) => {
                console.log("failure fetching data");
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const requestOptions = {
            mode: 'cors',
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ title: event.target.title.value, text: event.target.text.value, postImg: event.target.postImg.value})
        };

        fetch(`https://old-lake-2938.fly.dev/blog/posts/${id}`, requestOptions)
            .then(response => response.json())
            .then((data) => {
                navigate('/posts');
            });
    } 

    useEffect(() => {
        if (data === "") {
            console.log('hey');
            getPost();
            setToken(localStorage.getItem("token"));
            if (localStorage.getItem('token') === "") {
                navigate('/');
            }
        }
    })

    return (
        <div className="post">
            <button id="go-home" onClick={() => navigate(`/posts`)}>GO BACK</button>
            { data === ""
             ? 
             <h1>Couldn't find post!</h1>
             :
            <form onSubmit={ handleSubmit } className="edit-form">
                <label htmlFor="title">Title</label>
                <input type="text" defaultValue={data.title} name="title"></input>

                <label htmlFor="text">Text</label>
                <textarea defaultValue={data.text} name="text" rows="30" cols="30"></textarea>

                <label htmlFor="postImg">Img</label>
                <input type="text" defaultValue={data.img} name="postImg"></input>

                <input type="submit"></input>
            </form>
            }
            <img src={data.img} alt="hey" id="post-img"></img>
            <button id="delete" onClick={ () => navigate(`/posts/${id}/delete`) }>Delete Post</button>
        </div>
    )
}

export default PostDisplay;