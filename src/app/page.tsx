// src/app/page.tsx
import Image from 'next/image';
import { ShieldCheck, GraduationCap, HandHeart } from 'lucide-react';

export default function Home() {
  return (
    <main>
      {/* ===== Hero Section ===== */}
      <section className="relative flex items-center justify-center h-screen">

    {/* Gambar Latar untuk Desktop */}
        <div 
          className="absolute inset-0 hidden md:block bg-cover bg-center"
          style={{ backgroundImage: "url('/Image/hero-image.png')" }}
        />

        {/* Gambar Latar untuk Mobile */}
        <div 
          className="absolute inset-0 block md:hidden bg-cover bg-center"
          style={{ backgroundImage: "url('/Image/hero-image-mobile.png')" }}
        />

        <div className="absolute inset-0 bg-black/50" /> {/* Overlay gelap untuk kontras teks */}
        <div className="relative z-10 text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-serif font-bold">
            Ketenangan Anda, Prioritas Kami.
          </h1>
          <p className="mt-4 text-lg max-w-2xl">
            Solusi Terpercaya untuk Kebutuhan Rumah dan Keluarga Anda.
          </p>
          <button className="mt-8 px-8 py-3 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-700 transition-colors">
            Temukan Asisten Anda
          </button>
        </div>
      </section>

      {/* ===== Keunggulan Section ===== */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          
          {/* Kartu Keunggulan 1 */}
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-12 h-12 text-emerald-600" />
            <h3 className="mt-4 text-xl font-bold text-slate-800">Terverifikasi</h3>
            <p className="mt-2 text-slate-600">
              Setiap tenaga kerja telah melewati proses verifikasi latar belakang yang ketat.
            </p>
          </div>

          {/* Kartu Keunggulan 2 */}
          <div className="flex flex-col items-center">
            <GraduationCap className="w-12 h-12 text-emerald-600" />
            <h3 className="mt-4 text-xl font-bold text-slate-800">Profesional</h3>
            <p className="mt-2 text-slate-600">
              Memiliki pengalaman dan dedikasi tinggi dalam bidangnya masing-masing.
            </p>
          </div>
          
          {/* Kartu Keunggulan 3 */}
          <div className="flex flex-col items-center">
            <HandHeart className="w-12 h-12 text-emerald-600" />
            <h3 className="mt-4 text-xl font-bold text-slate-800">Terlatih</h3>
            <p className="mt-2 text-slate-600">
              Dibekali dengan pelatihan standar untuk menjamin kualitas layanan terbaik.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}