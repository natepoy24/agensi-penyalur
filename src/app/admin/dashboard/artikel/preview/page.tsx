// src/app/admin/dashboard/artikel/preview/page.tsx
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

// Tipe data untuk pratinjau
interface PreviewData {
  judul: string;
  konten: string; // JSON string from Lexical
  gambarUrl: string;
}

// Dynamic import untuk LexicalEditor, sama seperti di halaman artikel
const LexicalEditor = dynamic(() => import("@/components/LexicalEditor"), {
  ssr: false,
  loading: () => <div className="prose lg:prose-xl max-w-none">Memuat konten...</div>,
});

export default function PreviewPage() {
  const [article, setArticle] = useState<PreviewData | null>(null);

  useEffect(() => {
    // Ambil data dari session storage di sisi client
    const storedData = sessionStorage.getItem("articlePreview");
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setArticle(data);
      } catch (e) {
        console.error("Gagal mem-parsing data pratinjau:", e);
      }
    }
  }, []);

  if (!article) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <p className="text-slate-600">Memuat pratinjau...</p>
      </div>
    );
  }

  return (
    <main className="bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md mb-8" role="alert">
          <p className="font-bold">Mode Pratinjau</p>
          <p>Ini adalah tampilan artikel Anda sebelum dipublikasikan. Tutup tab ini untuk kembali ke editor.</p>
        </div>
        <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10 lg:p-12">
          <header className="mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
              {article.judul}
            </h1>
            <p className="text-slate-500">
              Tanggal publikasi akan muncul di sini setelah diterbitkan.
            </p>
          </header>

          {article.gambarUrl && (
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-12 shadow-md">
              <Image
                src={article.gambarUrl}
                alt={`Gambar pratinjau untuk ${article.judul}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 896px"
              />
            </div>
          )}

          <div className="prose lg:prose-xl max-w-none">
            <LexicalEditor initialContent={article.konten} editable={false} />
          </div>
        </article>
      </div>
    </main>
  );
}
