import {httpClient} from "../api/api.ts";

 interface IFormDataDto {
    mail: string;
    password: string;
}
export const handleRegistration = async (formData: IFormDataDto) => {
    try {
        const response = await httpClient.post('/auth/register', formData);
        await handleLogIn(formData, response.status)
        console.log('Registration response:', response);
    } catch (error: unknown) {
        console.error('Registration error:', error);
    }
};

export const handleLogIn = async (formData: IFormDataDto, otherStatus?: number) => {
    try {
        const response = await httpClient.post('/auth/login', formData);
        if (response.status === 200 || otherStatus === 200) {
            localStorage.setItem('authToken', 'Bearer ' + response?.token)
        }
        return response.status
    } catch (error: unknown) {
        console.error('Registration error:', error);
    }
}

export const gatAllUser = async () => {
    try {
        return await httpClient.get('/users/get');
    } catch (error: unknown) {
        console.error('error:', error);
    }
}

export const blockUser = async (userId: number[]) => {
    try {
        return await httpClient.post(`/users/block`, { ids: userId });
    } catch (error) {
        console.error('Blocking error:', error);
        throw error;
    }
};

export const unBlockUser = async (userId: number[]) => {
    try {
        return await httpClient.post(`/auth/update`, { ids: userId })
    } catch (error: unknown) {
        console.error('Deletion error:', error);
    }
}

export const deleteUsers = async (body: number[]) => {
    try {
        return await httpClient.post('/users/delete', { ids: body });
    } catch (error: unknown) {
        console.error('Deletion error:', error);
    }
}

