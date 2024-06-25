import axios from 'axios';

const BASEURL = process.env.Base_URL;

let api = axios.create({
    baseURL: BASEURL,
});

api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            const accessToken = user.accessToken;
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const updateAccessToken = () => {
    if (typeof window !== 'undefined') {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem('user', JSON.stringify(user));

        api = axios.create({
            baseURL: BASEURL,
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
            },
        });
    }
};

export default api;
