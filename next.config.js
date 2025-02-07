/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      // 必要に応じて他のパターンを追加
    ],
  },
}

module.exports = nextConfig

