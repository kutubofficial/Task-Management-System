import api from "./axios";
const BASE_URL = 'https://task-manager-backend-lpje.onrender.com';
// const BASE_URL = "http://localhost:5000";

export const register = async (userData) => {
  try {
    const response = await api.post(`${BASE_URL}/api/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post(`${BASE_URL}/api/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getProfile = async () => {
  try {
    const response = await api.get(`${BASE_URL}/api/auth/profile`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await api.get(`${BASE_URL}/api/auth/users`);
    console.log(response);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
