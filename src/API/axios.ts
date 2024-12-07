import axios from 'axios';

// Create an Axios instance with default configuration
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', // Replace with your backend API base URL
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add custom logic here, like adding auth tokens
    const token = localStorage.getItem('authToken'); // Example: retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add a response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle errors
    console.error('API error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
