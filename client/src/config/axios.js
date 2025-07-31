import axios from 'axios';
import API_CONFIG from './api';

// Create a custom axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: API_CONFIG.baseUrl,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.headers,
  withCredentials: true // Important for CORS with credentials
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // You can add auth token here if needed
    // const token = localStorage.getItem('adminToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Handle CORS errors more gracefully
    if (error.message === 'Network Error') {
      console.error('CORS or network issue detected');
      // You could implement a fallback strategy here
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;