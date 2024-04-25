import { axiosInstance } from "@/axios/axios";
import { BuildUrl } from "./util";

export async function userSignup(values: {
    name: string;
    email: string;
    password: string;
    ConfirmPassword: string;
}) {
    const url = new BuildUrl().auth("/users/signup");
    const response = await axiosInstance.post(url, values);
    return response;
}

export async function userLogin(values: { email: string; password: string }) {
    const url = new BuildUrl().auth("/users/signin");
    console.log("Singin From serverice", url);
    const response = await axiosInstance.post(url, values);
    return response;
}

export async function userSignout() {
    const url = new BuildUrl().auth("/users/signout");
    const response = await axiosInstance.get(url);
    return response;
}

export async function adminLogin(values: { name: string; password: string }) {
    const url = new BuildUrl().auth("/admin/login");
    const response = await axiosInstance.post(url, values);
    return response;
}

export async function forgotPassword(values: { email: string }) {
    const url = new BuildUrl().auth("/users/forgot-password");
    const response = await axiosInstance.post(url, values);
    return response;
}

export async function resetPassword(
    values: {
        password: string;
        confirmPassword: string;
    },
    params: { token: string }
) {
    const url = new BuildUrl().auth(`/users/reset-password/${params.token}`);
    const response = await axiosInstance.post(url, values);
    return response;
}

export async function selectRole(value: { role: string }) {
    const url = new BuildUrl().auth("/users/select-role");
    const response = await axiosInstance.patch(url, value);
    return response;
}

export async function verifyOtp(values: { otp: string }) {
    const url = new BuildUrl().auth("/users/verify-otp");
    const response = await axiosInstance.post(url, values);
    return response;
}

export async function resendOtp() {
    const url = new BuildUrl().auth("/users/send-otp");
    const response = await axiosInstance.post(url);
    return response;
}

export async function currentUser() {
    const url = new BuildUrl().auth("/users/current-user");
    const response = await axiosInstance.get(url);
    return response;
}

export async function getAllUsers(token: string) {
    const url = new BuildUrl().auth("/users/get-all");
    const response = await axiosInstance.get(url, {
        ...(token && { headers: { Cookie: `jwt=${token}` } }),
    });
    return response;
}

export async function blockUser(userId: string, token?: string) {
    const url = new BuildUrl().auth(`/users/block/${userId}`);
    const response = await axiosInstance.patch(url, {
        ...(token && { headers: { Cookie: `jwt=${token}` } }),
    });
    return response;
}

export async function unBlockUser(userId: string, token?: string) {
    const url = new BuildUrl().auth(`/users/unblock/${userId}`);
    const response = await axiosInstance.patch(url, {
        ...(token && { headers: { Cookie: `jwt=${token}` } }),
    });
    return response;
}
