import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Your API base URL
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('userToken', token);
  } else {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('userToken');
  }
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null); // Store user role

    const login = async (credentials) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login_user`, credentials);
            const { token, role } = response.data; // Assuming backend sends the role as 'role'
            setAuthToken(token);
            setIsAuthenticated(true);
            setUserRole(role); // Update the role in the context
        } catch (error) {
            console.error(error.response.data);
            throw error;
        }
    };

    const logout = () => {
        setAuthToken(null);
        setIsAuthenticated(false);
        setUserRole(null); // Clear the role on logout
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
