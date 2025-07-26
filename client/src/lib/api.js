// API configuration
export const API_BASE_URL = process.env.VITE_API_BASE_URL || 'https://api.99partners.in';

// Debug logging (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 API Configuration:', {
    VITE_API_BASE_URL: process.env.VITE_API_BASE_URL,
    API_BASE_URL: API_BASE_URL,
    NODE_ENV: process.env.NODE_ENV
  });
}

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