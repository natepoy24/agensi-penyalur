// src/app/pekerja/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stok Pekerja Ready (ART, Baby Sitter, Lansia) | Jasa Mandiri',
  description: 'Lihat daftar pekerja rumah tangga, baby sitter, dan perawat lansia yang siap kerja hari ini. Foto lengkap, identitas jelas, dan bergaransi.',
};

import PekerjaCard, { type PekerjaProps } from '@/components/PekerjaCard';
import { createClient } from '@/utils/supabase/server';
import FilterControls from '@/components/FilterControls';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqAccordion from '@/components/FaqAccordion';
import Pagination from '@/components/Pagination';

export const dynamic = 'force-dynamic';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Apakah data pekerja di halaman ini selalu terbaru?",
    answer: "Ya, kami memperbarui status ketersediaan pekerja secara real-time. Pekerja dengan status 'Tersedia' siap untuk proses penempatan.",
  },
  {
    question: "Bagaimana cara saya memulai proses wawancara dengan calon pekerja?",
    answer: "Setelah menemukan kandidat yang Anda minati, silakan hubungi kami melalui WhatsApp dengan menyebutkan kode atau nama pekerja. Tim kami akan segera mengatur jadwal wawancara untuk Anda.",
  },
];

export default async function PekerjaPage(
  props: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
  }
) {
  const searchParams = await props.searchParams;
  // Ekstrak semua nilai dari 'searchParams' SEBELUM await pertama
  const kategori = searchParams.kategori;
  const status = searchParams.status;
  const search = searchParams.search;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = 8;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const supabase = await createClient();
  let daftarPekerja: PekerjaProps[] = [];

  let query = supabase.from('pekerja').select('*', { count: 'exact' });

  // Gunakan variabel yang sudah diekstrak
  if (kategori) {
    query = query.eq('kategori', kategori);
  }
  if (status) {
    query = query.eq('status', status);
  }
  if (search) {
    query = query.ilike('nama', `%${search}%`);
  }

  const { data, error, count } = await query.order('created_at', { ascending: false }).range(from, to);

  if (error) {
    console.error('Error fetching pekerja:', error);
  } else if (data) {
    daftarPekerja = data as PekerjaProps[];
  }

  const totalPages = count ? Math.ceil(count / limit) : 0;

  // Buat skema FAQ secara manual
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="pt-16 pb-24 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <Breadcrumbs
              crumbs={[
                { name: 'Beranda', path: '/' },
                { name: 'Pekerja', path: '/pekerja' },
              ]}
            />
            <h1 className="text-4xl md:text-5xl mt-8 font-black text-slate-900 tracking-tight leading-tight">
              Tenaga Kerja Profesional Kami<br className="hidden md:block"/> Yang Siap Kerja
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
              Temukan partner terpercaya untuk membantu kebutuhan keluarga Anda hari ini.
            </p>
          </div>
          
          <div className="mb-12 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
             <FilterControls />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {daftarPekerja.length > 0 ? (
              daftarPekerja.map((pekerja) => (
                <PekerjaCard key={pekerja.id} pekerja={pekerja} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <div className="inline-block p-6 bg-slate-50 rounded-full mb-4">
                  <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Pekerja Tidak Ditemukan</h3>
                <p className="text-slate-500">
                  Tidak ada pekerja yang cocok dengan kriteria filter Anda saat ini.<br/>
                  Silakan ubah filter untuk menemukan pekerja lain.
                </p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="mt-16">
              <Pagination currentPage={page} totalPages={totalPages} />
            </div>
          )}

          {/* FAQ Section */}
          <div className="mt-24 max-w-4xl mx-auto">
             <FaqAccordion faqData={faqData} />
          </div>

        </div>
      </div>
    </main>
  );
}