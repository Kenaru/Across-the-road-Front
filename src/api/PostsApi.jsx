import axios from 'axios';
const API_BASE_URL = 'http://localhost:5500/api';

// Function to get all posts
export const getAllPosts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts`);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

// Function to fetch comments for a post
export const fetchCommentsForPost = async (postId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts/${postId}/comments`);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

// Function to fetch likes for a post
export const fetchLikesForPost = async (postId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts/${postId}/likes`);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

// Function to get all posts with comments and likes
export const getPostsWithCommentsAndLikes = async () => {
    try {
        const posts = await getAllPosts();
        const postsWithCommentsAndLikes = await Promise.all(
            posts.map(async (post) => {
                const comments = await fetchCommentsForPost(post.id);
                const likes = await fetchLikesForPost(post.id);
                return { ...post, comments, likes };
            })
        );
        return postsWithCommentsAndLikes;
    } catch (error) {
        throw error;
    }
};
// Function to add a comment to a post
export const addCommentToPost = async (postId, text) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/posts/${postId}/comments`, { text });
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};
// Function to toggle a like on a post
export const toggleLikeOnPost = async (postId, userId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/posts/${postId}/likes`, { userId });
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};
// Function to get the total number of likes for a post
export const getLikesForPost = async (postId) => {
    try {
        const likes = await fetchLikesForPost(postId);
        return likes;
    } catch (error) {
        throw error;
    }
};
// Function to delete a post along with its comments and likes
export const deletePostOnApi = async (postId) => {
    try {
        await axios.delete(`${API_BASE_URL}/posts/${postId}/comments`);
        await axios.delete(`${API_BASE_URL}/posts/${postId}/likes`);
        await axios.delete(`${API_BASE_URL}/posts/${postId}`);
        return { message: 'Post and associated data deleted successfully.' };
    } catch (error) {
        throw handleApiError(error);
    }
};

// Helper function to handle API errors
const handleApiError = (error) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        return error.response.data;
    } else {
        // Something went wrong in making the request
        return error.message;
    }
};
