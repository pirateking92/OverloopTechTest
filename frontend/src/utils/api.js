import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL || 'http://localhost:5001/'
});

export default api;
