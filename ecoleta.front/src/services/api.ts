import axios from 'axios';

const api = axios.create({
    baseURL: process.env.API_URL || 'http://192.168.0.7:3333'
});

export default api;