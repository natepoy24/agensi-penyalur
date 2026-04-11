"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { incrementViews } from "@/app/actions";

const LexicalEditor = dynamic(() => import("@/components/LexicalEditor"), {
  ssr: false,
  loading: () => <div className="prose lg:prose-lg mx-auto pt-8">Memuat konten...</div>,
});

interface ArticleRendererProps {
  content: any; // JSON string atau object
  slug: string;
}

export default function ArticleRenderer({ content, slug }: ArticleRendererProps) {
  useEffect(() => {
    // Memanggil fungsi incrementViews secara tidak langsung agar tidak memblokir render UI
    incrementViews(slug).catch(console.error);
  }, [slug]);

  const initialContent = typeof content === 'object' ? JSON.stringify(content) : content;

  return (
    <div className="prose lg:prose-xl max-w-none prose-emerald">
      <LexicalEditor initialContent={initialContent} editable={false} />
    </div>
  );
}