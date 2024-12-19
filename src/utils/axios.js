import axios from 'axios';
import {clearTokens, getAccessToken, getRefreshToken, setAccessToken} from './auth';

const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_PREFIX}`,
});

api.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        const {message} = error.response.data;
        if(error.response.status !== 401) return Promise.reject(error);
        if(!message.includes('token')) return Promise.reject(error);
        if(originalRequest._retry) {
            clearTokens();
            window.location.href = '/signin-signup';
            return Promise.reject(error);
        }
        if (!originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const {aToken} = await api.post('/auth/refresh-token', { rToken: getRefreshToken() });
                setAccessToken(aToken);
                originalRequest.headers.Authorization = `Bearer ${aToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                clearTokens();
                window.location.href = '/signin-signup';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
