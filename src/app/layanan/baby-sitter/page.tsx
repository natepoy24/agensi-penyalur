// src/app/layanan/baby-sitter/page.tsx
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CheckCircle, HeartHandshake, Stethoscope } from "lucide-react";

// ✅ Metadata untuk SEO (sudah bagus, kita pertahankan)
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

// ✅ Schema.org JSON-LD (kita pertahankan)
const serviceSchema = { /* ... (kode schema Anda tidak berubah) ... */ };
const breadcrumbSchema = { /* ... (kode schema Anda tidak berubah) ... */ };

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

// ✅ Komponen Halaman
export default function BabySitterPage() {
  return (
    <main>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="pt-20 pb-20 px-4">
        <div className="container mx-auto">
          {/* Breadcrumbs */}
          <Breadcrumbs parentPage="Layanan" parentPath="layanan" currentPage="Baby sitter" currentPath="/layanan/baby-sitter"
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

          {/* Grid Detail Layanan (Konten Baru) */}
          <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <HeartHandshake className="w-10 h-10 text-blue-500 mb-3" />
              <h2 className="text-xl font-semibold text-gray-800">Peran & Tanggung Jawab</h2>
              <p className="mt-2 text-gray-600">Seorang baby sitter tidak hanya menjaga, tetapi juga berperan aktif dalam mendukung stimulasi motorik dan sensorik, memberikan nutrisi seimbang, serta memastikan keamanan dan kenyamanan anak setiap saat.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Stethoscope className="w-10 h-10 text-blue-500 mb-3" />
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
          <section className="bg-white rounded-xl shadow-lg p-8 md:p-12 max-w-5xl mx-auto mb-16">
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

          {/* Link Layanan Terkait */}
          <section className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Jelajah Layanan Kami yang Lain
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