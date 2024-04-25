import { axiosInstance } from "@/axios/axios";
import { BuildUrl } from "./util";

export async function getAnalytics(token?: string) {
    const url = new BuildUrl().payment("/analytics");
    const response = await axiosInstance.get(url, {
        ...(token && { headers: { Cookie: `jwt=${token}` } }),
    });
    return response;
}

export async function createSubscriptionPlan(values: {
    planName: string;
    postLimit: string;
    price: string;
    description: string;
    billingPeriod: string;
}) {
    const url = new BuildUrl().payment("/subscription/new");
    const response = axiosInstance.post(url, values);
    return response;
}

export async function currentSubscription() {
    const url = new BuildUrl().payment("/subscription/current-subscription");
    const repsonse = await axiosInstance.get(url);
    return repsonse;
}

export async function deleteSubscription(subscriptionId: string) {
    const url = new BuildUrl().payment(
        `/subscription/remove/${subscriptionId}`
    );
    const response = await axiosInstance.delete(url);
    return response;
}

export async function editSubscription(values: {
    planName: string;
    postLimit: string;
    price: string;
    description: string;
    billingPeriod: string;
}) {
    const url = new BuildUrl().payment("/subscription/edit/:subscriptionId");
    const response = await axiosInstance.patch(url, values);
    return response;
}

export async function getSubscriptions(token?: string) {
    const url = new BuildUrl().payment("/subscription");
    const response = await axiosInstance.get(url, {
        ...(token && { headers: { Cookie: `jwt=${token}` } }),
    });
    return response;
}

export async function getTransactions(token?: string) {
    const url = new BuildUrl().payment("/transactions");
    const response = await axiosInstance.get(url, {
        ...(token && { headers: { Cookie: `jwt=${token}` } }),
    });
    return response;
}

export async function subscribe(subscriptionId: string) {
    const url = new BuildUrl().payment(`/subscribe/${subscriptionId}`);
    const response = await axiosInstance.post(url);
    return response;
}
