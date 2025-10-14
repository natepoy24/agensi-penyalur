"use client";

import { useTransition } from "react";
import { deleteArtikel } from "@/app/actions";
import toast from "react-hot-toast";

interface DeleteArtikelButtonProps {
  id: number;
  gambar_url: string | null;
}

export default function DeleteArtikelButton({ id, gambar_url }: DeleteArtikelButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
      startTransition(async () => {
        try {
          await deleteArtikel(id, gambar_url);
          toast.success("Artikel berhasil dihapus.");
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Gagal menghapus artikel.");
        }
      });
    }
  };

  return (
    <button onClick={handleDelete} disabled={isPending} className="text-sm text-red-600 hover:underline disabled:text-slate-400">
      {isPending ? "Menghapus..." : "Hapus"}
    </button>
  );
}