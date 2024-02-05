import React, { useState } from 'react';
import { Register_user } from '../api/ApiUser';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo_b.png';
import '../Sass/Register.scss';

function Register() {
  const [formData, setFormData] = useState({
    lastname: '',
    firstname: '',
    birthday: '',
    mail: '',
    phonenumber: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await Register_user(formData);
      console.log(response);
      navigate('/login');
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
    }
  };

  return (
      <div className="page-wrapper">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo"/>
        </div>
        <div className="register-container">
          <h2>Register</h2>
          {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleRegister} className="register-form">
                <input type="text"
                       name="lastname"
                       placeholder="Last Name"
                       value={formData.lastname}
                       onChange={handleChange}
                       autoComplete={"on"}
                       required/>
                <input type="text"
                       name="firstname"
                       placeholder="First Name"
                       value={formData.firstname}
                       onChange={handleChange}
                       autoComplete={"on"}
                       required/>
                <input type="date"
                       name="birthday"
                       placeholder="Birthday"
                       value={formData.birthday}
                       onChange={handleChange}
                       autoComplete={"on"}
                />
                <input type="email"
                       name="mail"
                       placeholder="Email"
                       value={formData.email}
                       onChange={handleChange}
                       autoComplete={"on"}
                       required/>
                <input type="text"
                       name="phonenumber"
                       placeholder="Phone Number"
                       value={formData.phonenumber}
                       autoComplete={"on"}
                       onChange={handleChange}/>
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
                       autoComplete="on"
                       required/>
                <button type="submit" className="register-button">Register</button>
                <div className="login-link">
                    Do have an account? <Link to="/login">Loggin</Link>
                </div>

            </form>
        </div>
      </div>
  );
}

export default Register;
