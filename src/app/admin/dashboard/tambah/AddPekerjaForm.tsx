// src/app/admin/dashboard/tambah/AddPekerjaForm.tsx
"use client";

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { addPekerja } from '@/app/actions';
import toast from 'react-hot-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  // --- PERBAIKAN DI SINI: Tambahkan 'return' ---
  return (
    <button 
      type="submit" 
      disabled={pending} 
      className="px-6 py-2 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-700 disabled:bg-slate-400"
    >
      {pending ? 'Menyimpan...' : 'Simpan Pekerja'}
    </button>
  );
}

export default function AddPekerjaForm() {
  const initialState = { error: '' };
  const [state, formAction] = useActionState(addPekerja, initialState);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nama" className="block text-sm font-semibold text-slate-800">Nama Lengkap</label>
          <input type="text" id="nama" name="nama" required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900" />
        </div>
        <div>
          <label htmlFor="kategori" className="block text-sm font-semibold text-slate-800">Kategori</label>
          <select id="kategori" name="kategori" required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900">
            <option value="Baby Sitter">Baby Sitter</option>
            <option value="Perawat Lansia">Perawat Lansia</option>
            <option value="Asisten Rumah Tangga">Asisten Rumah Tangga</option>
          </select>
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-semibold text-slate-800">Status</label>
          <select id="status" name="status" required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900">
            <option value="Tersedia">Tersedia</option>
            <option value="Akan Tersedia">Akan Tersedia</option>
          </select>
        </div>
        <div>
          <label htmlFor="pengalaman" className="block text-sm font-semibold text-slate-800">Pengalaman (Tahun)</label>
          <input type="number" id="pengalaman" name="pengalaman" required defaultValue={0} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900" />
        </div>
        <div>
          <label htmlFor="gaji" className="block text-sm font-semibold text-slate-800">Gaji (per bulan)</label>
          <input type="number" id="gaji" name="gaji" required defaultValue={0} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900" />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="lokasi" className="block text-sm font-semibold text-slate-800">Lokasi</label>
          <input type="text" id="lokasi" name="lokasi" required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900" />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="fotoUrl" className="block text-sm font-semibold text-slate-800">Foto Pekerja</label>
          <input type="file" id="fotoUrl" name="fotoUrl" required accept="image/png, image/jpeg, image/jpg" className="block w-full cursor-pointer rounded-lg border border-slate-300 text-sm text-slate-500 file:mr-4 file:border-0 file:bg-emerald-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-700"/>

        </div>
        <div className="md:col-span-2">
          <label htmlFor="keterampilan" className="block text-sm font-semibold text-slate-800">Keterampilan</label>
          <p className="text-xs text-slate-500 mb-1">Pisahkan setiap keterampilan dengan koma (contoh: Memasak, Merawat Anak, Setrika)</p>
          <textarea id="keterampilan" name="keterampilan" rows={3} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900"></textarea>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="deskripsi" className="block text-sm font-semibold text-slate-800">Deskripsi</label>
          <textarea id="deskripsi" name="deskripsi" rows={4} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900"></textarea>
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 pt-4 border-t">
        <SubmitButton />
      </div>
    </form>
  );
}