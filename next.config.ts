import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 600, 700, 800],
  },
  reactStrictMode: true,
  pageExtensions: ['md', 'tsx', 'ts', 'jsx', 'js', 'mdx'],
  experimental: {
    optimizeCss: false,
    mdxRs: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
