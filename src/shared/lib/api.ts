import axios from 'axios';
import { useAuthStore } from '../store/auth.store';
import { environment } from '../../environments/environment';

const api = axios.create({
    baseURL: environment.endpoint_url,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para inyectar el token en cada petición
api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Opcional: Interceptor para manejar errores 401 (Token expirado)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Si el token no sirve más, limpiamos y mandamos al login
            useAuthStore.getState().logout();

            // Añadimos esta condición para evitar refresh de página y perder el estado de error
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;