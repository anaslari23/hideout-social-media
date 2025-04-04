import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const threadService = {
    createThread: async (content, parentTweetId = null) => {
        const response = await axios.post(`${API_URL}/threads`, {
            content,
            parent_tweet_id: parentTweetId
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    },

    getThread: async (threadId) => {
        const response = await axios.get(`${API_URL}/threads/${threadId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    },

    replyToThread: async (threadId, content) => {
        const response = await axios.post(`${API_URL}/threads/${threadId}/reply`, {
            content
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    }
};

export default threadService;