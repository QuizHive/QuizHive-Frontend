import axios from 'axios';
import { getAccessToken, getRefreshToken, setAccessToken, clearTokens } from './auth';

const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_PREFIX}`, // آدرس سرور API شما
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            console.log("Using token:", token);
            config.headers.Authorization = `Bearer ${token}`;
        }
        else {
            console.log("No token available");
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = getRefreshToken();
                const {aToken} = await api.post('/auth/refresh-token', { rtoken: refreshToken });
                setAccessToken(aToken);
                originalRequest.headers.Authorization = `Bearer ${aToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                clearTokens();
                window.location.href = '/signin-signup'; // به صفحه ورود هدایت می‌شود
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
