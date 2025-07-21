import axios from 'axios';
import { tokenStorage } from '../utils/tokenStorage.js';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api/';
const api = axios.create({
    baseURL: BACKEND_URL,
});

// Interceptors: Add auth token if needed
api.interceptors.request.use(config => {
    const token = tokenStorage.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
    } else {
        config.headers['Content-Type'] = 'application/json';
    }

    return config;
});

export const checkApiConnection = () => api.get('/ok');

export default api;
