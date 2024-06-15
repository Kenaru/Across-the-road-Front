import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchPageById = async (pageId) => {
    try {
        const response = await apiClient.get(`/pages/${pageId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching page by ID:', error);
        throw error;
    }
};

export const createPage = async (formData) => {
    try {
        const response = await apiClient.post('/pages', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating page:', error);
        throw error;
    }
};

export const updatePage = async (pageId, pageData) => {
    try {
        const response = await apiClient.put(`/pages/${pageId}`, pageData);
        return response.data;
    } catch (error) {
        console.error('Error updating page:', error);
        throw error;
    }
};

export const fetchNavbar = async (pageId) => {
    try {
        const response = await apiClient.get(`/navbars/${pageId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching navbar:', error);
        throw error;
    }
};

export const fetchAboutSections = async (pageId) => {
    try {
        const response = await apiClient.get(`/about_sections/${pageId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching about sections:', error);
        throw error;
    }
};

export const fetchServices = async (pageId) => {
    try {
        const response = await apiClient.get(`/services/${pageId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error;
    }
};

export const fetchFeedbacks = async (pageId) => {
    try {
        const response = await apiClient.get(`/feedbacks/${pageId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        throw error;
    }
};

export const fetchTeamMembers = async (pageId) => {
    try {
        const response = await apiClient.get(`/team_members/${pageId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching team members:', error);
        throw error;
    }
};

export const fetchFooter = async (pageId) => {
    try {
        const response = await apiClient.get(`/footers/${pageId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching footer:', error);
        throw error;
    }
};

export const saveNavbar = async (pageId, userId, data) => {
    try {
        const response = await apiClient.post('/navbars', { pageId, userId, ...data });
        return response.data;
    } catch (error) {
        console.error('Error saving navbar:', error);
        throw error;
    }
};

export const saveAboutSections = async (pageId, userId, data) => {
    try {
        const response = await apiClient.post('/about_sections', { pageId, userId, data });
        return response.data;
    } catch (error) {
        console.error('Error saving about sections:', error);
        throw error;
    }
};

export const saveServices = async (pageId, userId, data) => {
    try {
        const response = await apiClient.post('/services', { pageId, userId, data });
        return response.data;
    } catch (error) {
        console.error('Error saving services:', error);
        throw error;
    }
};

export const saveFeedbacks = async (pageId, userId, data) => {
    try {
        const response = await apiClient.post('/feedbacks', { pageId, userId, data });
        return response.data;
    } catch (error) {
        console.error('Error saving feedbacks:', error);
        throw error;
    }
};

export const saveTeamMembers = async (pageId, userId, data) => {
    try {
        const response = await apiClient.post('/team_members', { pageId, userId, data });
        return response.data;
    } catch (error) {
        console.error('Error saving team members:', error);
        throw error;
    }
};

export const saveFooter = async (pageId, userId, data) => {
    try {
        const response = await apiClient.post('/footers', { pageId, userId, ...data });
        return response.data;
    } catch (error) {
        console.error('Error saving footer:', error);
        throw error;
    }
};
