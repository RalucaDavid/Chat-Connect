import User from "../models/user";
import apiClient from "./api-client";

export const register = async (user: User) => {
    try {
        const response = await apiClient.post('/user', user);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const login = async (username: string, password: string) => {
    try {
        const response = await apiClient.get(`/user/${username}/${password}`);
        return response.data;
    } catch (error) {
        console.error('Error login user:', error);
        throw error;
    }
}