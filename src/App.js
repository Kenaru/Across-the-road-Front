import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import Resetpassword from "./components/pages/Resetpassword";
import CMSItem from "./components/Website/Cms/CMSItem";
import CMSPage from "./components/Website/Cms/CMSPage";
import CMSAdmin from "./components/Website/Cms/CMSAdmin";

function App() {
    return (
        <div className='App'>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/CMSItem" element={<CMSItem />} />
                     <Route path="/CMSAdmin" element={<CMSAdmin />} />
                      <Route path="/CMSPage/:id" element={<CMSPage />} />
                    <Route path="/resetpassword" element={<Resetpassword />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
