import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
export const axiosConfig = axios.create({
    baseURL: apiUrl
})
export const axiosServerAuthConfig = axios.create({
    baseURL: serverUrl,
    withCredentials: true
})
export const axiosServerConfig = axios.create({
    baseURL: serverUrl
})