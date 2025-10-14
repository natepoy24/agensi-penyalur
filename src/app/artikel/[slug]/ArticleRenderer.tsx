// src/app/artikel/[slug]/ArticleRenderer.tsx
"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

const LexicalEditor = dynamic(() => import("@/components/LexicalEditor"), {
  ssr: false,
  loading: () => <div className="prose lg:prose-lg mx-auto pt-8">Memuat konten...</div>,
});

interface Artikel {
  id: string;
  judul: string;
  konten: string; // JSON string
  gambar_url: string;
  slug: string;
  published_at: string;
}

export default function ArticleRenderer({ article }: { article: Artikel }) {
  return (
    <main className="bg-white pt-20 pb-16">
      <div className="container mx-auto px-4">
        <article className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
              {article.judul}
            </h1>
            <p className="text-slate-500">
              Dipublikasikan pada {new Date(article.published_at).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </header>

          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8 shadow-lg">
            <Image
              src={article.gambar_url}
              alt={`Gambar untuk ${article.judul}`}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="prose lg:prose-xl max-w-none">
            <LexicalEditor initialContent={article.konten} editable={false} />
          </div>
        </article>
      </div>
    </main>
  );
}