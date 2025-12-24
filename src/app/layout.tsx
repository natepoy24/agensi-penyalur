import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { createClient } from '@/utils/supabase/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import { SpeedInsights } from "@vercel/speed-insights/next";
import NotificationHandler from '@/components/NotificationHandler';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { Analytics } from "@vercel/analytics/next"
import dynamic from 'next/dynamic';

// OPTIMASI PERFORMA: Load Floating Button hanya di client side (Lazy Load)
const FloatingWhatsApp = dynamic(() => import('@/components/FloatingWhatsApp'));

// Optimasi Font: Swap agar teks muncul duluan sebelum font load
const inter = Inter({ subsets: ['latin'], display: 'swap' });

// URL PRODUKSI (Hardcode ini untuk membunuh domain hantu)
const SITE_URL = 'https://penyalurkerja.com';

export const metadata: Metadata = {
  // PENTING: Set Base URL agar semua gambar/link relative jadi absolute
  metadataBase: new URL(SITE_URL),
  
  title: {
    template: '%s | PT Jasa Mandiri',
    default: 'PT Jasa Mandiri Agency - Penyalur ART, Baby Sitter, & Perawat Lansia Terpercaya',
  },
  description: 'PT Jasa Mandiri Agency adalah perusahaan resmi penyalur tenaga kerja babysitter, asisten rumah tangga, dan perawat lansia bergaransi di Jakarta.',
  keywords: ['penyalur art', 'yayasan baby sitter', 'penyalur baby sitter', 'jasa perawat lansia', 'agen pembantu rumah tangga', 'penyalur pembantu', 'home care jakarta', 'lowongan kerja art'],
  
  // SOLUSI GHOST DOMAIN: Canonical Hardcoded
  alternates: {
    canonical: './', // Ini otomatis mengarah ke https://penyalurkerja.com/halaman-terkait
  },

  openGraph: {
    title: 'PT Jasa Mandiri Agency - Penyalur ART & Baby Sitter Resmi',
    description: 'Yayasan penyalur resmi, terpercaya, dan bergaransi di Jakarta. Tersedia ribuan pekerja siap kerja.',
    url: SITE_URL,
    siteName: 'PT Jasa Mandiri Agency',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/Image/Logo-jm.png', // Next.js akan menggabungkan ini dengan metadataBase
        width: 1200,
        height: 630,
        alt: 'PT Jasa Mandiri Agency Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PT Jasa Mandiri Agency - Penyalur Tenaga Kerja',
    description: 'Solusi pencarian ART dan Baby Sitter terpercaya di Jakarta.',
    images: ['/Image/Logo-jm.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Schema Global (Sudah dimodifikasi agar connect ke Maps & Product)
const orgSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://penyalurkerja.com/#organization", // KTP untuk dipanggil Schema Product
      "name": "PT Jasa Mandiri Agency",
      "legalName": "PT Jasa Mandiri Agency",
      "url": "https://penyalurkerja.com",
      "logo": "https://penyalurkerja.com/Image/Logo-jm.png",
      "image": "https://penyalurkerja.com/Image/banner.webp",
      "description": "PT Jasa Mandiri Agency adalah perusahaan resmi penyalur tenaga kerja babysitter, asisten rumah tangga, dan perawat lansia.",
      "foundingDate": "2015",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jl. Gunung balong no 78 RT11/04",
        "addressLocality": "Jakarta Selatan",
        "addressRegion": "DKI Jakarta",
        "postalCode": "12440",
        "addressCountry": "ID"
      },
      "telephone": "+6282122415552",
      "email": "info@penyalurkerja.com",
      "sameAs": [
        "https://www.facebook.com/jasa.mandiri.penyalurkerja",
        "https://www.instagram.com/cvjasamandiri/",
        "https://wa.me/6282122415552",
        // PENTING: Masukkan Link Google Maps Anda disini!
        // Contoh: "https://maps.app.goo.gl/xxxxxx" 
      ]
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://penyalurkerja.com/#local",
      "parentOrganization": {
         "@id": "https://penyalurkerja.com/#organization"
      },
      "name": "PT Jasa Mandiri Agency Penyalur Tenaga Kerja",
      "image": "https://penyalurkerja.com/Image/Logo-jm.png",
      "priceRange": "IDR",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jl. Gunung balong no 78 RT11/04",
        "addressLocality": "Jakarta Selatan",
        "addressRegion": "DKI Jakarta",
        "postalCode": "12440",
        "addressCountry": "ID"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -6.3060224,
        "longitude": 106.7835775
      },
      "telephone": "+6282122415552",
      "openingHours": "Mo-Su 08:00-20:00",
      "url": "https://penyalurkerja.com",
      // INGAT: Jangan pasang aggregateRating disini agar tidak kena penalti
      "sameAs": [
         // Link Maps juga boleh ditaruh disini
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://penyalurkerja.com/#website",
      "url": "https://penyalurkerja.com",
      "name": "Penyalur Kerja Resmi | PT Jasa Mandiri Agency",
      "publisher": {
        "@id": "https://penyalurkerja.com/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://penyalurkerja.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // KITA HAPUS LOGIKA CANONICAL MANUAL DISINI
  // Karena sudah di-handle oleh export metadata di atas dengan lebih aman.

  return (
    <html lang="id">
      {/* Tambahkan padding-bottom (pb-24) agar konten paling bawah tidak tertutup floating button di mobile */}
      <body className={`${inter.className} pb-24 md:pb-0`}>
        {/* Schema JSON-LD Global */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} // Minify JSON
        />
        
        <GoogleAnalytics />
        <Analytics/>
        
        <Toaster position="top-center" />
        <NotificationHandler />
        <Header user={user} />
        
        <main className="min-h-screen">
            {children}
        </main>
        
        <FloatingWhatsApp phoneNumber="6282122415552" />
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}