// src/services/AuthService.js
import axios from 'axios';

const API_URL = 'https://dummyjson.com/auth/login';

const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL, {
      username: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export default {
  login,
};
