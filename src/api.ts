// api.ts
import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const publicApi = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

// Add a request interceptor to attach token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // or wherever you store your token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
