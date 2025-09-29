// src/app/admin/dashboard/DeleteButton.tsx
"use client";

import { useState } from 'react';
import { deletePekerjaById } from '@/app/actions';

export default function DeleteButton({ id, fotoUrl }: { id: number, fotoUrl: string | null }) {
  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    const confirmed = window.confirm("Apakah Anda yakin ingin menghapus pekerja ini?");
    
    if (confirmed) {
      setIsPending(true);
      try {
        await deletePekerjaById(id, fotoUrl);
        // Jika sukses, redirect akan terjadi dan kode di bawah ini tidak akan berjalan
      } catch (error) {
        // --- INI ADALAH PERBAIKANNYA ---
        // Hanya tampilkan alert jika errornya BUKAN sinyal redirect
        if (error instanceof Error && error.message !== 'NEXT_REDIRECT') {
          alert(`Gagal menghapus data: ${error.message}`);
          setIsPending(false);
        }
        // Jika errornya NEXT_REDIRECT, kita tidak melakukan apa-apa dan membiarkan Next.js
        // menyelesaikan proses redirect-nya.
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="font-medium text-red-600 hover:underline disabled:text-slate-400"
    >
      {isPending ? 'Menghapus...' : 'Hapus'}
    </button>
  );
}