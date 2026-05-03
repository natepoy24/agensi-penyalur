// src/app/layanan/art/page.tsx
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Users, ShieldCheck, Sparkles, AlertTriangle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqAccordion from '@/components/FaqAccordion';

export const metadata: Metadata = {
  title: "Penyalur Pembantu (ART) Berpengalaman | Jasa Mandiri",
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
    answer: "Kejadian seperti ini kadang tak terhindarkan, dan itulah alasan Bapak/Ibu merekrut lewat yayasan Jasa Mandiri. Jika dia resign, Bapak/Ibu tinggal lapor ke admin. Kami akan mendatangkan kandidat pembantu pengganti ke rumah Anda detik itu juga, tanpa pungutan biaya admin lagi selama masa garansi.",
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
    "description": "Jasa Mandiri adalah badan hukum resmi yang menyalurkan pekerja rumah tangga/pembantu profesional untuk Jakarta, Depok, Tangerang, Bekasi.",
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
      
      <div className="pt-16 pb-24 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <Breadcrumbs crumbs={[
            { name: 'Beranda', path: '/' },
            { name: 'Layanan', path: '/layanan' },
            { name: 'Penyalur ART', path: '/layanan/art' }
          ]} />
          
          {/* Judul & Deskripsi Utama */}
          <section className="text-center mt-12 mb-16 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Yayasan Penyalur ART Resmi:<br className="hidden md:block"/> Beres, Cekatan, Tanpa Drama
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-600 leading-relaxed font-light">
              Pulang kerja dengan stamina habis, badan letih, tapi rumah dalam kondisi berantakan, dan cucian menumpuk? Bapak/Ibu tidak perlu tersiksa seperti itu tiap hari. Di <Link href="/tentang" className="text-blue-600 hover:text-blue-800 hover:underline font-semibold transition-colors">Jasa Mandiri</Link>, kami menyaring calon <strong className="font-semibold text-slate-800">pembantu rumah tangga (ART)</strong> yang staminanya prima dan siap membereskan sudut-sudut kotor rumah Anda.
            </p>
          </section>

          {/* Gambar Utama */}
          <section className="relative w-full h-[350px] md:h-[500px] mb-24 rounded-[2.5rem] overflow-hidden shadow-2xl group">
            <Image
              src="/Image/prt.svg"
              alt="Asisten rumah tangga (ART) sedang membersihkan kaca dan menyapu lantai"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent"></div>
          </section>

          {/* Value Prop */}
          <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
            <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                 <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Tahu Estetika Kebersihan</h2>
              <p className="text-slate-600 leading-relaxed">
                Kandidat ART kami pantang asal basah saat mengepel. Mereka diedukasi untuk mampu membedakan kain lap mana yang untuk teras, mana untuk dapur, hingga untuk kamar tamu.
              </p>
            </div>
            
            <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                 <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Sikap & Sopan Santun Terjaga</h2>
              <p className="text-slate-600 leading-relaxed">
                ART banyak tingkah, cerewet bergosip dengan tetangga, atau keras kepala adalah momok terbesar majikan. Yayasan kami dengan teguh menggugurkan asisten bermental seperti itu saat pembekalan.
              </p>
            </div>
            
            <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                 <ShieldCheck className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Garansi Administratif</h2>
              <p className="text-slate-600 leading-relaxed">
                Transaksi Anda dilindungi langsung melalui kanal PT berizin. Apabila asisten mendadak pulang kampung karena masalah mendesak di luar akal bulus, Anda tetap memiliki perlindungan hukum kuitansinya.
              </p>
            </div>
          </section>

          {/* Tabel Perbandingan */}
          <section className="max-w-5xl mx-auto mb-24">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-slate-800">Bedanya Jasa Mandiri vs Jalur Calo Bebas</h3>
              <p className="text-slate-600 mt-4 text-lg font-light">Keteledoran menyaring latar belakang bisa berakibat di masa depan. Serahkan filtrasi asisten rumah tangga pada ahlinya.</p>
            </div>
            <div className="overflow-x-auto rounded-3xl border border-slate-100 shadow-lg">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-slate-50 font-bold text-slate-800 text-lg border-b border-slate-200">
                    <th className="p-6 w-1/4">Parameter</th>
                    <th className="p-6 w-1/3 bg-red-50/50"><AlertTriangle className="inline w-6 h-6 text-red-500 mr-2 -mt-1"/>Makelar / Bebas</th>
                    <th className="p-6 w-1/3 bg-blue-50 text-blue-900"><ShieldCheck className="inline w-6 h-6 text-blue-600 mr-2 -mt-1"/>Jasa Mandiri Resmi</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-slate-700">
                  <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-6 font-bold text-slate-800">Asal-Usul ART</td>
                    <td className="p-6 text-red-700/80">Identitas buram / berani pinjam KTP orang</td>
                    <td className="p-6 bg-blue-50/30 text-blue-800 font-semibold">Buku Nikah (bagi yang menikah) atau dokumen KK menjadi peluru agunan utama</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-6 font-bold text-slate-800">Mitigasi Konflik</td>
                    <td className="p-6 text-red-700/80">Makelar hilang ketika masalah pekerjaan membesar</td>
                    <td className="p-6 bg-blue-50/30 text-blue-800 font-semibold">Admin kantor kamilah yang turun tangan menengahi dan mengedukasi asisten</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-6 font-bold text-slate-800">Protokol Keberangkatan</td>
                    <td className="p-6 text-red-700/80">Terbengkalai di terminal pakai kendaraan logistik umum</td>
                    <td className="p-6 bg-blue-50/30 text-blue-800 font-semibold">Dikawal tim lapangan yayasan sampai membukakan pagar pintu garasi majikan</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Subkategori & Gaji */}
          <section id="subkategori" className="bg-gradient-to-br from-white to-blue-50/50 rounded-[2.5rem] shadow-xl border border-slate-100 p-10 md:p-16 max-w-5xl mx-auto mb-24 relative overflow-hidden">
             <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
            
            <div className="relative z-10 text-center mb-12">
               <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4 tracking-tight">
                 Spesifikasi Asisten Rumah Tangga Sesuai Dapur Anda
               </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              {subKategoriART.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <h4 className="text-xl font-bold text-blue-700 mb-3">{item.title}</h4>
                  <p className="text-slate-600 leading-relaxed font-light">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 pt-10 border-t border-slate-200 text-center relative z-10">
              <p className="text-slate-600 mb-4 font-medium text-lg">Patokan standar Upah Minimum Pembantu di Teritori Perkotaan (2025/2026):</p>
              <div className="inline-block bg-slate-900 text-white px-8 py-4 rounded-full text-xl font-black tracking-wide shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-300">
                Rp 2.500.000 - Rp 3.500.000 <span className="text-slate-400 font-medium text-lg">/ bulan*</span>
              </div>
              <p className="text-sm text-slate-500 mt-6 max-w-2xl mx-auto font-light">*Sangat mungkin beda apabila rumah majikan bertingkat menjulang, asisten bertugas megurus lebih dari 3 orang balita, dsb.</p>
            </div>
          </section>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mb-24">
            <FaqAccordion faqData={faqData} />
          </div>

          {/* Call To Action Box */}
          <section className="text-center bg-emerald-900 rounded-[2.5rem] p-10 md:p-16 max-w-5xl mx-auto text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/50 to-transparent"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Rumah Terurus Rapi, Karier Majikan Melejit</h3>
              <p className="text-emerald-100 mb-10 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                Ambil handphone Anda, tuangkan keluhan soal cucian atau setrikaan. Konsultasikan bebas kapan saja dengan Admin spesialis rekrutmen yayasan kami.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a href="https://api.whatsapp.com/send?phone=6282122415552&text=Halo%20Admin,%20saya%20lagi%20pusing%20nyari%20ART.%20Apa%20ada%20yang%20ready%20untuk%20kerja%20cuci%20gosok%20sapu%20pel?" target="_blank" rel="noreferrer" className="bg-white text-emerald-900 hover:bg-emerald-50 font-black text-lg py-4 px-8 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] transition transform hover:-translate-y-1">
                  Tanya Ketersediaan ART
                </a>
                <Link href="/pekerja" className="bg-transparent border-2 border-emerald-400/50 hover:bg-emerald-800 hover:border-emerald-800 text-white font-bold text-lg py-4 px-8 rounded-full transition-all duration-300">
                  Etalase Wajah Calon ART
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}