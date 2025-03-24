import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
    ],
  },
};

export default nextConfig;
