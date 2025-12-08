import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ["http://localhost:5000"],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "quickchart.io",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "ui-avatars.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
