import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to inject JWT token into authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('vibrant_saas_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle 401/403 responses globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      if (localStorage.getItem('vibrant_saas_token')) {
        localStorage.removeItem('vibrant_saas_token');
        localStorage.removeItem('vibrant_saas_user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  async register(fullName, email, password) {
    const response = await api.post('/auth/register', { fullName, email, password });
    return response.data;
  },

  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      // Ignore network failure on logout
    } finally {
      localStorage.removeItem('vibrant_saas_token');
      localStorage.removeItem('vibrant_saas_user');
    }
  },

  async getProfile() {
    const response = await api.get('/users/profile');
    return response.data;
  },

  async getHealth() {
    const response = await api.get('/health');
    return response.data;
  }
};

export default api;
