/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  compress: true,

  poweredByHeader: false,

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.simpleicons.org' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'axsqrijcjsynpgfqmqub.supabase.co' },
    ],
  },

}

module.exports = nextConfig
