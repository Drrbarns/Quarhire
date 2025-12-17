import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed output: "export" to support API routes
  // If you need static export, API routes must be moved to external serverless functions
  images: {
    unoptimized: true,
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
};

export default nextConfig;
