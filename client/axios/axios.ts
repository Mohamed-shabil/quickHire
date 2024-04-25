import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials: true,
});

axios.interceptors.request.use(
    (config) => {
        config.headers["Cache-Control"] = "no-store";
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
