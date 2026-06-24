/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export only when explicitly requested.
  // API routes require a Node server build (default).
  ...(process.env.STATIC_EXPORT === 'true' && { output: 'export' }),
  ...(!process.env.STATIC_EXPORT && { output: 'standalone' }),
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH ? `${process.env.NEXT_PUBLIC_BASE_PATH}/` : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
}

module.exports = nextConfig
