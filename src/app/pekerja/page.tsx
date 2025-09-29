// src/app/pekerja/page.tsx
import PekerjaCard, { type PekerjaProps } from '@/components/PekerjaCard';
import { Search } from 'lucide-react';
import { createClient } from '@/utils/supabase/server'; // 1. Path import diubah

export const dynamic = 'force-dynamic';

export default async function PekerjaPage() {
  const supabase = await createClient();
  let daftarPekerja: PekerjaProps[] = [];

  const { data, error } = await supabase
    .from('pekerja')
    .select('*');

  if (error) {
    console.error('Error mengambil data pekerja:', error);
    return (
      <main>
        <div className="bg-white pt-32 pb-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-2xl font-bold text-red-600">Terjadi kesalahan saat memuat data.</h1>
            <p className="mt-2 text-red-500">{error.message}</p>
          </div>
        </div>
      </main>
    );
  }

  if (data) {
    daftarPekerja = data as PekerjaProps[];
  }
  
  return (
    <main>
      <div className="bg-white pt-32 pb-20 px-4">
        <div className="container mx-auto">
          {/* Judul & Filter */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-800">Tenaga Kerja Profesional Kami</h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Temukan partner terpercaya untuk membantu kebutuhan keluarga Anda.
            </p>
          </div>

          {/* Bagian Filter */}
          <div className="mb-10 flex flex-col md:flex-row gap-4 rounded-lg bg-slate-50 p-4 border">
            <div className="relative flex-grow">
              <input type="text" placeholder="Cari berdasarkan nama..." className="w-full rounded-md border border-slate-300 py-2 pl-10 pr-4 focus:border-emerald-500 focus:ring-emerald-500 text-slate-900" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            </div>
            <select className="rounded-md border border-slate-300 py-2 px-4 focus:border-emerald-500 focus:ring-emerald-500 text-slate-900">
              <option>Semua Kategori</option>
              <option>Baby Sitter</option>
              <option>Perawat Lansia</option>
              <option>Asisten Rumah Tangga</option>
            </select>
            <select className="rounded-md border border-slate-300 py-2 px-4 focus:border-emerald-500 focus:ring-emerald-500 text-slate-900">
              <option>Semua Status</option>
              <option>Tersedia</option>
              <option>Dipesan</option>
            </select>
          </div>
          
          {/* Grid Kartu Pekerja */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {daftarPekerja && daftarPekerja.length > 0 ? (
              daftarPekerja.map((pekerja) => (
                <PekerjaCard key={pekerja.id} pekerja={pekerja} />
              ))
            ) : (
              <p className="col-span-full text-center text-slate-500">Belum ada pekerja yang terdaftar.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}