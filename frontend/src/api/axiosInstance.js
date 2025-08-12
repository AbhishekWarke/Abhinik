// src/api/axiosInstance.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // keep if using cookies; remove if token-based auth
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;