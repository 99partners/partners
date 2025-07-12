// API configuration
export const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:5050';

// Helper function to build API URLs
export const buildApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

// Common API endpoints
export const API_ENDPOINTS = {
  newsletter: buildApiUrl('/api/newsletter'),
  blogs: buildApiUrl('/api/blogs'),
  contact: buildApiUrl('/api/contact'),
  join: buildApiUrl('/api/join'),
  users: buildApiUrl('/api/users'),
  admin: buildApiUrl('/api/admin'),
  protected: buildApiUrl('/api/protected'),
}; 