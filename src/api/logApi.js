import apiClient from './apiClient';

export const logActivity = async (activity) => {
    try {
        const user = localStorage.getItem('userName');
        const response = await apiClient.post('/logs', { user, activity });
        return response.data;
    } catch (error) {
        console.error('Error logging activity:', error);
        throw error;
    }
};

export const fetchLogFiles = async () => {
    try {
        const response = await apiClient.get('/logs');
        return response.data;
    } catch (error) {
        console.error('Error fetching log files:', error);
        throw error;
    }
};

export const fetchLogContent = async (filename) => {
    try {
        const response = await apiClient.get(`/logs/${filename}`);
        return response.data.split('\n').map((log) => {
            const [timestamp, level, message] = log.split(' ', 3);
            return { timestamp, level, message };
        });
    } catch (error) {
        console.error('Error fetching log content:', error);
        throw error;
    }
};
