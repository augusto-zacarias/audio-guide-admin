import axios, { AxiosError } from 'axios';
import { authProvider } from "../auth";
import { TuristPoint } from './types';
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

export async function getPontos():Promise<TuristPoint[]> {
    
    try {
        const response = await axiosInstance.get(`/turistPoint`,{
            headers: {
                Authorization: 'Bearer '+authProvider.token
            }
        });
        return response.data;
    } catch(error) {
        const parsedError = error as AxiosError;
        throw new Error(parsedError.response?.data! as string ?? "Unexpected error");
    }
}

export async function getPonto(id: number):Promise<TuristPoint> {
    try {
        const response = await axiosInstance.get(`/turistPoint/${id}`,{
            headers: {
                Authorization: 'Bearer '+authProvider.token
            }
        });
        return response.data;
    } catch(error) {
        const parsedError = error as AxiosError;
        throw new Error(parsedError.response?.data! as string ?? "Unexpected error");
    }
}

export async function createPonto(ponto:TuristPoint):Promise<TuristPoint> {
    try {
        const response = await axiosInstance.post(`/turistPoint/`,ponto,{
            headers: {
                Authorization: 'Bearer '+authProvider.token
            }
        });
        return response.data;
    } catch(error) {
        const parsedError = error as AxiosError;
        throw new Error(parsedError.response?.data as string ?? "Unexpected error");
    }
}

export async function updatePonto(id: number,ponto:TuristPoint):Promise<TuristPoint> {
    try {
        const response = await axiosInstance.put(`/turistPoint/${id}`,ponto,{
            headers: {
                Authorization: 'Bearer '+authProvider.token
            }
        });
        return response.data;
    } catch(error) {
        const parsedError = error as AxiosError;
        throw new Error(parsedError.response?.data! as string ?? "Unexpected error");
    }
}

export async function deletePonto(id: number,):Promise<void> {
    try {
        const response = await axiosInstance.delete(`/turistPoint/${id}`,{
            headers: {
                Authorization: 'Bearer '+authProvider.token
            }
        });
    } catch(error) {
        const parsedError = error as AxiosError;
        throw new Error(parsedError.response?.data! as string ?? "Unexpected error");
    }
}