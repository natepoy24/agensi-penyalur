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
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { Analytics } from "@vercel/analytics/next"
import SchemaInjector from '@/components/SchemaInjector';
import { generateSchema } from '@/app/lib/schemaGenerator';

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

const orgSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://penyalurkerja.com/#organization",
      "name": "PT Jasa Mandiri",
      "legalName": "PT Jasa Mandiri",
      "url": "https://penyalurkerja.com",
      "logo": "https://penyalurkerja.com/Image/logo-jm.png",
      "image": "https://penyalurkerja.com/Image/banner.webp",
      "description": "PT Jasa Mandiri adalah perusahaan resmi penyalur tenaga kerja babysitter, asisten rumah tangga, perawat lansia, dan office boy/office girl ke seluruh Indonesia.",
      "foundingDate": "2015",
      "address": {
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
        "https://wa.me/6282122415552"
      ]
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://penyalurkerja.com/#local",
      "name": "PT Jasa Mandiri Penyalur Tenaga Kerja",
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
      "url": "https://penyalurkerja.com"
    },
    {
      "@type": "WebSite",
      "@id": "https://penyalurkerja.com/#website",
      "url": "https://penyalurkerja.com",
      "name": "Penyalur Kerja Resmi | PT Jasa Mandiri",
      "publisher": {
        "@id": "https://penyalurkerja.com/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://penyalurkerja.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
  ]
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
        <SchemaInjector schema={orgSchema} />
        <GoogleAnalytics />
        <Analytics/>
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