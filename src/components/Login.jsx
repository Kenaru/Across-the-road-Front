import React, { useState } from 'react';
import { Login_user } from '../api/ApiUser';
import { setAuthToken } from '../api/Authcontext';
import logo from '../assets/logo_b.png';
import '../Sass/Login.scss';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ mail: '', password: '' });
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
      const data = await Login_user(formData);
      // If token is received, handle success scenario (e.g., store token, navigate)
      setAuthToken(data.token);
      navigate('/home');
    } catch (error) {
      setError(error.message); // Display a user-friendly error message
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return (
      <div className="page-wrapper">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo"/>
        </div>

        <div className="login-container">
          <h2>Login</h2>

          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="mail"
                     name="mail"
                     placeholder="Email"
                     value={formData.email}
                     onChange={handleChange}
                     required/>
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
                  autoComplete="on"
                  required
              />
            </div>
            <button type="submit" disabled={loading} className="login-button">
              {loading ? 'Please wait...' : 'Login'}
            </button>
          </form>
          {loading && <div className="loading-indicator">Logging in...</div>}
          <div className="register-link">
            Don't have an account? <Link to="/register">Create an account</Link>
          </div>
        </div>
      </div>
  );
}

export default Login;
