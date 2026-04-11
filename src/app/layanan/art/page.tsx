// src/app/layanan/art/page.tsx
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Users, ShieldCheck, Sparkles, AlertTriangle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Penyalur Pembantu (ART) Berpengalaman | PT Jasa Mandiri",
  description: "Capek dengan urusan rumah yang tak pernah beres? Cari agen penyalur ART (Asisten Rumah Tangga) terdekat yang legal dan bergaransi di sini.",
  keywords: [
    "penyalur art",
    "yayasan art jakarta",
    "agen pembantu terdekat",
    "penyalur asisten rumah tangga",
    "yayasan prt resmi",
    "cari pembantu jabodetabek"
  ],
};

interface FAQItem {
  question: string;
  answer: string;
}

const subKategoriART = [
  { 
    title: "ART Pemula / Junior", 
    description: "Cocok untuk keluarga kecil. Mereka telaten menyapu, mengepel, beberes kasur, dan bisa diajari pelan-pelan mengenai alur serta standar kebersihan rumah Bapak/Ibu." 
  },
  { 
    title: "ART Serabutan (Plus Momong)", 
    description: "Pilihan paling hemat. Urusan cuci-gosok dan sapu-pel beres, plus mereka mau bantu-bantu menemani anak yang sudah cukup besar untuk sekadar diajak main." 
  },
  { 
    title: "ART Masak / Senior", 
    description: "Tak cuma lincah membersihkan noda membandel, kandidat ini punya rekam jejak bagus di dapur, tahu bumbu-bumbu dasar, dan bisa dilepas mandiri ke warung." 
  },
  { 
    title: "ART Pulang-Pergi (Panggilan)", 
    description: "Bagi Anda yang ruang tempat tinggalnya terbatas, kami juga memiliki ibu-ibu domisili terdekat untuk bekerja dengan sistem shift pagi-sore." 
  },
];

const faqData: FAQItem[] = [
  {
    question: "Bagaimana kalau PRT-nya baru kerja seminggu lalu minta pulang mendadak?",
    answer: "Kejadian seperti ini kadang tak terhindarkan, dan itulah alasan Bapak/Ibu merekrut lewat yayasan PT Jasa Mandiri. Jika dia resign, Bapak/Ibu tinggal lapor ke admin. Kami akan mendatangkan kandidat pembantu pengganti ke rumah Anda detik itu juga, tanpa pungutan biaya admin lagi selama masa garansi.",
  },
  {
    question: "Apakah asisten rumah tangganya bisa langsung dikirim hari ini?",
    answer: "Sangat bisa! Bapak/Ibu bisa membuka menu 'Pekerja' dan pilih yang statusnya 'Tersedia'. Begitu berkas via WhatsApp selesai, armada supir resmi dari yayasan kami akan langsung memanaskan mesin dan menjemput mereka menuju ke rumah tujuan (khusus Jabodetabek).",
  },
  {
    question: "Saya trauma barang hilang. Bagaimana jaminannya?",
    answer: "Risiko di rumah orang lain memang ada, tapi dengan sistem yayasan resmi berbadan hukum seperti kami, risikonya ditekan tajam. Identitas (KTP, Ijazah), domisili asli asal, hingga persetujuan keluarga tercatat dalam sistem kami. Pekerja akan mikir ribuan kali sebelum bertindak di luar nalar.",
  }
];

export default function LayananARTPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Penyalur Asisten Rumah Tangga (ART)",
    "serviceType": "Maid Agency",
    "description": "PT Jasa Mandiri adalah badan hukum resmi yang menyalurkan pekerja rumah tangga/pembantu profesional untuk Jakarta, Depok, Tangerang, Bekasi.",
    "provider": {
      "@type": "EmploymentAgency",
      "name": "PT Jasa Mandiri",
      "url": "https://penyalurkerja.com",
    },
    "areaServed": {
      "@type": "Place",
      "name": "Jabodetabek dan Luar Kota"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "IDR",
      "price": "2500000",
      "url": "https://penyalurkerja.com/layanan/art",
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
      <div className="pt-20 pb-20 px-4">
        <div className="container mx-auto">
          <Breadcrumbs crumbs={[
            { name: 'Beranda', path: '/' },
            { name: 'Layanan', path: '/layanan' },
            { name: 'Penyalur ART', path: '/layanan/art' }
          ]} />
          
          {/* Judul & Deskripsi Utama */}
          <section className="text-center my-12 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Yayasan Penyalur ART Resmi: Beres, Cekatan, Tanpa Drama
            </h1>
            <p className="mt-6 text-lg text-slate-700 leading-relaxed font-medium">
              Pulang kerja dengan stamina habis, badan letih, tapi rumah dalam kondisi berantakan, dan cucian menumpuk? Bapak/Ibu tidak perlu tersiksa seperti itu tiap hari. Di <Link href="/tentang" className="text-blue-700 hover:underline font-semibold">PT Jasa Mandiri</Link>, kami menyaring calon <strong>pembantu rumah tangga (ART)</strong> yang staminanya prima dan siap membereskan sudut-sudut kotor rumah Anda.
            </p>
          </section>

          {/* Gambar Utama */}
          <section className="relative w-full h-[300px] md:h-[450px] mb-16 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-200">
            <Image
              src="/Image/prt.svg"
              alt="Asisten rumah tangga (ART) sedang membersihkan kaca dan menyapu lantai"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
          </section>

          {/* Value Prop */}
          <section className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
            <div className="bg-sky-50 rounded-2xl p-8 border border-sky-100 hover:shadow-lg transition">
              <Sparkles className="w-12 h-12 text-sky-600 mb-4" />
              <h2 className="text-xl font-bold text-slate-900 mb-3">Tahu Estetika Kebersihan</h2>
              <p className="text-slate-700 leading-relaxed">
                Kandidat ART kami pantang asal basah saat mengepel. Mereka diedukasi untuk mampu membedakan kain lap mana yang untuk teras, mana untuk dapur, hingga untuk kamar tamu.
              </p>
            </div>
            <div className="bg-sky-50 rounded-2xl p-8 border border-sky-100 hover:shadow-lg transition">
              <Users className="w-12 h-12 text-sky-600 mb-4" />
              <h2 className="text-xl font-bold text-slate-900 mb-3">Sikap & Sopan Santun Terjaga</h2>
              <p className="text-slate-700 leading-relaxed">
                ART banyak tingkah, cerewet bergosip dengan tetangga, atau keras kepala adalah momok terbesar majikan. Yayasan kami dengan teguh menggugurkan asisten bermental seperti itu saat pembekalan.
              </p>
            </div>
            <div className="bg-sky-50 rounded-2xl p-8 border border-sky-100 hover:shadow-lg transition">
              <ShieldCheck className="w-12 h-12 text-sky-600 mb-4" />
              <h2 className="text-xl font-bold text-slate-900 mb-3">Garansi Administratif</h2>
              <p className="text-slate-700 leading-relaxed">
                Transaksi Anda dilindungi langsung melalui kanal PT berizin. Apabila asisten mendadak pulang kampung karena masalah mendesak di luar akal bulus, Anda tetap memiliki perlindungan hukum kuitansinya.
              </p>
            </div>
          </section>

          {/* Tabel Perbandingan */}
          <section className="max-w-5xl mx-auto mb-20">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold text-slate-900">Bedanya PT Jasa Mandiri vs Jalur Calo Bebas</h3>
              <p className="text-slate-600 mt-2">Keteledoran menyaring latar belakang bisa berakibat di masa depan. Serahkan filtrasi asisten rumah tangga pada ahlinya.</p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-slate-100 font-bold text-slate-800 text-lg">
                    <th className="p-5 border-b border-r border-slate-200 w-1/4">Parameter</th>
                    <th className="p-5 border-b border-r border-slate-200 w-1/3 bg-red-50/50"><AlertTriangle className="inline w-5 h-5 text-red-500 mr-2 -mt-1"/>Makelar Facebook / Bebas</th>
                    <th className="p-5 border-b w-1/3 bg-sky-50 text-sky-900"><ShieldCheck className="inline w-5 h-5 text-sky-600 mr-2 -mt-1"/>PT Jasa Mandiri (Legalitas Jelas)</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-slate-700">
                  <tr className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="p-5 font-semibold text-slate-900 border-r border-slate-200">Asal-Usul ART</td>
                    <td className="p-5 border-r border-slate-200 text-red-700">Identitas buram / berani pinjam KTP orang</td>
                    <td className="p-5 bg-sky-50/30 text-blue-800 font-medium">Buku Nikah (bagi yang menikah) atau dokumen KK menjadi peluru agunan utama</td>
                  </tr>
                  <tr className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="p-5 font-semibold text-slate-900 border-r border-slate-200">Mitigasi Konflik</td>
                    <td className="p-5 border-r border-slate-200 text-red-700">Makelar hilang ketika masalah pekerjaan membesar</td>
                    <td className="p-5 bg-sky-50/30 text-blue-800 font-medium">Admin kantor kamilah yang turun tangan menengahi dan mengedukasi asisten</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-semibold text-slate-900 border-r border-slate-200">Protokol Keberangkatan</td>
                    <td className="p-5 border-r border-slate-200 text-red-700">Terbengkalai di terminal pakai kendaraan logistik umum</td>
                    <td className="p-5 bg-sky-50/30 text-blue-800 font-medium">Dikawal tim lapangan yayasan sampai membukakan pagar pintu garasi majikan</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Subkategori & Gaji */}
          <section id="subkategori" className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-100 p-8 md:p-12 max-w-5xl mx-auto mb-20 relative overflow-hidden">
             <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
            
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center relative z-10">
              Spesifikasi Asisten Rumah Tangga Sesuai Dapur Anda
            </h2>
            <div className="grid md:grid-cols-2 gap-6 relative z-10">
              {subKategoriART.map((item, index) => (
                <div key={index} className="border border-slate-200 rounded-xl p-6 bg-slate-50 hover:bg-white hover:shadow-md transition">
                  <h4 className="text-lg font-bold text-blue-700 mb-2">{item.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 pt-6 border-t border-slate-200 text-center relative z-10">
              <p className="text-slate-600 mb-2 font-medium">Patokan standar Upah Minimum Pembantu di Teritori Perkotaan (2025/2026):</p>
              <div className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-bold tracking-wide shadow-md">
                Kisarannya Rp 2.500.000 - Rp 3.500.000 / bulan*
              </div>
              <p className="text-xs text-slate-400 mt-3">*Sangat mungkin beda apabila rumah majikan bertingkat menjulang, asisten bertugas megurus lebih dari 3 orang balita, dsb.</p>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="max-w-4xl mx-auto mt-16 mb-20">
             <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900">Ulasan & Pertanyaan Para Ibu</h2>
            </div>
            <div className="space-y-4">
              {faqData.map((item, index) => (
                <details key={index} className="group bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <summary className="flex justify-between items-center font-bold cursor-pointer text-slate-800 list-none">
                    {item.question}
                    <span className="ml-4 transition-transform duration-200 group-open:rotate-180 bg-slate-100 text-slate-600 w-8 h-8 flex items-center justify-center rounded-full shrink-0">▼</span>
                  </summary>
                  <p className="mt-4 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Call To Action Box */}
          <section className="text-center bg-blue-900 rounded-3xl p-10 md:p-16 max-w-5xl mx-auto mb-10 text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">Rumah Terurus Rapi, Karier Majikan Melejit</h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
              Ambil handphone Anda, tuangkan keluhan soal cucian atau setrikaan. Konsultasikan bebas kapan saja dengan Admin spesialis rekrutmen yayasan kami.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="https://api.whatsapp.com/send?phone=6282122415552&text=Halo%20Admin,%20saya%20lagi%20pusing%20nyari%20ART.%20Apa%20ada%20yang%20ready%20untuk%20kerja%20cuci%20gosok%20sapu%20pel?" target="_blank" rel="noreferrer" className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-8 rounded-full shadow-lg transition transform hover:-translate-y-1">
                Tanya Ketersediaan ART
              </a>
              <Link href="/pekerja" className="bg-transparent border-2 border-blue-400 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-full transition">
                Etalase Wajah Calon ART
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}