/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: '/NKHamster',
  assetPrefix: '/NKHamster',
  compress: true,
  swcMinify: true,
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "hamsternhaminh.vn" },
      { protocol: "https", hostname: "*.cloudinary.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // Remove headers for static export (GitHub Pages doesn't support custom headers)
};
module.exports = nextConfig;
