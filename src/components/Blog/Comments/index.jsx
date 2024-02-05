import React, { useState, useEffect } from "react";
import { fetchCommentsForPost } from "../../api/PostsApi"; // Import your API function for fetching comments
import "./index.scss";

function Comments({ postId }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch comments for the given post
        fetchCommentsForPost(postId)
            .then((response) => {
                setComments(response); // Set the comments data in the state
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching comments:", error);
                setError(error);
                setLoading(false);
            });
    }, [postId]);

    if (loading) {
        return <div>Loading comments...</div>;
    }

    if (error) {
        return <div>Error fetching comments: {error.message}</div>;
    }

    return (
        <div className="comments-container">
            <h3>Comments</h3>
            {comments.length === 0 ? (
                <p>No comments available.</p>
            ) : (
                <ul className="comment-list">
                    {comments.map((comment) => (
                        <li key={comment.id} className="comment-item">
                            <div className="comment-author">{comment.author}</div>
                            <div className="comment-text">{comment.text}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Comments;
