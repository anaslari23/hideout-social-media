import React, { useState, useEffect } from 'react';
import storyService from '../../services/storyService';

const StoriesFeed = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeStory, setActiveStory] = useState(null);

    useEffect(() => {
        fetchStories();
    }, []);

    const fetchStories = async () => {
        try {
            const data = await storyService.getStories();
            setStories(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleStoryView = async (storyId) => {
        try {
            await storyService.markAsViewed(storyId);
            setStories(stories.filter(story => story.id !== storyId));
        } catch (err) {
            console.error('Error marking story as viewed:', err);
        }
    };

    if (loading) return <div>Loading stories...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="stories-container">
            <div className="stories-list">
                {stories.map(story => (
                    <div 
                        key={story.id} 
                        className="story-item"
                        onClick={() => setActiveStory(story)}
                    >
                        <img 
                            src={story.profile_pic} 
                            alt={story.username} 
                            className="story-avatar"
                        />
                        <span className="story-username">{story.username}</span>
                    </div>
                ))}
            </div>

            {activeStory && (
                <div className="story-viewer">
                    <img 
                        src={activeStory.media_url} 
                        alt="Story content" 
                        className="story-content"
                    />
                    <div className="story-info">
                        <span>{activeStory.username}</span>
                        <button 
                            onClick={() => {
                                handleStoryView(activeStory.id);
                                setActiveStory(null);
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoriesFeed;