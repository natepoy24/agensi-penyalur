import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false, 
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb', // Menjaga agar upload foto artikel tidak error
    },
  },
  images: {
    unoptimized: true, // SOLUSI VERCEL 100%: Mematikan optimasi gambar
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qhuayxqevvznebdrowax.supabase.co', 
        port: '',
        pathname: '/storage/v1/object/public/avatars/**', 
      },
    ],
  },
};

export default nextConfig;
