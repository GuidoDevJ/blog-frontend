import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['s3-alpha-sig.figma.com', 'res.cloudinary.com'],
  },
};

export default nextConfig;
