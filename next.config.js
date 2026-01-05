/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Enable static export for GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio-website' : '', // GitHub Pages base path
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio-website' : '', // GitHub Pages asset prefix
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Optimize fonts
  optimizeFonts: true,
  // Disable compression for static export
  compress: false,
  // Enable SWC minification
  swcMinify: true,
  // Trailing slash for GitHub Pages
  trailingSlash: true,
}

module.exports = nextConfig
