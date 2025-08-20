import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/auth/:path*", // frontend calls /auth/*
        destination: "https://x1ykaq9zgj.execute-api.us-east-1.amazonaws.com/auth/:path*", 
      },
      {
        source: "/generate", // frontend calls /auth/*
        destination: "https://qz61vnb87h.execute-api.us-east-1.amazonaws.com/generate", 
      },
    ];
  },
};

export default nextConfig;
