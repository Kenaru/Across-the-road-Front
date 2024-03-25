import axios from 'axios';


const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const Login_user = async (credentials) => {
  try {

    const response = await api.post('/api/connection/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error('Failed to log in.');
  }
};

export const Register_user = async (credentials) => {
  try {

    const response = await api.post('/api/connection/register', credentials);
    return response.data;
  } catch (error) {
    throw new Error('Failed to register.');
  }
};


export const Logout_user = () => {
  localStorage.removeItem('token');

  api.post('/api/connection/logout')
      .then(response => {
        console.log('Logged out successfully:', response.data);
      })
      .catch(error => {
        console.error('Logout error:', error);
      });

};

export const Reset_password = async (email) => {
  try {
    const response = await api.post('/api/connection/resetpassword', { email });
    return response.data;
  } catch (error) {
    throw new Error('Failed to reset password.');
  }
};
