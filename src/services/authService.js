import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const authService = {
    login: async (credentials) => {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        return response.data;
    },

    register: async (userData) => {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await axios.get(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    },

    loginWithOTP: async (phoneNumber) => {
        const response = await axios.post(`${API_URL}/auth/login-otp`, { phoneNumber });
        return response.data;
    },

    verifyOTP: async (phoneNumber, otp) => {
        const response = await axios.post(`${API_URL}/auth/verify-otp`, { phoneNumber, otp });
        return response.data;
    }
};

export default authService;