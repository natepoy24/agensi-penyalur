// src/app/admin/dashboard/page.tsx
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import BackgroundDecoration from '@/components/BackgroundDecoration';
import DeleteButton from './DeleteButton';

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: pekerja, error } = await supabase.from('pekerja').select('*').order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching pekerja:', error);
    // Di sini bisa ditambahkan komponen UI untuk menampilkan error jika diperlukan
  }


  return (
    <div className="relative min-h-screen bg-white">
      <BackgroundDecoration />
      <div className="relative z-10 container mx-auto p-8 pt-24">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">Dasbor Admin</h1>
            <p className="mt-2 text-slate-600">Kelola data tenaga kerja di sini.</p>
          </div>
          <Link href="/admin/dashboard/tambah" className="px-4 py-2 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-700">
            + Tambah Pekerja Baru
          </Link>
        </div>
        <div className="w-full overflow-x-auto bg-white/80 backdrop-blur-sm rounded-lg shadow-md border">
          <table className="w-full text-sm text-left text-slate-700">
            <thead className="text-xs text-slate-500 uppercase bg-slate-100/80">
              <tr>
                <th scope="col" className="px-6 py-3">Nama</th>
                <th scope="col" className="px-6 py-3">Kategori</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pekerja && pekerja.length > 0 ? (
                pekerja.map((p) => (
                  <tr key={p.id} className="bg-white border-b border-slate-200 hover:bg-slate-50/80">
                    <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{p.nama}</th>
                    <td className="px-6 py-4">{p.kategori}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${p.status === 'Tersedia' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-800'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-4">
                      <Link href={`/admin/dashboard/edit/${p.id}`} className="font-medium text-blue-600 hover:underline">Edit</Link>
                      <DeleteButton id={p.id} fotoUrl={p.fotoUrl} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-slate-500">Tidak ada data pekerja.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}