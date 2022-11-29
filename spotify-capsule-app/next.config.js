/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/encapsulate',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
