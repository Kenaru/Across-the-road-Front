import apiClient from './apiClient';

export const fetchAllPages = async () => {
    try {
        const response = await apiClient.get('/fetchAllPages');
        if (response.data && Array.isArray(response.data.data)) {
            return response.data.data;
        }
        console.error('API response data is not an array:', response.data);
        return [];
    } catch (error) {
        console.error('Error fetching pages:', error);
        throw error;
    }
};



export const fetchPageById = async (id) => {
    try {
        const response = await apiClient.get(`/pages/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching page by ID:', error);
        throw error;
    }
};

export const fetchPagesByUserId = async (userId) => {
    try {
        const response = await apiClient.get(`/pages/user/${userId}`);
        console.log('fetchPagesByUserId response:', response);
        return response.data; // Ensure the data is correctly returned
    } catch (error) {
        console.error(`Error fetching pages for user ID ${userId}:`, error);
        throw error;
    }
};
