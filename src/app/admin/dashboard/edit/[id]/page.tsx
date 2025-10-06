// src/app/admin/dashboard/edit/[id]/page.tsx
import { createClient } from "@/utils/supabase/server";
import EditPekerjaForm from "./EditPekerjaForm";
import { redirect } from "next/navigation";
import BackgroundDecoration from "@/components/BackgroundDecoration";

export default async function EditPekerjaPage(props: { params: Promise<{ id: string }> }) {
  // ✅ Await params dulu sebelum diakses
  const { id } = await props.params;

  const supabase = await createClient();

  const { data: pekerja, error } = await supabase
    .from('pekerja')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !pekerja) {
    console.error("Gagal mengambil data untuk diedit:", error?.message);
    redirect('/admin/dashboard');
  }

  return (
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
  