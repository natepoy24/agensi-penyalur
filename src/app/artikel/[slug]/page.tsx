// src/app/artikel/[slug]/page.tsx
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import ArticleRenderer from './ArticleRenderer';
import Breadcrumbs from '@/components/Breadcrumbs';
import type { Metadata, ResolvingMetadata } from 'next';

export const revalidate = 3600; // Revalidate setiap 1 jam

type Props = {
  params: { slug: string };
};

/**
 * Fungsi untuk membuat deskripsi singkat dari konten Lexical JSON.
 * Mengambil teks dari paragraf pertama.
 */
function generateDescriptionFromContent(content: any): string {
  const defaultDescription = "Baca selengkapnya artikel menarik dari PT Jasa Mandiri.";
  if (typeof content !== 'object' || !content?.root?.children) {
    return defaultDescription;
  }
  try {
    const firstParagraph = content.root.children.find((node: any) => node.type === 'paragraph');
    if (firstParagraph && firstParagraph.children) {
      const textContent = firstParagraph.children
        .filter((child: any) => child.type === 'text')
        .map((child: any) => child.text)
        .join(' ');
      return textContent.length > 155 ? textContent.substring(0, 155) + '...' : textContent;
    }
  } catch (error) {
    console.error("Failed to generate description from content", error);
  }
  return defaultDescription;
}

export default async function ArtikelDetailPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient();

  const { data: article, error } = await supabase
    .from('artikel')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (error || !article) {
    notFound();
  }

  // Pastikan konten adalah string JSON yang valid
  const initialContent = typeof article.konten === 'object' 
    ? JSON.stringify(article.konten) 
    : article.konten;

  return (
    <main className="container mx-auto p-4 md:p-8 pt-24">
      <Breadcrumbs
        crumbs={[
          { name: 'Beranda', path: '/' },
          { name: 'Artikel', path: '/artikel' },
          { name: article.judul, path: `/artikel/${article.slug}` },
        ]}
      />
      <ArticleRenderer article={{ ...article, konten: initialContent }} />
    </main>
  );
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const supabase = await createClient();
  const { data: article } = await supabase
    .from('artikel')
    .select('judul, konten, gambar_url')
    .eq('slug', params.slug)
    .single();

  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan',
    };
  }

  const description = generateDescriptionFromContent(article.konten);

  return {
    title: `${article.judul} | PT Jasa Mandiri`,
    description: description,
    openGraph: {
      title: article.judul,
      description: description,
      images: [article.gambar_url],
    },
  };
}
