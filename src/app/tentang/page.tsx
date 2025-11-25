// src/app/tentang/page.tsx

import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CheckCircle, ShieldCheck, Workflow } from 'lucide-react';
import type { Metadata } from 'next';

// Metadata SEO untuk halaman Tentang Kami
export const metadata: Metadata = {
  title: 'Tentang PT Jasa Mandiri | Yayasan Penyalur ART Resmi',
  description:
    'Pelajari visi, misi, dan komitmen PT Jasa Mandiri sebagai yayasan penyalur ART, baby sitter, dan perawat lansia resmi dan terpercaya di Jakarta.',
  keywords: [
    'tentang jasa mandiri',
    'yayasan penyalur art resmi',
    'profil perusahaan penyalur baby sitter',
    'penyalur perawat lansia jakarta',
    'legalitas penyalur kerja',
  ],
  openGraph: {
    title: 'Tentang PT Jasa Mandiri: Visi, Misi, dan Legalitas',
    description:
      'Kenali PT Jasa Mandiri Agency, yayasan penyalur ART, baby sitter, dan perawat lansia resmi dengan legalitas jelas dan proses seleksi profesional.',
    url: 'https://penyalurkerja.com/tentang',
    type: 'website',
  },
};

export default function TentangPage() {
  const crumbs = [
    { name: 'Beranda', path: '/' },
    { name: 'Tentang Kami', path: '/tentang' },
  ];

  const faqData = [
    {
      question: "Apakah PT Jasa Mandiri Agency adalah perusahaan resmi?",
      answer: "Ya, kami adalah perusahaan resmi yang terdaftar dan diawasi oleh Dinas Tenaga Kerja (Disnaker). Kami beroperasi dengan legalitas yang jelas untuk memberikan keamanan dan kenyamanan penuh bagi klien maupun para pekerja.",
    },
    {
      question: "Di mana saja area layanan PT Jasa Mandiri Agency?",
      answer: "Area layanan utama kami adalah Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi). Namun, kami juga melayani penempatan untuk luar kota dengan syarat dan ketentuan khusus yang dapat didiskusikan dengan tim kami.",
    },
    {
      question: "Bagaimana alur kerja atau proses pengambilan pekerja?",
      answer: "Proses kami dimulai dari konsultasi untuk memahami kebutuhan Anda, pemilihan kandidat dari database kami, proses wawancara (bisa via video call), hingga penandatanganan kontrak dan serah terima pekerja. Semua proses kami rancang agar mudah, cepat, dan transparan.",
    },
  ];

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
      {/* Inject FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
                src="/Image/kisah-kami.jpg"
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

          {/* --- KONTEN SEO BARU: LEGALITAS & ALUR KERJA --- */}
          <section id="alur-kerja" className="mt-20 bg-slate-50 p-8 md:p-12 rounded-2xl">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Kolom Legalitas */}
              <div>
                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-blue-600" />
                  Legalitas & Keamanan
                </h2>
                <p className="mt-4 text-gray-600">
                  Kepercayaan Anda adalah prioritas kami. PT Jasa Mandiri Agency beroperasi sebagai Lembaga Pelatihan Kerja (LPK) dan Perusahaan Penempatan Pekerja Rumah Tangga (P3RT) yang resmi dan terdaftar.
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex items-center gap-2"><CheckCircle size={18} className="text-blue-600" /> Diawasi oleh Disnaker.</li>
                  <li className="flex items-center gap-2"><CheckCircle size={18} className="text-blue-600" /> Verifikasi identitas pekerja yang ketat.</li>
                  <li className="flex items-center gap-2"><CheckCircle size={18} className="text-blue-600" /> Kontrak kerja yang jelas dan adil.</li>
                </ul>
              </div>
              {/* Kolom Alur Kerja */}
              <div>
                <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                  <Workflow className="w-8 h-8 text-blue-600" />
                  Alur Kerja Profesional
                </h2>
                <p className="mt-4 text-gray-600">
                  Kami menyederhanakan proses pencarian pekerja untuk Anda melalui langkah-langkah yang terstruktur dan efisien.
                </p>
                <ol className="mt-4 space-y-2 text-gray-600 list-decimal list-inside">
                  <li><strong>Konsultasi:</strong> Tim kami akan memahami kriteria dan kebutuhan spesifik Anda.</li>
                  <li><strong>Seleksi:</strong> Kami merekomendasikan kandidat yang paling sesuai dari database kami.</li>
                  <li><strong>Wawancara:</strong> Anda dapat mewawancarai kandidat secara langsung atau via video call.</li>
                  <li><strong>Administrasi:</strong> Pengurusan kontrak dan administrasi yang transparan.</li>
                  <li><strong>Penempatan:</strong> Pekerja siap diantar ke lokasi Anda dengan aman.</li>
                </ol>
              </div>
            </div>
          </section>

          {/* --- BAGIAN FAQ BARU --- */}
          <section id="faq" className="max-w-4xl mx-auto mt-20">
            <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
              Pertanyaan Umum Tentang Kami
            </h2>
            {/* Komponen FAQ bisa dibuat terpisah atau langsung di sini */}
            <div className="space-y-4">
              {faqData.map((item, index) => (
                <details key={index} className="group bg-white p-6 rounded-lg shadow-sm border">
                  <summary className="flex justify-between items-center font-semibold cursor-pointer text-gray-800">
                    {item.question}
                    <span className="ml-4 transition-transform duration-200 group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-600 leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* --- CALL TO ACTION (CTA) BARU --- */}
          <section className="mt-20 bg-emerald-900 rounded-2xl shadow-2xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10">
              <Image src="/Image/Logo-jm.png" width={300} height={300} alt="Latar belakang logo" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">Percayakan Kebutuhan Anda Pada Kami</h2>
                <p className="text-emerald-100 text-lg max-w-xl">
                  Setelah mengenal kami lebih jauh, jangan ragu untuk berkonsultasi. Tim kami siap membantu menemukan solusi terbaik untuk keluarga Anda.
                </p>
              </div>
              <div className="flex-shrink-0">
                <a
                  href="https://api.whatsapp.com/send?phone=6282122415552&text=Halo%20PT%20Jasa%20Mandiri%20Agency,%20saya%20ingin%20berkonsultasi."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-emerald-900 font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-gray-100 hover:scale-105 transition transform"
                >
                  Hubungi Kami Sekarang
                </a>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
