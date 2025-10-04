// src/components/SukuInput.tsx
"use client";

import { useState } from 'react';

const daftarSuku = [
  "Sunda", "Jawa", "Lampung", "Minangkabau", "Betawi", "Madura", "Batak"
];

// Komponen ini akan menerima 'defaultValue' untuk digunakan di form edit
export default function SukuInput({ defaultValue }: { defaultValue?: string }) {
  // Cek apakah nilai default ada di daftar. Jika tidak, anggap sebagai 'Lainnya'.
  const initialSelection = defaultValue && daftarSuku.includes(defaultValue) ? defaultValue : (defaultValue ? 'Lainnya' : '');

  const [selectedSuku, setSelectedSuku] = useState(initialSelection);
  const [manualSuku, setManualSuku] = useState(defaultValue && !daftarSuku.includes(defaultValue) ? defaultValue : '');

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSuku(e.target.value);
    if (e.target.value !== 'Lainnya') {
      setManualSuku(''); // Kosongkan input manual jika pilihan lain dipilih
    }
  };

  return (
    <>
      <div>
        <label htmlFor="suku_select" className="block text-sm font-semibold text-slate-800">Suku</label>
        <select 
          id="suku_select" 
          name="suku_select" 
          value={selectedSuku}
          onChange={handleSelectionChange}
          className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900"
        >
          <option value="" disabled>Pilih Suku</option>
          {daftarSuku.map(suku => <option key={suku} value={suku}>{suku}</option>)}
          <option value="Lainnya">Lainnya... (Isi Manual)</option>
        </select>
      </div>

      {/* Input teks ini hanya muncul jika 'Lainnya' dipilih */}
      {selectedSuku === 'Lainnya' && (
        <div>
          <label htmlFor="suku_manual" className="block text-sm font-semibold text-slate-800">
            Suku (Lainnya)
          </label>
          <input 
            type="text" 
            id="suku_manual"
            name="suku_manual"
            value={manualSuku}
            onChange={(e) => setManualSuku(e.target.value)}
            placeholder="Masukkan nama suku"
            required
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900" 
          />
        </div>
      )}

      {/* Input tersembunyi ini akan mengirim nilai suku yang final ke server action */}
      <input 
        type="hidden" 
        name="suku" 
        value={selectedSuku === 'Lainnya' ? manualSuku : selectedSuku} 
      />
    </>
  );
}