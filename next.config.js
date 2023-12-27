/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3333',
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
