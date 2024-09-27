import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://localhost:7134/api',
    headers:{
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;

