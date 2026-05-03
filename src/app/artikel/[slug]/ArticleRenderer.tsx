"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect } from "react";
import { incrementViews } from "@/app/actions";

const LexicalEditor = dynamic(() => import("@/components/LexicalEditor"), {
  ssr: false,
  loading: () => <div className="prose lg:prose-lg mx-auto pt-8 text-center text-slate-500 font-medium">Memuat konten...</div>,
});

interface Artikel {
  id: string | number;
  judul: string;
  konten: string | object;
  gambar_url?: string;
  slug: string;
  published_at?: string;
  created_at?: string;
  views?: number;
  tags?: string;
}

export default function ArticleRenderer({ article }: { article: Artikel }) {
  useEffect(() => {
    // Memanggil fungsi incrementViews secara tidak langsung agar tidak memblokir render UI
    incrementViews(article.slug).catch(console.error);
  }, [article.slug]);

  const initialContent = typeof article.konten === 'object' ? JSON.stringify(article.konten) : article.konten;
  
  const tagsArray = article.tags
    ? article.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
    : [];

  return (
    <div className="bg-transparent pb-16">
      <div className="px-0 md:px-8">
        <article className="max-w-4xl mx-auto bg-white p-8 md:p-14 rounded-[3rem] shadow-[0_8px_40px_-12px_rgba(15,23,42,0.08)] border border-slate-100">
          <header className="mb-10 text-center">
            {/* TAMPILAN TAGS (CHIPS) */}
            {tagsArray.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {tagsArray.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100 uppercase tracking-wider"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-8">
              {article.judul}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-3">
              <p className="inline-flex items-center gap-2 bg-slate-50 border border-slate-100 text-slate-600 px-5 py-2.5 rounded-full text-sm font-semibold">
                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                {new Date(article.published_at || article.created_at || new Date()).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              
              {/* Views Count diletakkan dengan desain selaras */}
              <p className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 px-5 py-2.5 rounded-full text-sm font-semibold">
                <span className="material-symbols-outlined text-[18px]">visibility</span>
                {article.views || 0} kali dibaca
              </p>
            </div>
          </header>

          <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-12 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.15)] bg-slate-100 flex justify-center items-center">
            {article.gambar_url ? (
              <Image
                src={article.gambar_url}
                alt={`Gambar untuk ${article.judul}`}
                fill
                className="object-cover"
                priority
              />
            ) : (
               <img src="/Image/placeholder.png" alt="Placeholder" className="w-full h-auto object-contain" />
            )}
          </div>

          <div className="prose lg:prose-xl prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:text-emerald-700 prose-strong:text-slate-900 prose-li:text-slate-600 prose-img:rounded-2xl">
            <LexicalEditor initialContent={initialContent} editable={false} />
          </div>
        </article>
      </div>
    </div>
  );
}