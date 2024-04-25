import { axiosInstance } from "@/axios/axios";
import { BuildUrl } from "./util";
import { headers } from "next/headers";
import { StringValidation } from "zod";

export async function getProfile(username: string, token: string) {
    const url = new BuildUrl().profile(`/my-profile/${username}`);
    const response = await axiosInstance.get(url, {
        headers: {
            Cookie: `jwt=${token}`,
        },
    });
    return response;
}

export async function getUserProfile(username: string, token?: string) {
    const url = new BuildUrl().profile(`/${username}`);
    const response = await axiosInstance.get(url, {
        ...(token && { headers: { Cookie: `jwt=${token}` } }),
    });
    return response;
}

export async function addAbout(values: {
    fullName: string;
    headline: string;
    bio: string;
}) {
    const url = new BuildUrl().profile(`/about`);
    const response = await axiosInstance.post(url, values);
    return response;
}

export async function updateProfileImage(data: FormData) {
    const url = new BuildUrl().profile("/avatar");
    const response = await axiosInstance.patch(url, data);
    return response;
}

export async function addEducation(values: {
    school: string;
    startMonth: string;
    endMonth: string;
    startYear: string;
    endYear: string;
    grade: string;
    degree: string;
}) {
    const url = new BuildUrl().profile("/education");
    const response = await axiosInstance.post(url, values);
    return response;
}

export async function addExperience(values: {
    companyName: string;
    position: string;
    startYear: string;
    startMonth: string;
    endYear: string;
    endMonth: string;
}) {
    const url = new BuildUrl().profile("/experience");
    const response = await axiosInstance.post(url, values);
    return response;
}

export async function addProject(values: {
    projectName: string;
    description: string;
    currentlyWorkingOn: boolean;
    startDate: Date;
    endDate: Date;
    links: string;
    skills: string[];
}) {
    const url = new BuildUrl().profile("/project");
    const response = await axiosInstance.patch(url, values);
    return response;
}

export async function addLinks(values: {
    location: string;
    portfolio?: string;
    customUrl?: string;
    urlName?: string;
}) {
    const url = new BuildUrl().profile("/links");
    const response = await axiosInstance.patch("/links", values);
    return response;
}

export async function getCurrentUser() {
    const url = new BuildUrl().profile("/current-user");
    const response = await axiosInstance.get(url);
    return response;
}

export async function followUser(userId: string) {
    const url = new BuildUrl().profile(`/followers/follow/${userId}`);
    const response = await axiosInstance.post(url);
    return response;
}

export async function unFollowUser(userId: string) {
    const url = new BuildUrl().profile(`/followers/unfollow/${userId}`);
    const response = await axiosInstance.delete(url);
    return response;
}

export async function influencersList(token?: string) {
    const url = new BuildUrl().profile("/most-followed");
    const response = await axiosInstance.get(url, {
        ...(token && { headers: { cookie: `jwt=${token}` } }),
    });
    return response;
}
