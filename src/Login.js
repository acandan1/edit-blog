import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();

        const requestOptions = {
            mode: 'cors',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: event.target.username.value, password: event.target.password.value})
        };

        fetch('https://old-lake-2938.fly.dev/auth', requestOptions)
            .then(response => response.json())
            .then((data) => {
                if (data.user === false) {
                    alert("Try again!");
                } else {
                    localStorage.setItem("token", data.token);
                    navigate('/posts');
                }
            });
    }

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={ handleLogin }>
                <label htmlFor="username">Username: </label>
                <input name="username" type="text"></input>

                <label htmlFor="password">Password: </label>
                <input name="password" type="password"></input>

                <input type="submit"></input>
            </form>
        </div>
    )
}

export default Login;