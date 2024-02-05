import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/pages/Home";

function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <Routes>


                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
