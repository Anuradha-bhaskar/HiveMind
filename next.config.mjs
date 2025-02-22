/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
                pathname: "/**",
            }
        ]
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb', // Increase limit (adjust as needed)
        },
    },
};

export default nextConfig;
