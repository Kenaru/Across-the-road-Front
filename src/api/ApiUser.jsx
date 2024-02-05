import axios from 'axios';

// Make sure this matches the port your backend server is actually running on
const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const Login_user = async (credentials) => {
  try {
    // Correct endpoint for login, assuming your backend defines it as such
    const response = await api.post('/api/post/login', credentials); // Adjusted to match your backend route
    return response.data;
  } catch (error) {
    throw new Error('Failed to log in.');
  }
};

export const Register_user = async (credentials) => {
  try {
    // Correct endpoint for registration, ensure it matches your server's route
    const response = await api.post('/api/post/register', credentials); // This should match your backend route
    return response.data;
  } catch (error) {
    throw new Error('Failed to register.');
  }
};


export const Logout_user = () => {
  localStorage.removeItem('token');

  api.post('/api/post/logout')
      .then(response => {
        console.log('Logged out successfully:', response.data);
      })
      .catch(error => {
        console.error('Logout error:', error);
      });

};

