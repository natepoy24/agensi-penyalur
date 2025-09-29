// src/app/admin/dashboard/tambah/page.tsx
import AddPekerjaForm from './AddPekerjaForm';
import BackgroundDecoration from '@/components/BackgroundDecoration'; // Impor komponen baru

export default function TambahPekerjaPage() {
  return (
    <div className="relative min-h-screen bg-white">
      <BackgroundDecoration />
      <div className="relative z-10 container mx-auto p-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-md border">
            <h1 className="text-4xl font-bold text-slate-800 mb-8">Tambah Pekerja Baru</h1>
            <AddPekerjaForm />
          </div>
        </div>
      </div>
    </div>
  );
}