/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Removed static export config - Vercel handles Next.js natively
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Optimize fonts
  optimizeFonts: true,
  // Enable compression (Vercel handles this)
  compress: true,
  // Enable SWC minification
  swcMinify: true,
}

module.exports = nextConfig
