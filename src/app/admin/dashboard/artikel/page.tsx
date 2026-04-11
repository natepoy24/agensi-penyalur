// src/app/admin/dashboard/artikel/page.tsx
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import DeleteArtikelButton from "./DeleteArtikelButton";

export const revalidate = 0; // Memastikan data selalu segar setiap kali halaman di-refresh

export default async function ArtikelDashboardPage() {
  const supabase = await createClient();

  // 1. MENGAMBIL METRIK UNTUK BENTO GRID
  const { count: totalArtikel } = await supabase
    .from("artikel")
    .select("*", { count: "exact", head: true });

  const { count: totalDraft } = await supabase
    .from("artikel")
    .select("*", { count: "exact", head: true })
    .eq("kategori", false); // false = Draft

  const { data: viewsData } = await supabase
    .from("artikel")
    .select("views");
  const totalViews = viewsData?.reduce((acc, curr) => acc + (Number(curr.views) || 0), 0) || 0;

  // Format angka views agar rapi (misal: 1500 -> 1.5k)
  const formatViews = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  // 2. MENGAMBIL DATA LIST ARTIKEL
  const { data: articles } = await supabase
    .from("artikel")
    .select("id, judul, slug, gambar_url, kategori, views, published_at, tags")
    .order("created_at", { ascending: false });

  return (
    <div className="font-['Inter'] max-w-7xl mx-auto space-y-8">

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <nav className="flex gap-2 text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
            <span>Admin</span>
            <span>/</span>
            <span className="text-emerald-600">Artikel</span>
          </nav>
          <h1 className="text-3xl font-extrabold text-slate-800 font-['Plus_Jakarta_Sans'] tracking-tight">Manajemen Artikel</h1>
          <p className="text-slate-500 mt-1">Kelola publikasi edukasi dan informasi untuk klien serta calon pekerja.</p>
        </div>
        <Link
          href="/admin/dashboard/artikel/tambah"
          className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 active:scale-95 transition-all group"
        >
          <span className="material-symbols-outlined text-[20px]">edit_document</span>
          <span>Tulis Artikel Baru</span>
        </Link>
      </div>

      {/* STATS BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Artikel */}
        <div className="p-6 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center gap-5 hover:border-emerald-200 transition-colors">
          <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <span className="material-symbols-outlined text-[28px]">article</span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">Total Artikel</p>
            <h3 className="text-3xl font-extrabold text-slate-800 font-['Plus_Jakarta_Sans']">{totalArtikel || 0}</h3>
          </div>
        </div>

        {/* Total Tayangan */}
        <div className="p-6 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center gap-5 hover:border-emerald-200 transition-colors">
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
            <span className="material-symbols-outlined text-[28px]">visibility</span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">Total Tayangan</p>
            <h3 className="text-3xl font-extrabold text-slate-800 font-['Plus_Jakarta_Sans']">{formatViews(totalViews)}</h3>
          </div>
        </div>

        {/* Total Draft */}
        <div className="p-6 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center gap-5 hover:border-emerald-200 transition-colors">
          <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
            <span className="material-symbols-outlined text-[28px]">drafts</span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">Draft Tersimpan</p>
            <h3 className="text-3xl font-extrabold text-slate-800 font-['Plus_Jakarta_Sans']">{totalDraft || 0}</h3>
          </div>
        </div>
      </div>

      {/* MAIN MANAGEMENT TABLE CARD */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">

        {/* Table Header Filter */}
        <div className="p-6 flex justify-between items-center bg-slate-50/50 border-b border-slate-100">
          <div className="flex gap-2">
            <span className="px-5 py-2 rounded-full bg-slate-800 text-white text-sm font-semibold shadow-sm">Semua Artikel</span>
          </div>
          <div className="flex gap-2 text-slate-400">
            <span className="material-symbols-outlined p-2">sort</span>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-xs uppercase tracking-widest bg-white">
                <th className="px-8 py-5 font-bold">Judul & Detail</th>
                <th className="px-8 py-5 font-bold text-center">Status</th>
                <th className="px-8 py-5 font-bold">Terbit Pada</th>
                <th className="px-8 py-5 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 bg-white">
              {articles && articles.length > 0 ? (
                articles.map((article) => {
                  // Mengolah data Tags
                  const tagsArray = article.tags
                    ? article.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
                    : [];

                  return (
                    <tr key={article.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-8 py-5 max-w-sm">
                        <div className="flex gap-5">
                          <div className="w-20 h-14 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                            <img
                              src={article.gambar_url || "/Image/placeholder.png"}
                              alt={article.judul}
                              className={`w-full h-full object-cover ${!article.kategori ? 'grayscale opacity-70' : ''}`}
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h4 className={`font-bold text-base leading-tight mb-1 line-clamp-1 ${!article.kategori ? 'text-slate-500' : 'text-slate-800 font-[\'Plus_Jakarta_Sans\']'}`}>
                              {article.judul}
                            </h4>

                            {/* Baris Meta: Views & Tags */}
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[12px]">visibility</span>
                                {article.views || 0} views
                              </span>

                              {/* Menampilkan Daftar Tags */}
                              {tagsArray.length > 0 && (
                                <>
                                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                  <div className="flex gap-1 overflow-hidden max-w-[200px]">
                                    {tagsArray.slice(0, 2).map((tag: string, index: number) => (
                                      <span key={index} className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 whitespace-nowrap">
                                        #{tag}
                                      </span>
                                    ))}
                                    {tagsArray.length > 2 && (
                                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">+{tagsArray.length - 2}</span>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-8 py-5 text-center">
                        {article.kategori ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                            <span className="material-symbols-outlined text-[12px]">edit_document</span>
                            Draft
                          </span>
                        )}
                      </td>

                      <td className="px-8 py-5">
                        <span className={`text-sm font-medium ${article.kategori ? 'text-slate-600' : 'text-slate-400 italic'}`}>
                          {article.kategori && article.published_at
                            ? new Date(article.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                            : 'Belum Publikasi'
                          }
                        </span>
                      </td>

                      <td className="px-8 py-5">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {/* Tombol Lihat Publik (Hanya jika Publish) */}
                          {article.kategori && (
                            <Link href={`/artikel/${article.slug}`} target="_blank" className="w-9 h-9 flex items-center justify-center rounded-full text-blue-600 hover:bg-blue-50 transition-colors" title="Lihat di Web">
                              <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                            </Link>
                          )}

                          <Link href={`/admin/dashboard/artikel/edit/${article.slug}`} className="w-9 h-9 flex items-center justify-center rounded-full text-emerald-600 hover:bg-emerald-50 transition-colors" title="Edit Artikel">
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </Link>

                          <div title="Hapus Artikel">
                            <DeleteArtikelButton id={article.id} gambar_url={article.gambar_url} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-16">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <span className="material-symbols-outlined text-5xl mb-3 text-slate-200">article</span>
                      <p className="font-semibold text-slate-500">Belum ada artikel.</p>
                      <p className="text-sm mt-1 mb-4">Mulailah menulis artikel pertama Anda untuk edukasi majikan.</p>
                      <Link href="/admin/dashboard/artikel/tambah" className="text-sm font-bold text-emerald-600 hover:underline">
                        + Tulis Artikel
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-6 border-t border-slate-100 bg-white">
          <p className="text-sm text-slate-500 font-medium">Menampilkan total <span className="font-bold text-slate-800">{articles?.length || 0}</span> artikel dalam database.</p>
        </div>

      </div>
    </div>
  );
}