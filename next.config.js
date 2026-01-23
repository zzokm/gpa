/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages (workflow will override this)
  // For local dev, use: npm run dev (no static export)
  // For production build, use: npm run build (with static export)
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  // Base path for production (workflow will override for CI/CD)
  basePath: process.env.NODE_ENV === 'production' ? (process.env.NEXT_PUBLIC_BASE_PATH || '/gpa/beta') : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? (process.env.NEXT_PUBLIC_BASE_PATH ? `${process.env.NEXT_PUBLIC_BASE_PATH}/` : '/gpa/beta/') : '',
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Required for GitHub Pages
  reactStrictMode: true,
}

module.exports = nextConfig
