import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './style/main.css';

const Main = (props) => {
    const [data, setData] = useState("");
    const navigate = useNavigate();
    const [token, setToken] = useState("");

    const getPosts = () => {
        const requestOptions = {
            mode: 'cors',
            method: 'GET'
        };

        fetch('https://old-lake-2938.fly.dev/blog/posts', requestOptions)
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

        fetch(`https://old-lake-2938.fly.dev/blog/posts`, requestOptions)
            .then(response => response.json())
            .then((data) => {
                navigate(`/posts/${data.result._id}`);
            });
    }

    useEffect(() => {
        if (data === "") {
            getPosts();
            setToken(localStorage.getItem('token'));
            if (localStorage.getItem('token') === "") {
                navigate('/');
            }
        }
    })

    return (
        <div className="main">
            <ul>
                {
                    data !== "" 
                    ? data.map(d => (<li key={d._id} onClick={() => navigate(`/posts/${d._id}`)}>{d.title}</li>))
                    : <h1>No posts</h1>
                }  
            </ul>
            <form className="create-post" onSubmit={ handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title"></input>

                <label htmlFor="text">Text</label>
                <textarea name="text" rows="30" cols="30"></textarea>

                <label htmlFor="postImg">Img</label>
                <input type="text" name="postImg"></input>

                <input type="submit"></input>
            </form>
        </div>
    )
}

export default Main;