import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor: injeta token em toda requisição automaticamente
api.interceptors.request.use((config) => {
    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        ?.split('=')[1];

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Interceptor: trata erros globalmente
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // redireciona para login se token expirou
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default api;