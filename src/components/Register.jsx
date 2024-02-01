import React, { useState } from 'react';
import { registerUser } from '../api/ApiUser'; // Import your registration API function
import { useNavigate} from 'react-router-dom'; // Import useNavigate and Link from react-router-dom
import '../Sass/Register.scss'; // Import the SCSS file

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '', // Added email field to the state
        password: '',
    });
    const navigate = useNavigate(); // Initialize the navigate function

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(formData);
            console.log('Registration successful:', response);

            // Handle the token similarly to a login
            if (response.token) {
                localStorage.setItem('authToken', response.token); // Store the token
                // Set any authentication state here
                navigate('/posts'); // Navigate to posts or a protected route
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
    };


    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    autoComplete="username" // For username field
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email" // For email field
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password" // For new password field
                />

                <button type="submit">Register</button>
            </form>
            <p>Already have an account?</p>
            <button onClick={() => navigate('/Login')}>Login</button>
        </div>
    );
}

export default Register;
