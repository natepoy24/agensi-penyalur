// src/app/layanan/art/page.tsx
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircle, Users, Briefcase } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs"; // 1. Pastikan Anda memiliki komponen Breadcrumbs
import { type FAQItem } from "@/app/lib/schemaGenerator";
import SchemaInjector from "@/components/SchemaInjector";

// ✅ Metadata untuk SEO
export const metadata: Metadata = {
  title: "Penyalur Pekerja Rumah Tangga (ART) Profesional | PT Jasa Mandiri",
  description:
    "Temukan pekerja rumah tangga (ART) profesional, terlatih, dan terpercaya dari PT Jasa Mandiri. Layanan penyalur ART untuk wilayah Jabodetabek dan luar kota dengan sistem garansi.",
  keywords: [
    "penyalur art",
    "yayasan art jakarta",
    "pekerja rumah tangga",
    "penyalur pembantu rumah tangga",
    "jasa penyalur art jabodetabek",
    "yayasan jasa mandiri",
    "penyalur kerja domestik",
  ],
};

// Data untuk ditampilkan di halaman
const subKategoriART = [
  { 
    title: "ART Pemula", 
    description: "Fokus pada tugas kebersihan dasar seperti menyapu, mengepel, membersihkan debu, dan pemeliharaan umum rumah tangga." 
  },
  { 
    title: "ART Momong Anak", 
    description: "Memiliki tanggung jawab utama sebagai ART dengan tugas tambahan dalam menjaga, mengasuh, dan mengurus anak usia sekolah." 
  },
  { 
    title: "ART Masak", 
    description: "Selain tugas kebersihan, memiliki keahlian dan pengalaman dalam memasak berbagai menu harian keluarga." 
  },
  { 
    title: "ART Serabutan", 
    description: "Mengerjakan berbagai tugas rumah tangga secara fleksibel, mencakup kebersihan, memasak sederhana, dan tugas lainnya sesuai kesepakatan." 
  },
];

// ✅ Data untuk FAQ
const faqData: FAQItem[] = [
  {
    question: "Apa saja tugas utama seorang ART dari PT Jasa Mandiri?",
    answer: "Tugas utama ART meliputi kebersihan rumah secara umum (menyapu, mengepel, membersihkan debu), mencuci, dan menyetrika. Beberapa ART juga memiliki keahlian tambahan seperti memasak atau mengasuh anak, yang bisa disesuaikan dengan kebutuhan Anda.",
  },
  {
    question: "Apakah saya bisa meminta ART yang bisa memasak?",
    answer: "Tentu. Kami memiliki kategori 'ART Masak' yang memiliki keahlian dan pengalaman dalam memasak berbagai menu harian untuk keluarga. Anda bisa menyebutkan preferensi ini saat melakukan konsultasi.",
  },
  {
    question: "Bagaimana jika saya tidak cocok dengan ART yang dikirim?",
    answer: "Kami memberikan garansi penempatan. Jika Anda merasa tidak cocok, Anda berhak mendapatkan pengganti sesuai dengan syarat dan ketentuan dalam sistem garansi kami, yaitu hingga 3 kali penggantian dalam 3 bulan pertama.",
  },
  {
    question: "Apakah semua ART sudah diverifikasi?",
    answer: "Ya, setiap calon ART telah melalui proses verifikasi latar belakang yang ketat, termasuk pengecekan identitas dan rekam jejak, untuk memastikan keamanan dan kenyamanan keluarga Anda.",
  }
];

// ✅ Komponen Halaman
export default function LayananARTPage() {
  const serviceData = {
    name: "Penyalur Pekerja Rumah Tangga (ART) Profesional",
    serviceType: "Penyalur ART",
    description: "Temukan pekerja rumah tangga (ART) profesional, terlatih, dan terpercaya dari PT Jasa Mandiri untuk wilayah Jabodetabek dan luar kota.",
    price: "2500000",
    url: "/layanan/art",
  };

  return (
    <main>
      <SchemaInjector type="service" data={serviceData} />
      <SchemaInjector type="faq" data={faqData} />
      <div className="pt-20 pb-20 px-4">
        <div className="container mx-auto">
          {/* 3. Tambahkan kembali komponen Breadcrumbs visual */}
          <Breadcrumbs 
            crumbs={[
              { name: 'Beranda', path: '/' },
              { name: 'Layanan', path: '/layanan' },
              { name: 'Pekerja Rumah Tangga (ART)', path: '/layanan/art' }
            ]}
          />
          {/* Judul & Deskripsi Utama */}
          <section className="text-center my-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Penyalur Pekerja Rumah Tangga (ART) Profesional
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Kami di <Link href="/tentang" className="text-blue-600 hover:underline font-semibold">PT Jasa Mandiri</Link> menyediakan tenaga <strong>ART profesional dan berpengalaman</strong> yang siap membantu menjaga kebersihan, kerapihan, dan kenyamanan rumah Anda.
            </p>
          </section>

          {/* Gambar Utama */}
          <section className="relative w-full h-64 md:h-96 mb-16 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/Image/prt.svg"
              alt="Pekerja Rumah Tangga Profesional dari PT Jasa Mandiri yang terpercaya"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </section>

          {/* Grid Detail Layanan */}
          <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Users className="w-10 h-10 text-blue-500 mb-3" />
              <h2 className="text-xl font-semibold text-gray-800">Untuk Siapa Layanan Ini?</h2>
              <p className="mt-2 text-gray-600">Layanan ART kami sangat cocok bagi keluarga yang sibuk, profesional, atau siapa pun yang membutuhkan bantuan ekstra untuk mengurus pekerjaan rumah tangga agar dapat lebih fokus pada keluarga dan karier.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Briefcase className="w-10 h-10 text-blue-500 mb-3" />
              <h2 className="text-xl font-semibold text-gray-800">Apa Saja Tugasnya?</h2>
              <p className="mt-2 text-gray-600">Tugas utama ART meliputi kebersihan rumah, mencuci, menyetrika, hingga memasak, tergantung pada spesialisasi yang Anda pilih dari <Link href="#subkategori" className="text-blue-600 hover:underline">berbagai sub-kategori</Link> kami.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <CheckCircle className="w-10 h-10 text-blue-500 mb-3" />
              <h2 className="text-xl font-semibold text-gray-800">Proses Terjamin</h2>
              <p className="mt-2 text-gray-600">Setiap ART telah melalui proses verifikasi latar belakang dan pelatihan. Pelajari lebih lanjut tentang <Link href="/tentang#alur-kerja" className="text-blue-600 hover:underline">alur kerja profesional kami</Link>.</p>
            </div>
          </section>

          {/* Subkategori & Gaji */}
          <section id="subkategori" className="bg-white rounded-xl shadow-lg p-8 md:p-12 max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
              Pilihan Kategori ART Sesuai Kebutuhan Anda
            </h2>
            <ul className="list-none text-gray-700 space-y-4">
              {subKategoriART.map((item, index) => (
                <li key={index} className="border-b pb-4">
                  <strong className="text-lg">{item.title}:</strong> {item.description}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-center text-gray-700">
              Estimasi gaji untuk layanan ART:{" "}
              <strong className="text-blue-600 text-lg">
                Rp 2.500.000 - Rp 3.500.000 per bulan
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

          {/* Link ke layanan relevan */}
          <section className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Jelajahi Layanan Kami yang Lain
            </h3>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/layanan/baby-sitter" className="text-blue-600 font-semibold hover:underline">
                Baby Sitter Profesional
              </Link>
              <span className="text-gray-400">|</span>
              <Link href="/layanan/perawat-lansia" className="text-blue-600 font-semibold hover:underline">
                Perawat Lansia (Home Care)
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}