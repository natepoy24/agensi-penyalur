// src/app/layanan/perawat-lansia/page.tsx
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqAccordion from '@/components/FaqAccordion';
import { HeartHandshake, Stethoscope, CheckCircle, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Penyalur Perawat Lansia Profesional & Terpercaya | Jasa Mandiri Agency",
  description:
    "Layanan penyalur perawat lansia (home care) profesional dari Jasa Mandiri Agency. Memberikan perawatan penuh kasih, sabar, dan terpercaya untuk orang tua Anda di rumah.",
  keywords: [
    "penyalur perawat lansia",
    "jasa perawat lansia jakarta",
    "yayasan perawat lansia",
    "home care jakarta",
    "Jasa Mandiri Agency",
    "penyalur kerja domestik",
  ],
};

interface FAQItem {
  question: string;
  answer: string;
}

const subKategoriPL = [
    { 
        title: "Perawat Lansia Harian (Non-Medis)", 
        description: "Membantu aktivitas sehari-hari lansia seperti menyiapkan makan, membantu mobilitas, memandikan, dan memastikan jadwal minum obat terpenuhi." 
    },
    { 
        title: "Perawat Lansia Tinggal di Rumah", 
        description: "Memberikan pendampingan dan perawatan penuh selama 24 jam di rumah, memberikan rasa aman bagi keluarga dan kenyamanan bagi lansia." 
    },
    { 
        title: "Perawat Lansia Medis", 
        description: "Tenaga dengan latar belakang atau pelatihan medis dasar untuk mendampingi pasien dengan kondisi khusus (misal: pasca stroke, penggunaan alat bantu)." 
    },
];

const faqData: FAQItem[] = [
  {
    question: "Apakah perawat lansia bisa menangani kondisi medis?",
    answer: "Kami menyediakan dua jenis perawat: non-medis untuk bantuan aktivitas harian, dan perawat dengan pelatihan medis dasar untuk kondisi khusus seperti pasca-stroke, diabetes (suntik insulin), atau penggunaan alat bantu medis lainnya.",
  },
  {
    question: "Berapa lama masa garansi untuk layanan perawat lansia?",
    answer: "Untuk area Jabodetabek, kami memberikan garansi 3 bulan dengan hak 3 kali penggantian. Untuk area di luar Jabodetabek, berlaku sistem kontrak dengan garansi 6 bulan dan hak 2 kali penggantian.",
  },
  {
    question: "Apakah perawat bisa tinggal di rumah (24 jam)?",
    answer: "Tentu, kami menyediakan layanan perawat lansia yang tinggal di rumah untuk memberikan pendampingan dan perawatan penuh selama 24 jam, sehingga memberikan rasa aman bagi keluarga dan kenyamanan bagi lansia.",
  },
  {
    question: "Apa saja tugas utama perawat lansia non-medis?",
    answer: "Tugas utamanya adalah membantu aktivitas sehari-hari lansia, seperti menyiapkan makan, membantu mobilitas (berjalan), memandikan, menemani, serta memastikan jadwal minum obat terpenuhi dengan tepat waktu.",
  }
];

export default function PerawatLansiaPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Penyalur Perawat Lansia Profesional",
    serviceType: "Perawatan Lansia di Rumah",
    description: "Jasa Mandiri Agency menyediakan tenaga perawat lansia profesional yang terlatih untuk memberikan perawatan, perhatian, dan kenyamanan terbaik bagi orang tua Anda di rumah.",
    provider: {
      "@type": "Organization",
      name: "Jasa Mandiri Agency",
      url: "https://penyalurkerja.com",
    },
    areaServed: {
      "@type": "Place",
      name: "Jakarta dan sekitarnya",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "IDR",
      price: "3500000",
      url: "https://penyalurkerja.com/layanan/perawat-lansia",
    },
  };

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="pt-16 pb-24 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <Breadcrumbs crumbs={[
            { name: 'Beranda', path: '/' },
            { name: 'Layanan', path: '/layanan' },
            { name: 'Perawat Lansia', path: '/layanan/perawat-lansia' }
          ]} />

          <section className="text-center mt-12 mb-16 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Perawat Lansia Profesional &<br className="hidden md:block"/> Penuh Kasih Sayang
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-600 leading-relaxed font-light">
              Layanan <strong className="font-semibold text-slate-800">perawat lansia berpengalaman</strong> dari{" "}
              <Link href="/tentang" className="text-purple-600 hover:text-purple-800 font-semibold transition-colors">Jasa Mandiri</Link>, 
              siap membantu keluarga Anda dalam memberikan perhatian, waktu, dan perawatan terbaik untuk orang tua tercinta di rumah.
            </p>
          </section>

          <section className="relative w-full h-[350px] md:h-[500px] mb-24 rounded-[2.5rem] overflow-hidden shadow-2xl group">
            <Image
              src="/Image/perawat-lansia.svg" 
              alt="Perawat lansia profesional dari Jasa Mandiri Agency dengan sabar mendampingi klien"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent"></div>
          </section>

          <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
            <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="bg-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                 <HeartHandshake className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Perawatan Penuh Empati</h2>
              <p className="text-slate-600 leading-relaxed">
                Fokus kami adalah memberikan pendampingan yang tulus dan sabar, tidak hanya membantu secara fisik tetapi juga menjadi teman bagi para lansia untuk menjaga kesehatan mental mereka.
              </p>
            </div>
            
            <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="bg-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                 <Stethoscope className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Kualifikasi Terjamin</h2>
              <p className="text-slate-600 leading-relaxed">
                Setiap perawat lansia telah kami latih untuk memahami kebutuhan spesifik orang tua, mulai dari bantuan mobilitas hingga penanganan kondisi dasar sesuai standar operasional yang ketat.
              </p>
            </div>
            
            <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="bg-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                 <ShieldCheck className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Ketenangan Bagi Keluarga</h2>
              <p className="text-slate-600 leading-relaxed">
                Dengan menyerahkan perawatan kepada tenaga profesional kami, Anda dapat beraktivitas dengan tenang, mengetahui bahwa orang tua Anda berada di tangan yang aman dan peduli.
              </p>
            </div>
          </section>

          <section id="subkategori" className="bg-gradient-to-br from-white to-purple-50/50 rounded-[2.5rem] shadow-xl border border-slate-100 p-10 md:p-16 max-w-5xl mx-auto mb-24 relative overflow-hidden">
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
            
            <div className="relative z-10 text-center mb-12">
               <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4 tracking-tight">
                 Jenis Layanan Perawat Lansia
               </h2>
            </div>
            
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
              {subKategoriPL.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <h4 className="text-xl font-bold text-purple-700 mb-3">{item.title}</h4>
                  <p className="text-slate-600 leading-relaxed font-light">{item.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 pt-10 border-t border-slate-200 text-center relative z-10">
              <p className="text-slate-600 mb-4 font-medium text-lg">Estimasi gaji untuk layanan Perawat Lansia di Jabodetabek:</p>
              <div className="inline-block bg-slate-900 text-white px-8 py-4 rounded-full text-xl font-black tracking-wide shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-300">
                Rp 3.000.000 - Rp 5.000.000 <span className="text-slate-400 font-medium text-lg">/ bulan*</span>
              </div>
              <p className="text-sm text-slate-500 mt-6 max-w-2xl mx-auto font-light">*Sangat bergantung pada level pengalaman (Junior/Senior) dan kondisi medis lansia (penggunaan alat bantu dll).</p>
            </div>
          </section>

          <div className="max-w-4xl mx-auto mb-24">
            <FaqAccordion faqData={faqData} />
          </div>

           <section className="text-center bg-slate-900 rounded-[2.5rem] p-10 md:p-16 max-w-5xl mx-auto text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-950/40 to-transparent"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Kesehatan Mereka Sangat Berharga</h3>
              <p className="text-slate-300 mb-10 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                Segera konsultasikan kondisi kesehatan dan kebutuhan pendampingan untuk orang tua Anda kepada tim ahli kami. Kami siap mencarikan kandidat perawat yang paling tepat.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a href="https://api.whatsapp.com/send?phone=6282122415552&text=Halo%20Admin%20Jasa%20Mandiri,%20saya%20butuh%20info%20ketersediaan%20perawat%20lansia." target="_blank" rel="noreferrer" className="bg-purple-600 hover:bg-purple-500 text-white font-black text-lg py-4 px-8 rounded-full shadow-[0_0_30px_rgba(147,51,234,0.3)] transition transform hover:-translate-y-1">
                  Konsultasi & Tanya Ketersediaan
                </a>
                <Link href="/pekerja" className="bg-transparent border-2 border-slate-600 hover:border-slate-400 text-white font-bold text-lg py-4 px-8 rounded-full transition-all duration-300">
                  Lihat Profil Perawat Lansia
                </Link>
              </div>
            </div>
          </section>

          <section className="text-center pt-8 border-t border-slate-200">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Butuh Bantuan Lainnya?
            </h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto text-lg">
              Lihat juga layanan{" "}
              <Link href="/layanan/art" className="text-blue-600 font-semibold hover:underline">
                Asisten Rumah Tangga (ART)
              </Link>{" "}
              dan{" "}
              <Link href="/layanan/baby-sitter" className="text-emerald-600 font-semibold hover:underline">
                Baby Sitter Profesional
              </Link>{" "}
              untuk kebutuhan keluarga Anda.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}