
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const Api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
// Register User API Call
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/register`, userData);
    return response.data; // return the response data (e.g., token, user info)
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Login User API Call
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, credentials);
    return response.data; // return the response data (e.g., token, user info)
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Fetch all quizzes
export const getQuizzes = async () => {
  try {
    const response = await axios.get(`${apiUrl}/quizzes`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Add a new quiz
export const addQuiz = async (quizData) => {
  try {
    const response = await axios.post(`${apiUrl}/quizzes`, quizData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};
