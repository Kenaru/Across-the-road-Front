// Import necessary components and dependencies
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/Register" element={<Register/>} />
                {/* Ajouter des routes */}
            </Routes>
        </Router>
    );
}

export default App;
