import React, { useState } from 'react';
import { Reset_password } from '../../api/ApiUser';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo_b.png';
import '../../Sass/Resetpassword.scss';

function Resetpassword() {
    const [formData, setFormData] = useState({password: '', confirmPassword: ''});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleReset = async (e) => {
        e.preventDefault();
        try {
            const response = await Reset_password(formData);
            console.log(response);
            navigate('/login');
        } catch (error) {
            setError(error.message || 'Reset failed. Please try again.');
        }
    };

    return (
        <div className="page-wrapper">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo"/>
            </div>
            <div className="reset-container">
                <h2>Reset Password</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleReset} className="reset-form">
                    <input type="password"
                           name="password"
                           placeholder="Password"
                           value={formData.password}
                           onChange={handleChange}
                           autoComplete={"on"}
                           required/>
                    <input type="password"
                           name="confirmPassword"
                           placeholder="Confirm Password"
                           value={formData.confirmPassword}
                           onChange={handleChange}
                           autoComplete={"on"}
                           required/>
                    <button type="submit" className="submit-button">Reset</button>
                </form>
                <Link to="/login" className="link">Login</Link>
            </div>
        </div>
    );
}

export default Resetpassword;