// src/app/layanan/baby-sitter/page.tsx
import Image from "next/image";
import Link from "next/link"; // Mengganti <a> dengan <Link> untuk internal link
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { HeartHandshake, Stethoscope, CheckCircle, Baby } from "lucide-react"; // Ikon baru untuk konten
import { type FAQItem } from "@/app/lib/schemaGenerator";
import SchemaInjector from "@/components/SchemaInjector";

// ✅ Metadata untuk SEO (Diperkaya)
export const metadata: Metadata = {
  title: "Baby Sitter Profesional & Terpercaya | PT Jasa Mandiri",
  description:
    "Layanan penyalur baby sitter terpercaya dari PT Jasa Mandiri. Tenaga baby sitter berpengalaman, sabar, dan terlatih dalam perawatan bayi (newborn) dan balita.",
  keywords: [
    "penyalur baby sitter",
    "yayasan baby sitter jakarta",
    "jasa baby sitter profesional",
    "perawat bayi",
    "penyalur kerja domestik",
    "PT Jasa Mandiri",
  ],
};

// Data untuk ditampilkan di halaman
const subKategoriBS = [
    { 
        title: "Perawatan Newborn / Bayi (0-12 Bulan)", 
        description: "Spesialisasi dalam merawat bayi baru lahir, meliputi memandikan, mengganti popok, membuat susu, hingga sterilisasi botol." 
    },
    { 
        title: "Perawatan Batita / Balita (1-5 Tahun)", 
        description: "Fokus pada pendampingan tumbuh kembang anak, meliputi kegiatan bermain, belajar, menyiapkan makanan, dan menanamkan kebiasaan baik." 
    },
    { 
        title: "Anak Berkebutuhan Khusus", 
        description: "Membutuhkan kesabaran dan seringkali pengalaman khusus dalam mendampingi anak dengan autisme atau kondisi lainnya." 
    },
    { 
        title: "Baby Sitter Serabutan", 
        description: "Fokus utama tetap pada pengasuhan anak, namun dapat membantu pekerjaan rumah tangga ringan yang berkaitan dengan anak (mencuci baju anak, membersihkan kamar anak)." 
    },
];

// ✅ Data untuk FAQ
const faqData: FAQItem[] = [
  {
    question: "Apa bedanya baby sitter newborn dan balita?",
    answer: "Baby sitter newborn fokus pada perawatan intensif bayi 0-12 bulan (mandi, susu, steril botol), sedangkan baby sitter balita lebih fokus pada pendampingan tumbuh kembang, bermain, dan belajar anak usia 1-5 tahun.",
  },
  {
    question: "Apakah ada garansi jika tidak cocok dengan baby sitter?",
    answer: "Ya, kami memberikan garansi penempatan selama 3 bulan dengan hak penggantian hingga 3 kali untuk memastikan Anda mendapatkan pengasuh yang paling sesuai dengan kebutuhan keluarga Anda.",
  },
  {
    question: "Bagaimana proses seleksi baby sitter di PT Jasa Mandiri?",
    answer: "Setiap calon baby sitter kami wajib lolos tes kesehatan, verifikasi latar belakang, dan mengikuti pelatihan khusus mengenai perawatan anak sesuai standar profesional kami.",
  },
  {
    question: "Apakah baby sitter bisa melakukan pekerjaan rumah tangga?",
    answer: "Fokus utama baby sitter adalah pengasuhan anak. Namun, kami memiliki kategori 'Baby Sitter Serabutan' yang dapat membantu pekerjaan rumah tangga ringan yang berkaitan langsung dengan anak, seperti mencuci baju anak atau membersihkan area bermainnya.",
  }
];

// ✅ Komponen Halaman
export default function BabySitterPage() {
  const serviceData = {
    name: "Baby Sitter Profesional",
    serviceType: "Penyalur Baby Sitter Profesional",
    description: "PT Jasa Mandiri menyediakan tenaga baby sitter profesional yang memiliki pengalaman dalam mengasuh bayi dan balita, memastikan kenyamanan dan keamanan anak Anda.",
    price: "3000000",
    url: "/layanan/baby-sitter",
  };

  return (
    <main>
      <SchemaInjector type="service" data={serviceData} />
      <SchemaInjector type="faq" data={faqData} />

      <div className="pt-20 pb-20 px-4">
        <div className="container mx-auto">
          {/* Breadcrumbs */}
          <Breadcrumbs 
            crumbs={[
              { name: 'Beranda', path: '/' },
              { name: 'Layanan', path: '/layanan' },
              { name: 'Baby Sitter', path: '/layanan/baby-sitter' }
            ]}
          />

          {/* Header Section */}
          <section className="text-center my-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Baby Sitter Profesional & Terpercaya
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Percayakan perawatan buah hati Anda kepada tenaga <strong>baby sitter berpengalaman</strong> dari <Link href="/tentang" className="text-blue-600 hover:underline font-semibold">PT Jasa Mandiri</Link>. Kami siap membantu merawat bayi dan balita dengan penuh kasih sayang dan tanggung jawab.
            </p>
          </section>

          {/* Gambar Utama */}
          <section className="relative w-full h-64 md:h-96 mb-16 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/Image/baby-sitter.svg" // Pastikan gambar ini ada
              alt="Baby Sitter profesional dari PT Jasa Mandiri sedang bermain dengan anak asuhnya"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </section>

          {/* Grid Detail Layanan (Konten Baru Ditambahkan) */}
          <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <HeartHandshake className="w-10 h-10 text-blue-500 mb-3" />
              <h2 className="text-xl font-semibold text-gray-800">Peran & Tanggung Jawab</h2>
              <p className="mt-2 text-gray-600">Seorang baby sitter tidak hanya menjaga, tetapi juga berperan aktif dalam mendukung stimulasi motorik dan sensorik, memberikan nutrisi seimbang, serta memastikan keamanan dan kenyamanan anak setiap saat.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Baby className="w-10 h-10 text-blue-500 mb-3" />
              <h2 className="text-xl font-semibold text-gray-800">Kualifikasi Tenaga Kerja</h2>
              <p className="mt-2 text-gray-600">Setiap calon baby sitter kami wajib lolos tes kesehatan, memiliki pengalaman yang relevan, dan mengikuti <Link href="/tentang#alur-kerja" className="text-blue-600 hover:underline">pelatihan khusus</Link> mengenai perawatan anak sesuai standar kami.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <CheckCircle className="w-10 h-10 text-blue-500 mb-3" />
              <h2 className="text-xl font-semibold text-gray-800">Garansi & Keamanan</h2>
              <p className="mt-2 text-gray-600">Kami memberikan garansi penempatan untuk memastikan Anda mendapatkan pengasuh yang paling cocok. Latar belakang setiap kandidat juga telah kami verifikasi untuk keamanan keluarga Anda.</p>
            </div>
          </section>

          {/* Subkategori & Gaji */}
          <section id="subkategori" className="bg-white rounded-xl shadow-lg p-8 md:p-12 max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
              Layanan Baby Sitter yang Tersedia
            </h2>
            <ul className="list-none text-gray-700 space-y-4">
              {subKategoriBS.map((item, index) => (
                <li key={index} className="border-b pb-4">
                  <strong className="text-lg">{item.title}:</strong> {item.description}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-center text-gray-700">
              Estimasi gaji untuk layanan Baby Sitter:{" "}
              <strong className="text-blue-600 text-lg">
                Rp 3.000.000 - Rp 5.000.000 per bulan
              </strong>
            </p>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
            <div className="space-y-4">
              {faqData.map((item, index) => (
                <details key={index} className="group bg-white p-6 rounded-lg shadow-sm">
                  <summary className="flex justify-between items-center font-semibold cursor-pointer text-gray-800">
                    {item.question}
                    <span className="ml-4 transition-transform duration-200 group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-600 leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Link Layanan Terkait */}
          <section className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Butuh Bantuan Lainnya?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Selain pengasuh anak, kami juga merupakan <Link href="/layanan/art" className="text-blue-600 font-semibold hover:underline">penyalur ART terpercaya</Link> dan menyediakan <Link href="/layanan/perawat-lansia" className="text-blue-600 font-semibold hover:underline">jasa perawat lansia</Link> yang sabar dan berpengalaman.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}