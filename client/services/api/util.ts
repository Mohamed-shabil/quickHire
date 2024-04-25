const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const AUTH_SERVICE_URL = process.env.NEXT_PUBLIC_AUTH;
const PROFILE_SERVICE_URL = process.env.NEXT_PUBLIC_PROFILE;
const POSTS_SERVICE_URL = process.env.NEXT_PUBLIC_POSTS;
const JOBS_SERVICE_URL = process.env.NEXT_PUBLIC_JOBS;
const CHATS_SERVICE_URL = process.env.NEXT_PUBLIC_CHATS;
const PAYMENT_SERVICE_URL = process.env.NEXT_PUBLIC_PAYMENTS;

export class BuildUrl {
    private baseUrl: string;
    constructor() {
        if (!BASE_URL) throw new Error("Missing Base Url");
        this.baseUrl = BASE_URL;
    }

    auth(endpoint: string) {
        if (!AUTH_SERVICE_URL) {
            throw new Error("Missing Auth Service URL");
        }
        const url = AUTH_SERVICE_URL;
        return this.baseUrl + url + endpoint;
    }

    profile(endpoint: string) {
        if (!PROFILE_SERVICE_URL) {
            throw new Error("Missing Profile Service URL");
        }
        const url = PROFILE_SERVICE_URL;
        return this.baseUrl + url + endpoint;
    }
    posts(endpoint: string) {
        if (!POSTS_SERVICE_URL) {
            throw new Error("Missing Posts Service URL");
        }
        const url = POSTS_SERVICE_URL;
        return this.baseUrl + url + endpoint;
    }
    chats(endpoint: string) {
        if (!CHATS_SERVICE_URL) {
            throw new Error("Missing Chats Service URL");
        }
        const url = CHATS_SERVICE_URL;
        return this.baseUrl + url + endpoint;
    }
    jobs(endpoint: string) {
        if (!JOBS_SERVICE_URL) {
            throw new Error("Missing Jobs Service URL");
        }
        const url = JOBS_SERVICE_URL;
        return this.baseUrl + url + endpoint;
    }
    payment(endpoint: string) {
        if (!PAYMENT_SERVICE_URL) {
            throw new Error("Missing Payment Service URL");
        }
        const url = PAYMENT_SERVICE_URL;
        return this.baseUrl + url + endpoint;
    }
}
