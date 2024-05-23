import axios from 'axios';

// Explicitly setting the baseURL to be used in all axios calls.
const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const Login_user = async (credentials) => {
  try {
    const response = await api.post('/api/post/login', credentials);
    console.log("Full response received:", response.data);  // Logging the full response for verification

    // Check if both token and user data with tier are present in the response
    if (!response.data.token || !response.data.user || !response.data.user.tier) {
      console.error('Response missing token or role:', response.data);  // Log the partial or incorrect response
      throw new Error("Missing token or role from the response");
    }

    const { token } = response.data;
    const { tier } = response.data.user;  // Correctly extracting the tier as role

    localStorage.setItem('userToken', token);
    localStorage.setItem('userRole', tier); // Storing user role in localStorage, here it's named 'tier' in the backend

    return { token, role: tier }; // Returning the token and role as tier
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    throw new Error('Failed to log in: ' + (error.response ? error.response.data.message : error.message));
  }
};






export const Register_user = async (credentials) => {
  try {
    const response = await api.post('/api/post/register', credentials);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error.response?.data);
    throw new Error('Failed to register.');
  }
};

export const Logout_user = async () => {
  try {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    await api.post('/api/post/logout');
    console.log('Logged out successfully');
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error('Failed to log out.');
  }
};

export const Reset_password = async (mail) => {
  try {
    const response = await api.post('/api/post/resetpassword', { mail });
    return response.data;
  } catch (error) {
    console.error('Password reset failed:', error.response?.data);
    throw new Error('Failed to reset password.');
  }
};
