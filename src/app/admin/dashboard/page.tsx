// src/app/admin/dashboard/page.tsx
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import DeleteButton from './DeleteButton';

export const revalidate = 0; // Agar data dashboard selalu up-to-date

export default async function DashboardOverview() {
  const supabase = await createClient();

  // 1. Hitung Metrik Dashboard
  const { count: totalPekerja } = await supabase.from('pekerja').select('*', { count: 'exact', head: true });
  const { count: totalArtikel } = await supabase.from('artikel').select('*', { count: 'exact', head: true });
  const { count: totalTersedia } = await supabase.from('pekerja').select('*', { count: 'exact', head: true }).eq('status', 'Tersedia');

  // 2. Ambil List Pekerja (Hanya yang Tersedia, Limit 5 Terbaru)
  const { data: workers } = await supabase
    .from('pekerja')
    .select('id, nama, fotoUrl, kategori, lokasi, pengalaman')
    .eq('status', 'Tersedia')
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold text-slate-800 font-['Inter'] tracking-tight">Dashboard Overview</h2>
        <p className="text-slate-500 mt-1">Monitor performa agensi dan ketersediaan pekerja Anda.</p>
      </div>

      {/* SECTION: METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-emerald-200 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
              <span className="material-symbols-outlined text-2xl">groups</span>
            </div>
          </div>
          <p className="text-slate-500 text-sm font-medium">Total Pekerja (Semua)</p>
          <h3 className="text-3xl font-black text-slate-800 font-['Inter'] mt-1">{totalPekerja || 0}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-emerald-200 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
              <span className="material-symbols-outlined text-2xl">article</span>
            </div>
          </div>
          <p className="text-slate-500 text-sm font-medium">Total Artikel Website</p>
          <h3 className="text-3xl font-black text-slate-800 font-['Inter'] mt-1">{totalArtikel || 0}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-emerald-200 transition-all relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full -mr-8 -mt-8"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600">
              <span className="material-symbols-outlined text-2xl">person_check</span>
            </div>
            <div className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
          </div>
          <p className="text-slate-500 text-sm font-medium relative z-10">Pekerja Siap (Tersedia)</p>
          <h3 className="text-3xl font-black text-slate-800 font-['Inter'] mt-1 relative z-10">{totalTersedia || 0}</h3>
        </div>
      </div>


      {/* SECTION: FOOTER ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-emerald-700 to-emerald-500 p-8 rounded-3xl text-white relative overflow-hidden shadow-lg shadow-emerald-600/20">
          <div className="relative z-10">
            <h4 className="text-xl font-bold font-['Inter'] mb-2">Butuh Pekerja Baru?</h4>
            <p className="text-emerald-50 opacity-90 max-w-xs mb-6 text-sm">Pastikan profil pekerja selalu di-update untuk Katalog WhatsApp Business dan Website Anda.</p>
            <Link href="/admin/dashboard/tambah" className="inline-flex bg-white text-emerald-700 px-6 py-3 rounded-xl font-bold items-center gap-2 hover:shadow-lg active:scale-95 transition-all">
              <span className="material-symbols-outlined">person_add</span>
              Tambah Pekerja Baru
            </Link>
          </div>
          <div className="absolute bottom-0 right-0 p-4 opacity-10">
            <span className="material-symbols-outlined text-[160px]">assignment_ind</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-8 rounded-3xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div>
            <h4 className="text-lg font-bold font-['Inter'] text-slate-800 mb-1">Manajemen Artikel</h4>
            <p className="text-slate-500 text-sm">Buat dan kelola artikel edukasi untuk meningkatkan SEO Google.</p>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-500 text-sm">edit_document</span>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-50"></div>
            </div>
            <Link href="/admin/dashboard/artikel" className="text-emerald-600 font-bold text-sm flex items-center gap-1 hover:underline">
              Ke Panel Artikel
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>

      {/* SECTION: DAFTAR PEKERJA TERSEDIA */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-12">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-bold text-slate-800 font-['Inter']">Daftar Pekerja Tersedia</h3>
          <div className="flex gap-4">
            <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-emerald-100">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              Status: Tersedia
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {workers && workers.length > 0 ? (
            workers.map((worker) => (
              <div key={worker.id} className="group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <img src={worker.fotoUrl} alt={worker.nama} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 shadow-sm" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg font-['Inter']">{worker.nama}</h4>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">{worker.kategori}</span>
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <span className="material-symbols-outlined text-[14px]">location_on</span>
                        {worker.lokasi}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block mr-4">
                    <p className="text-xs text-slate-400 font-medium">Pengalaman</p>
                    <p className="text-sm font-bold text-slate-800">{worker.pengalaman} Tahun</p>
                  </div>
                  {/* Action Buttons: Edit & Delete */}
                  <Link href={`/admin/dashboard/edit/${worker.id}`} className="bg-slate-100 text-emerald-600 p-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-emerald-600 hover:text-white" title="Edit Pekerja">
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </Link>
                  <div className="opacity-0 group-hover:opacity-100 transition-all">
                    <DeleteButton id={worker.id} fotoUrl={worker.fotoUrl} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">person_off</span>
              <p className="text-slate-500 font-medium">Tidak ada pekerja dengan status "Tersedia".</p>
            </div>
          )}
        </div>

        {workers && workers.length > 0 && (
          <div className="mt-8 flex justify-center border-t border-slate-100 pt-8">
            <Link href="/pekerja" className="flex items-center gap-2 text-emerald-600 font-bold py-2.5 px-6 rounded-full border-2 border-emerald-100 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all">
              <span>Lihat Lebih Banyak</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}