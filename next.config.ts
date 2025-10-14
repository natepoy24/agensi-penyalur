import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false, // Mempertahankan pengaturan ini
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qhuayxqevvznebdrowax.supabase.co', // Hostname dari pesan error Anda
        port: '',
        pathname: '/storage/v1/object/public/avatars/**', // Path ke bucket avatars Anda
      },
    ],
  },
};

export default nextConfig;