// src/app/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, UserRoundCheck, FileText, Award, LifeBuoy, Building, Search, Home } from 'lucide-react';
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

// Data untuk FAQ, dipindahkan ke sini untuk schema generation
const faqData: FAQItem[] = [
  { 
    question: "Bagaimana proses seleksi pekerja di Jasa mandiri?", 
    answer: "Setiap calon pekerja kami melalui proses seleksi yang sangat ketat, meliputi verifikasi identitas (KTP, KK), wawancara mendalam, uji kompetensi(kecuali ART), serta pengecekan latar belakang untuk memastikan mereka dapat dipercaya." 
  },
  { 
    question: "Berapa lama waktu yang dibutuhkan untuk mendapatkan pekerja?", 
    answer: "Jika anda memilih pekerja dengan kategori tersedia yang ada di list kami, anda dapat mendapatkan pekerja dalam waktu singkat, anda memesan hari ini, kami bisa antarkan langsung ke tempat anda. Namun jika tidak ada kandidat kami yang cocok, kami akan berusaha menyediakan calon yang cocok dalam waktu 1-7 hari kerja setelah kriteria kami terima secara lengkap, tergantung pada ketersediaan kandidat." 
  },
  { 
    question: "Apa yang terjadi jika saya tidak cocok dengan pekerja?", 
    answer: "Kami memberikan garansi penggantian pekerja. Tergantung sistem yang Anda pilih, Anda memiliki hak penggantian beberapa kali dalam periode garansi. Kami akan membantu mencarikan kandidat baru." 
  },
];

export default function HomePage() {
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
    <main className="container mx-auto px-6 py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Breadcrumbs dengan Schema JSON-LD otomatis */}
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
              className="mt-8 inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition"
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
      <section className="mt-20 max-w-4xl mx-auto text-left md:text-center bg-white p-8 rounded-xl shadow-lg">
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
          yang andal dan berpengalaman di Jakarta.
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
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="inline-block p-4 bg-blue-100 rounded-full">
                <div className="h-8 w-8 text-blue-500 flex items-center justify-center">{feature.icon}</div>
              </div>
              <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-gray-500">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Kandidat Unggulan */}
      <FeaturedWorkers />

      {/* FAQ */}
      <section id="faq" className="mt-20">
        <h2 className="sr-only">Pertanyaan Umum tentang Penyalur Pekerja Rumah Tangga</h2>
        <FaqAccordion faqData={faqData} />
        <p className="text-center mt-4">
          Untuk informasi lebih lanjut, Hubungi kami 
          <Link href="https://api.whatsapp.com/send?phone=6282122415552&text=Halo%20PT%20Jasa%20Mandiri,%20saya%20ingin%20berkonsultasi." className="text-blue-600 hover:underline font-semibold"> Pertanyaan yang Sering Diajukan</Link>.
        </p>
      </section>

      {/* Call to Action */}
      <section className="mt-20 bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <div className="flex-shrink-0">
            <div className="bg-blue-100 p-5 rounded-full">
              <Search className="h-16 w-16 text-blue-600" />
            </div>
          </div>
          <div className="flex-grow text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Siap Menemukan Asisten yang Tepat?</h2>
            <p className="mt-2 text-gray-600">
              Berikan kriteria pekerja impian Anda, dan biarkan tim kami yang mewujudkannya.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href="https://api.whatsapp.com/send?phone=6282122415552&text=Halo%20PT%20Jasa%20Mandiri,%20saya%20ingin%20berkonsultasi%20mengenai%20kriteria%20pekerja%20yang%20saya%20butuhkan."
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
