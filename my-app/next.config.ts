import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io'], // Add trusted image domains
    deviceSizes: [320, 420, 768, 1024, 1200], // Optimize for various screen sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Predefine image sizes
    formats: ['image/avif', 'image/webp'], // Use next-gen image formats
    minimumCacheTTL: 60 * 60 * 24 * 30, // Cache images for 30 days
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during the build process
  },
};

export default nextConfig;

