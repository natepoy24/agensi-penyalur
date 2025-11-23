// src/app/artikel/[slug]/page.tsx
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import ArticleRenderer from './ArticleRenderer';
import Breadcrumbs from '@/components/Breadcrumbs'; 
import type { Metadata } from 'next';

export const revalidate = 3600; // Revalidate setiap 1 jam

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://penyalurkerja.com';
type Props = {
  params: { slug: string };
};

/**
 * Fungsi untuk membuat deskripsi singkat dari konten Lexical JSON.
 * Mengambil teks dari paragraf pertama.
 */
function generateDescriptionFromContent(content: string | object): string {
  const defaultDescription =
    'Baca selengkapnya artikel menarik dari PT Jasa Mandiri.';
  
  // Definisikan tipe yang lebih spesifik untuk node Lexical
  type LexicalNode = { type: string; children?: LexicalNode[]; text?: string };
  let parsedContent: { root?: { children?: LexicalNode[] } };

  try {
    parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
  } catch (_e) {
    // Variabel error tidak digunakan, jadi kita beri awalan underscore
    return defaultDescription;
  }

  if (typeof parsedContent !== 'object' || !parsedContent?.root?.children) {
    return defaultDescription;
  }
  try {
    const firstParagraph = parsedContent.root.children.find(
      (node) => node.type === 'paragraph',
    );
    if (firstParagraph && firstParagraph.children) {
      const textContent = firstParagraph.children
        .filter((child) => child.type === 'text')
        .map((child) => child.text)
        .join(' ');
      return textContent.length > 155
        ? textContent.substring(0, 155) + '...'
        : textContent;
    }
  } catch (error) {
    console.error("Failed to generate description from content", error);
  }
  return defaultDescription;
}

export default async function ArtikelDetailPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: article, error } = await supabase
    .from('artikel')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !article) {
    notFound();
  }

  // Skema JSON-LD untuk Artikel
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/artikel/${article.slug}`,
    },
    "headline": article.judul,
    "image": [article.gambar_url],
    "datePublished": new Date(article.published_at).toISOString(),
    "dateModified": new Date(article.updated_at || article.published_at).toISOString(),
    "author": {
      "@type": "Organization",
      "name": "PT Jasa Mandiri",
      "url": siteUrl,
    },
    "publisher": {
      "@type": "Organization",
      "name": "PT Jasa Mandiri",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/Image/Logo.png` // Ganti dengan path logo Anda yang sebenarnya
      }
    },
    "description": generateDescriptionFromContent(article.konten),
  };

  // Pastikan konten adalah string JSON yang valid
  const initialContent = typeof article.konten === 'object' 
    ? JSON.stringify(article.konten) 
    : article.konten;

  return (
    <main className="container mx-auto p-4 md:p-8 pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase
    .from('artikel')
    .select('judul, konten, gambar_url')
    .eq('slug', slug)
    .single();

  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan',
    };
  }

  const description = generateDescriptionFromContent(article.konten);

  return {
    metadataBase: new URL(siteUrl),
    title: `${article.judul} | PT Jasa Mandiri`,
    description: description,
    openGraph: {
      title: article.judul,
      description: description,
      images: [article.gambar_url],
    },
  };
}
