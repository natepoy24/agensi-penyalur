// src/app/layanan/baby-sitter/page.tsx
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqAccordion from '@/components/FaqAccordion';
import { HeartHandshake, Baby, AlertTriangle, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Penyalur Baby Sitter & Suster Anak Bergaransi | Jasa Mandiri",
  description:
    "Bapak/Ibu sedang mencari yayasan penyalur baby sitter yang aman? Jasa Mandiri menghadirkan suster bayi (newborn) & balita tersertifikasi dengan 4 lapis screening.",
  keywords: [
    "penyalur baby sitter",
    "yayasan baby sitter terdekat",
    "agen suster anak",
    "jasa pengasuh bayi jakarta",
    "Jasa Mandiri",
  ],
};

interface FAQItem {
  question: string;
  answer: string;
}

const subKategoriBS = [
  {
    title: "Suster Spesialis Newborn (0-12 Bulan)",
    description: "Bukan sekadar menjaga, kandidat ini dilatih ketat menangani tali pusar, memandikan bayi baru lahir, sterilisasi botol, hingga mengatasi jam tidur bayi yang rentan."
  },
  {
    title: "Pengasuh Batita & Balita (1-5 Tahun)",
    description: "Fokus menjaga energi anak yang sedang aktif-aktifnya bergerak, melatih motorik kasar/halus, menemani bermain, sambil menyuapkan makanan tepat waktu."
  },
  {
    title: "Suster Pendamping Kebutuhan Khusus",
    description: "Disiapkan khusus dengan level kesabaran ganda dan ketelatenan ekstra untuk merawat anak autisme atau anak dengan pantauan medis tertentu."
  },
  {
    title: "Baby Sitter Serabutan (Fleksibel)",
    description: "Prioritas tetap di sang anak, tapi saat si kecil tertidur, suster siap membantu merapikan mainan, mencuci botol, maupun menyapu area kamar anak."
  },
];

const faqData: FAQItem[] = [
  {
    question: "Apa bedanya mengambil suster dari yayasan dibanding cari sendiri (lewat tetangga/calo)?",
    answer: "Lewat yayasan seperti Jasa Mandiri, Bapak/Ibu terikat kontrak resmi. Artinya? Ada kepastian identitas (KTP jelas), latar belakang terkontrol, dan yang paling penting: jika suster tiba-tiba minta pulang/resign, kami langsung siapkan pengganti tanpa perlu bayar admin dari awal. Kalau ambil lewat calo, Bapak/Ibu harus pusing cari ganti sendiri.",
  },
  {
    question: "Berapa lama garansi penggantiannya berlaku?",
    answer: "Untuk ketenangan pikiran Anda, kami mengamankan kontrak dengan masa garansi selama 3 bulan. Selama periode itu, Bapak/Ibu berhak menukar pengasuh hingga 3 kali jika dirasa kurang cocok secara chemistry.",
  },
  {
    question: "Apakah susternya benar-benar bebas dari riwayat kriminal?",
    answer: "Sebagai PT berbadan hukum (Kemenkumham), kami tidak berani main-main soal ini. Administrasi kami mewajibkan verifikasi KTP via Dukcapil dan wajib melampirkan surat persetujuan keluarga asli dari kampung asalnya.",
  },
];

export default function BabySitterPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Penyalur Baby Sitter & Suster Anak",
    "serviceType": "Childcare Agency",
    "description": "Jasa Mandiri resmi menyalurkan tenaga baby sitter, suster newborn, dan pengasuh anak balita dengan proses screening berlapis dan garansi penggantian.",
    "provider": {
      "@type": "EmploymentAgency",
      "name": "Jasa Mandiri",
      "url": "https://penyalurkerja.com",
    },
    "areaServed": {
      "@type": "Place",
      "name": "Jabodetabek dan Luar Kota"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "IDR",
      "price": "3000000",
      "url": "https://penyalurkerja.com/layanan/baby-sitter",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="pt-16 pb-24 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <Breadcrumbs crumbs={[
            { name: 'Beranda', path: '/' },
            { name: 'Layanan', path: '/layanan' },
            { name: 'Penyalur Baby Sitter', path: '/layanan/baby-sitter' }
          ]} />

          {/* Header Section (Humanized Copy) */}
          <section className="text-center mt-12 mb-16 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Yayasan Penyalur Baby Sitter Aman & Bergaransi
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-600 leading-relaxed font-light">
              Bapak/Ibu pasti sepakat bahwa menitipkan buah hati bukanlah perkara sepele. Sebagai orang tua, wajar jika rasa was-was itu selalu ada. Itulah mengapa <Link href="/tentang" className="text-emerald-600 hover:text-emerald-800 font-semibold transition-colors">Jasa Mandiri</Link> hadir bukan sekadar &quot;mencarikan orang&quot;, tapi menyiapkan <strong className="font-semibold text-slate-800">suster anak yang rekam jejak identitasnya sudah kami kunci</strong>.
            </p>
          </section>

          {/* Hero Banner Image */}
          <section className="relative w-full h-[350px] md:h-[500px] mb-24 rounded-[2.5rem] overflow-hidden shadow-2xl group">
            <Image
              src="/Image/baby-sitter.svg"
              alt="Pengasuh bayi dan suster balita resmi sedang mendampingi anak bermain"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent"></div>
          </section>

          {/* Grid Ketenangan Pikiran (E-E-A-T Injection) */}
          <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
            <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="bg-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Identitas Transparan</h2>
              <p className="text-slate-600 leading-relaxed">
                Setiap suster yang kami kirim ke rumah Anda identitasnya sudah kami verifikasi. Bapak/Ibu bisa bekerja ke kantor dengan lebih tenang.
              </p>
            </div>

            <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="bg-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Baby className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Tahu Tugas & Batasan</h2>
              <p className="text-slate-600 leading-relaxed">
                Kami sudah membriefing mereka tentang adab, cara steril perlengkapan, dan pantangan memegang gadget saat anak sedang aktif. Mereka datang untuk kerja, bukan numpang main HP.
              </p>
            </div>

            <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="bg-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <HeartHandshake className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Garansi Ganti Suster</h2>
              <p className="text-slate-600 leading-relaxed">
                Karakter anak dan suster beda-beda. Kalau ternyata minggu pertama dirasa kurang &quot;klik&quot;, Bapak/Ibu tinggal hubungi kami untuk minta ganti kandidat tanpa drama.
              </p>
            </div>
          </section>

          {/* Komparasi Calo vs Yayasan (Mendongkrak Organic Dwell Time) */}
          <section className="max-w-5xl mx-auto mb-24">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-slate-800">Mengapa Lewat Yayasan Resmi Lebih Murah?</h3>
              <p className="text-slate-600 mt-4 text-lg font-light">Perbandingan riil merekrut jalur mandiri versus lewat agen penyalur resmi.</p>
            </div>
            <div className="overflow-x-auto rounded-3xl border border-slate-100 shadow-lg">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-slate-50 font-bold text-slate-800 text-lg border-b border-slate-200">
                    <th className="p-6 w-1/4">Kriteria</th>
                    <th className="p-6 w-1/3 bg-red-50/50"><AlertTriangle className="inline w-6 h-6 text-red-500 mr-2 -mt-1" />Jalur Calo / Tetangga</th>
                    <th className="p-6 w-1/3 bg-emerald-50 text-emerald-900"><ShieldCheck className="inline w-6 h-6 text-emerald-600 mr-2 -mt-1" />Jasa Mandiri Resmi</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-slate-700">
                  <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-6 font-bold text-slate-800">Legalitas Identitas</td>
                    <td className="p-6 text-red-700/80">Seringkali cuma foto KTP (rawan kabur bawa barang)</td>
                    <td className="p-6 bg-emerald-50/30 text-emerald-800 font-semibold">Dokumen asli ditahan di loker yayasan</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-6 font-bold text-slate-800">Ganti Suster (Resign)</td>
                    <td className="p-6 text-red-700/80">Cari ganti sendiri, repot cari kenalan lagi</td>
                    <td className="p-6 bg-emerald-50/30 text-emerald-800 font-semibold">Gratis ganti suster 3x selama masa garansi</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-6 font-bold text-slate-800">Kontrak Gaji</td>
                    <td className="p-6 text-red-700/80">Tidak jelas, rawan minta naik gaji mandiri</td>
                    <td className="p-6 bg-emerald-50/30 text-emerald-800 font-semibold">Hitam di atas putih bermaterai 10.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Subkategori & Gaji */}
          <section id="subkategori" className="bg-gradient-to-br from-white to-emerald-50/50 rounded-[2.5rem] shadow-xl border border-slate-100 p-10 md:p-16 max-w-5xl mx-auto mb-24 relative overflow-hidden">
            {/* Decorative element */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50"></div>

            <div className="relative z-10 text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4 tracking-tight">
                Kebutuhan Apa yang Sedang Bapak/Ibu Cari?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              {subKategoriBS.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <h4 className="text-xl font-bold text-emerald-700 mb-3">{item.title}</h4>
                  <p className="text-slate-600 leading-relaxed font-light">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-10 border-t border-slate-200 text-center relative z-10">
              <p className="text-slate-600 mb-4 font-medium text-lg">Tarif & Estimasi Gaji Pokok Suster di Jakarta Saat Ini:</p>
              <div className="inline-block bg-slate-900 text-white px-8 py-4 rounded-full text-xl font-black tracking-wide shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-300">
                Rp 3.000.000 - Rp 5.000.000 <span className="text-slate-400 font-medium text-lg">/ bulan*</span>
              </div>
              <p className="text-sm text-slate-500 mt-6 max-w-2xl mx-auto font-light">*Sangat bergantung pada level pengalaman (Junior/Senior) dan kondisi spesifik anak.</p>
            </div>
          </section>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mb-24">
            <FaqAccordion faqData={faqData} />
          </div>

          {/* Action Hub */}
          <section className="text-center bg-slate-900 rounded-[2.5rem] p-10 md:p-16 max-w-5xl mx-auto text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/40 to-transparent"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Jangan Taruhan Untuk Urusan Anak</h3>
              <p className="text-slate-300 mb-10 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                Amankan waktu istirahat Anda sekarang. Biarkan kami yang pusing menyeleksi kandidat susternya, Bapak/Ibu tinggal wawancara santai.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a href="https://api.whatsapp.com/send?phone=6282122415552&text=Halo%20Admin%20Jasa%20Mandiri,%20saya%20butuh%20info%20ketersediaan%20baby%20sitter%20sekarang." target="_blank" rel="noreferrer" className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black text-lg py-4 px-8 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.3)] transition transform hover:-translate-y-1">
                  Tanya Stok Suster via WA
                </a>
                <Link href="/pekerja" className="bg-transparent border-2 border-slate-600 hover:border-slate-400 text-white font-bold text-lg py-4 px-8 rounded-full transition-all duration-300">
                  Lihat Foto & Profil Suster
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}