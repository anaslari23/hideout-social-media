import React, { useState } from 'react';
import threadService from '../../services/threadService';

const ThreadItem = ({ thread, onReply }) => {
    const [replyContent, setReplyContent] = useState('');
    const [showReplyForm, setShowReplyForm] = useState(false);

    const handleReply = async (e) => {
        e.preventDefault();
        try {
            await threadService.replyToThread(thread.id, replyContent);
            setReplyContent('');
            setShowReplyForm(false);
            if (onReply) onReply();
        } catch (err) {
            console.error('Error replying to thread:', err);
        }
    };

    return (
        <div className="thread-item">
            <div className="thread-header">
                <img 
                    src={thread.profile_pic || '/default-avatar.png'} 
                    alt={thread.username} 
                    className="avatar"
                />
                <span className="username">{thread.username}</span>
            </div>
            <div className="thread-content">{thread.content}</div>
            <div className="thread-actions">
                <button onClick={() => setShowReplyForm(!showReplyForm)}>
                    Reply
                </button>
            </div>
            {showReplyForm && (
                <form onSubmit={handleReply} className="reply-form">
                    <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Write your reply..."
                    />
                    <button type="submit">Send Reply</button>
                </form>
            )}
            {thread.replies && thread.replies.map(reply => (
                <div key={reply.id} className="thread-reply">
                    <span className="reply-username">{reply.username}</span>
                    <p>{reply.content}</p>
                </div>
            ))}
        </div>
    );
};

export default ThreadItem;