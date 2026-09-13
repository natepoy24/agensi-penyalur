// src/app/lowongan-kerja/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { CheckCircle, MapPin, DollarSign, Briefcase, Phone, AlertCircle, ArrowLeft, ShieldCheck, HeartHandshake } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { generateSchema } from "@/app/lib/schemaGenerator";
import { LowonganKerja } from "@/app/lib/definitions";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const DEFAULT_JOBS: Record<string, LowonganKerja> = {
  'lowongan-baby-sitter-live-in-jakarta': {
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
  'lowongan-asisten-rumah-tangga-live-in-jakarta': {
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
  'lowongan-perawat-lansia-live-in-jakarta': {
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
};

async function getJobData(slug: string): Promise<LowonganKerja | null> {
  const supabase = await createClient();
  const { data: job } = await supabase
    .from('lowongan_kerja')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (job) {
    return job as LowonganKerja;
  }

  if (DEFAULT_JOBS[slug]) {
    return DEFAULT_JOBS[slug];
  }

  // Jika tidak ditemukan di database maupun daftar default, return null agar memicu 404 Not Found
  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobData(slug);
  if (!job) {
    notFound();
  }
  return {
    title: `${job.judul} | PT Jasa Mandiri Agency`,
    description: job.deskripsi.substring(0, 160),
    keywords: [job.kategori.toLowerCase(), "lowongan kerja live in", "penyalur resmi art", "loker babysitter", "loker perawat lansia"],
  };
}

export default async function LowonganDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const job = await getJobData(slug);

  // Jika slug tidak ditemukan di database / fallback, panggil notFound() (HTTP 404 murni untuk mencegah Soft 404)
  if (!job) {
    notFound();
  }

  const isClosed = job.status === 'Tutup';

  // HANYA menyajikan JobPosting JSON-LD jika status Buka (Mencegah penalti Google Jobs Spam)
  const jobSchema = !isClosed ? generateSchema("jobPosting", {
    title: job.judul,
    description: job.deskripsi,
    minValue: job.gaji_min,
    maxValue: job.gaji_max,
    employmentType: job.tipe_pekerjaan || "FULL_TIME",
    datePosted: job.date_posted || job.created_at || new Date().toISOString(),
    validThrough: job.valid_through,
    status: job.status,
    isEvergreen: job.is_evergreen,
  }) : null;

  const breadcrumbsSchema = generateSchema("breadcrumbs", [
    { name: 'Beranda', path: '/' },
    { name: 'Lowongan Kerja', path: '/lowongan-kerja' },
    { name: job.judul, path: `/lowongan-kerja/${job.slug}` },
  ]);

  const waText = encodeURIComponent(
    `Halo Admin PT Jasa Mandiri Agency, saya ingin melamar posisi: ${job.judul} (Slug: ${job.slug})`
  );
  const waUrl = `https://wa.me/628818009992?text=${waText}`;

  return (
    <main className="pt-16 pb-24 px-4 md:px-8">
      {jobSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema, null, 2) }}
        />
      )}
      {breadcrumbsSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
        />
      )}

      <div className="container mx-auto max-w-5xl">
        <Breadcrumbs 
          crumbs={[
            { name: 'Beranda', path: '/' },
            { name: 'Lowongan Kerja', path: '/lowongan-kerja' },
            { name: job.kategori, path: `/lowongan-kerja/${job.slug}` },
          ]}
        />

        <div className="mt-8 mb-6">
          <Link 
            href="/lowongan-kerja" 
            className="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Semua Lowongan
          </Link>
        </div>

        {/* Banner Visual untuk Lowongan Terisi / Tutup (Standard HTTP 200 OK Compliance) */}
        {isClosed && (
          <div className="mb-8 p-6 bg-amber-50 border-2 border-amber-300 rounded-3xl flex items-start gap-4 shadow-sm">
            <AlertCircle className="w-8 h-8 text-amber-600 shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-bold text-amber-900 mb-1">
                Posisi ini telah terisi, namun pendaftaran umum tetap dibuka melalui WhatsApp
              </h2>
              <p className="text-amber-800 text-sm leading-relaxed">
                Posisi khusus ini sedang terisi oleh pelamar lain. Namun PT Jasa Mandiri Agency selalu menerima pendaftaran tenaga kerja baru untuk disalurkan ke pengguna jasa berikutnya. Silakan hubungi WhatsApp resmi kami di bawah ini untuk mendaftar.
              </p>
            </div>
          </div>
        )}

        {/* Header Lowongan */}
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-4 py-1.5 bg-blue-100 text-blue-800 rounded-full text-xs font-bold uppercase tracking-wider">
              {job.kategori}
            </span>
            <span className={`px-4 py-1.5 text-xs font-bold rounded-full uppercase tracking-wider ${isClosed ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'}`}>
              {isClosed ? 'Terisi (Pendaftaran Tetap Buka)' : job.tipe_sistem_kerja || 'Live-In (Menginap)'}
            </span>
            <span className="px-4 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold">
              Pendaftaran Gratis 100%
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            {job.judul}
          </h1>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Gaji Pokok / Bulan</p>
                <p className="text-base font-bold text-slate-900">
                  Rp {Number(job.gaji_min).toLocaleString('id-ID')} - Rp {Number(job.gaji_max).toLocaleString('id-ID')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Lokasi Penempatan</p>
                <p className="text-base font-bold text-slate-900">{job.lokasi}, {job.provinsi}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Sistem Kerja</p>
                <p className="text-base font-bold text-slate-900">{job.tipe_sistem_kerja || 'Live-In (Menginap)'}</p>
              </div>
            </div>
          </div>

          {/* CTA Primary Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Phone className="w-6 h-6" />
              Lamar Posisi Ini via WhatsApp (0881-800-9992)
            </a>
          </div>
        </div>

        {/* Detail Deskripsi, Persyaratan, Fasilitas */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-2 space-y-10">
            {/* Deskripsi */}
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 mb-6 pb-4 border-b border-slate-100">
                Deskripsi Pekerjaan
              </h2>
              <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-line font-light">
                {job.deskripsi}
              </p>
            </div>

            {/* Persyaratan */}
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 mb-6 pb-4 border-b border-slate-100">
                Persyaratan Pelamar
              </h2>
              <ul className="space-y-4 text-slate-700 font-medium">
                {job.persyaratan.map((req, idx) => (
                  <li key={idx} className="flex items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <CheckCircle className="w-5 h-5 mr-3 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fasilitas */}
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 mb-6 pb-4 border-b border-slate-100">
                Fasilitas yang Didapat
              </h2>
              <ul className="space-y-4 text-slate-700 font-medium">
                {job.fasilitas.map((fas, idx) => (
                  <li key={idx} className="flex items-start bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                    <ShieldCheck className="w-5 h-5 mr-3 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{fas}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar CTA & Guarantee */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl sticky top-24">
              <div className="flex items-center gap-3 mb-6 text-emerald-400">
                <HeartHandshake className="w-8 h-8" />
                <h3 className="text-xl font-bold">PT Jasa Mandiri Agency</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                Penyalur resmi terpercaya untuk Asisten Rumah Tangga, Babysitter, dan Perawat Lansia. Tanpa potongan gaji dan amanah.
              </p>

              <div className="border-t border-slate-800 pt-6 mb-6">
                <p className="text-xs text-slate-400 font-semibold mb-2">WhatsApp Resmi Admin:</p>
                <a 
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-bold text-emerald-400 hover:underline flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" /> 0881-800-9992
                </a>
              </div>

              <a 
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold rounded-2xl text-center block transition-all shadow-md"
              >
                Chat WhatsApp Sekarang
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
