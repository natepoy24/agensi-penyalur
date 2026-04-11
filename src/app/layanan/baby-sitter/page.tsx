// src/app/layanan/baby-sitter/page.tsx
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { HeartHandshake, Baby, AlertTriangle, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Penyalur Baby Sitter & Suster Anak Bergaransi | PT Jasa Mandiri",
  description:
    "Bapak/Ibu sedang mencari yayasan penyalur baby sitter yang aman? PT Jasa Mandiri menghadirkan suster bayi (newborn) & balita tersertifikasi dengan 4 lapis screening.",
  keywords: [
    "penyalur baby sitter",
    "yayasan baby sitter terdekat",
    "agen suster anak",
    "jasa pengasuh bayi jakarta",
    "PT Jasa Mandiri",
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
    answer: "Lewat yayasan seperti PT Jasa Mandiri, Bapak/Ibu terikat kontrak resmi. Artinya? Ada kepastian identitas (KTP jelas), latar belakang terkontrol, dan yang paling penting: jika suster tiba-tiba minta pulang/resign, kami langsung siapkan pengganti tanpa perlu bayar admin dari awal. Kalau ambil lewat calo, Bapak/Ibu harus pusing cari ganti sendiri.",
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
    "description": "PT Jasa Mandiri resmi menyalurkan tenaga baby sitter, suster newborn, dan pengasuh anak balita dengan proses screening berlapis dan garansi penggantian.",
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

      <div className="pt-20 pb-20 px-4">
        <div className="container mx-auto">
          <Breadcrumbs crumbs={[
            { name: 'Beranda', path: '/' },
            { name: 'Layanan', path: '/layanan' },
            { name: 'Penyalur Baby Sitter', path: '/layanan/baby-sitter' }
          ]} />

          {/* Header Section (Humanized Copy) */}
          <section className="text-center my-12 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Yayasan Penyalur Baby Sitter Aman & Bergaransi
            </h1>
            <p className="mt-6 text-lg text-slate-700 leading-relaxed font-medium">
              Bapak/Ibu pasti sepakat bahwa menitipkan buah hati bukanlah perkara sepele. Sebagai orang tua, wajar jika rasa was-was itu selalu ada. Itulah mengapa <Link href="/tentang" className="text-emerald-700 hover:text-emerald-800 underline decoration-2 underline-offset-4">PT Jasa Mandiri</Link> hadir bukan sekadar &quot;mencarikan orang&quot;, tapi menyiapkan <strong>suster anak yang rekam jejak identitasnya sudah kami kunci</strong>.
            </p>
          </section>

          {/* Hero Banner Image */}
          <section className="relative w-full h-[300px] md:h-[450px] mb-16 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-200">
            <Image
              src="/Image/baby-sitter.svg"
              alt="Pengasuh bayi dan suster balita resmi sedang mendampingi anak bermain"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
          </section>

          {/* Grid Ketenangan Pikiran (E-E-A-T Injection) */}
          <section className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
            <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 hover:shadow-lg transition">
              <ShieldCheck className="w-12 h-12 text-emerald-600 mb-4" />
              <h2 className="text-xl font-bold text-slate-900 mb-3">Identitas Transparan</h2>
              <p className="text-slate-700 leading-relaxed">
                Setiap suster yang kami kirim ke rumah Anda dokumen aslinya (KTP, Ijazah/Buku Nikah) dijaminkan di yayasan kami. Bapak/Ibu bisa bekerja ke kantor dengan lebih tenang.
              </p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 hover:shadow-lg transition">
              <Baby className="w-12 h-12 text-emerald-600 mb-4" />
              <h2 className="text-xl font-bold text-slate-900 mb-3">Tahu Tugas & Batasan</h2>
              <p className="text-slate-700 leading-relaxed">
                Kami sudah membriefing mereka tentang adab, cara steril perlengkapan, dan pantangan memegang gadget saat anak sedang aktif. Mereka datang untuk kerja, bukan numpang main HP.
              </p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 hover:shadow-lg transition">
              <HeartHandshake className="w-12 h-12 text-emerald-600 mb-4" />
              <h2 className="text-xl font-bold text-slate-900 mb-3">Garansi Ganti Suster</h2>
              <p className="text-slate-700 leading-relaxed">
                Karakter anak dan suster beda-beda. Kalau ternyata minggu pertama dirasa kurang &quot;klik&quot;, Bapak/Ibu tinggal hubungi kami untuk minta ganti kandidat tanpa drama.
              </p>
            </div>
          </section>

          {/* Komparasi Calo vs Yayasan (Mendongkrak Organic Dwell Time) */}
          <section className="max-w-5xl mx-auto mb-20">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold text-slate-900">Mengapa Lewat Yayasan Resmi Lebih Murah?</h3>
              <p className="text-slate-600 mt-2">Perbandingan riil merekrut jalur mandiri versus lewat agen penyalur resmi.</p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-slate-100 font-bold text-slate-800 text-lg">
                    <th className="p-5 border-b border-r border-slate-200 w-1/4">Kriteria</th>
                    <th className="p-5 border-b border-r border-slate-200 w-1/3 bg-red-50/50"><AlertTriangle className="inline w-5 h-5 text-red-500 mr-2 -mt-1"/>Jalur Calo / Tetangga</th>
                    <th className="p-5 border-b w-1/3 bg-emerald-50"><ShieldCheck className="inline w-5 h-5 text-emerald-600 mr-2 -mt-1"/>PT Jasa Mandiri</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-slate-700">
                  <tr className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="p-5 font-semibold text-slate-900 border-r border-slate-200">Legalitas Identitas</td>
                    <td className="p-5 border-r border-slate-200 text-red-700">Seringkali cuma foto KTP (rawan kabur bawa barang)</td>
                    <td className="p-5 bg-emerald-50/30 text-emerald-800 font-medium">Dokumen asli ditahan di loker yayasan</td>
                  </tr>
                  <tr className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="p-5 font-semibold text-slate-900 border-r border-slate-200">Ganti Suster (Resign)</td>
                    <td className="p-5 border-r border-slate-200 text-red-700">Cari ganti sendiri, repot cari kenalan lagi</td>
                    <td className="p-5 bg-emerald-50/30 text-emerald-800 font-medium">Gratis ganti suster 3x selama masa garansi</td>
                  </tr>
                  <tr>
                    <td className="p-5 font-semibold text-slate-900 border-r border-slate-200">Kontrak Gaji</td>
                    <td className="p-5 border-r border-slate-200 text-red-700">Tidak jelas, rawan minta naik gaji mandiri</td>
                    <td className="p-5 bg-emerald-50/30 text-emerald-800 font-medium">Hitam di atas putih bermaterai 10.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Subkategori & Gaji */}
          <section id="subkategori" className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-100 p-8 md:p-12 max-w-5xl mx-auto mb-20 relative overflow-hidden">
             {/* Decorative element */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-50 rounded-full blur-3xl opacity-60"></div>
            
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center relative z-10">
              Kebutuhan Apa yang Sedang Bapak/Ibu Cari?
            </h2>
            <div className="grid md:grid-cols-2 gap-6 relative z-10">
              {subKategoriBS.map((item, index) => (
                <div key={index} className="border border-slate-200 rounded-xl p-6 bg-slate-50 hover:bg-white hover:shadow-md transition">
                  <h4 className="text-lg font-bold text-emerald-700 mb-2">{item.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-10 pt-6 border-t border-slate-200 text-center relative z-10">
              <p className="text-slate-600 mb-2 font-medium">Tarif & Estimasi Gaji Pokok Suster di Jakarta Saat Ini:</p>
              <div className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-full text-lg font-bold tracking-wide shadow-md">
                Kisarannya Rp 3.000.000 - Rp 5.000.000 / bulan*
              </div>
              <p className="text-xs text-slate-400 mt-3">*Sangat bergantung pada level pengalaman (Junior/Senior) dan kondisi spesifik anak.</p>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="max-w-4xl mx-auto mt-16 mb-20">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900">Masih Ada Keraguan?</h2>
              <p className="text-slate-600 mt-2">Ini jawaban dari ketakutan yang sering dialami oleh klien kami yang baru pertama kali mengambil suster.</p>
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

          {/* Action Hub */}
           <section className="text-center bg-slate-900 rounded-3xl p-10 md:p-16 max-w-5xl mx-auto mb-10 text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">Jangan Taruhan Untuk Urusan Anak</h3>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg">
              Amankan waktu istirahat Anda sekarang. Biarkan kami yang pusing menyeleksi kandidat susternya, Bapak/Ibu tinggal wawancara santai.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="https://api.whatsapp.com/send?phone=6282122415552&text=Halo%20Admin%20Jasa%20Mandiri,%20saya%20butuh%20info%20ketersediaan%20baby%20sitter%20sekarang." target="_blank" rel="noreferrer" className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-4 px-8 rounded-full shadow-lg transition transform hover:-translate-y-1">
                Tanya Stok Suster via WA
              </a>
              <Link href="/pekerja" className="bg-transparent border-2 border-slate-600 hover:border-slate-400 text-white font-bold py-4 px-8 rounded-full transition">
                Lihat Foto & Profil Suster
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}