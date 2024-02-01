import axios from 'axios';

const API_BASE_URL = 'http://localhost:5500'; // Replace with your actual API base URL


export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

export const Login_user = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data; // This should include the token
  } catch (error) {
    throw error.response.data;
  }
};


export const Register_user = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, credentials);
    return response.data; // This should include the token
  } catch (error) {
    throw error.response.data;
  }
};