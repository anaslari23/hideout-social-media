import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const storyService = {
    getStories: async () => {
        const response = await axios.get(`${API_URL}/stories/feed`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    },

    createStory: async (mediaFile) => {
        const formData = new FormData();
        formData.append('media', mediaFile);

        const response = await axios.post(`${API_URL}/stories`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    },

    markAsViewed: async (storyId) => {
        const response = await axios.put(`${API_URL}/stories/${storyId}/view`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    }
};

export default storyService;