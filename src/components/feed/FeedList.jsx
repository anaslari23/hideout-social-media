import React, { useState, useEffect } from 'react';
import feedService from '../../services/feedService';
import FeedPost from './FeedPost';
import CreatePost from './CreatePost';

const FeedList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);

    useEffect(() => {
        fetchPosts();
    }, [page]);

    const fetchPosts = async () => {
        try {
            const data = await feedService.getFeed(page);
            setPosts(prev => page === 0 ? data : [...prev, ...data]);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching feed:', err);
            setLoading(false);
        }
    };

    const handleNewPost = (post) => {
        setPosts([post, ...posts]);
    };

    return (
        <div className="feed-container">
            <CreatePost onPostCreated={handleNewPost} />
            <div className="feed-list">
                {posts.map(post => (
                    <FeedPost key={post.id} post={post} />
                ))}
            </div>
            {!loading && (
                <button 
                    className="load-more"
                    onClick={() => setPage(prev => prev + 1)}
                >
                    Load More
                </button>
            )}
        </div>
    );
};

export default FeedList;