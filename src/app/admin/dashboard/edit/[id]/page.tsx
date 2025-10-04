// src/app/admin/dashboard/edit/[id]/page.tsx
import { createClient } from "@/utils/supabase/server";
import EditPekerjaForm from "./EditPekerjaForm";
import { redirect } from "next/navigation";
import BackgroundDecoration from "@/components/BackgroundDecoration";

export default async function EditPekerjaPage({ params }: { params: { id: string } }) {
  // --- PERBAIKAN DI SINI ---
  // Ekstrak 'id' dari 'params' sebelum await pertama
  const id = params.id;

  const supabase = await createClient();

  // Gunakan variabel 'id' yang sudah diekstrak
  const { data: pekerja, error } = await supabase
    .from('pekerja')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !pekerja) {
    redirect('/admin/dashboard');
  }

  return (
    <main className="py-24 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">Edit Profil Pekerja</h1>
        <EditPekerjaForm pekerja={pekerja} />
      </div>
    </main>
  );
}