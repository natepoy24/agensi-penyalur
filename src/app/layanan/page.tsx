// src/app/layanan/page.tsx
import { CheckCircle, ShieldAlert, BadgeCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqAccordion from '@/components/FaqAccordion';

// ✅ Metadata untuk SEO
export const metadata: Metadata = {
  title: "Layanan | Jasa Mandiri",
  description:
    "Jasa Mandiri menyediakan layanan penyalur ART, baby sitter, dan perawat lansia profesional untuk wilayah Jabodetabek dan luar kota. Terlatih, terpercaya, dan bergaransi.",
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

interface FAQItem {
  question: string;
  answer: string;
}

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
    color: "from-blue-50 to-blue-100",
    iconColor: "text-blue-600",
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
    color: "from-emerald-50 to-emerald-100",
    iconColor: "text-emerald-600",
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
    color: "from-purple-50 to-purple-100",
    iconColor: "text-purple-600",
  },
];

// ✅ Data untuk FAQ
const faqData: FAQItem[] = [
  {
    question: "Apa saja layanan utama yang disediakan Jasa Mandiri?",
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
  // Buat skema Service secara manual
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Layanan Penyalur Tenaga Kerja Profesional",
    serviceType: "Penyalur ART, Babysitter, dan Perawat Lansia",
    description: "Jasa Mandiri menyediakan layanan penyalur ART, baby sitter, dan perawat lansia profesional untuk wilayah Jabodetabek dan luar kota. Terlatih, terpercaya, dan bergaransi.",
    provider: {
      "@type": "Organization",
      name: "Jasa Mandiri",
      url: "https://penyalurkerja.com",
    },
    areaServed: {
      "@type": "Place",
      name: "Jabodetabek dan luar kota",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "IDR",
      price: "2500000", // Harga awal sebagai referensi
      url: "https://penyalurkerja.com/layanan",
    },
  };

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
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="pt-16 pb-24 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Judul Halaman */}
          <div className="text-center mb-16">
            <Breadcrumbs 
              crumbs={[
                { name: 'Beranda', path: '/' },
                { name: 'Layanan', path: '/layanan' },
              ]}
            />
            <h1 className="mt-8 text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Layanan Profesional Kami
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
              Kami menyediakan tiga kategori utama pekerja domestik yang terlatih dan terverifikasi
              untuk memenuhi kebutuhan spesifik keluarga Anda.
            </p>
          </div>

          {/* Grid Kartu Layanan */}
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className={`relative w-full h-56 bg-gradient-to-br ${service.color} flex items-center justify-center p-6`}>
                  <div className="relative w-full h-full group-hover:scale-110 transition-transform duration-500">
                    <Image
                      src={service.imageSrc}
                      alt={service.title}
                      fill
                      style={{ objectFit: "contain" }}
                      className="drop-shadow-md"
                    />
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{service.title}</h3>
                  <p className="mt-3 text-slate-600 flex-grow leading-relaxed">{service.description}</p>
                  
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <h4 className="font-bold text-slate-700 mb-4 text-sm uppercase tracking-wider">
                      Sub-Kategori Layanan:
                    </h4>
                    <ul className="space-y-4 text-slate-600 text-sm">
                      {service.subCategories.map((sub, subIndex) => (
                         <li key={subIndex} className="flex items-start group/item">
                          <CheckCircle className={`w-5 h-5 mr-3 shrink-0 mt-0.5 ${service.iconColor} group-hover/item:scale-110 transition-transform`} />
                          <div className="leading-relaxed">
                            <strong className="text-slate-800">{sub.name}</strong> {sub.detail}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-100 bg-slate-50 -mx-8 px-8 pb-8 -mb-8">
                    <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider mt-4">
                      Estimasi Gaji Tahun 2025
                    </h4>
                    <p className="text-slate-800 text-xl font-black mt-2">
                      {service.salary}
                    </p>

                    {/* ✅ Link ke halaman detail layanan */}
                    <div className="mt-6">
                      <Link
                        href={service.link}
                        className="block text-center w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-emerald-500/30 hover:-translate-y-1"
                      >
                        Lihat Detail Layanan
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sistem Penempatan & Garansi */}
          <div className="mt-24 max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-slate-800">
                Sistem Penempatan & Garansi
              </h3>
              <p className="mt-4 text-lg text-slate-600">
                Kami menawarkan sistem yang fleksibel dan transparan untuk kenyamanan Anda.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Area Jabodetabek */}
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-blue-100 p-3 rounded-2xl">
                    <BadgeCheck className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-800">Area Jabodetabek</h4>
                </div>

                <div className="space-y-8">
                  <div>
                    <h5 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                      <span className="bg-slate-100 w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span> 
                      Sistem Permanen
                    </h5>
                    <ul className="mt-3 space-y-3 text-slate-600 ml-8 text-sm leading-relaxed">
                      <li className="relative before:content-[''] before:absolute before:-left-4 before:top-2 before:w-1.5 before:h-1.5 before:bg-blue-400 before:rounded-full">
                        <strong className="text-slate-700">Garansi:</strong> 3 bulan dengan hak penggantian hingga 3 kali.
                      </li>
                      <li className="relative before:content-[''] before:absolute before:-left-4 before:top-2 before:w-1.5 before:h-1.5 before:bg-blue-400 before:rounded-full">
                        <strong className="text-slate-700">Pengembalian Biaya Admin:</strong> Jika tidak ada pengganti yang cocok, 50% di bulan pertama, dan 30% di bulan kedua & ketiga.
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                      <span className="bg-slate-100 w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span> 
                      Sistem Kontrak
                    </h5>
                    <ul className="mt-3 space-y-3 text-slate-600 ml-8 text-sm leading-relaxed">
                      <li className="relative before:content-[''] before:absolute before:-left-4 before:top-2 before:w-1.5 before:h-1.5 before:bg-blue-400 before:rounded-full"><strong className="text-slate-700">Kontrak:</strong> Durasi 1 tahun.</li>
                      <li className="relative before:content-[''] before:absolute before:-left-4 before:top-2 before:w-1.5 before:h-1.5 before:bg-blue-400 before:rounded-full"><strong className="text-slate-700">Garansi:</strong> 6 bulan dengan hak penggantian hingga 2 kali.</li>
                      <li className="relative before:content-[''] before:absolute before:-left-4 before:top-2 before:w-1.5 before:h-1.5 before:bg-blue-400 before:rounded-full"><strong className="text-slate-700">Pengembalian Biaya Admin:</strong> Jika tidak ada pengganti yang cocok, 50% di bulan pertama, dan 30% hingga bulan keenam.</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <p className="text-sm text-slate-500 italic flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" />
                    <span><strong>Catatan:</strong> Setelah masa garansi/kontrak berakhir, kerja sama dapat dilanjutkan tanpa biaya tambahan apa pun kepada kami.</span>
                  </p>
                </div>
              </div>

              {/* Area Luar Jabodetabek */}
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-slate-400 to-slate-600"></div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-slate-100 p-3 rounded-2xl">
                    <BadgeCheck className="w-8 h-8 text-slate-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-800">Luar Jabodetabek</h4>
                </div>

                <div className="space-y-8">
                  <div>
                    <h5 className="text-lg font-bold text-slate-700">Sistem Kontrak Eksklusif</h5>
                    <ul className="mt-4 space-y-4 text-slate-600 text-sm leading-relaxed">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                        <span><strong className="text-slate-700">Kontrak:</strong> Durasi 1 tahun berjalan.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                        <span><strong className="text-slate-700">Garansi:</strong> 6 bulan dengan hak penggantian hingga 2 kali.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                        <span><strong className="text-slate-700">Pengembalian Biaya Admin:</strong> Jika tidak ada pengganti yang cocok, 50% di bulan pertama, dan 30% hingga bulan keenam.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-14 pt-6 border-t border-slate-100">
                  <p className="text-sm text-slate-500 italic flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" />
                    <span><strong>Catatan:</strong> Perpanjangan kontrak wajib dilakukan jika kerja sama dilanjutkan setelah 1 tahun.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-24 max-w-4xl mx-auto">
             <FaqAccordion faqData={faqData} />
          </div>

          {/* SEO Content */}
            <div className="mt-24 bg-gradient-to-b from-white to-slate-50 p-10 md:p-14 rounded-[2.5rem] shadow-sm border border-slate-100 max-w-4xl mx-auto text-center">
               <h3 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight mb-6">
                  Mengapa Memilih Layanan dari Jasa Mandiri?
                 </h3>
                  <p className="text-slate-600 leading-loose text-lg font-light">
                    Mencari <strong className="font-semibold text-emerald-600">penyalur ART terpercaya di Jakarta</strong> dan sekitarnya bisa menjadi tantangan. Kami menyederhanakan prosesnya
                   dengan menyediakan <strong className="font-semibold text-emerald-600">jasa pekerja rumah tangga</strong> yang telah terverifikasi. Kebutuhan akan{" "}
                   <Link href="/layanan/baby-sitter" className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors">
                     baby sitter profesional
                    </Link>{" "}
                      atau{" "}
                    <Link href="/layanan/perawat-lansia" className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors">
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
