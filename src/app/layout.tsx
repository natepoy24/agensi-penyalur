// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { createClient } from '@/utils/supabase/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import NotificationHandler from '@/components/NotificationHandler';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | PT Jasa Mandiri',
    default: 'PT Jasa Mandiri - Penyalur ART, Baby Sitter, & Perawat Lansia Terpercaya',
  },
  description: 'PT Jasa Mandiri adalah yayasan penyalur ART, baby sitter, dan perawat lansia profesional di Jakarta dan sekitarnya. Terverifikasi, terlatih, dan bergaransi.',
  keywords: ['penyalur art', 'yayasan baby sitter', 'penyalur baby sitter', 'jasa perawat lansia', 'agen pembantu rumah tangga', 'penyalur pembantu', 'home care jakarta'],
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
      </body>
    </html>
  );
}