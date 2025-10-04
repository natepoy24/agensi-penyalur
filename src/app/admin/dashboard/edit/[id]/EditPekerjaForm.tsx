// src/app/admin/dashboard/edit/[id]/EditPekerjaForm.tsx
"use client";

import Image from 'next/image';
import { type PekerjaProps } from "@/components/PekerjaCard";
import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { updatePekerja } from '@/app/actions';
import toast from 'react-hot-toast';
import SukuInput from '@/components/SukuInput';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="px-6 py-2 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-700 disabled:bg-slate-400">
      {pending ? 'Memperbarui...' : 'Perbarui Data'}
    </button>
  );
}

export default function EditPekerjaForm({ pekerja }: { pekerja: PekerjaProps }) {
  const initialState = { error: '' };
  const [state, formAction] = useActionState(updatePekerja, initialState);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
      <input type="hidden" name="id" value={pekerja.id} />
      <input type="hidden" name="currentFotoUrl" value={pekerja.fotoUrl} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nama" className="block text-sm font-semibold text-slate-900">Nama Lengkap</label>
          <input type="text" id="nama" name="nama" required defaultValue={pekerja.nama} className="mt-1 block w-full border rounded-md text-slate-900 px-3 py-2" />
        </div>
        <div>
          <label htmlFor="umur" className="block text-sm font-semibold text-slate-800">Umur</label>
          <input type="number" id="umur" name="umur" defaultValue={18} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900" />
        </div>
        <div>
          <label htmlFor="kategori" className="block text-sm font-semibold text-slate-900">Kategori</label>
          <select id="kategori" name="kategori" required defaultValue={pekerja.kategori} className="mt-1 block w-full border rounded-md text-slate-900 px-3 py-2">
            <option value="Baby Sitter">Baby Sitter</option>
            <option value="Perawat Lansia">Perawat Lansia</option>
            <option value="Asisten Rumah Tangga">Asisten Rumah Tangga</option>
          </select>
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-semibold text-slate-900">Status</label>
          <select id="status" name="status" required defaultValue={pekerja.status} className="mt-1 block w-full border rounded-md text-slate-900 px-3 py-2">
            <option value="Tersedia">Tersedia</option>
            <option value="Akan Tersedia">Akan Tersedia</option>
          </select>
        </div>
        <div>
          <label htmlFor="pengalaman" className="block text-sm font-semibold text-slate-900">Pengalaman (Tahun)</label>
          <input type="number" id="pengalaman" name="pengalaman" required defaultValue={pekerja.pengalaman} className="mt-1 block w-full border rounded-md text-slate-900 px-3 py-2" />
        </div>
         <SukuInput defaultValue={pekerja.suku} />
        <div>
          <label htmlFor="gaji" className="block text-sm font-semibold text-slate-900">Gaji (per bulan)</label>
          <input type="number" id="gaji" name="gaji" required defaultValue={pekerja.gaji || 0} className="mt-1 block w-full border rounded-md text-slate-900 px-3 py-2" />
        </div>

        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 items-start pt-6 border-t">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Foto Saat Ini</label>
            <div className="relative w-full aspect-square rounded-lg overflow-hidden border">
              <Image src={pekerja.fotoUrl} alt={`Foto ${pekerja.nama}`} layout="fill" objectFit="cover" />
            </div>
          </div>
          <div>
            <label htmlFor="fotoUrl" className="block text-sm font-semibold text-slate-900">Ganti Foto</label>
            <p className="text-xs text-slate-500 mb-2">Biarkan kosong jika tidak ingin mengubah foto.</p>
            <input 
              type="file" 
              id="fotoUrl" 
              name="fotoUrl" 
              accept="image/png, image/jpeg, image/jpg"
              className="block w-full cursor-pointer rounded-lg border border-slate-300 text-sm text-slate-500 file:mr-4 file:border-0 file:bg-emerald-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-700"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="keterampilan" className="block text-sm font-semibold text-slate-900">Keterampilan</label>
          <p className="text-xs text-slate-500 mb-1">Pisahkan setiap keterampilan dengan koma.</p>
          <textarea id="keterampilan" name="keterampilan" rows={3} defaultValue={pekerja.keterampilan || ''} className="mt-1 block w-full border rounded-md text-slate-900 px-3 py-2"></textarea>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="lokasi" className="block text-sm font-semibold text-slate-900">Kota Asal</label>
          <input type="text" id="lokasi" name="lokasi" required defaultValue={pekerja.lokasi} className="mt-1 block w-full border rounded-md text-slate-900 px-3 py-2" />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="deskripsi" className="block text-sm font-semibold text-slate-900">Deskripsi</label>
          <textarea id="deskripsi" name="deskripsi" rows={4} required defaultValue={pekerja.deskripsi} className="mt-1 block w-full border rounded-md text-slate-900 px-3 py-2"></textarea>
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 pt-4 border-t">
        {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
        <SubmitButton />
      </div>
    </form>
  );
}