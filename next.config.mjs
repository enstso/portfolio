/** @type {import('next').NextConfig} */
const nextConfig = {assetPrefix: process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_URL : "http://localhost:3000/",
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: process.env.NODE_ENV === "production" ? true : false,
      },};

export default nextConfig;