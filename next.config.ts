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
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                fs: false, // or require.resolve('path-browserify') for path module
            };
        }
        return config;
    },
};

export default nextConfig;
