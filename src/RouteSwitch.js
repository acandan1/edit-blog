import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Main from "./Main";
import PostDisplay from "./PostDisplay";
import PostDelete from "./PostDelete";

const RouteSwitch = (props) => {
    return (
        <BrowserRouter basename="/edit-blog">
            <Routes>
                <Route path="/" element= {<Login/>}></Route>
                <Route path="/posts">
                    <Route index element = { <Main/> }></Route>
                    <Route path=":id" >
                        <Route index element = { <PostDisplay/>}></Route>
                        <Route path="/posts/:id/delete" element={<PostDelete/>}></Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
};

export default RouteSwitch;