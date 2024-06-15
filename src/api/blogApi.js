import api from './axiosConfig';

export const createPost = async (formData) => {
    try {
        const response = await api.post('/api/post/posts', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error('Creating post failed:', error.response?.data);
        throw new Error('Failed to create post: ' + (error.response?.data.message || error.message));
    }
};

export const getAllPosts = async () => {
    try {
        const response = await api.get('/api/get/posts');
        return response.data;
    } catch (error) {
        console.error('Fetching all posts failed:', error.response?.data);
        throw new Error('Failed to fetch posts: ' + (error.response?.data.message || error.message));
    }
};

export const getPostById = async (id) => {
    try {
        const response = await api.get(`/api/get/posts/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Fetching post with ID ${id} failed:`, error.response?.data);
        throw new Error('Failed to fetch post: ' + (error.response?.data.message || error.message));
    }
};

export const updatePost = async (id, formData) => {
    try {
        const response = await api.put(`/api/put/posts/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error(`Updating post with ID ${id} failed:`, error.response?.data);
        throw new Error('Failed to update post: ' + (error.response?.data.message || error.message));
    }
};

export const deletePost = async (id) => {
    try {
        const response = await api.delete(`/api/delete/posts/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Deleting post with ID ${id} failed:`, error.response?.data);
        throw new Error('Failed to delete post: ' + (error.response?.data.message || error.message));
    }
};
