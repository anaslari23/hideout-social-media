import React, { useState } from 'react';
import threadService from '../../services/threadService';

const CreateThread = ({ onThreadCreated }) => {
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        setIsSubmitting(true);
        try {
            const newThread = await threadService.createThread(content);
            setContent('');
            if (onThreadCreated) onThreadCreated(newThread);
        } catch (err) {
            console.error('Error creating thread:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="create-thread">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's happening?"
                maxLength={280}
            />
            <div className="thread-form-footer">
                <span className="character-count">
                    {280 - content.length} characters remaining
                </span>
                <button 
                    type="submit" 
                    disabled={isSubmitting || !content.trim()}
                >
                    {isSubmitting ? 'Posting...' : 'Post Thread'}
                </button>
            </div>
        </form>
    );
};

export default CreateThread;