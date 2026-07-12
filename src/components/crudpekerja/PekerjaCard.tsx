// src/components/PekerjaCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Briefcase, MapPin, Wallet } from "lucide-react";
import slugify from "slugify";
import { useRouter } from "next/navigation";

export type PekerjaProps = {
  id: number;
  nama: string;
  slug: string;
  kategori:
    | "Baby Sitter"
    | "Perawat Lansia"
    | "Asisten Rumah Tangga"
    | "Supir"
    | "Tukang Kebun";
  status: "Tersedia" | "Akan Tersedia";
  fotoUrl: string;
  pengalaman: number;
  lokasi: string;
  deskripsi: string;
  gaji?: number;
  keterampilan?: string;
  umur?: number;
  suku?: string;
  kekurangan?: string;
  bisa_bawa_motor?: boolean;
  takut_anjing?: boolean;
  status_perkawinan?: string;
  keahlian_khusus: string;
  agama?: string;
  bahasa_asing?: string[];
  bisa_masak_babi?: boolean;
  masakan_khusus?: string;
  pendidikan_terakhir?: string;
  tinggi_badan?: number;
  berat_badan?: number;
};

const formatRupiah = (angka: number | null | undefined) => {
  if (angka === null || typeof angka === "undefined" || angka === 0) return "N/A";
  return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default function PekerjaCard({ pekerja }: { pekerja: PekerjaProps }) {
  const router = useRouter();

  // 🔥 GUARD CLAUSE (PERBAIKAN UTAMA)
  // Jika slug atau kategori hilang/null, jangan render card ini sama sekali.
  // Ini mencegah link menjadi /pekerja/undefined/undefined
  if (!pekerja.slug || !pekerja.kategori) {
    console.warn(`Data pekerja korup (ID: ${pekerja.id}): Missing slug or kategori`);
    return null;
  }

  // Generate slug kategori dengan aman
  const kategoriSlug = slugify(pekerja.kategori, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  });

  const getStatusClass = () => {
    switch (pekerja.status) {
      case "Tersedia":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Akan Tersedia":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Jangan navigasi kalau klik tombol atau link
    const target = e.target as HTMLElement;
    if (target.closest("a, button")) return;
    
    // Pastikan navigasi menggunakan slug yang sudah valid
    router.push(`/pekerja/${kategoriSlug}/${pekerja.slug}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer group"
    >
      <div className="relative w-full aspect-square bg-slate-100 overflow-hidden">
        <Image
          src={pekerja.fotoUrl}
          alt={`Foto ${pekerja.nama}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          style={{ objectFit: "cover" }}
          className={`transition-transform duration-700 group-hover:scale-105 ${pekerja.status === "Akan Tersedia" ? "grayscale opacity-80" : ""}`}
        />

        {/* Logika Kondisional untuk Watermark */}
        {pekerja.status === "Akan Tersedia" && (
          <div
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-2 text-center pointer-events-none"
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.4)",
            }}
          >
            <span
              className="font-black text-white text-xl uppercase tracking-widest drop-shadow-lg"
              style={{
                display: "block",
                lineHeight: "tight",
              }}
            >
              Akan Tersedia
            </span>
          </div>
        )}

        {/* Badge Status di kanan atas */}
        <span
          className={`absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full border shadow-sm ${getStatusClass()}`}
        >
          {pekerja.status}
        </span>

        {/* Badge Suku di kiri atas */}
        {pekerja.suku && (
          <p className="absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full bg-white/90 text-slate-800 shadow-sm backdrop-blur-sm border border-white/50">
            Suku {pekerja.suku}
          </p>
        )}
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-black text-slate-800 mb-1">{pekerja.nama}</h3>
          <p className="text-emerald-600 font-bold text-sm tracking-wide uppercase">{pekerja.kategori}</p>
        </div>

        <div className="space-y-3 text-slate-600 text-sm flex-grow font-medium">
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-2 rounded-lg">
               <Briefcase className="w-4 h-4 text-slate-500" />
            </div>
            <span><strong>Pengalaman:</strong> {pekerja.pengalaman} tahun</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-2 rounded-lg">
               <MapPin className="w-4 h-4 text-slate-500" />
            </div>
            <span><strong>Kota Asal:</strong> {pekerja.lokasi}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-2 rounded-lg">
               <Wallet className="w-4 h-4 text-slate-500" />
            </div>
            <span><strong>Gaji:</strong> Rp {formatRupiah(pekerja.gaji)}</span>
          </div>
        </div>

        {/* Tombol Lihat Detail */}
        <div className="mt-8">
          <Link
            href={`/pekerja/${kategoriSlug}/${pekerja.slug}`}
            className="block w-full text-center rounded-xl bg-emerald-600 text-white font-bold py-3.5 px-4 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 transition-all duration-300"
          >
            Lihat Detail
          </Link>
        </div>
      </div>
    </div>
  );
}