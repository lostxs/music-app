import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.timeweb.cloud",
      },
      {
        protocol: "https",
        hostname: "s3.twcstorage.ru",
      },
    ],
  },
};

export default nextConfig;
