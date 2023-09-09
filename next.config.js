/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    appDir: true,
  },
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3333',
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
