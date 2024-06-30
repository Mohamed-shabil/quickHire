import { axiosInstance } from "@/axios/axios";
import { BuildUrl } from "./util";
import { cookies, headers } from "next/headers";

export async function createPost(data: FormData) {
    const url = new BuildUrl().posts("/create");
    const response = await axiosInstance.post(url, data);
    return response;
}

export async function getComments(postId: string) {
    const url = new BuildUrl().posts(`/comments/${postId}`);
    const response = await axiosInstance.get(url);
    return response;
}

export async function createComments(postId: string, comment: string) {
    const url = new BuildUrl().posts(`/comments`);
    const response = await axiosInstance.patch(url, { postId, comment });
    return response;
}

export async function likePost(postId: string) {
    const url = new BuildUrl().posts("/like-post");
    const response = await axiosInstance.post(url, { postId });
    return response;
}

export async function getUserPosts(token: string) {
    const url = new BuildUrl().posts("/user-posts");
    const response = await axiosInstance.get(url, {
        headers: {
            Cookie: `jwt=${token}`,
        },
    });
    return response;
}

export async function getOnePost(postId: string, token?: string) {
    const url = new BuildUrl().posts(`/get-one/${postId}`);
    const response = await axiosInstance.get(url, {
        ...(token && { headers: { Cookie: `jwt=${token}` } }),
    });
    return response;
}

export async function editPost(postId: string, value: { caption: string }) {
    const url = new BuildUrl().posts(`/edit/${postId}`);
    const response = await axiosInstance.patch(url, value);
    return response;
}

export async function reportPost(postId: string, value: { reason: string }) {
    const url = new BuildUrl().posts(`/${postId}/report`);
    const response = await axiosInstance.patch(url, value);
    return response;
}

export async function deletePost(postId: string) {
    const url = new BuildUrl().posts(`/delete/${postId}`);
    const response = await axiosInstance.delete(url);
    return response;
}

export async function getReports(token: string) {
    const url = new BuildUrl().posts("/report");
    const response = await axiosInstance(url, {
        headers: {
            Cookie: `jwt=${token}`,
        },
    });
    return response;
}

export async function deletePostAdmin(postId: string) {
    const url = new BuildUrl().posts(`/delete/${postId}/admin`);
    const response = await axiosInstance.delete(url);
    return response;
}

export async function getAllPosts(token?: string, page?: number) {
    const url = new BuildUrl().posts(`/show?page=${page}`);
    const response = await axiosInstance.get(url, {
        ...(token && { headers: { cookie: `jwt=${token}` } }),
    });
    return response;
}

export async function trendingPosts(token: string) {
    const url = new BuildUrl().posts(`/trending-posts`);
    const response = await axiosInstance.get(url, {
        ...(token && { headers: { Cookie: `jwt=${token}` } }),
    });
    return response;
}
