import api from './api';

export async function loginApi(user: string, pass: string) {
    try {
        const response = await api.post(`/users/login`, {
            user,
            pass,
        });
        
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}