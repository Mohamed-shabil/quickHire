import { axiosInstance } from "@/axios/axios";
import { BuildUrl } from "./util";

export async function chatHistory(userId: string) {
    const url = new BuildUrl().chats(`/history/${userId}`);
    const response = await axiosInstance.get(url);
    return response;
}

export async function getChats() {
    const url = new BuildUrl().chats(`/get-chats`);
    const response = await axiosInstance.get(url);
    return response;
}

export async function searchProfile(value: string) {
    const url = new BuildUrl().chats("/search");
    const response = await axiosInstance.get(url, {
        params: {
            name: value,
        },
    });
    return response;
}

export async function saveChat(data: FormData) {
    const url = new BuildUrl().chats("/save-chat");
    const response = axiosInstance.post(url, data);
    return response;
}
