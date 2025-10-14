// src/app/admin/dashboard/artikel/page.tsx
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import DeleteArtikelButton from './DeleteArtikelButton';

export default async function ArtikelDashboardPage() {
  const supabase = await createClient();
  const { data: artikel, error } = await supabase
    .from('artikel')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="container mx-auto p-8 pt-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800">Manajemen Artikel</h1>
        <Link 
          href="/admin/dashboard/artikel/tambah"
          className="px-4 py-2 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-700"
        >
          + Tulis Artikel Baru
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 font-semibold">Judul</th>
              <th className="p-4 font-semibold">Tanggal Publikasi</th>
              <th className="p-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {artikel && artikel.length > 0 ? (
              artikel.map((item) => (
                <tr key={item.id} className="border-b hover:bg-slate-50">
                  <td className="p-4 font-medium">{item.judul}</td>
                  <td className="p-4">{new Date(item.published_at).toLocaleDateString('id-ID')}</td>
                  <td className="p-4 space-x-2 text-right">
                    <Link
                      href={`/admin/dashboard/artikel/edit/${item.slug}`}
                      className="text-sm text-blue-600 hover:underline"
                    >Edit</Link>
                    <DeleteArtikelButton id={item.id} gambar_url={item.gambar_url} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-slate-500">
                  Belum ada artikel. Silakan buat artikel pertama Anda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}