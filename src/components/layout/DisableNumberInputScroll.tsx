"use client";

import { useEffect } from "react";

/**
 * Komponen ini secara global mencegah scroll wheel mouse mengubah nilai
 * pada semua elemen <input type="number"> di seluruh aplikasi, sehingga
 * ketika pengguna scroll halaman, nilai input tidak akan berubah secara tidak sengaja.
 */
export default function DisableNumberInputScroll() {
  useEffect(() => {
    // 1. Tangani saat input type="number" sedang fokus dan terkena scroll wheel
    const handleWheelCapture = (e: WheelEvent) => {
      const activeEl = document.activeElement;
      const target = e.target as HTMLElement | null;

      const isNumberInput =
        (activeEl instanceof HTMLInputElement && activeEl.type === "number") ||
        (target instanceof HTMLInputElement && target.type === "number");

      if (isNumberInput) {
        // Hentikan perubahan nilai oleh browser
        e.preventDefault();

        // Lepaskan fokus dari input agar scroll berikutnya langsung menggerakkan halaman
        if (activeEl instanceof HTMLInputElement && activeEl.type === "number") {
          activeEl.blur();
        }
        if (target instanceof HTMLInputElement && target.type === "number") {
          target.blur();
        }
      }
    };

    // Pasang listener di window dan document dengan capture: true dan passive: false
    // agar event tertangkap sebelum aksi default browser (merubah angka) dieksekusi
    window.addEventListener("wheel", handleWheelCapture, { passive: false, capture: true });
    document.addEventListener("wheel", handleWheelCapture, { passive: false, capture: true });

    return () => {
      window.removeEventListener("wheel", handleWheelCapture, { capture: true });
      document.removeEventListener("wheel", handleWheelCapture, { capture: true });
    };
  }, []);

  return null;
}
