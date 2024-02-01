import React, { useState } from 'react';
import { Register_user } from '../api/ApiUser'; 
import { useNavigate } from 'react-router-dom';
import '../Sass/Register.scss'; 

function Register() {
  const [formData, setFormData] = useState({
    lastname: '',
    firstname: '',
    birthday: '',
    mail: '',
    phonenumber: '',
    password: '',
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
    <div className="register-container">
      <h2>Register</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleRegister} className="register-form">
        {/* Render input fields for each form data entry */}
        <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} required />
        <input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} required />
        <input type="date" name="birthday" placeholder="Birthday" value={formData.birthday} onChange={handleChange} />
        <input type="email" name="mail" placeholder="Email" value={formData.mail} onChange={handleChange} required />
        <input type="text" name="phonenumber" placeholder="Phone Number" value={formData.phonenumber} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
}

export default Register;
