// src/app/layanan/page.tsx
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { type FAQItem } from "@/app/lib/schemaGenerator";
import SchemaInjector from "@/components/SchemaInjector";

// ✅ Metadata untuk SEO
export const metadata: Metadata = {
  title: "Layanan | PT Jasa Mandiri",
  description:
    "PT Jasa Mandiri menyediakan layanan penyalur ART, baby sitter, dan perawat lansia profesional untuk wilayah Jabodetabek dan luar kota. Terlatih, terpercaya, dan bergaransi.",
  keywords: [
    "penyalur art",
    "yayasan baby sitter",
    "penyalur baby sitter",
    "jasa perawat lansia",
    "penyalur pembantu rumah tangga",
    "pekerja rumah tangga jabodetabek",
    "yayasan jasa mandiri",
    "layanan baby sitter jakarta",
  ],
};

// ✅ Data layanan agar mudah dikelola + link halaman turunan
const services = [
  {
    title: "Pekerja Rumah Tangga (ART)",
    imageSrc: "/Image/prt.svg",
    description:
      "Solusi untuk menjaga rumah Anda tetap bersih, rapi, dan teratur, dengan berbagai spesialisasi sesuai kebutuhan Anda.",
    subCategories: [
      { name: "ART Pemula:", detail: "Fokus pada tugas kebersihan dasar dan pemeliharaan rumah." },
      { name: "ART Momong Anak:", detail: "Prioritas utama ART dengan tugas tambahan menjaga dan mengurus anak." },
      { name: "ART Masak:", detail: "Memiliki keahlian memasak menu harian selain tugas kebersihan." },
      { name: "ART Serabutan:", detail: "Mencakup semua tugas (kebersihan, momong, dan masak)." },
    ],
    salary: "Rp 2.500.000 - Rp 3.500.000",
    link: "/layanan/art",
  },
  {
    title: "Baby Sitter Profesional",
    imageSrc: "/Image/baby-sitter.svg",
    description:
      "Perawatan terbaik untuk buah hati Anda, disesuaikan dengan usia dan kebutuhan spesifik anak.",
    subCategories: [
      { name: "Perawatan Newborn/Bayi:", detail: "Spesialisasi merawat bayi baru lahir (0-12 bulan)." },
      { name: "Perawatan Batita/Balita:", detail: "Mendampingi tumbuh kembang anak usia 1-5 tahun." },
      { name: "Anak Berkebutuhan Khusus:", detail: "Pendampingan sabar untuk anak autis atau kondisi khusus lainnya." },
      { name: "Baby Sitter Serabutan:", detail: "Fokus utama mengasuh anak ditambah pekerjaan rumah tangga ringan." },
    ],
    salary: "Rp 3.000.000 - Rp 5.000.000",
    link: "/layanan/baby-sitter",
  },
  {
    title: "Perawat Lansia (Home Care)",
    imageSrc: "/Image/perawat-lansia.svg",
    description:
      "Pendampingan penuh kasih untuk menjaga kualitas hidup lansia, dari bantuan harian hingga perawatan khusus.",
    subCategories: [
      { name: "Perawat Lansia Pemula:", detail: "Pendampingan aktivitas harian secara non-medis." },
      { name: "Perawat Lansia Medis:", detail: "Memiliki kualifikasi medis dasar (misal: ganti perban, suntik insulin)." },
      { name: "Perawat Lansia Serabutan:", detail: "Fokus utama merawat lansia ditambah pekerjaan rumah tangga ringan." },
    ],
    salary: "Rp 3.000.000 - Rp 5.000.000+",
    link: "/layanan/perawat-lansia",
  },
];

// ✅ Data untuk FAQ
const faqData: FAQItem[] = [
  {
    question: "Apa saja layanan utama yang disediakan PT Jasa Mandiri?",
    answer: "Kami menyediakan tiga layanan utama: penyalur Pekerja Rumah Tangga (ART), Baby Sitter profesional untuk bayi dan balita, serta Perawat Lansia (Home Care) untuk pendampingan orang tua.",
  },
  {
    question: "Bagaimana sistem garansi jika saya tidak cocok dengan pekerja?",
    answer: "Kami memberikan garansi penempatan yang fleksibel. Untuk area Jabodetabek, Anda mendapatkan garansi 3 bulan dengan hak 3 kali penggantian. Untuk luar Jabodetabek, berlaku sistem kontrak 1 tahun dengan garansi 6 bulan dan hak 2 kali penggantian.",
  },
  {
    question: "Apakah semua pekerja sudah terverifikasi?",
    answer: "Ya, semua calon pekerja kami telah melalui proses verifikasi identitas, pengecekan latar belakang, dan pelatihan keterampilan dasar untuk memastikan mereka profesional dan dapat dipercaya.",
  },
];

export default function LayananPage() {
  const serviceData = {
    name: "Layanan Penyalur Tenaga Kerja Profesional",
    serviceType: "Penyalur ART, Babysitter, dan Perawat Lansia",
    description: "PT Jasa Mandiri menyediakan layanan penyalur ART, baby sitter, dan perawat lansia profesional untuk wilayah Jabodetabek dan luar kota. Terlatih, terpercaya, dan bergaransi.",
    price: "2500000",
    url: "/layanan",
  };

  return (
    <main>
      {/* Inject Schema */}
      <SchemaInjector type="service" data={serviceData} />
      <SchemaInjector type="faq" data={faqData} />

      <div className="pt-20 pb-20 px-4">
        <div className="container mx-auto">
          {/* Judul Halaman */}
          <div className="text-center mb-12">
          <Breadcrumbs 
            crumbs={[
              { name: 'Beranda', path: '/' },
              { name: 'Layanan', path: '/layanan' },
            ]}
          />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Layanan Profesional Kami
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Kami menyediakan tiga kategori utama pekerja domestik yang terlatih dan terverifikasi
              untuk memenuhi kebutuhan spesifik keluarga Anda.
            </p>
          </div>

          {/* Grid Kartu Layanan */}
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={service.imageSrc}
                    alt={service.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-semibold text-gray-900">{service.title}</h3>
                  <p className="mt-2 text-gray-600 flex-grow">{service.description}</p>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-700 mb-3">
                      Sub-Kategori Layanan:
                    </h4>
                    <ul className="space-y-3 text-gray-600">
                      {service.subCategories.map((sub, subIndex) => (
                        <li key={subIndex} className="flex items-start">
                          <CheckCircle className="w-5 h-5 mr-2 text-blue-500 shrink-0 mt-0.5" />
                          <div>
                            <strong>{sub.name}</strong> {sub.detail}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-700">
                      Estimasi Gaji Tahun 2025
                    </h4>
                    <p className="text-gray-600 text-lg font-medium mt-1">
                      {service.salary}
                    </p>
                  </div>

                  {/* ✅ Link ke halaman detail layanan */}
                  <div className="mt-6">
                    <Link
                      href={service.link}
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg transition"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sistem Penempatan & Garansi */}
          <div className="mt-20 max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-800">
                Sistem Penempatan & Garansi
              </h3>
              <p className="mt-4 text-lg text-gray-600">
                Kami menawarkan sistem yang fleksibel dan transparan untuk kenyamanan Anda.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Area Jabodetabek */}
              <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-500">
                <h4 className="text-2xl font-bold text-gray-800 mb-4">Area Jabodetabek</h4>
                <div className="mb-6">
                  <h5 className="text-xl font-semibold text-gray-700">1. Sistem Permanen</h5>
                  <ul className="list-disc list-inside mt-2 space-y-2 text-gray-600">
                    <li>
                      <strong>Garansi:</strong> 3 bulan dengan hak penggantian hingga 3 kali.
                    </li>
                    <li>
                      <strong>Pengembalian Biaya Admin:</strong> Jika tidak ada pengganti yang cocok,
                      50% di bulan pertama, dan 30% di bulan kedua & ketiga.
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-xl font-semibold text-gray-700">2. Sistem Kontrak</h5>
                  <ul className="list-disc list-inside mt-2 space-y-2 text-gray-600">
                    <li><strong>Kontrak:</strong> Durasi 1 tahun.</li>
                    <li><strong>Garansi:</strong> 6 bulan dengan hak penggantian hingga 2 kali.</li>
                    <li><strong>Pengembalian Biaya Admin:</strong> Jika tidak ada pengganti yang cocok, 50% di bulan pertama, dan 30% hingga bulan keenam.</li>
                  </ul>
                </div>
                <p className="mt-4 text-sm text-gray-500 italic">
                  <strong>Catatan:</strong> Setelah masa garansi/kontrak berakhir, kerja sama dapat
                  dilanjutkan tanpa biaya tambahan apa pun kepada kami.
                </p>
              </div>

              {/* Area Luar Jabodetabek */}
              <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-gray-500">
                <h4 className="text-2xl font-bold text-gray-800 mb-4">Area Luar Jabodetabek</h4>
                <div>
                  <h5 className="text-xl font-semibold text-gray-700">Sistem Kontrak</h5>
                  <ul className="list-disc list-inside mt-2 space-y-2 text-gray-600">
                    <li><strong>Kontrak:</strong> Durasi 1 tahun.</li>
                    <li><strong>Garansi:</strong> 6 bulan dengan hak penggantian hingga 2 kali.</li>
                    <li><strong>Pengembalian Biaya Admin:</strong> Jika tidak ada pengganti yang cocok, 50% di bulan pertama, dan 30% hingga bulan keenam.</li>
                  </ul>
                </div>
                <p className="mt-4 text-sm text-gray-500 italic">
                  <strong>Catatan:</strong> Perpanjangan kontrak wajib dilakukan jika kerja sama
                  dilanjutkan setelah 1 tahun.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <section id="faq" className="max-w-4xl mx-auto mt-20">
            <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
              Pertanyaan Umum Seputar Layanan
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

          {/* SEO Content */}
            <div className="mt-16 bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto text-center">
               <h3 className="text-2xl font-bold text-gray-900">
                  Mengapa Memilih Layanan dari PT Jasa Mandiri?
                 </h3>
                  <p className="mt-4 text-gray-600 leading-relaxed">
                    Mencari <strong className="font-semibold text-blue-600">penyalur ART terpercaya di Jakarta</strong> dan sekitarnya bisa menjadi tantangan. Kami menyederhanakan prosesnya
                   dengan menyediakan <strong className="font-semibold text-blue-600">jasa pekerja rumah tangga</strong> yang telah terverifikasi. Kebutuhan akan{" "}
                   <Link href="/layanan/baby-sitter" className="font-semibold text-blue-600 hover:underline">
                     baby sitter profesional
                    </Link>{" "}
                      atau{" "}
                    <Link href="/layanan/perawat-lansia" className="font-semibold text-blue-600 hover:underline">
                     perawat lansia non-medis
                    </Link>{" "}
                    yang sabar juga menjadi prioritas kami.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
