// src/app/pekerja/page.tsx
import PekerjaCard, { type PekerjaProps } from '@/components/PekerjaCard';
import { createClient } from '@/utils/supabase/server';
import FilterControls from '@/components/FilterControls';

export const dynamic = 'force-dynamic';

export default async function PekerjaPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  // --- PERBAIKAN DI BARIS INI ---
  const supabase = await createClient();
  let daftarPekerja: PekerjaProps[] = [];

  // Bangun query ke Supabase secara dinamis
  let query = supabase.from('pekerja').select('*');

  // Tambahkan filter 'kategori' jika ada di URL
  if (searchParams.kategori) {
    query = query.eq('kategori', searchParams.kategori);
  }

  // Tambahkan filter 'status' jika ada di URL
  if (searchParams.status) {
    query = query.eq('status', searchParams.status);
  }

  // Tambahkan filter pencarian nama jika ada di URL
  if (searchParams.search) {
    query = query.ilike('nama', `%${searchParams.search}%`);
  }

  // Eksekusi query
  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching pekerja:', error);
  } else if (data) {
    daftarPekerja = data as PekerjaProps[];
  }
  
  return (
    <main>
      <div className="bg-white pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-800">Tenaga Kerja Profesional Kami</h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Temukan partner terpercaya untuk membantu kebutuhan keluarga Anda.
            </p>
          </div>

          <FilterControls />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {daftarPekerja.length > 0 ? (
              daftarPekerja.map((pekerja) => (
                <PekerjaCard key={pekerja.id} pekerja={pekerja} />
              ))
            ) : (
              <p className="col-span-full text-center text-slate-500">
                Tidak ada pekerja yang cocok dengan kriteria Anda.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}