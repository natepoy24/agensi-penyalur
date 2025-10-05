// src/app/layanan/baby-sitter/page.tsx
import Image from "next/image";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

// ✅ Metadata untuk SEO
export const metadata: Metadata = {
  title: "Baby Sitter Profesional | PT Jasa Mandiri",
  description:
    "Layanan penyalur baby sitter terpercaya dari PT Jasa Mandiri. Tenaga baby sitter berpengalaman, sabar, dan terlatih dalam perawatan bayi dan balita.",
  keywords: [
    "penyalur baby sitter",
    "yayasan baby sitter jakarta",
    "jasa baby sitter profesional",
    "perawat bayi",
    "penyalur kerja domestik",
    "PT Jasa Mandiri",
  ],
};

// ✅ Schema.org JSON-LD (Service + BreadcrumbList)
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Baby Sitter Profesional",
  "provider": {
    "@type": "Organization",
    "name": "PT Jasa Mandiri",
    "url": "https://penyalurkerja.com",
  },
  "serviceType": "Penyalur Baby Sitter Profesional",
  "areaServed": {
    "@type": "Place",
    "name": "Jakarta dan sekitarnya",
  },
  "description":
    "PT Jasa Mandiri menyediakan tenaga baby sitter profesional yang memiliki pengalaman dalam mengasuh bayi dan balita, memastikan kenyamanan dan keamanan anak Anda.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "IDR",
    "price": "3000000",
    "url": "https://penyalurkerja.com/layanan/baby-sitter",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Beranda",
      "item": "https://penyalurkerja.com",
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Layanan",
      "item": "https://penyalurkerja.com/layanan",
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Baby Sitter",
      "item": "https://penyalurkerja.com/layanan/baby-sitter",
    },
  ],
};

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
          <Breadcrumbs parentPage="Layanan" parentPath="layanan" currentPage="Baby Sitter" currentPath="layanan/baby-sitter" />

          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Baby Sitter Profesional & Terpercaya
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Tenaga <strong>baby sitter berpengalaman</strong> yang siap membantu merawat bayi dan
              balita Anda dengan penuh kasih sayang dan tanggung jawab.
            </p>
          </div>

          {/* Gambar */}
          <div className="relative w-full h-64 md:h-96 mb-10 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/Image/baby-sitter.svg"
              alt="Baby Sitter Profesional"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Detail Layanan */}
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Layanan Baby Sitter yang Tersedia:
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-3">
              <li>
                <strong>Baby Sitter Pemula:</strong> Untuk perawatan bayi usia 0–1 tahun di bawah
                pengawasan keluarga.
              </li>
              <li>
                <strong>Baby Sitter Berpengalaman:</strong> Telah memiliki pengalaman minimal 1 tahun
                dalam mengasuh bayi dan balita.
              </li>
              <li>
                <strong>Baby Sitter Plus ART:</strong> Dapat membantu pekerjaan rumah ringan selain
                merawat bayi.
              </li>
            </ul>
            <p className="mt-6 text-gray-700">
              Estimasi gaji:{" "}
              <strong className="text-blue-600 text-lg">
                Rp 3.000.000 - Rp 4.500.000 per bulan
              </strong>
            </p>
          </div>

          {/* Link Layanan Terkait */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Layanan Lainnya di PenyalurKerja.com
            </h3>
            <p className="text-gray-600 mb-6">
              Anda juga dapat melihat layanan{" "}
              <a
                href="/layanan/art"
                className="text-blue-600 font-semibold hover:underline"
              >
                Pekerja Rumah Tangga (ART)
              </a>{" "}
              atau{" "}
              <a
                href="/layanan/perawat-lansia"
                className="text-blue-600 font-semibold hover:underline"
              >
                Perawat Lansia
              </a>{" "}
              untuk kebutuhan keluarga Anda.
            </p>
          </div>

          {/* Section Keunggulan */}
          <div className="mt-20 bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Mengapa Memilih Baby Sitter dari PT Jasa Mandiri?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Kami memastikan seluruh <strong className="text-blue-600">baby sitter</strong> kami
              telah melalui proses pelatihan, pemeriksaan latar belakang, dan memiliki sikap
              tanggung jawab tinggi. Kami memahami pentingnya rasa aman dan nyaman dalam pengasuhan
              anak Anda.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
