import React, { useState, useEffect } from 'react';
import { toggleLikeOnPost, getLikesForPost } from '../../api/PostsApi';
import { addCommentToPost, fetchCommentsForPost } from '../../api/PostsApi';
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from 'react-icons/bs';
import { AiOutlineComment } from 'react-icons/ai';
import './index.scss'
function LikeButton({ userId, postId }) {
  const [likesCount, setLikesCount] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const likesData = await getLikesForPost(postId);
      const likedByUser = likesData.some((like) => like.userId === userId);
      setLikesCount(likesData.length);
      setLiked(likedByUser);
    }

    fetchData();
    fetchCommentsForPost(postId).then(setComments);
  }, [userId, postId]);

  const handleLike = async () => {
    await toggleLikeOnPost(postId, userId);
    setLiked((prevLiked) => !prevLiked);
    setLikesCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
  };

  const addComment = async () => {
    const newComment = await addCommentToPost(postId, comment);
    setComments((prevComments) => [...prevComments, newComment]);
    setComment('');
  };

  return (
      <div className="like-container">
        <p>{likesCount} People {liked ? 'Liked' : 'Like'} this Post</p>
        <div className="hr-line"><hr /></div>
        <div className="like-comment">
          <div className="likes-comment-inner" onClick={handleLike}>
            {liked ? <BsFillHandThumbsUpFill /> : <BsHandThumbsUp />}
            <p className={liked ? 'blue' : 'black'}>Like</p>
          </div>
          <div className="likes-comment-inner" onClick={() => setShowCommentBox(!showCommentBox)}>
            <AiOutlineComment />
            <p className={showCommentBox ? 'blue' : 'black'}>Comments</p>
          </div>
        </div>
        {showCommentBox && (
            <>
              <input onChange={(e) => setComment(e.target.value)} placeholder="Add a Comment" className="comment-input" value={comment} />
              <button className="add-comment-btn" onClick={addComment}>Add Comment</button>
              {comments.map((comment) => (
                  <div className="all-comments" key={comment.id}>
                    <p className="name">{comment.name}</p>
                    <p className="comment">{comment.comment}</p>
                    <p className="timestamp">{comment.timeStamp}</p>
                  </div>
              ))}
            </>
        )}
      </div>
  );
}

export default LikeButton;
