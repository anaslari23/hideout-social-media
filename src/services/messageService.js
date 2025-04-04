import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const messageService = {
    getConversations: async () => {
        const response = await axios.get(`${API_URL}/messages/conversations`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    },

    getMessages: async (conversationId) => {
        const response = await axios.get(`${API_URL}/messages/${conversationId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    },

    sendMessage: async (conversationId, content) => {
        const response = await axios.post(`${API_URL}/messages/${conversationId}`, {
            content
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    },

    createConversation: async (userId) => {
        const response = await axios.post(`${API_URL}/messages/conversations`, {
            participant_id: userId
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    }
};

export default messageService;