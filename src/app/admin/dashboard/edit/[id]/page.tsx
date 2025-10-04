// src/app/admin/dashboard/edit/[id]/page.tsx
import { createClient } from "@/utils/supabase/server";
import EditPekerjaForm from "./EditPekerjaForm";
import { redirect } from "next/navigation";
import BackgroundDecoration from "@/components/BackgroundDecoration";

export default async function EditPekerjaPage({ params }: { params: { id: string } }) {
  // 1. Ekstrak 'id' dari 'params' di baris paling atas,
  //    SEBELUM ada pemanggilan 'await' apa pun.
  //    Ini adalah cara yang benar untuk mengikuti "aturan" dari Next.js.
  const id = params.id;

  // 2. Sekarang kita bisa melakukan operasi 'await' pertama.
  const supabase = await createClient();

  // 3. Gunakan variabel 'id' yang sudah diekstrak untuk mengambil data.
  const { data: pekerja, error } = await supabase
    .from('pekerja')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !pekerja) {
    console.error("Gagal mengambil data untuk diedit:", error?.message);
    redirect('/admin/dashboard');
  }

  // 4. Return JSX utama di akhir.
  return (
    <main className="py-24 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">Edit Profil Pekerja</h1>
        <EditPekerjaForm pekerja={pekerja} />
      </div>
    </main>
  );
}