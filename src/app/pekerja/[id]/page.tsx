// src/app/pekerja/[id]/page.tsx
import Image from 'next/image';
import { User, Users, Briefcase, MapPin, Sparkles, Wallet } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { type PekerjaProps } from '@/components/PekerjaCard';

// Fungsi untuk mengambil data satu pekerja dari Supabase
async function getPekerjaById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('pekerja')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error('Error mengambil detail pekerja:', error.message);
    return null;
  }
  return data;
}

export default async function PekerjaDetailPage({ params }: { params: { id: string } }) {
  const pekerja = await getPekerjaById(params.id);

  if (!pekerja) {
    redirect('/pekerja');
  }

  const formatRupiah = (angka: number | null | undefined) => {
    if (angka === null || typeof angka === 'undefined') return 'N/A';
    return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const keterampilanList = pekerja.keterampilan?.split(',').map((skill: string) => skill.trim()).filter((skill: string) => skill);
  
  // --- 1. Membuat Link WhatsApp Dinamis ---
  const whatsappNumber = "6282122415552"; // Nomor HP tujuan (format internasional)
  const message = `Halo, apakah ${pekerja.kategori} dengan nama ${pekerja.nama} masih tersedia?`;
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;

  return (
    <main>
      <div className="bg-slate-50 pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            
            <div className="md:col-span-1">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={pekerja.fotoUrl}
                  alt={`Foto ${pekerja.nama}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            </div>

            <div className="md:col-span-2 bg-white p-8 rounded-lg shadow-lg">
              <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold
                ${pekerja.status === 'Tersedia' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'}`}
              >
                {pekerja.status}
              </span>
              <h1 className="mt-4 text-4xl font-serif font-bold text-slate-800">{pekerja.nama}</h1>
              <h2 className="mt-2 text-xl font-semibold text-emerald-700">{pekerja.kategori}</h2>

              {/* --- PERBAIKAN DI SINI --- */}
              <div className="mt-6 border-t pt-6 text-slate-600 space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-slate-500" />
                  <span>Usia: <strong>{pekerja.umur} tahun</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-slate-500" />
                  <span>Suku: <strong>{pekerja.suku}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-slate-500" />
                  <span>Pengalaman: <strong>{pekerja.pengalaman} tahun</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-slate-500" />
                  <span>Kota Asal: <strong>{pekerja.lokasi}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <Wallet className="w-5 h-5 text-slate-500" />
                  <span>Gaji: <strong>Rp {formatRupiah(pekerja.gaji)} / bulan</strong></span>
                </div>
              </div>

              {keterampilanList && keterampilanList.length > 0 && (
                <div className="mt-6 border-t pt-6">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                    Keterampilan
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {keterampilanList.map((skill: string, index: number) => (
                      <span key={index} className="bg-slate-100 text-slate-700 text-sm font-medium px-3 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 border-t pt-6">
                <h3 className="text-lg font-bold text-slate-800">Tentang {pekerja.nama.split(' ')[0]}</h3>
                <p className="mt-2 text-slate-600">{pekerja.deskripsi}</p>
              </div>

              <div className="mt-8 text-right">
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-700 transition-colors"
                >
                  Jadwalkan Wawancara
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}