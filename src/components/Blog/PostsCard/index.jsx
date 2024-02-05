import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPostsWithCommentsAndLikes, deletePostOnApi } from '../../api/PostsApi';
import { getCurrentUser } from '../../api/ApiUser';
import LikeButton from '../LikeButton';
import Comments from '../Comments';

function PostList() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const fetchPosts = useCallback(async () => {
        try {
            const postsData = await getPostsWithCommentsAndLikes();
            setPosts(postsData);
        } catch (error) {
            console.error('Error fetching posts:', error);
            // Consider additional error handling here
        }
    }, []);

    const checkAuthenticationAndFetchPosts = useCallback(async () => {
        try {
            const currentUser = await getCurrentUser();
            if (!currentUser) {
                navigate('/Login'); // Redirect to login if user is not authenticated
            } else {
                await fetchPosts();
            }
        } catch (error) {
            console.error('Authentication error:', error);
            navigate('/Login'); // Consider additional error handling or different redirect
        }
    }, [navigate, fetchPosts]);

    useEffect(() => {
        checkAuthenticationAndFetchPosts();
    }, [checkAuthenticationAndFetchPosts]);

    const handleDeletePost = async (postId) => {
        try {
            await deletePostOnApi(postId);
            await fetchPosts(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting post:', error);
            // Consider additional error handling here
        }
    };

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id} className="post">
                    <p>{post.content}</p>
                    {post.imageUrl && <img src={post.imageUrl} alt="Post" />}
                    <LikeButton postId={post.id} likesCount={post.likes.length} />
                    <Comments comments={post.comments} />
                    <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
                </div>
            ))}
        </div>
    );
}

export default PostList;
