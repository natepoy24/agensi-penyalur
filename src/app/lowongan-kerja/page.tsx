// src/app/lowongan-kerja/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FaqAccordion from '@/components/layout/FaqAccordion';
import { CheckCircle, User, Briefcase, BookOpen, Heart, Soup, Home, Phone, MapPin, Target, ArrowRight, DollarSign } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { generateSchema } from "@/app/lib/schemaGenerator";
import { LowonganKerja } from "@/app/lib/definitions";

export const metadata: Metadata = {
  title: "Lowongan Kerja ART, Babysitter, Perawat Lansia | PT Jasa Mandiri Agency",
  description: "Bergabunglah dengan PT Jasa Mandiri Agency. Lowongan kerja Asisten Rumah Tangga (ART), Babysitter, dan Perawat Lansia Live-In menginap. Gaji bersih, fasilitas lengkap, pendaftaran gratis.",
  keywords: ["lowongan kerja art", "loker babysitter", "lowongan perawat lansia", "kerja prt", "lowongan kerja penyalur resmi", "loker live in jakarta"],
};

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Apakah ada biaya pendaftaran untuk melamar?",
    answer: "Tidak ada biaya pendaftaran sama sekali. Proses perekrutan di PT Jasa Mandiri Agency sepenuhnya gratis.",
  },
  {
    question: "Apakah saya harus punya pengalaman untuk melamar?",
    answer: "Kami menerima pelamar dengan pengalaman maupun non-pengalaman. Kami akan memberikan pelatihan dasar yang diperlukan sebelum penempatan kerja.",
  },
  {
    question: "Apa saja fasilitas yang didapatkan selama bekerja?",
    answer: "Anda akan mendapatkan gaji bulanan, tempat tinggal dan makan yang layak ditanggung oleh pengguna jasa, serta fasilitas lain seperti THR dan BPJS sesuai dengan peraturan yang berlaku.",
  },
];

const DEFAULT_JOBS: LowonganKerja[] = [
  {
    id: 1,
    judul: 'Lowongan Baby Sitter / Pengasuh Balita (Live-In / Menginap)',
    slug: 'lowongan-baby-sitter-live-in-jakarta',
    kategori: 'Baby Sitter',
    tipe_sistem_kerja: 'Live-In (Menginap)',
    tipe_pekerjaan: 'FULL_TIME',
    lokasi: 'Jakarta Selatan',
    provinsi: 'DKI Jakarta',
    gaji_min: 3200000,
    gaji_max: 4500000,
    deskripsi: 'PT Jasa Mandiri Agency membuka kesempatan kerja sebagai Baby Sitter / Nanny sistem menginap (Live-In) untuk penempatan keluarga di wilayah Jabodetabek. Pekerjaan utama mencakup merawat kebutuhan bayi/anak balita, menyiapkan MPASI/makanan anak, menjaga kebersihan perlengkapan anak, serta mendampingi aktivitas bermain dan belajar dengan penuh kasih sayang dan kesabaran.',
    persyaratan: [
      'Wanita, usia 19 - 42 tahun',
      'Memiliki KTP asli dan dokumen identitas resmi yang valid',
      'Penyayang anak, sabar, jujur, telaten, dan bertanggung jawab',
      'Sehat jasmani dan rohani (bebas penyakit menular)',
      'Pengalaman merawat bayi/balita menjadi nilai tambah (tersedia pelatihan untuk pemula/non-pengalaman)',
      'Bersedia bekerja sistem menginap (Live-In) di rumah majikan'
    ],
    fasilitas: [
      'Gaji bersih bulanan tepat waktu',
      'Tempat tinggal / kamar pribadi layak dan makan ditanggung penuh (3x sehari)',
      'Perlengkapan mandi dan kebutuhan dasar disediakan',
      'Jaminan penempatan kerja resmi berpayung hukum',
      'Cuti bulanan atau uang pengganti cuti jika tidak diambil'
    ],
    is_evergreen: true,
    status: 'Buka'
  },
  {
    id: 2,
    judul: 'Lowongan Asisten Rumah Tangga (ART) Menginap / Live-In',
    slug: 'lowongan-asisten-rumah-tangga-live-in-jakarta',
    kategori: 'Asisten Rumah Tangga',
    tipe_sistem_kerja: 'Live-In (Menginap)',
    tipe_pekerjaan: 'FULL_TIME',
    lokasi: 'Jakarta Selatan',
    provinsi: 'DKI Jakarta',
    gaji_min: 2500000,
    gaji_max: 3500000,
    deskripsi: 'Dibutuhkan segera tenaga Asisten Rumah Tangga (ART) profesional siap kerja tinggal dalam (Live-In) untuk penempatan rumah tangga di area Jakarta dan sekitarnya. Tugas dan tanggung jawab meliputi membersihkan rumah, mencuci dan menyetrika pakaian, menyapu dan mengepel lantai, serta membantu persiapan memasak sehari-hari.',
    persyaratan: [
      'Wanita, usia 18 - 45 tahun',
      'Memiliki KTP asli dan identitas keluarga yang jelas',
      'Rajin, bersih, inisiatif tinggi, dan jujur',
      'Kondisi tubuh sehat dan tidak sedang mengidap penyakit kronis/menular',
      'Siap langsung ditempatkan dan bersedia menginap di rumah majikan',
      'Mampu bekerja sama dan mengikuti arahan majikan dengan baik'
    ],
    fasilitas: [
      'Gaji pokok bulanan tanpa potongan liar',
      'Makan, minum, dan fasilitas kamar tidur ditanggung majikan',
      'Perlindungan dan pendampingan kerja dari pihak yayasan',
      'Kenaikan gaji berkala sesuai performa kerja dan loyalitas'
    ],
    is_evergreen: true,
    status: 'Buka'
  },
  {
    id: 3,
    judul: 'Lowongan Perawat Lansia & Pendamping Orang Tua (Live-In / Menginap)',
    slug: 'lowongan-perawat-lansia-live-in-jakarta',
    kategori: 'Perawat Lansia',
    tipe_sistem_kerja: 'Live-In (Menginap)',
    tipe_pekerjaan: 'FULL_TIME',
    lokasi: 'Jakarta Selatan',
    provinsi: 'DKI Jakarta',
    gaji_min: 3500000,
    gaji_max: 5500000,
    deskripsi: 'Peluang kerja mulia sebagai Caregiver / Pendamping Lansia sistem tinggal dalam (Live-In). Mengurus kebutuhan harian opa/oma seperti membantu mobilitas, memandikan, menyuapkan makanan bernutrisi, mendampingi minum obat sesuai jadwal, serta mengajak berkomunikasi dengan ramah dan penuh empati.',
    persyaratan: [
      'Pria / Wanita, usia 21 - 45 tahun',
      'Memiliki empati tinggi, telaten, dan sabar menghadapi lansia',
      'Memiliki pengalaman merawat lansia sehat/sakit, atau lulusan SMK Kesehatan/Kebidanan/Keperawatan lebih diutamakan',
      'Memiliki KTP dan surat keterangan sehat',
      'Bersedia tinggal bersama pasien (Live-In) di rumah majikan'
    ],
    fasilitas: [
      'Gaji menarik sesuai tingkat kondisi pasien (lansia sehat / bedrest)',
      'Makan 3x sehari dan fasilitas kamar menginap ditanggung majikan',
      'Insentif tambahan dan pengganti uang cuti',
      'Kontrak kerja jelas dan terverifikasi'
    ],
    is_evergreen: true,
    status: 'Buka'
  }
];

export default async function LowonganKerjaPage() {
  const supabase = await createClient();
  const { data: dbJobs } = await supabase
    .from('lowongan_kerja')
    .select('*')
    .order('created_at', { ascending: false });

  const jobsList: LowonganKerja[] = (dbJobs && dbJobs.length > 0) ? dbJobs : DEFAULT_JOBS;

  const faqSchema = generateSchema("faq", faqData);
  const breadcrumbsSchema = generateSchema("breadcrumbs", [
    { name: 'Beranda', path: '/' },
    { name: 'Lowongan Kerja', path: '/lowongan-kerja' },
  ]);

  return (
    <main>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {breadcrumbsSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
        />
      )}

      <div className="pt-16 pb-24 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <Breadcrumbs 
            crumbs={[
              { name: 'Beranda', path: '/' },
              { name: 'Lowongan Kerja', path: '/lowongan-kerja' },
            ]}
          />
          
          {/* Header Hero */}
          <div className="text-center mt-12 mb-16">
            <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold mb-4">
              Pendaftaran Gratis & Posisi Selalu Terbuka
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Lowongan Kerja ART, Babysitter & Perawat Lansia
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
              <strong className="font-semibold text-slate-800">PT Jasa Mandiri Agency</strong> membuka kesempatan kerja resmi bagi Anda yang sabar, jujur, dan bertanggung jawab. Dapatkan gaji bersih, tempat tinggal & makan gratis, serta perlindungan kerja resmi.
            </p>
          </div>

          {/* List Lowongan Kerja Terbaru */}
          <div className="mb-20">
            <h2 className="text-3xl font-black text-slate-900 mb-8 border-l-4 border-emerald-500 pl-4">
              Daftar Lowongan Kerja Terbaru
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobsList.map((job) => {
                const isClosed = job.status === 'Tutup';
                return (
                  <div 
                    key={job.id || job.slug}
                    className={`bg-white rounded-3xl p-8 border ${isClosed ? 'border-amber-200 bg-amber-50/20' : 'border-slate-200'} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">
                          {job.kategori}
                        </span>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${isClosed ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                          {isClosed ? 'Terisi (Pendaftaran Umum Buka)' : job.tipe_sistem_kerja || 'Live-In'}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3 leading-snug">
                        <Link href={`/lowongan-kerja/${job.slug}`}>
                          {job.judul}
                        </Link>
                      </h3>

                      <p className="text-slate-600 text-sm line-clamp-3 mb-6 font-light">
                        {job.deskripsi}
                      </p>

                      <div className="space-y-2 mb-6 text-sm text-slate-700 font-medium">
                        <div className="flex items-center text-emerald-600 font-semibold">
                          <DollarSign className="w-4 h-4 mr-2" />
                          <span>Rp {Number(job.gaji_min).toLocaleString('id-ID')} - Rp {Number(job.gaji_max).toLocaleString('id-ID')} / bulan</span>
                        </div>
                        <div className="flex items-center text-slate-500">
                          <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                          <span>{job.lokasi || 'Jakarta Selatan'}, {job.provinsi || 'DKI Jakarta'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <Link 
                        href={`/lowongan-kerja/${job.slug}`}
                        className="text-blue-600 font-bold text-sm inline-flex items-center group-hover:translate-x-1 transition-transform"
                      >
                        Lihat Detail & Syarat <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Kualifikasi & Fasilitas */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-24">
            {/* Kualifikasi */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800">Kualifikasi Pelamar</h2>
                  <p className="text-slate-500 font-medium">Persyaratan Umum Pendaftaran</p>
                </div>
              </div>
              
              <ul className="space-y-4 text-slate-700 font-medium">
                <li className="flex items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <User className="w-6 h-6 mr-4 text-blue-500 shrink-0" />
                  <span>Pria / Wanita, usia 18 - 45 Tahun (KTP / Dokumen Resmi Valid)</span>
                </li>
                <li className="flex items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <Briefcase className="w-6 h-6 mr-4 text-blue-500 shrink-0" />
                  <span>Pengalaman & non-pengalaman diterima (tersedia pelatihan)</span>
                </li>
                <li className="flex items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <BookOpen className="w-6 h-6 mr-4 text-blue-500 shrink-0" />
                  <span>Pendidikan tidak diutamakan</span>
                </li>
                <li className="flex items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <CheckCircle className="w-6 h-6 mr-4 text-blue-500 shrink-0" />
                  <span>Jujur, sehat jasmani & rohani, serta bertanggung jawab</span>
                </li>
                <li className="flex items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <Heart className="w-6 h-6 mr-4 text-blue-500 shrink-0" />
                  <span>Penyayang anak/lansia, sabar, dan telaten</span>
                </li>
                <li className="flex items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <Home className="w-6 h-6 mr-4 text-blue-500 shrink-0" />
                  <span>Bersedia menginap / tinggal di dalam (Live-In)</span>
                </li>
              </ul>
            </div>

            {/* Fasilitas & Cara Melamar */}
            <div className="flex flex-col gap-8">
              {/* Fasilitas */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 p-10 rounded-[2.5rem] shadow-sm border border-emerald-100 hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-black text-slate-800 mb-6">Fasilitas yang Didapat:</h3>
                <ul className="space-y-4 text-slate-700 font-medium">
                  <li className="flex items-start bg-white/60 p-4 rounded-2xl border border-white/50 shadow-sm">
                    <CheckCircle className="w-6 h-6 mr-4 text-emerald-500 shrink-0" />
                    <span>Gaji Pokok <strong>Rp 2.500.000 - Rp 5.500.000 / bulan</strong> (tanpa potongan liar)</span>
                  </li>
                  <li className="flex items-start bg-white/60 p-4 rounded-2xl border border-white/50 shadow-sm">
                    <CheckCircle className="w-6 h-6 mr-4 text-emerald-500 shrink-0" />
                    <span>Tempat tinggal & makan 3x sehari ditanggung penuh pengguna jasa</span>
                  </li>
                  <li className="flex items-start bg-white/60 p-4 rounded-2xl border border-white/50 shadow-sm">
                    <CheckCircle className="w-6 h-6 mr-4 text-emerald-500 shrink-0" />
                    <span>Perlindungan hukum dan pendampingan kerja dari PT Jasa Mandiri Agency</span>
                  </li>
                </ul>
              </div>

              {/* Cara Melamar */}
              <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-8 text-emerald-400">Cara Melamar Langsung:</h3>
                  <div className="space-y-6">
                    <div className="flex items-start bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                      <Phone className="w-8 h-8 mr-5 text-emerald-400 shrink-0" />
                      <div>
                        <p className="font-bold text-lg mb-2">Hubungi WhatsApp Resmi PT Jasa Mandiri Agency:</p>
                        <div className="flex flex-col gap-2">
                          <a 
                            href="https://wa.me/628818009992?text=Halo%20Admin%20PT%20Jasa%20Mandiri,%20saya%20ingin%20melamar%20lowongan%20kerja." 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-white hover:text-emerald-400 text-lg font-bold transition-colors underline"
                          >
                            0881-800-9992 (Admin Utama - Klik untuk Chat WA)
                          </a>
                          <a href="https://wa.me/628119119996" className="text-slate-300 hover:text-emerald-400 text-base font-medium transition-colors">0811-911-9996</a>
                          <a href="https://wa.me/6282122415552" className="text-slate-300 hover:text-emerald-400 text-base font-medium transition-colors">0821-2241-5552</a>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                      <MapPin className="w-8 h-8 mr-5 text-emerald-400 shrink-0" />
                      <div>
                        <p className="font-bold text-lg mb-2">Alamat Kantor Resmi:</p>
                        <p className="text-slate-300 font-light leading-relaxed">Jl Gunung Balong III No 78, Lebak Bulus, Cilandak, Jakarta Selatan</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
             <FaqAccordion faqData={faqData} />
          </div>

        </div>
      </div>
    </main>
  );
}
