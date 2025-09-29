// src/app/admin/dashboard/edit/[id]/page.tsx
import { createClient } from "@/utils/supabase/server";
import EditPekerjaForm from "./EditPekerjaForm";
import { redirect } from "next/navigation";

export default async function EditPekerjaPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  const { data: pekerja, error } = await supabase
    .from('pekerja')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !pekerja) {
    redirect('/admin/dashboard');
  }

  return (
    // Kita tambahkan padding di sini (pt-24 dan pb-16)
    <main className="py-24 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">Edit Profil Pekerja</h1>
        <EditPekerjaForm pekerja={pekerja} />
      </div>
    </main>
  );
}