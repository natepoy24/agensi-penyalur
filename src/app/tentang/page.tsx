// src/app/tentang/page.tsx

import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqAccordion from '@/components/FaqAccordion';
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

      <div className="pt-16 pb-24 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <Breadcrumbs crumbs={crumbs} />
          
          <div className="text-center mt-12 mb-20">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
              Tentang PT Jasa Mandiri Agency
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
              Yayasan Penyalur Pekerja Rumah Tangga (ART), Baby Sitter, dan Perawat Lansia Resmi di Jakarta. Berdedikasi untuk kenyamanan keluarga Anda.
            </p>
          </div>

          {/* Konten halaman tentang kami */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="group perspective">
              <Image
                src="/Image/kisah-kami.jpg"
                alt="Tim PT Jasa Mandiri Agency"
                width={800}
                height={600}
                className="rounded-3xl shadow-xl group-hover:shadow-2xl group-hover:scale-[1.02] transition-all duration-500 object-cover w-full h-[500px]"
              />
            </div>

            <div className="text-slate-700 space-y-8 bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Misi Kami</h2>
              <p className="text-lg leading-relaxed text-slate-600">
                Misi kami adalah menjembatani kebutuhan keluarga di Indonesia dengan tenaga kerja yang profesional, terampil, dan dapat dipercaya. Kami berkomitmen untuk memberikan ketenangan dan solusi terbaik bagi setiap klien.
              </p>

              <ul className="space-y-6 mt-8">
                <li className="flex items-start group">
                  <div className="bg-emerald-100 p-2 rounded-full mr-4 group-hover:scale-110 transition-transform flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-emerald-600" />
                  </div>
                  <span className="text-slate-700 font-medium pt-1">Menyediakan tenaga kerja yang telah melalui proses verifikasi ketat.</span>
                </li>

                <li className="flex items-start group">
                  <div className="bg-emerald-100 p-2 rounded-full mr-4 group-hover:scale-110 transition-transform flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-emerald-600" />
                  </div>
                  <span className="text-slate-700 font-medium pt-1">Memberikan pelatihan dan pengembangan berkelanjutan bagi para pekerja.</span>
                </li>

                <li className="flex items-start group">
                  <div className="bg-emerald-100 p-2 rounded-full mr-4 group-hover:scale-110 transition-transform flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-emerald-600" />
                  </div>
                  <span className="text-slate-700 font-medium pt-1">Menawarkan proses yang transparan, cepat, dan didukung garansi.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* --- KONTEN SEO BARU: LEGALITAS & ALUR KERJA --- */}
          <section id="alur-kerja" className="mt-24 bg-gradient-to-br from-slate-50 to-emerald-50/30 p-10 md:p-16 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Kolom Legalitas */}
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-4">
                  <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  Legalitas & Keamanan
                </h2>
                <p className="mt-6 text-slate-600 leading-relaxed text-lg">
                  Kepercayaan Anda adalah prioritas kami. PT Jasa Mandiri Agency beroperasi sebagai Lembaga Pelatihan Kerja (LPK) dan Perusahaan Penempatan Pekerja Rumah Tangga (P3RT) yang resmi dan terdaftar.
                </p>
                <ul className="mt-8 space-y-4 text-slate-700">
                  <li className="flex items-center gap-3"><CheckCircle size={20} className="text-emerald-500" /> Diawasi oleh Disnaker.</li>
                  <li className="flex items-center gap-3"><CheckCircle size={20} className="text-emerald-500" /> Verifikasi identitas pekerja yang ketat.</li>
                  <li className="flex items-center gap-3"><CheckCircle size={20} className="text-emerald-500" /> Kontrak kerja yang jelas dan adil.</li>
                </ul>
              </div>
              
              {/* Kolom Alur Kerja */}
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                    <Workflow className="w-8 h-8" />
                  </div>
                  Alur Kerja Profesional
                </h2>
                <p className="mt-6 text-slate-600 leading-relaxed text-lg">
                  Kami menyederhanakan proses pencarian pekerja untuk Anda melalui langkah-langkah yang terstruktur dan efisien.
                </p>
                <div className="mt-8 space-y-5">
                  <div className="flex gap-4 group">
                    <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">1</span>
                    <p className="text-slate-700 pt-1"><strong>Konsultasi:</strong> Tim kami akan memahami kriteria dan kebutuhan spesifik Anda.</p>
                  </div>
                  <div className="flex gap-4 group">
                    <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">2</span>
                    <p className="text-slate-700 pt-1"><strong>Seleksi:</strong> Kami merekomendasikan kandidat yang paling sesuai dari database kami.</p>
                  </div>
                  <div className="flex gap-4 group">
                    <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">3</span>
                    <p className="text-slate-700 pt-1"><strong>Wawancara:</strong> Anda dapat mewawancarai kandidat secara langsung atau via video call.</p>
                  </div>
                  <div className="flex gap-4 group">
                    <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">4</span>
                    <p className="text-slate-700 pt-1"><strong>Administrasi:</strong> Pengurusan kontrak dan administrasi yang transparan.</p>
                  </div>
                  <div className="flex gap-4 group">
                    <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">5</span>
                    <p className="text-slate-700 pt-1"><strong>Penempatan:</strong> Pekerja siap diantar ke lokasi Anda dengan aman.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- BAGIAN FAQ BARU --- */}
          <div className="mt-24 max-w-4xl mx-auto">
             <FaqAccordion faqData={faqData} />
          </div>

          {/* --- CALL TO ACTION (CTA) BARU --- */}
          <section className="mt-24 bg-emerald-900 rounded-[2.5rem] shadow-2xl p-10 md:p-16 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 opacity-10 group-hover:scale-110 transition-transform duration-700 ease-out">
              <Image src="/Image/Logo-jm.png" width={400} height={400} alt="Latar belakang logo" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/50 to-transparent"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Percayakan Kebutuhan Anda Pada Kami</h2>
                <p className="text-emerald-100 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
                  Setelah mengenal kami lebih jauh, jangan ragu untuk berkonsultasi. Tim kami siap membantu menemukan solusi terbaik untuk keluarga Anda.
                </p>
              </div>
              <div className="flex-shrink-0">
                <a
                  href="https://api.whatsapp.com/send?phone=6282122415552&text=Halo%20PT%20Jasa%20Mandiri%20Agency,%20saya%20ingin%20berkonsultasi."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-emerald-900 font-black text-lg py-5 px-10 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:-translate-y-1 transition-all duration-300 transform"
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
