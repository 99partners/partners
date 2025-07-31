import axios from 'axios';
import API_CONFIG from './api.js';

const api = axios.create({
  baseURL: API_CONFIG.baseUrl,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.headers,
});

export default api; 