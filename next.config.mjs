/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // ✅ C'est cette ligne qui te manque
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: process.env.NODE_ENV === 'production' ? true : false,
  },
};

export default nextConfig;