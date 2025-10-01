// src/app/admin/dashboard/edit/[id]/page.tsx
import { createClient } from "@/utils/supabase/server";
import EditPekerjaForm from "./EditPekerjaForm";
import { redirect } from "next/navigation";
import BackgroundDecoration from "@/components/BackgroundDecoration"; // 1. Impor komponen background

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
    // 2. Terapkan struktur layout dengan background
    <div className="relative min-h-screen bg-white">
      <BackgroundDecoration />
      <div className="relative z-10 container mx-auto p-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-md border">
            <h1 className="text-4xl font-bold text-slate-800 mb-8">Edit Profil Pekerja</h1>
            <EditPekerjaForm pekerja={pekerja} />
          </div>
        </div>
      </div>
    </div>
  );
}