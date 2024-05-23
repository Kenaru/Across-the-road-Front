import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './api/Authcontext';

import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import Resetpassword from "./components/pages/Resetpassword";
import CMSItem from "./components/pages/CMSItem";
import CMSAdmin from "./components/pages/CMSAdmin";
import Blog from './components/pages/Blog';
function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/resetpassword" element={<Resetpassword />} />
                    <Route path="/CMSItem" element={<CMSItem />} />
                    <Route path="/CMSAdmin" element={<CMSAdmin />} />
                    <Route path="/blog" element={<Blog />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
