// src/app/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, UserRoundCheck, FileText, Award, LifeBuoy, Building, Search } from 'lucide-react';
import FeaturedWorkers from '@/components/FeaturedWorkers';
import FaqAccordion from '@/components/FaqAccordion';

const features = [
  { icon: <ShieldCheck/>, title: "Terverifikasi & Terpercaya", text: "Setiap pekerja telah melalui proses seleksi dan verifikasi latar belakang yang ketat." },
  { icon: <UserRoundCheck/>, title: "Profesional & Terlatih", text: "Kami memastikan setiap pekerja memiliki keterampilan dan etos kerja yang tinggi." },
  { icon: <FileText/>, title: "Proses Cepat & Mudah", text: "Kami bantu Anda menemukan kandidat yang tepat dengan proses yang efisien dan transparan." },
  { icon: <Award/>, title: "Garansi Penempatan", text: "Kami memberikan garansi penggantian pekerja jika dirasa kurang cocok." },
  { icon: <LifeBuoy/>, title: "Dukungan Penuh", text: "Tim kami siap memberikan dukungan dan mediasi selama masa kontrak kerja." },
  { icon: <Building/>, title: "Legalitas Jelas", text: "Sebagai lembaga resmi, kami beroperasi di bawah naungan hukum yang jelas." },
];

export default function HomePage() {
  return (
    <main className="container mx-auto px-6 py-8 md:py-12">
      {/* Hero Section */}
      <section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">Temukan Pekerja Profesional untuk Keluarga Anda</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto md:mx-0">Kami menyediakan pekerja rumah tangga, baby sitter, dan perawat lansia yang terverifikasi, terlatih, dan terpercaya.</p>
            <Link href="/pekerja" className="mt-8 inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition">
              Lihat Daftar Pekerja
            </Link>
          </div>
          <div className="hidden md:block">
            <Image 
              src="/Image/hero-image.png"
              alt="Seorang perawat profesional sedang mendampingi klien" 
              width={1035} 
              height={690} 
              className="rounded-xl shadow-2xl object-cover h-full w-full max-h-[500px]" 
              priority
            />
          </div>
        </div>
      </section>

      {/* Pengenalan & SEO */}
      <section className="mt-20 max-w-4xl mx-auto text-left md:text-center bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800">Mitra Terpercaya untuk Kebutuhan Domestik Anda</h2>
        <p className="mt-4 text-gray-600 leading-relaxed">
            Selamat datang di Mitra Keluarga, sebuah <strong className="font-semibold text-blue-600">yayasan penyalur pekerja rumah tangga (ART)</strong> terkemuka. Kami hadir sebagai solusi, baik sebagai <strong className="font-semibold text-blue-600">agensi baby sitter profesional</strong> maupun penyedia <strong className="font-semibold text-blue-600">jasa perawat lansia</strong> yang andal. 
        </p>
      </section>

      {/* Keunggulan */}
      <section className="mt-16">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-800">Mengapa Memilih Kami?</h3>
          <p className="mt-2 text-lg text-gray-500">Dedikasi kami adalah memberikan yang terbaik.</p>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="inline-block p-4 bg-blue-100 rounded-full">
                {/* --- PERBAIKAN 1: Tambahkan flex untuk menengahkan ikon --- */}
                <div className="h-8 w-8 text-blue-500 flex items-center justify-center">{feature.icon}</div>
              </div>
              <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-gray-500">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Kandidat Unggulan (Slider) */}
      <FeaturedWorkers />

      {/* FAQ (Accordion) */}
      <FaqAccordion />

      {/* Call to Action */}
      <section className="mt-20 bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <div className="flex-shrink-0">
            <div className="bg-blue-100 p-5 rounded-full">
              <Search className="h-16 w-16 text-blue-600"/>
            </div>
          </div>
          <div className="flex-grow text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Kami Siap Membantu Anda</h3>
            <p className="mt-2 text-gray-600">Berikan kriteria pekerja impian Anda, dan biarkan kami yang mewujudkannya.</p>
          </div>
          <div className="flex-shrink-0">
            {/* --- PERBAIKAN 2: Tambahkan link WhatsApp --- */}
            <a 
              href="https://api.whatsapp.com/send?phone=6282122415552&text=Halo%20Mitra%20Keluarga,%20saya%20ingin%20berkonsultasi%20mengenai%20kriteria%20pekerja%20yang%20saya%20butuhkan.%20Mohon%20bantuannya." 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}