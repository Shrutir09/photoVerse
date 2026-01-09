/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Performance optimizations
  swcMinify: true,
  compress: true,
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig

