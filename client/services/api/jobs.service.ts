import { axiosInstance } from "@/axios/axios";
import { BuildUrl } from "./util";
import { stat } from "fs/promises";
import { headers } from "next/headers";

export const getUserJobs = async (recruiter: string, token?: string) => {
    const url = new BuildUrl().jobs(`/${recruiter}/get-jobs`);
    const response = await axiosInstance.get(url, {
        ...(token && { headers: { Cookie: `jwt=${token}` } }),
    });
    return response;
};

export const getJob = async (jobId: string, token?: string) => {
    const url = new BuildUrl().jobs(`/${jobId}`);
    const response = await axiosInstance.get(url, {
        ...(token && { headers: { Cookie: `jwt=${token}` } }),
    });
    return response;
};

export const editJob = async (
    jobId: string,
    data: FormData,
    token?: string
) => {
    const url = new BuildUrl().jobs(`/edit-jobs/${jobId}`);
    const response = await axiosInstance.patch(url, data, {
        ...(token && { headers: { Cookie: `jwt=${token}` } }),
    });
};

export const changeStatus = async (jobId: string, status: string) => {
    const url = new BuildUrl().jobs("/application/change-status");
    const response = await axiosInstance.patch(url, { jobId, status });
    return response;
};

export const deactivateJob = async (jobId: string, state: boolean) => {
    const url = new BuildUrl().jobs(`/${jobId}?isActive=${state}`);
    const response = await axiosInstance.patch(url);
    return response;
};

export const deleteJob = async (jobId: string) => {
    const url = new BuildUrl().jobs(`/${jobId}/delete-job`);
    const response = await axiosInstance.delete(url);
    return response;
};

export const uploadResume = async (data: FormData) => {
    const url = new BuildUrl().jobs(`/upload-resume`);
    const response = await axiosInstance.post(url, data);
    return response;
};

export const applyToJob = async (
    values: {
        email: string;
        phone: string;
        resume: string;
        recruiter: string;
    },
    jobId: string
) => {
    const url = new BuildUrl().jobs(`/apply-job/${jobId}`);
    const response = await axiosInstance.post(url, values);
    console.log(response);
    return response;
};

export const applicantInfo = async () => {
    const url = new BuildUrl().jobs(`/applicant-info`);
    const response = await axiosInstance.get(url);
    return response;
};

export const searchJob = async (
    filter: {
        location?: string;
        title?: string;
        experience?: string;
    },
    token?: string
) => {
    console.log(token);

    const url = new BuildUrl().jobs(`/search-job`);
    const response = await axiosInstance.get(url, {
        params: {
            ...(filter.experience && { experience: filter.experience }),
            ...(filter.title && { title: filter.title }),
            ...(filter.location && { location: filter.location }),
        },
        ...(token && { headers: { Cookie: `jwt=${token}` } }),
    });
    return response;
};

export const createJob = async (data: FormData) => {
    const url = new BuildUrl().jobs(`/create-job`);
    const response = await axiosInstance.post(url, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response;
};

export const getApplicants = async (jobId: string, token: string) => {
    const url = new BuildUrl().jobs(`/${jobId}/get-applicants`);
    const response = await axiosInstance.get(url, {
        ...(token && { headers: { Cookie: `jwt=${token}` } }),
    });
    return response;
};
