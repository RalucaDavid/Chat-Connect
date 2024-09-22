import User from "../models/user";
import apiClient from "./api-client";

export const register = async (user: User) => {
    try {
        const response = await apiClient.post('/user/register', user);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const login = async (username: string, password: string) => {
    try {
        const response = await apiClient.get(`/user/login`, {
            params: {
                username,
                password
            }
        });
        
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }

        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};