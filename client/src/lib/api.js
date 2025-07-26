// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// API endpoints
export const API_ENDPOINTS = {
  join: `${API_BASE_URL}/api/join`,
  contact: `${API_BASE_URL}/api/contact`,
  blogs: `${API_BASE_URL}/api/blogs`,
  newsletter: `${API_BASE_URL}/api/newsletter`,
  users: `${API_BASE_URL}/api/users`,
  admin: `${API_BASE_URL}/api/admin`,
};

// Axios configuration
export const axiosConfig = {
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
};

export default API_ENDPOINTS; 