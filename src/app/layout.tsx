// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { createClient } from '@/utils/supabase/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast'; // 1. Impor komponen Toaster
import NotificationHandler from '@/components/NotificationHandler'; // Impor komponen baru

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Agensi Penyalur APSA',
  description: 'Solusi Terpercaya untuk Kebutuhan Rumah dan Keluarga Anda',
};

export default async function RootLayout({ children }: { children: React.ReactNode; }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();


  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-center" />
        <NotificationHandler /> {/* <-- Tambahkan komponen ini */}
        <Header user={user} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}