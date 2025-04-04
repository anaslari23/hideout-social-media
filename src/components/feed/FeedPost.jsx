import React, { useState } from 'react';
import feedService from '../../services/feedService';

const FeedPost = ({ post }) => {
    const [likes, setLikes] = useState(post.likes_count);
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = async () => {
        try {
            await feedService.likePost(post.id);
            setLikes(prev => prev + 1);
            setIsLiked(true);
        } catch (err) {
            console.error('Error liking post:', err);
        }
    };

    return (
        <div className="feed-post">
            <div className="post-header">
                <img 
                    src={post.profile_pic || '/default-avatar.png'} 
                    alt={post.username} 
                    className="avatar"
                />
                <span className="username">{post.username}</span>
            </div>
            
            <div className="post-content">
                {post.content && (
                    <p className="post-text">{post.content}</p>
                )}
                {post.media_url && post.media_url.map((url, index) => (
                    <img 
                        key={index}
                        src={url}
                        alt="Post content"
                        className="post-media"
                    />
                ))}
            </div>

            <div className="post-actions">
                <button 
                    className={`like-button ${isLiked ? 'liked' : ''}`}
                    onClick={handleLike}
                    disabled={isLiked}
                >
                    ♥ {likes}
                </button>
            </div>
        </div>
    );
};

export default FeedPost;