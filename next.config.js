/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async () => [
    {
      source: '/app',
      destination: '/app/home',
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
