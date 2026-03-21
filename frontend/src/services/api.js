import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Crear instancia de Axios con configuración base
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token JWT automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido, redirigir a login
      localStorage.removeItem('token');
      window.location.href = '/login'; // O usar router
    }
    return Promise.reject(error);
  }
);

// Funciones para consumir la API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const directorsAPI = {
  getAll: () => api.get('/directores'),
  getById: (id) => api.get(`/directores/${id}`),
  create: (data) => api.post('/directores', data),
  update: (id, data) => api.put(`/directores/${id}`, data),
  delete: (id) => api.delete(`/directores/${id}`),
};

export const genresAPI = {
  getAll: () => api.get('/generos'),
  create: (data) => api.post('/generos', data),
};

export const studiosAPI = {
  getAll: () => api.get('/productoras'),
  create: (data) => api.post('/productoras', data),
};

export const typesAPI = {
  getAll: () => api.get('/tipos'),
  create: (data) => api.post('/tipos', data),
};

export const mediaAPI = {
  getAll: (params) => api.get('/medias', { params }),
  create: (data) => api.post('/medias', data),
  update: (id, data) => api.put(`/medias/${id}`, data),
  delete: (id) => api.delete(`/medias/${id}`),
};

export default api;