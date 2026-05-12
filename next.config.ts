import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repo = "citylaila-fe";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath:    isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "d3gvlpbdidhqp.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;