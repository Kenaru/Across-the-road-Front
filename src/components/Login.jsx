import React, { useState } from 'react';
import { Login_user, setAuthToken } from '../api/ApiUser';
import '../Sass/Login.scss';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { token } = await Login_user(formData);
      setAuthToken(token);
      navigate('/'); 
    } catch (error) {
      console.error("Login Error:", error);
      setError('Login failed: ' + (error.message || 'Please check your credentials'));
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="login-container">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
            />
          </div>
          <button type="submit" disabled={loading} className="login-button">
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
        {loading && <div className="loading-indicator">Loading...</div>}
 
        <div className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
  );
}

export default Login;
