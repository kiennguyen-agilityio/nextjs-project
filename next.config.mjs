/** @type {import('next').NextConfig} */
const nextConfig = {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'loremflickr.com',
      port: '',
      pathname: '/**',
    },
  ],
  images: {
    domains: ['s.net.vn'],
  },
};

export default nextConfig;
