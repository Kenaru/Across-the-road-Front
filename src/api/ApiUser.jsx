import axios from 'axios';
import { getAuthToken } from '../api/AuthToken'; // Your server's URL
const API_BASE_URL = 'http://localhost:5500'; // Your server's URL

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Log in a user
export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, loginData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/all`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Get a specific user by ID
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Update a user's details
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/user/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Delete a user
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/users/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Get the current user (this function requires server-side implementation details)


// Get the current user based on the authentication token
export const getCurrentUser = async () => {
  try {
    // The endpoint for current user should not need a userId
    // It should identify the user based on the auth token provided in the request headers
    const response = await axios.get(`${API_BASE_URL}/users/current-user`, {
      headers: {
        // Assuming you have a method to get the auth token
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
