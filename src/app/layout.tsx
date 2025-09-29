// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { createClient } from '@/utils/supabase/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Agensi Penyalur APSA',
  description: 'Solusi Terpercaya untuk Kebutuhan Rumah dan Keluarga Anda',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Mengambil data user di server menggunakan await
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Meneruskan data user sebagai 'prop' ke komponen Header */}
        <Header user={user} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}