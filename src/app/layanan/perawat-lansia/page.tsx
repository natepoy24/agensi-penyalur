// src/app/layanan/perawat-lansia/page.tsx
import Image from "next/image";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

// ✅ Metadata untuk SEO
export const metadata: Metadata = {
  title: "Perawat Lansia Profesional | PT Jasa Mandiri",
  description:
    "Layanan penyalur perawat lansia profesional dari PT Jasa Mandiri. Memberikan perawatan penuh kasih, sabar, dan terpercaya untuk orang tua Anda di rumah.",
  keywords: [
    "penyalur perawat lansia",
    "jasa perawat lansia jakarta",
    "yayasan perawat lansia",
    "home care jakarta",
    "PT Jasa Mandiri",
    "penyalur kerja domestik",
  ],
};

// ✅ Schema.org JSON-LD (Service + BreadcrumbList)
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Perawat Lansia Profesional",
  "provider": {
    "@type": "Organization",
    "name": "PT Jasa Mandiri",
    "url": "https://penyalurkerja.com",
  },
  "serviceType": "Penyalur Perawat Lansia",
  "areaServed": {
    "@type": "Place",
    "name": "Jakarta dan sekitarnya",
  },
  "description":
    "PT Jasa Mandiri menyediakan tenaga perawat lansia profesional yang terlatih untuk memberikan perawatan, perhatian, dan kenyamanan terbaik bagi orang tua Anda di rumah.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "IDR",
    "price": "3500000",
    "url": "https://penyalurkerja.com/layanan/perawat-lansia",
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
      "name": "Perawat Lansia",
      "item": "https://penyalurkerja.com/layanan/perawat-lansia",
    },
  ],
};

// ✅ Komponen Halaman
export default function PerawatLansiaPage() {
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
          <Breadcrumbs parentPage="Layanan" parentPath="layanan" currentPage="Perawat Lansia" currentPath="layanan/perawat-lansia" />

          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Perawat Lansia Profesional & Penuh Kasih
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Layanan <strong>perawat lansia berpengalaman</strong> dari{" "}
              <strong>PT Jasa Mandiri</strong>, siap membantu keluarga Anda
              dalam memberikan perhatian dan perawatan terbaik untuk orang tua tercinta.
            </p>
          </div>

          {/* Gambar */}
          <div className="relative w-full h-64 md:h-96 mb-10 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/Image/perawat-lansia.svg"
              alt="Perawat Lansia Profesional"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Detail Layanan */}
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Jenis Layanan Perawat Lansia:
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-3">
              <li>
                <strong>Perawat Lansia Harian:</strong> Membantu aktivitas sehari-hari lansia
                seperti makan, mandi, dan minum obat.
              </li>
              <li>
                <strong>Perawat Lansia Tinggal di Rumah:</strong> Mendampingi dan merawat lansia
                selama 24 jam penuh di rumah.
              </li>
              <li>
                <strong>Perawat Lansia Medis:</strong> Tenaga dengan kemampuan dasar medis
                untuk mendampingi pasien dengan kondisi khusus.
              </li>
            </ul>
            <p className="mt-6 text-gray-700">
              Estimasi gaji:{" "}
              <strong className="text-blue-600 text-lg">
                Rp 3.500.000 - Rp 5.000.000 per bulan
              </strong>
            </p>
          </div>

          {/* Link Layanan Terkait */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Layanan Lainnya di PenyalurKerja.com
            </h3>
            <p className="text-gray-600 mb-6">
              Lihat juga layanan{" "}
              <a
                href="/layanan/art"
                className="text-blue-600 font-semibold hover:underline"
              >
                Asisten Rumah Tangga (ART)
              </a>{" "}
              dan{" "}
              <a
                href="/layanan/baby-sitter"
                className="text-blue-600 font-semibold hover:underline"
              >
                Baby Sitter
              </a>{" "}
              untuk kebutuhan keluarga Anda.
            </p>
          </div>

          {/* Section Keunggulan */}
          <div className="mt-20 bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Mengapa Memilih Perawat Lansia dari PT Jasa Mandiri?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Kami memahami pentingnya perawatan lansia yang sabar dan penuh empati.
              Setiap <strong className="text-blue-600">perawat lansia</strong> kami telah melalui
              pelatihan intensif, pemeriksaan kesehatan, dan penilaian kepribadian agar siap
              memberikan pelayanan yang ramah, tulus, dan profesional.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
