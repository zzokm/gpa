/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export for production builds, not for dev server
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  basePath: process.env.NODE_ENV === 'production' ? '/gpa/beta' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/gpa/beta/' : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
