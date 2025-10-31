import axios from 'axios';

const api = axios.create({
  baseURL: '/api/products',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;