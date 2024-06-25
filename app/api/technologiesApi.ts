import api from './api';

export async function GetTechsApi(){
    try {
        const response = await api.get(`/technologies`);
        
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function GetTechApi(id: number){
    try {
        const response = await api.get(`/technologies/${id.toString()}`);
        
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}