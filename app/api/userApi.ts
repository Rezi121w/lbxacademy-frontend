import api from './api';


export async function GetMeApi(){
    try {
        const response = await api.get(`/users/me`);
        
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function GetUsersApi(choose: boolean, search?: string){
    const searchLink = `?SearchByFullName=${search}`
    try {
        const response = await api.get(choose ? `/users${search ? searchLink : ""}` : `/users/admins${search ? searchLink : ""}`, );
    
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function GetUserApi(id: number){
    console.log(id);
    try {
        const response = await api.get(`/users/${id.toString()}`);
        
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}
// Create-Change //
export async function CreateUserApi(firstName: string, lastName: string, age: number, pass?: string){
    interface createUser {
        firstName: string,
        lastName: string,
        age: number,
        pass?: string
    }
    try {

        const userData : createUser = {
            firstName,
            lastName,
            age,
        };

        if (pass) userData['pass'] = pass;
        
        const response = await api.post(`/users`, userData);
        
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function EditUserApi(id: number, firstName: string, lastName: string, age: number, pass?: string){
    interface createUser {
        firstName: string,
        lastName: string,
        age: number,
        pass?: string
    }
    try {

        const userData : createUser = {
            firstName,
            lastName,
            age,
        };

        if (pass) userData['pass'] = pass;
        
        const response = await api.put(`/users/${id}`, userData);
        
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

// Block-Delete //
export async function BlockUserApi(id: string){

    try {
        const response = await api.delete(`/users/block/${id}`);
        
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

export async function DeleteUserApi(id: string){
    try {
        const response = await api.delete(`/users/${id}`);
        
        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
}

