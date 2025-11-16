// src/app/layanan/perawat-lansia/page.tsx
import Image from "next/image";
import Link from "next/link"; // Mengganti <a> dengan <Link> untuk internal link
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { HeartHandshake, Stethoscope, CheckCircle } from "lucide-react"; // Ikon baru untuk konten
import { type FAQItem } from "@/app/lib/schemaGenerator";
import SchemaInjector from "@/components/SchemaInjector";

// ✅ Metadata untuk SEO (Diperkaya)
export const metadata: Metadata = {
  title: "Penyalur Perawat Lansia Profesional & Terpercaya | PT Jasa Mandiri",
  description:
    "Layanan penyalur perawat lansia (home care) profesional dari PT Jasa Mandiri. Memberikan perawatan penuh kasih, sabar, dan terpercaya untuk orang tua Anda di rumah.",
  keywords: [
    "penyalur perawat lansia",
    "jasa perawat lansia jakarta",
    "yayasan perawat lansia",
    "home care jakarta",
    "PT Jasa Mandiri",
    "penyalur kerja domestik",
  ],
};

// Data untuk sub-kategori agar lebih mudah dikelola
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

// ✅ Data untuk FAQ
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

// ✅ Komponen Halaman
export default function PerawatLansiaPage() {
  const serviceData = {
    name: "Penyalur Perawat Lansia Profesional",
    serviceType: "Penyalur Perawat Lansia",
    description: "PT Jasa Mandiri menyediakan tenaga perawat lansia profesional yang terlatih untuk memberikan perawatan, perhatian, dan kenyamanan terbaik bagi orang tua Anda di rumah.",
    price: "3500000",
    url: "/layanan/perawat-lansia",
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
              { name: 'Perawat Lansia', path: '/layanan/perawat-lansia' }
            ]}
          />

          {/* Header Section */}
          <section className="text-center my-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Perawat Lansia Profesional & Penuh Kasih
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Layanan <strong>perawat lansia berpengalaman</strong> dari{" "}
              <Link href="/tentang" className="text-blue-600 hover:underline font-semibold">PT Jasa Mandiri</Link>, 
              siap membantu keluarga Anda dalam memberikan perhatian dan perawatan terbaik untuk orang tua tercinta.
            </p>
          </section>

          {/* Gambar Utama */}
          <section className="relative w-full h-64 md:h-96 mb-16 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/Image/perawat-lansia.svg" // Pastikan gambar ini ada
              alt="Perawat lansia profesional dari PT Jasa Mandiri dengan sabar mendampingi klien"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </section>

          {/* Grid Detail Layanan (Konten Baru Ditambahkan) */}
          <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <HeartHandshake className="w-10 h-10 text-blue-500 mb-3" />
              <h2 className="text-xl font-semibold text-gray-800">Perawatan Penuh Empati</h2>
              <p className="mt-2 text-gray-600">Fokus kami adalah memberikan pendampingan yang tulus dan sabar, tidak hanya membantu secara fisik tetapi juga menjadi teman bagi para lansia untuk menjaga kesehatan mental mereka.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Stethoscope className="w-10 h-10 text-blue-500 mb-3" />
              <h2 className="text-xl font-semibold text-gray-800">Kualifikasi Terjamin</h2>
              <p className="mt-2 text-gray-600">Setiap perawat lansia telah kami latih untuk memahami kebutuhan spesifik orang tua, mulai dari bantuan mobilitas hingga penanganan kondisi dasar sesuai <Link href="/tentang#alur-kerja" className="text-blue-600 hover:underline">standar pelatihan kami</Link>.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <CheckCircle className="w-10 h-10 text-blue-500 mb-3" />
              <h2 className="text-xl font-semibold text-gray-800">Ketenangan Bagi Keluarga</h2>
              <p className="mt-2 text-gray-600">Dengan menyerahkan perawatan kepada tenaga profesional kami, Anda dapat beraktivitas dengan tenang, mengetahui bahwa orang tua Anda berada di tangan yang aman dan peduli.</p>
            </div>
          </section>

          {/* Subkategori & Gaji */}
          <section id="subkategori" className="bg-white rounded-xl shadow-lg p-8 md:p-12 max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
              Jenis Layanan Perawat Lansia
            </h2>
            <ul className="list-none text-gray-700 space-y-4">
              {subKategoriPL.map((item, index) => (
                <li key={index} className="border-b pb-4">
                  <strong className="text-lg">{item.title}:</strong>{" "}{item.description}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-center text-gray-700">
              Estimasi gaji untuk layanan Perawat Lansia:{" "}
              <strong className="text-blue-600 text-lg">
                Rp 3.500.000 - Rp 5.000.000 per bulan
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
              Lihat juga layanan{" "}
              <Link href="/layanan/art" className="text-blue-600 font-semibold hover:underline">
                Asisten Rumah Tangga (ART)
              </Link>{" "}
              dan{" "}
              <Link href="/layanan/baby-sitter" className="text-blue-600 font-semibold hover:underline">
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