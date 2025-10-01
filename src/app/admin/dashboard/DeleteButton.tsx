// src/app/admin/dashboard/DeleteButton.tsx
"use client";

import { useState } from 'react';
import { deletePekerjaById } from '@/app/actions';
import toast from 'react-hot-toast'; // Impor toast

export default function DeleteButton({ id, fotoUrl }: { id: number, fotoUrl: string | null }) {
  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    const confirmed = window.confirm("Apakah Anda yakin ingin menghapus pekerja ini?");
    
    if (confirmed) {
      setIsPending(true);
      try {
        await deletePekerjaById(id, fotoUrl);
      } catch (error) {
        if (error instanceof Error && error.message !== 'NEXT_REDIRECT') {
          // Ganti alert dengan toast.error
          toast.error(`Gagal menghapus data: ${error.message}`);
          setIsPending(false);
        }
      }
    }
  };

  return (
    <button onClick={handleClick} disabled={isPending} className="font-medium text-red-600 hover:underline disabled:text-slate-400">
      {isPending ? 'Menghapus...' : 'Hapus'}
    </button>
  );
}