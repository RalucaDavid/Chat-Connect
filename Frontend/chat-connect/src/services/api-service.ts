import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://localhost:7134/api',
    headers:{
        'Content-Type': 'application/json'
    }
});

