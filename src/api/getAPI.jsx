import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const createPage = async (title) => {
    try {
        const response = await axios.post(`${API_URL}/pages`, { title });
        return response.data;
    } catch (error) {
        console.error('Failed to create page:', error);
        throw error;
    }
};

export const fetchPages = async () => {
    try {
        const response = await axios.get(`${API_URL}/pages`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch pages:', error);
        throw error;
    }
};

export const updatePage = async (id, title) => {
    try {
        const response = await axios.put(`${API_URL}/pages/${id}`, { title });
        return response.data;
    } catch (error) {
        console.error('Failed to update page:', error);
        throw error;
    }
};

export const deletePage = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/pages/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to delete page:', error);
        throw error;
    }
};
