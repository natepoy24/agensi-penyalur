// src/app/tentang/page.tsx

import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

// Metadata SEO untuk halaman Tentang Kami
export const metadata: Metadata = {
  title: 'Tentang PT Jasa Mandiri Agency | Yayasan Penyalur ART Resmi',
  description:
    'Pelajari visi, misi, dan komitmen PT Jasa Mandiri Agency sebagai yayasan penyalur ART, baby sitter, dan perawat lansia resmi dan terpercaya di Jakarta.',
  keywords: [
    'tentang jasa mandiri agency',
    'yayasan penyalur art resmi',
    'profil perusahaan penyalur baby sitter',
    'penyalur perawat lansia jakarta',
    'legalitas penyalur kerja',
  ],
  openGraph: {
    title: 'Tentang PT Jasa Mandiri Agency: Visi, Misi, dan Legalitas',
    description:
      'Kenali PT Jasa Mandiri, agensi penyalur ART dan baby sitter profesional dengan proses seleksi dan pelatihan resmi.',
    url: 'https://penyalurkerja.com/tentang',
    type: 'website',
  },
};

export default function TentangPage() {
  const crumbs = [
    { name: 'Beranda', path: '/' },
    { name: 'Tentang Kami', path: '/tentang' },
  ];

  return (
    <main>
      <div className="pt-20 pb-20 px-4">
        <div className="container mx-auto">
          <Breadcrumbs crumbs={crumbs} />
          <div className="text-center mt-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Tentang PT Jasa Mandiri Agency
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Yayasan Penyalur Pekerja Rumah Tangga (ART), Baby Sitter, dan Perawat Lansia Resmi di Jakarta.
            </p>
          </div>

          {/* Konten halaman tentang kami */}
          <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/Image/team-photo.webp" 
                alt="Tim PT Jasa Mandiri Agency"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>

            <div className="text-gray-700 space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">Misi Kami</h2>
              <p>
                Misi kami adalah menjembatani kebutuhan keluarga di Indonesia dengan tenaga kerja yang profesional, terampil, dan dapat dipercaya. Kami berkomitmen untuk memberikan ketenangan dan solusi terbaik bagi setiap klien.
              </p>

              <ul className="space-y-2 mt-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <span>Menyediakan tenaga kerja yang telah melalui proses verifikasi ketat.</span>
                </li>

                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <span>Memberikan pelatihan dan pengembangan berkelanjutan bagi para pekerja.</span>
                </li>

                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <span>Menawarkan proses yang transparan, cepat, dan didukung garansi.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
