import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ShieldCheck, Star, UserCheck, Phone, AlertTriangle, CheckCircle, Banknote, Clock } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

// --- 1. DATABASE AREA TARGET (Lengkap) ---
const TARGET_AREAS: Record<string, string> = {
  // Jakarta Selatan & Pusat
  'pondok-indah': 'Pondok Indah',
  'kemang': 'Kemang',
  'cilandak': 'Cilandak',
  'lebak-bulus': 'Lebak Bulus',
  'kebayoran': 'Kebayoran',
  'kuningan': 'Kuningan',
  'menteng': 'Menteng',
  'fatmawati': 'Fatmawati',
  'tb-simatupang': 'TB Simatupang',
  'tanjung-barat': 'Tanjung Barat',
  'cinere': 'Cinere',

  // Jakarta Utara & Barat
  'kelapa-gading': 'Kelapa Gading',
  'pik': 'PIK (Pantai Indah Kapuk)',
  'pik-1': 'PIK 1',
  'pik-2': 'PIK 2',
  'pik-avenue': 'PIK Avenue',
  'kembangan': 'Kembangan',

  // Tangerang & Sekitarnya
  'bsd': 'BSD',
  'bsd-city': 'BSD City',
  'serpong': 'Serpong',
  'tigaraksa': 'Tigaraksa',
  'tenjo': 'Tenjo',
  'tangerang': 'Tangerang',
  'tangerang-selatan': 'Tangerang Selatan',
  
  // Kota Besar Lain
  'jakarta-selatan': 'Jakarta Selatan',
  'jakarta-barat': 'Jakarta Barat',
  'jakarta-utara': 'Jakarta Utara',
  'jakarta-timur': 'Jakarta Timur',
  'jakarta-pusat': 'Jakarta Pusat',
  'depok': 'Depok',
  'bogor': 'Bogor',
  'bekasi': 'Bekasi',
  'cibubur': 'Cibubur',
  'bintaro': 'Bintaro',
};

// --- 2. METADATA DINAMIS ---
export async function generateMetadata(
  props: { params: Promise<{ kota: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const { kota } = params;
  const areaName = TARGET_AREAS[kota];

  if (!areaName) {
    return { title: 'Area Tidak Ditemukan' };
  }

  return {
    title: `Penyalur Baby Sitter & ART di ${areaName} (Resmi & Bergaransi) | PT Jasa Mandiri`,
    description: `Sulit cari ART/Suster di ${areaName}? Jangan ambil risiko dengan pekerja cabutan dari internet atau calo. PT Jasa Mandiri Agency menyediakan tenaga kerja resmi, terverifikasi, dan bergaransi untuk wilayah ${areaName}.`,
    alternates: {
      canonical: `https://penyalurkerja.com/area/${kota}`,
    },
    openGraph: {
      title: `Solusi Cari ART & Baby Sitter Aman di ${areaName}`,
      description: `Stok ready hari ini siap antar ke ${areaName}. Garansi ganti pekerja & identitas jelas.`,
      url: `https://penyalurkerja.com/area/${kota}`,
    },
  };
}

// --- 3. HALAMAN UTAMA ---
export default async function AreaLandingPage(props: { params: Promise<{ kota: string }> }) {
  const params = await props.params;
  const { kota } = params;
  const areaName = TARGET_AREAS[kota];

  if (!areaName) {
    notFound();
  }

  // Schema LocalBusiness
  const areaSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `PT Jasa Mandiri Agency - Layanan ${areaName}`,
    "image": "https://penyalurkerja.com/Image/Logo-jm.png",
    "telephone": "+6282122415552",
    "url": `https://penyalurkerja.com/area/${kota}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jakarta Selatan",
      "addressCountry": "ID"
    },
    "areaServed": {
      "@type": "Place",
      "name": areaName
    },
    "priceRange": "Mulai dari Rp 2.500.000"
  };

  return (
    <main className="bg-slate-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(areaSchema) }}
      />
      
      {/* Hero Section */}
      <section className="relative bg-emerald-900 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           <Image src="/Image/hero-image.webp" alt="seorang baby sitter profesional sedang mengasuh anak" fill className="object-cover" priority />
        </div>
        <div className="container mx-auto relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-800 text-emerald-200 text-sm font-semibold mb-4 border border-emerald-700">
            Area Layanan: {areaName}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Butuh Tenaga Kerja Terpercaya <br/>di {areaName}?
          </h1>
          <p className="text-lg text-emerald-100 max-w-2xl mx-auto mb-8">
            Jangan biarkan urusan rumah tangga mengganggu produktivitas Anda. Kami hadir di {areaName} membawa solusi tenaga kerja profesional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/pekerja" 
              className="px-8 py-3 bg-white text-emerald-900 font-bold rounded-lg hover:bg-gray-100 transition"
            >
              Lihat Katalog Pekerja
            </Link>
            <a 
              href={`https://api.whatsapp.com/send?phone=6282122415552&text=Halo%20PT%20Jasa%20Mandiri,%20saya%20butuh%20bantuan%20untuk%20lokasi%20${encodeURIComponent(areaName)}.`}
              target="_blank"
              className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition flex items-center justify-center gap-2"
            >
              <Phone size={20} /> Chat Admin {areaName}
            </a>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          crumbs={[
            { name: 'Beranda', path: '/' },
            { name: 'Area', path: '#' },
            { name: areaName, path: `/area/${kota}` }
          ]} 
        />
      </div>

      {/* --- BAGIAN 1: MASALAH (PAIN POINTS) --- */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Dilema Mencari ART di Kawasan {areaName}
            </h2>
            <div className="w-20 h-1 bg-red-500 mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                Tinggal di kawasan strategis seperti <strong>{areaName}</strong> memang menawarkan kenyamanan, namun seringkali kita dihadapkan pada tantangan besar dalam mengelola urusan domestik. Kesibukan karir yang tinggi membuat waktu untuk mengurus rumah menjadi sangat terbatas.
              </p>
              <p>
                Mungkin Anda pernah mengalami masalah ini:
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <AlertTriangle className="text-red-500 flex-shrink-0 mt-1" />
                  <span>Sulit mencari pekerja yang <strong>jujur dan bisa dipercaya</strong> memegang kunci rumah.</span>
                </li>
                <li className="flex gap-3">
                  <AlertTriangle className="text-red-500 flex-shrink-0 mt-1" />
                  <span>Baby sitter yang <strong>kurang pengalaman</strong> menangani bayi, membuat Anda was-was saat bekerja.</span>
                </li>
                <li className="flex gap-3">
                  <AlertTriangle className="text-red-500 flex-shrink-0 mt-1" />
                  <span>Drama pekerja yang sering minta pulang kampung atau berhenti mendadak tanpa kabar.</span>
                </li>
              </ul>
              <p className="font-medium text-slate-600">
                Mencari tenaga kerja &quot;cabutan&quot; di sosial media seringkali berisiko tinggi karena identitas yang tidak jelas dan tanpa jaminan.
              </p>
            </div>
            <div className="relative h-80 w-full rounded-xl overflow-hidden shadow-lg bg-slate-100">
                {/* Placeholder Image: Menggambarkan orang pusing/stress */}
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-200">
                   <Image src="/Image/landing-page.webp" alt="kesibukan orang tua tanpa baby sitter" fill className="object-cover" priority />
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BAGIAN 2: SOLUSI (PT JASA MANDIRI) --- */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm">Solusi Kami</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              PT Jasa Mandiri Hadir Sebagai Jawaban
            </h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              Kami memahami standar tinggi keluarga di {areaName}. Oleh karena itu, kami tidak sembarangan mengirim pekerja.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Solusi 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-emerald-500 hover:shadow-md transition">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Keamanan Terjamin</h3>
              <p className="text-slate-600">
                Tenang tinggalkan rumah. Seluruh pekerja yang kami salurkan ke {areaName} telah melalui verifikasi KTP, KK, dan latar belakang kriminal yang ketat.
              </p>
            </div>

            {/* Solusi 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-blue-500 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <UserCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">SDM Terlatih</h3>
              <p className="text-slate-600">
                Bukan sekadar pembantu. ART dan Baby Sitter kami telah dilatih etika, kebersihan, dan keterampilan khusus sebelum diterjunkan ke {areaName}.
              </p>
            </div>

            {/* Solusi 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-yellow-500 hover:shadow-md transition">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-4">
                <Star size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Garansi Ganti</h3>
              <p className="text-slate-600">
                Tidak cocok? Jangan khawatir. Kami memberikan garansi penggantian pekerja jika kinerja kurang memuaskan selama masa garansi.
              </p>
            </div>
          </div>

{/* --- KEUNTUNGAN (WHY US) --- */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-10">Mengapa Memilih PT Jasa Mandiri?</h2>
          <div className="grid md:grid-cols-2 gap-8">
             <div className="flex gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 flex-shrink-0">
                   <ShieldCheck />
                </div>
                <div>
                   <h4 className="text-lg font-bold text-slate-800">Legalitas PT Resmi</h4>
                   <p className="text-slate-600 text-sm">Kami bukan penyalur perorangan. Operasional kami diawasi oleh Disnaker dan berbadan hukum PT, memberikan keamanan hukum bagi Anda.</p>
                </div>
             </div>
             <div className="flex gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 flex-shrink-0">
                   <UserCheck />
                </div>
                <div>
                   <h4 className="text-lg font-bold text-slate-800">Seleksi Berlapis</h4>
                   <p className="text-slate-600 text-sm">Pekerja melalui tes wawancara, background check, dan pelatihan dasar sebelum statusnya menjadi &quot;Ready&quot; di website.</p>
                </div>
             </div>
             <div className="flex gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 flex-shrink-0">
                   <Clock />
                </div>
                <div>
                   <h4 className="text-lg font-bold text-slate-800">Proses Cepat (1 Hari)</h4>
                   <p className="text-slate-600 text-sm">Pilih pagi, wawancara siang, sore pekerja bisa langsung diantar ke {areaName} (jika stok ready).</p>
                </div>
             </div>
             <div className="flex gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 flex-shrink-0">
                   <Banknote />
                </div>
                <div>
                   <h4 className="text-lg font-bold text-slate-800">Biaya Admin Kompetitif</h4>
                   <p className="text-slate-600 text-sm">Biaya administrasi yang jelas tanpa hidden fee, dengan garansi penggantian pekerja yang sesuai kesepakatan dan tertulis di kontrak.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

          {/* List Layanan Spesifik Kota */}
          <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Layanan Prioritas untuk Wilayah {areaName}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50">
                    <CheckCircle className="text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="font-bold text-lg">Baby Sitter {areaName}</h4>
                        <p className="text-sm text-slate-600 mt-1">Pengasuh bayi (newborn) dan balita yang sabar, bersih, dan berpengalaman menangani anak.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50">
                    <CheckCircle className="text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="font-bold text-lg">ART / PRT {areaName}</h4>
                        <p className="text-sm text-slate-600 mt-1">Asisten rumah tangga untuk sapu pel, cuci gosok, dan masak. Bisa pulang sore atau menginap.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50">
                    <CheckCircle className="text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="font-bold text-lg">Perawat Lansia {areaName}</h4>
                        <p className="text-sm text-slate-600 mt-1">Perawat homecare medis dan non-medis untuk mendampingi orang tua tercinta di rumah.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50">
                    <CheckCircle className="text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="font-bold text-lg">Layanan Infal {areaName}</h4>
                        <p className="text-sm text-slate-600 mt-1">Solusi pekerja sementara saat pembantu reguler mudik lebaran atau cuti.</p>
                    </div>
                </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- TABEL GAJI & LAYANAN 2025 (SEO POWERHOUSE) --- */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Estimasi Gaji & Layanan Terbaru 2025</h2>
            <p className="text-slate-600 mt-2">Transparansi biaya untuk wilayah {areaName} dan sekitarnya.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Baby Sitter */}
            <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition overflow-hidden">
               <div className="bg-blue-50 p-4 border-b border-blue-100">
                  <h3 className="text-xl font-bold text-blue-800">Baby Sitter</h3>
                  <p className="text-xs text-blue-600">Newborn & Balita</p>
               </div>
               <div className="p-6">
                  <p className="text-3xl font-bold text-slate-800 mb-1">3,0 - 5 Jt<span className="text-sm font-normal text-slate-500">/bln</span></p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    <li className="flex gap-2"><CheckCircle size={16} className="text-green-500"/> Urus Bayi (Mandi, Susu, Jemur)</li>
                    <li className="flex gap-2"><CheckCircle size={16} className="text-green-500"/> Stimulasi Tumbuh Kembang</li>
                    <li className="flex gap-2"><CheckCircle size={16} className="text-green-500"/> Sterilisasi Botol & MPASI</li>
                  </ul>
               </div>
            </div>

            {/* Card 2: ART */}
            <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition overflow-hidden">
               <div className="bg-emerald-50 p-4 border-b border-emerald-100">
                  <h3 className="text-xl font-bold text-emerald-800">ART / PRT</h3>
                  <p className="text-xs text-emerald-600">Rumah Tangga Umum</p>
               </div>
               <div className="p-6">
                  <p className="text-3xl font-bold text-slate-800 mb-1">2,5 - 3,5 Jt<span className="text-sm font-normal text-slate-500">/bln</span></p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    <li className="flex gap-2"><CheckCircle size={16} className="text-green-500"/> Sapu, Pel, Cuci, Gosok</li>
                    <li className="flex gap-2"><CheckCircle size={16} className="text-green-500"/> Memasak Harian</li>
                    <li className="flex gap-2"><CheckCircle size={16} className="text-green-500"/> Bersih-bersih Menyeluruh</li>
                  </ul>
               </div>
            </div>

            {/* Card 3: Perawat Lansia */}
            <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition overflow-hidden">
               <div className="bg-yellow-50 p-4 border-b border-yellow-100">
                  <h3 className="text-xl font-bold text-yellow-800">Perawat Lansia</h3>
                  <p className="text-xs text-yellow-600">Medis & Non-Medis</p>
               </div>
               <div className="p-6">
                  <p className="text-3xl font-bold text-slate-800 mb-1">3,5 - 5,5 Jt<span className="text-sm font-normal text-slate-500">/bln</span></p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    <li className="flex gap-2"><CheckCircle size={16} className="text-green-500"/> Teman Bicara & Pendampingan</li>
                    <li className="flex gap-2"><CheckCircle size={16} className="text-green-500"/> Cek Tensi & Obat Rutin</li>
                    <li className="flex gap-2"><CheckCircle size={16} className="text-green-500"/> Bantu Mobilitas (Kursi Roda)</li>
                  </ul>
               </div>
            </div>
          </div>
          <p className="text-center text-xs text-slate-500 mt-6">*Gaji dapat bervariasi tergantung pengalaman pekerja dan beban kerja.</p>
        </div>
      </section>

      {/* CTA Akhir */}
      <section className="py-20 bg-emerald-900 text-center px-4 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Sudah Siap Hidup Lebih Tenang?</h2>
        <p className="text-emerald-100 mb-8 max-w-xl mx-auto text-lg">
          Biarkan kami yang mengurus kebutuhan tenaga kerja Anda di {areaName}, sehingga Anda bisa fokus pada hal yang lebih penting.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
            href="/pekerja" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-emerald-900 font-bold rounded-full hover:bg-gray-100 transition shadow-lg"
            >
            <Star className="fill-current" size={20} /> Pilih Pekerja Sekarang
            </Link>
            <a 
            href="https://api.whatsapp.com/send?phone=6282122415552"
            target="_blank"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition"
            >
            Konsultasi Gratis
            </a>
        </div>
      </section>
    </main>
  );
}