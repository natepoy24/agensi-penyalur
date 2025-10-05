// src/app/tentang/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

// Metadata SEO
export const metadata: Metadata = {
  title: 'Tentang PT Jasa Mandiri | Yayasan Penyalur ART Resmi di Jakarta',
  description:
    'Pelajari visi, misi, dan proses kerja PT Jasa Mandiri — yayasan penyalur ART, baby sitter, dan perawat lansia resmi dengan legalitas dan etika kerja tinggi.',
  keywords: [
    'tentang jasa mandiri',
    'yayasan penyalur art resmi',
    'profil perusahaan penyalur baby sitter',
    'penyalur perawat lansia jakarta',
    'Jasa Mandiri',
    'PT Jasa Mandiri'
  ],
  openGraph: {
    title: 'Tentang PT Jasa Mandiri',
    description:
      'Kenali PT Jasa Mandiri, agensi penyalur ART dan baby sitter profesional dengan proses seleksi dan pelatihan resmi di bawah APPSI.',
    url: 'https://penyalurkerja.com/tentang',
    type: 'website',
  },
};

const workflowSteps = [
  { step: "1", title: "Perekrutan & Validasi", description: "Proses dimulai dari Job Order, perekrutan, hingga validasi data calon pekerja secara ketat." },
  { step: "2", title: "Penampungan & Pelatihan", description: "Pekerja ditampung di mess dan mendapatkan pelatihan sesuai kebutuhan spesifik pekerjaan." },
  { step: "3", title: "Uji Kompentensi", description: "Untuk kategori pekerja highrisk seperti baby sitter dan perawat lansia, kami melakukan uji kompetensi sebelum penyaluran." },
  { step: "4", title: "Orientasi & Kontrak", description: "Orientasi pra-penempatan dan penandatanganan kontrak kerja yang jelas dan transparan." },
  { step: "5", title: "Penempatan", description: "Pekerja diantar dan ditempatkan di lokasi pengguna jasa sesuai dengan kesepakatan." },
  { step: "6", title: "Monitoring & Pelaporan", description: "Kami melakukan monitoring pasca-penempatan dan melaporkan status ke instansi terkait." },
];

export default function TentangPage() {
  return (
    <main className="pt-20 pb-20 px-4">
      <div className="container mx-auto">
          <Breadcrumbs currentPage='Tentang kami' currentPath='tentang'/>
        {/* Judul Halaman */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Tentang PT Jasa Mandiri</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Mengenal lebih dekat visi, misi, dan komitmen kami dalam memberdayakan pekerja domestik profesional di Indonesia.
          </p>
        </div>

        {/* Kisah Kami */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold text-gray-800">Kisah Kami: Visi untuk Memberdayakan</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                PT Jasa Mandiri lahir dari kepedulian terhadap dua hal penting: kebutuhan keluarga akan{' '}
                <Link href="/layanan" className="text-blue-600 hover:underline font-semibold">
                  bantuan domestik yang tepercaya
                </Link>{' '}
                dan potensi besar masyarakat untuk berkembang jika diberi kesempatan.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Kami bukan sekadar agensi — kami mitra dalam peningkatan kesejahteraan sosial. Misi kami menciptakan peluang kerja yang layak dan berkelanjutan bagi masyarakat, dengan dukungan pelatihan dan pembinaan menyeluruh.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Ingin tahu lebih lanjut tentang cara kami membantu keluarga menemukan pekerja ideal?{' '}
                <Link href="/pekerja" className="text-blue-600 hover:underline font-semibold">
                  Lihat daftar pekerja kami
                </Link>.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <Image
                src="/Image/kisah-kami.jpg"
                alt="Tim PT Jasa Mandiri sedang melakukan pelatihan pekerja rumah tangga"
                width={600}
                height={450}
                className="rounded-xl shadow-2xl w-full"
              />
            </div>
          </div>
        </section>

        {/* Profil Perusahaan */}
        <section className="bg-white p-8 md:p-12 rounded-xl shadow-lg max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Profil Perusahaan</h2>
          <p className="text-gray-600 leading-relaxed text-center">
            PT Jasa Mandiri adalah{' '}
            <Link href="/layanan" className="text-blue-600 hover:underline font-semibold">
              lembaga penyalur pekerja rumah tangga resmi
            </Link>{' '}
            yang berdedikasi untuk membantu keluarga Indonesia mendapatkan tenaga kerja profesional dan terpercaya.
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed text-center">
            Kami berkomitmen menjadi mitra terpercaya keluarga Indonesia dengan menyediakan{' '}
            <Link href="/layanan" className="text-blue-600 hover:underline font-semibold">
              solusi tenaga kerja domestik berkualitas
            </Link>
            , melalui seleksi ketat, pelatihan profesional, dan pemantauan berkelanjutan.
          </p>
        </section>

        {/* Kode Etik */}
        <section className="max-w-4xl mx-auto bg-blue-50 p-8 md:p-12 rounded-xl mb-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center">Kode Etik & Kemitraan APPSI</h2>
          <p className="mt-6 text-gray-600 leading-relaxed text-center">
            Kami beroperasi di bawah Asosiasi Pelatihan Penempatan Pekerja Rumah Tangga Seluruh Indonesia (APPSI), dan mematuhi kode etik resmi yang ditandatangani oleh Kementerian Ketenagakerjaan pada 18 Maret 2015.
          </p>
          <ol className="mt-6 list-decimal list-inside space-y-3 text-gray-700 md:w-4/5 mx-auto">
            <li>Tidak merekrut pekerja di bawah usia 18 tahun.</li>
            <li>Memberikan fasilitas penampungan dan pelatihan yang layak.</li>
            <li>Menjamin adanya perjanjian kerja yang adil dan transparan.</li>
            <li>Melakukan monitoring berkala pasca penempatan.</li>
          </ol>
        </section>

        {/* Alur Kerja */}
        <section className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Alur Kerja Profesional Kami</h2>
            <p className="mt-4 text-lg text-gray-600">
              Proses terstruktur kami menjamin keamanan dan kepuasan pengguna jasa.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowSteps.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center mt-20">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Ingin tahu lebih lanjut tentang layanan kami?
          </h2>
          <Link
            href="/kontak"
            className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            Hubungi Kami Sekarang
          </Link>
        </section>
      </div>
    </main>
  );
}
