// api.ts
import axios from "axios";
import Cookies from "js-cookie";

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
        const token = Cookies.get("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
