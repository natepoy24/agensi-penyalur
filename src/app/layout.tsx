// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { createClient } from '@/utils/supabase/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import { SpeedInsights } from "@vercel/speed-insights/next";
import NotificationHandler from '@/components/NotificationHandler';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | PT Jasa Mandiri',
    default: 'PT Jasa Mandiri - Penyalur ART, Baby Sitter, & Perawat Lansia Terpercaya',
  },
  description: 'PT Jasa Mandiri adalah Perusahaan penempatan pekerja rumah tangga',
  keywords: ['penyalur art', 'yayasan baby sitter', 'penyalur baby sitter', 'jasa perawat lansia', 'agen pembantu rumah tangga', 'penyalur pembantu', 'home care jakarta'],
  openGraph: {
    title: 'PT Jasa Mandiri - Penyalur ART, Baby Sitter, & Perawat Lansia Terpercaya',
    description: 'Yayasan penyalur resmi & terpercaya di Jakarta dan sekitarnya.',
    url: 'https://penyalurkerja.com',
    siteName: 'PT Jasa Mandiri',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'Image/Logo-jm.png', // pastikan file ini ada di /public
        width: 1200,
        height: 630,
        alt: 'PT Jasa Mandiri',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PT Jasa Mandiri - Penyalur ART, Baby Sitter, & Perawat Lansia Terpercaya',
    description: 'Yayasan penyalur resmi & terpercaya di Jakarta dan sekitarnya.',
    images: ['Image/Logo-jm.png'],
  },
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="id">
      <body className={inter.className}>
        <Toaster position="top-center" />
        <NotificationHandler />
        <Header user={user} />
        <main>{children}</main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}