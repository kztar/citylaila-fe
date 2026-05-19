import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repo = "citylaila-fe";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // basePath:    isProd ? `/${repo}` : "",
  basePath: "",
  // assetPrefix: isProd ? `/${repo}/` : "",
  assetPrefix: "",
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