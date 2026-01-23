/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for builds (GitHub Pages deployment)
  // For local dev: npm run dev (no static export, uses Next.js dev server)
  // For production build: npm run build (creates static export in out/)
  // Note: npm run build automatically sets NODE_ENV=production
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  // Base path only for CI/CD (workflow will override)
  // For local testing, use empty basePath so serve works correctly
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH ? `${process.env.NEXT_PUBLIC_BASE_PATH}/` : '',
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Required for GitHub Pages
  reactStrictMode: true,
  // Ensure all code is compiled and bundled
  swcMinify: true,
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
}

module.exports = nextConfig
