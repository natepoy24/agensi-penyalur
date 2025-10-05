// src/app/layanan/art/page.tsx
import Image from "next/image";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

// ✅ Metadata untuk SEO
export const metadata: Metadata = {
  title: "Pekerja Rumah Tangga (ART) | PT Jasa Mandiri",
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

// ✅ Schema.org (Service + BreadcrumbList)
const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Pekerja Rumah Tangga (ART)",
  "provider": {
    "@type": "Organization",
    "name": "PT Jasa Mandiri",
    "url": "https://penyalurkerja.com",
  },
  "serviceType": "Penyalur ART Profesional",
  "areaServed": {
    "@type": "Place",
    "name": "Jakarta dan sekitarnya",
  },
  "description":
    "Kami menyediakan tenaga ART profesional untuk menjaga kebersihan, kerapihan, dan kenyamanan rumah Anda.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "IDR",
    "price": "2500000",
    "url": "https://penyalurkerja.com/layanan/art",
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
      "name": "Pekerja Rumah Tangga (ART)",
      "item": "https://penyalurkerja.com/layanan/art",
    },
  ],
};

// ✅ Komponen Halaman
export default function LayananARTPage() {
  return (
    <main>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="pt-20 pb-20 px-4">
        <div className="container mx-auto">
          {/* Breadcrumbs */}
          <Breadcrumbs parentPage="Layanan" parentPath="layanan" currentPage="Pekerja Rumah Tangga (ART)" currentPath="layanan/art" />

          {/* Judul */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Pekerja Rumah Tangga (ART) Profesional
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Kami menyediakan tenaga <strong>ART profesional dan berpengalaman</strong> yang siap
              membantu menjaga kebersihan, kerapihan, dan kenyamanan rumah Anda. Tersedia berbagai
              kategori sesuai kebutuhan.
            </p>
          </div>

          {/* Gambar */}
          <div className="relative w-full h-64 md:h-96 mb-10 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/Image/prt.svg"
              alt="Pekerja Rumah Tangga Profesional"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Subkategori */}
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Pilihan Kategori ART:
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-3">
              <li>
                <strong>ART Pemula:</strong> Fokus pada tugas kebersihan dasar dan pemeliharaan
                rumah.
              </li>
              <li>
                <strong>ART Momong Anak:</strong> Memiliki tanggung jawab tambahan dalam menjaga dan
                mengurus anak.
              </li>
              <li>
                <strong>ART Masak:</strong> Dapat memasak menu harian keluarga selain pekerjaan
                kebersihan.
              </li>
              <li>
                <strong>ART Serabutan:</strong> Mengerjakan berbagai tugas rumah tangga (bersih,
                masak, dan momong).
              </li>
            </ul>
            <p className="mt-6 text-gray-700">
              Estimasi gaji:{" "}
              <strong className="text-blue-600 text-lg">
                Rp 2.500.000 - Rp 3.500.000 per bulan
              </strong>
            </p>
          </div>

          {/* Link ke layanan relevan */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Layanan Lain yang Mungkin Anda Butuhkan
            </h3>
            <p className="text-gray-600 mb-6">
              Kami juga menyediakan layanan{" "}
              <a
                href="/layanan/baby-sitter"
                className="text-blue-600 font-semibold hover:underline"
              >
                Baby Sitter Profesional
              </a>{" "}
              dan{" "}
              <a
                href="/layanan/perawat-lansia"
                className="text-blue-600 font-semibold hover:underline"
              >
                Perawat Lansia (Home Care)
              </a>{" "}
              untuk membantu memenuhi kebutuhan keluarga Anda.
            </p>
          </div>

          {/* SEO Section */}
          <div className="mt-20 bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Mengapa Memilih PT Jasa Mandiri?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Sebagai{" "}
              <strong className="font-semibold text-blue-600">
                penyalur ART terpercaya di Jakarta
              </strong>
              , kami memastikan setiap pekerja rumah tangga yang kami salurkan telah melalui proses
              seleksi ketat, pelatihan, dan verifikasi latar belakang.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
