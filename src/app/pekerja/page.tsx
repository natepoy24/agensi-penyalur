// src/app/pekerja/page.tsx
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

// Memastikan data selalu segar namun tetap ringan karena dibatasi 10 per halaman
export const revalidate = 60; 

// Di Next.js terbaru, searchParams bisa ditangkap dari props
export default async function DaftarPekerjaPublik({ 
  searchParams 
}: { 
  searchParams: { page?: string } 
}) {
  const supabase = await createClient();

  // 1. PENGATURAN PAGINATION
  const ITEM_PER_PAGE = 10; // Batas maksimal pekerja per halaman
  
  // Ambil angka halaman dari URL (default ke 1 jika tidak ada)
  // Catatan: Di Next.js 15+, searchParams berbentuk Promise, jadi kita await
  const resolvedParams = await searchParams; 
  const currentPage = Number(resolvedParams?.page) || 1; 

  // Hitung index mulai (from) dan akhir (to) untuk Supabase
  const from = (currentPage - 1) * ITEM_PER_PAGE;
  const to = from + ITEM_PER_PAGE - 1;

  // 2. AMBIL DATA DENGAN LIMIT & RANGE
  // Kita juga mengambil 'count' untuk mengetahui total keseluruhan data
  const { data: workers, count } = await supabase
    .from("pekerja")
    .select("id, nama, slug, kategori, fotoUrl, lokasi, umur, pengalaman", { count: "exact" })
    .eq("status", "Tersedia") // Hanya tampilkan yang tersedia
    .order("created_at", { ascending: false })
    .range(from, to); // <-- Ini kunci utamanya! Mengambil data baris ke-X sampai ke-Y

  // 3. HITUNG TOTAL HALAMAN
  const totalPages = count ? Math.ceil(count / ITEM_PER_PAGE) : 1;

  return (
    <main className="max-w-7xl mx-auto py-24 px-6 font-['Inter'] min-h-screen">
      
      {/* HEADER SECTION */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 font-['Plus_Jakarta_Sans'] tracking-tight mb-4">
          Kandidat <span className="text-emerald-600">Terbaik</span> Kami
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          Pilih pekerja profesional yang siap membantu kebutuhan keluarga Anda hari ini.
        </p>
      </div>

      {/* GRID DAFTAR PEKERJA */}
      {workers && workers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {workers.map((worker) => (
            <Link 
              href={`/pekerja/${worker.kategori.toLowerCase().replace(/ /g, '-')}/${worker.slug}`} 
              key={worker.id} 
              className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-full aspect-[4/3] bg-slate-100 overflow-hidden relative">
                <img 
                  src={worker.fotoUrl || "/Image/placeholder.png"} 
                  alt={worker.nama} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur px-3 py-1.5 rounded-full shadow-sm text-white text-xs font-bold">
                  {worker.kategori}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-slate-800 font-['Plus_Jakarta_Sans'] leading-tight mb-2 group-hover:text-emerald-600 transition-colors">
                  {worker.nama}
                </h3>
                
                <div className="space-y-2 mt-2 border-t border-slate-50 pt-4">
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                    <span>{worker.lokasi}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <span className="material-symbols-outlined text-[18px]">work</span>
                    <span>Pengalaman {worker.pengalaman} Tahun</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <span className="material-symbols-outlined text-[18px]">cake</span>
                    <span>{worker.umur} Tahun</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
          <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">group_off</span>
          <h3 className="text-xl font-bold text-slate-700 mb-2">Belum ada pekerja di halaman ini</h3>
          <p className="text-slate-500">Silakan kembali ke halaman sebelumnya.</p>
        </div>
      )}

      {/* KONTROL PAGINATION (Hanya Tampil Jika Total Halaman > 1) */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-sm text-slate-500 font-medium">
            Menampilkan halaman <span className="font-bold text-slate-800">{currentPage}</span> dari <span className="font-bold text-slate-800">{totalPages}</span>
          </p>
          
          <div className="flex gap-2">
            {/* Tombol Sebelumnya */}
            {currentPage > 1 ? (
              <Link 
                href={`/pekerja?page=${currentPage - 1}`}
                className="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all font-bold shadow-sm"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </Link>
            ) : (
              <button disabled className="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-slate-100 text-slate-300 bg-slate-50 cursor-not-allowed">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
            )}

            {/* Tombol Selanjutnya */}
            {currentPage < totalPages ? (
              <Link 
                href={`/pekerja?page=${currentPage + 1}`}
                className="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all font-bold shadow-sm"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </Link>
            ) : (
              <button disabled className="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-slate-100 text-slate-300 bg-slate-50 cursor-not-allowed">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            )}
          </div>
        </div>
      )}

    </main>
  );
}
