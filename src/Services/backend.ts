import axios, { AxiosError } from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000"
});

export async function login(username: string, password: string):Promise<string> {
    try {
        const response = await axiosInstance.post('/user/login',{
            username,
            password
        });
        return response.data.token;
    } catch(error) {
        const parsedError = error as AxiosError;
        throw new Error(parsedError.response?.data! as string ?? "Unexpected error");
    }
}

export async function register(username: string, password: string):Promise<string> {
    try {
        const response = await axiosInstance.post('/user/register',{
            username,
            password
        });
        return response.data.token;
    } catch(error) {
        const parsedError = error as AxiosError;
        throw new Error(parsedError.response?.data! as string ?? "Unexpected error");
    }
}