import React, { useEffect, useState } from 'react';
import PostsCard from './PostsCard'; // Import your PostsCard component
import { getAllPosts, deletePostOnApi, addCommentToPost, toggleLikeOnPost } from '../api/PostsApi'; // Import API functions

function PostsContainer({ userId }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all posts
        getAllPosts()
            .then((response) => {
                setPosts(response); // Set the posts data in the state
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleDeletePost = async (postId) => {
        try {
            // Delete the post and associated data
            await deletePostOnApi(postId);

            // Update the posts list after deletion
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handleAddComment = async (postId, text) => {
        try {
            // Add a comment to the post
            await addCommentToPost(postId, text);

            // Update the posts list after adding the comment
            setPosts((prevPosts) =>
                prevPosts.map((post) => {
                    if (post.id === postId) {
                        const updatedPost = { ...post };
                        updatedPost.comments.push({ text, user: userId });
                        return updatedPost;
                    }
                    return post;
                })
            );
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const handleLike = async (postId, itemType) => {
        try {
            // Toggle like for the post
            await toggleLikeOnPost(postId, userId);

            // Update the posts list after liking
            setPosts((prevPosts) =>
                prevPosts.map((post) => {
                    if (post.id === postId) {
                        const updatedPost = { ...post };
                        const likes = updatedPost.likes || [];
                        const likedByUser = likes.some((like) => like.userId === userId);

                        if (likedByUser) {
                            updatedPost.likes = likes.filter((like) => like.userId !== userId);
                        } else {
                            updatedPost.likes = [...likes, { userId }];
                        }

                        return updatedPost;
                    }
                    return post;
                })
            );
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    if (loading) {
        return <div>Loading posts...</div>;
    }

    if (error) {
        return <div>Error fetching posts: {error.message}</div>;
    }

    return (
        <div className="posts-container">
            {posts.map((post) => (
                <PostsCard
                    key={post.id}
                    post={post}
                    onDelete={handleDeletePost}
                    onComment={handleAddComment}
                    onLike={handleLike}
                    userId={userId}
                />
            ))}
        </div>
    );
}

export default PostsContainer;
