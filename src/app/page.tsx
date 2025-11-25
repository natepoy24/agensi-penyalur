// src/app/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, UserRoundCheck, FileText, Award, LifeBuoy, Building, Search, Star, MapPin } from 'lucide-react';
import FaqAccordion from '@/components/FaqAccordion';
import FeaturedWorkers from '@/components/FeaturedWorkers';
import Breadcrumbs from '@/components/Breadcrumbs';

interface FAQItem {
  question: string;
  answer: string;
}

const features = [
  { icon: <ShieldCheck />, title: "Terverifikasi & Terpercaya", text: "Setiap pekerja telah melalui proses seleksi dan verifikasi latar belakang yang ketat." },
  { icon: <UserRoundCheck />, title: "Profesional & Terlatih", text: "Kami memastikan setiap pekerja memiliki keterampilan dan etos kerja yang tinggi." },
  { icon: <FileText />, title: "Proses Cepat & Mudah", text: "Kami bantu Anda menemukan kandidat yang tepat dengan proses yang efisien dan transparan." },
  { icon: <Award />, title: "Garansi Penempatan", text: "Kami memberikan garansi penggantian pekerja jika dirasa kurang cocok." },
  { icon: <LifeBuoy />, title: "Dukungan Penuh", text: "Tim kami siap memberikan dukungan dan mediasi selama masa kontrak kerja." },
  { icon: <Building />, title: "Legalitas Jelas", text: "Sebagai lembaga resmi, kami beroperasi di bawah naungan hukum yang jelas." },
];

const faqData: FAQItem[] = [
  { 
    question: "Bagaimana proses seleksi pekerja di Jasa mandiri?", 
    answer: "Setiap calon pekerja kami melalui proses seleksi yang sangat ketat, meliputi verifikasi identitas (KTP, KK), wawancara mendalam, uji kompetensi (kecuali ART), serta pengecekan latar belakang untuk memastikan mereka dapat dipercaya." 
  },
  { 
    question: "Berapa lama waktu yang dibutuhkan untuk mendapatkan pekerja?", 
    answer: "Jika anda memilih pekerja dengan kategori 'Tersedia', kami bisa antarkan langsung hari ini. Jika butuh kriteria khusus, estimasi 1-7 hari kerja tergantung ketersediaan kandidat." 
  },
  { 
    question: "Apa yang terjadi jika saya tidak cocok dengan pekerja?", 
    answer: "Kami memberikan garansi penggantian pekerja. Anda memiliki hak penggantian (jumlah tergantung kontrak) dalam periode garansi tanpa biaya admin tambahan." 
  },
];

export default function HomePage() {
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
    <main className="container mx-auto px-6 py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Breadcrumbs crumbs={[{ name: 'Beranda', path: '/' }]} />

      {/* Hero Section */}
      <section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Penyalur ART, Baby Sitter, & Perawat Lansia Terpercaya
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
              PT Jasa Mandiri menyediakan pekerja rumah tangga, baby sitter, dan perawat lansia
              yang terverifikasi, terlatih, dan profesional untuk wilayah Jakarta dan sekitarnya.
            </p>
            <Link
              href="/pekerja"
              className="mt-8 inline-block bg-emerald-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-emerald-700 transition"
            >
              Lihat Daftar Pekerja
            </Link>
          </div>
          <div className="hidden md:block">
            <Image
              src="/Image/hero-image.webp"
              alt="Seorang baby sitter profesional dari PT Jasa Mandiri sedang mendampingi anak-anak"
              width={1035}
              height={690}
              className="rounded-xl shadow-2xl object-cover h-full w-full max-h-[500px]"
              priority
            />
          </div>
        </div>
      </section>

      {/* Pengenalan */}
      <section className="mt-20 max-w-4xl mx-auto text-left md:text-center bg-white p-8 rounded-xl shadow-lg border border-slate-100">
        <h2 className="text-3xl font-bold text-gray-800">
          Yayasan Penyalur Pekerja Rumah Tangga Resmi di Jakarta
        </h2>
        <p className="mt-4 text-gray-600 leading-relaxed">
          Selamat datang di <strong>PT Jasa Mandiri</strong>, sebuah
          <Link href="/tentang" className="text-blue-600 hover:underline font-semibold"> yayasan penyalur pekerja rumah tangga (ART)</Link> 
          terkemuka. Kami juga berperan sebagai 
          <Link href="/layanan" className="text-blue-600 hover:underline font-semibold"> agensi baby sitter profesional </Link> 
          dan penyedia 
          <Link href="/layanan/perawat-lansia" className="text-blue-600 hover:underline font-semibold"> jasa perawat lansia (home care)</Link> 
          yang andal dan berpengalaman.
        </p>
      </section>

      {/* Keunggulan */}
      <section className="mt-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Mengapa Memilih PT Jasa Mandiri?</h2>
          <p className="mt-2 text-lg text-gray-500">Dedikasi kami adalah memberikan yang terbaik untuk ketenangan keluarga Anda.</p>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center border border-slate-100 hover:shadow-xl transition">
              <div className="inline-block p-4 bg-emerald-50 rounded-full">
                <div className="h-8 w-8 text-emerald-600 flex items-center justify-center">{feature.icon}</div>
              </div>
              <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-gray-500">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Kandidat Unggulan */}
      <FeaturedWorkers />

      {/* --- TESTIMONI (BAGIAN BARU DITAMBAHKAN) --- */}
      <section className="mt-24 bg-gradient-to-b from-slate-50 to-white p-8 md:p-12 rounded-3xl border border-slate-200">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Kata Mereka Tentang Kami</h2>
          <div className="flex items-center justify-center gap-3 mt-4 bg-white inline-flex px-6 py-2 rounded-full shadow-sm border">
            <span className="text-4xl font-bold text-emerald-600">4.9</span>
            <div className="flex flex-col items-start">
              <div className="flex text-yellow-400">
                {[1,2,3,4,5].map((i) => <Star key={i} fill="currentColor" size={18} />)}
              </div>
              <p className="text-xs text-slate-500 font-medium">Rating di Google Maps</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Review 1 - Admin */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative hover:-translate-y-1 transition duration-300">
            <div className="flex text-yellow-400 mb-4">
               {[1,2,3,4,5].map((i) => <Star key={i} fill="currentColor" size={16} />)}
            </div>
            <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
              "Yu ambil jasa art di sini ya admin baik banget terimakasih jasa mandiri sudah bantu saya."
            </p>
            <div className="flex items-center gap-3 border-t pt-4">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-xs">MR</div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Mia Rahmawati</p>
                <p className="text-xs text-slate-500">Pengguna Jasa</p>
              </div>
            </div>
          </div>

          {/* Review 2 - Pekerja */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative hover:-translate-y-1 transition duration-300">
            <div className="flex text-yellow-400 mb-4">
               {[1,2,3,4,5].map((i) => <Star key={i} fill="currentColor" size={16} />)}
            </div>
            <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
              "Baik baik banget pekerjanya, admin ramah banget... terimakasih jasa mandiri makin jaya makin sukses bisnisnya."
            </p>
            <div className="flex items-center gap-3 border-t pt-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xs">KN</div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Khoirul Nissa</p>
                <p className="text-xs text-slate-500">Pengguna Jasa</p>
              </div>
            </div>
          </div>

          {/* Review 3 - Lokasi */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative hover:-translate-y-1 transition duration-300">
            <div className="flex text-yellow-400 mb-4">
               {[1,2,3,4,5].map((i) => <Star key={i} fill="currentColor" size={16} />)}
            </div>
            <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
              "Mudah di cari alamat nya, titik sesuai maps, orang nya ramah2.. Sukses selalu jasa mandiri... Pokok nya mantaaapppp."
            </p>
            <div className="flex items-center gap-3 border-t pt-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold text-xs">OF</div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Onky Firmansyah</p>
                <p className="text-xs text-slate-500">Local Guide</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <a 
            href="https://share.google/tXEcTqe8e30449VY0" // Ganti dengan link maps asli Anda jika ada
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline hover:text-emerald-800 transition"
          >
            <MapPin size={18} /> Lihat Lokasi & Review Asli di Google Maps
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mt-20">
        <h2 className="sr-only">Pertanyaan Umum tentang Penyalur Pekerja Rumah Tangga</h2>
        <FaqAccordion faqData={faqData} />
        <p className="text-center mt-6 text-slate-600">
          Masih punya pertanyaan? 
          <a 
            href="https://api.whatsapp.com/send?phone=6282122415552&text=Halo%20PT%20Jasa%20Mandiri,%20saya%20ingin%20bertanya." 
            className="text-emerald-600 hover:underline font-semibold ml-1"
            target="_blank"
            rel="noreferrer"
          >
             Chat WhatsApp Kami
          </a>
        </p>
      </section>

      {/* Call to Action */}
      <section className="mt-20 bg-emerald-900 rounded-2xl shadow-2xl p-8 md:p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
           <Image src="/Image/Logo-jm.png" width={300} height={300} alt="bg" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Siap Menemukan Asisten Impian?</h2>
            <p className="text-emerald-100 text-lg max-w-xl">
              Jangan biarkan pekerjaan rumah menumpuk. Berikan kriteria pekerja yang Anda butuhkan, dan tim kami akan mencarikannya untuk Anda.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href="https://api.whatsapp.com/send?phone=6282122415552&text=Halo%20PT%20Jasa%20Mandiri,%20saya%20sedang%20mencari%20pekerja."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-emerald-900 font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-gray-100 hover:scale-105 transition transform"
            >
              Hubungi Kami Sekarang
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}