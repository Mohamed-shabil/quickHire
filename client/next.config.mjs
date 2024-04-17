/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    images: {
        domains: [
            "images.unsplash.com",
            "quickhire-21.s3.ap-south-1.amazonaws.com",
            "utfs.io",
        ],
    },
};

export default nextConfig;
