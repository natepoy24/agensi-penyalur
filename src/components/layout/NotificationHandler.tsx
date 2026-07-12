// src/components/NotificationHandler.tsx
"use client";

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

export default function NotificationHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const message = searchParams.get('message');
    if (message) {
      // Tampilkan toast sukses dengan pesan dari URL
      toast.success(message);

      // Hapus parameter 'message' dari URL tanpa me-reload halaman
      // agar toast tidak muncul lagi saat di-refresh
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [searchParams]);

  // Komponen ini tidak menampilkan apa-apa, hanya menjalankan logika
  return null;
}