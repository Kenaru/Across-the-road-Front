import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import CMS from "./components/Website/Cms/CMS";

function App() {
    return (
        <div className='App'>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/CMS" element={<CMS />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
