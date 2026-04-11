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
        return "bg-green-100 text-green-800";
      case "Akan Tersedia":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
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
      className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
    >
      <div className="relative w-full aspect-square bg-slate-100">
        <Image
          src={pekerja.fotoUrl}
          alt={`Foto ${pekerja.nama}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          style={{ objectFit: "cover" }}
          className={pekerja.status === "Akan Tersedia" ? "grayscale opacity-80" : ""}
        />

        {/* Logika Kondisional untuk Watermark */}
        {pekerja.status === "Akan Tersedia" && (
          <div
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-2 text-center pointer-events-none"
            style={{
              backgroundColor: "rgba(128, 128, 128, 0.5)",
            }}
          >
            <span
              className="font-bold text-white text-xl uppercase tracking-wider drop-shadow-md"
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
          className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-800 ${getStatusClass()}`}
        >
          {pekerja.status}
        </span>

        {/* Badge Suku di kiri atas */}
        {pekerja.suku && (
          <p className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-300 text-slate-800">
            Suku {pekerja.suku}
          </p>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900">{pekerja.nama}</h3>
          <p className="text-blue-600 font-semibold">{pekerja.kategori}</p>
        </div>

        <div className="mt-4 space-y-2 text-gray-600 text-sm flex-grow">
          <p>
            <Briefcase className="inline-block w-4 h-4 mr-2" />
            <strong>Pengalaman:</strong> {pekerja.pengalaman} tahun
          </p>
          <p>
            <MapPin className="inline-block w-4 h-4 mr-2" />
            <strong>Kota Asal:</strong> {pekerja.lokasi}
          </p>
          <p>
            <Wallet className="inline-block w-4 h-4 mr-2" />
            <strong>Gaji:</strong> Rp {formatRupiah(pekerja.gaji)}
          </p>
        </div>

        {/* Tombol Lihat Detail tetap ada */}
        <div className="mt-4">
          <Link
            href={`/pekerja/${kategoriSlug}/${pekerja.slug}`}
            className="block w-full text-center rounded-lg bg-blue-600 text-white font-semibold py-3 px-4 hover:bg-blue-700 transition"
          >
            Lihat Detail
          </Link>
        </div>
      </div>
    </div>
  );
}