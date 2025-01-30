import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://chat-ai-buckend.vercel.app/api",
    withCredentials: true,
});