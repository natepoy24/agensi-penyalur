// src/components/PekerjaCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Briefcase, MapPin } from 'lucide-react';

// Pastikan tipe ini diekspor agar bisa digunakan di file lain
export type PekerjaProps = {
  id: number;
  nama: string;
  kategori: string;
  status: 'Tersedia' | 'Dipesan';
  fotoUrl: string;
  pengalaman: number;
  lokasi: string;
};

export default function PekerjaCard({ pekerja }: { pekerja: PekerjaProps }) {
  const isTersedia = pekerja.status === 'Tersedia';

  return (
    <div className="group overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-64 w-full">
        <Image
          src={pekerja.fotoUrl}
          alt={`Foto ${pekerja.nama}`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <span
          className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold
            ${isTersedia ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'}`}
        >
          {pekerja.status}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-slate-800 truncate">{pekerja.nama}</h3>
        <p className="text-sm font-semibold text-emerald-700 mt-1">{pekerja.kategori}</p>

        <div className="mt-4 flex flex-col gap-2 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Briefcase size={16} />
            <span>{pekerja.pengalaman} tahun pengalaman</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{pekerja.lokasi}</span>
          </div>
        </div>

        <Link href={`/pekerja/${pekerja.id}`} className="mt-5 block w-full text-center rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 group-hover:bg-emerald-600">
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}