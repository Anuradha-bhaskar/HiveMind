/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["res.cloudinary.com"], // Allow Cloudinary images
    },
};

export default nextConfig;
