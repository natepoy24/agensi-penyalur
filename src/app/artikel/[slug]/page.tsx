// src/app/artikel/[slug]/page.tsx
// src/app/artikel/[slug]/page.tsx
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import ArticleRenderer from './ArticleRenderer';
import Breadcrumbs from '@/components/Breadcrumbs'; 
import type { Metadata, ResolvingMetadata } from 'next';
import { cache } from 'react'; // IMPORT PENTING

export const revalidate = 3600; // Revalidate setiap 1 jam

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://penyalurkerja.com';

type Props = {
  params: { slug: string };
};

/**
 * --- 1. OPTIMASI CACHING (DEDUPING) ---
 * Kita bungkus fungsi fetch dengan React cache.
 * Ini menjamin Supabase hanya dipanggil 1x meskipun dipanggil di metadata & page komponen.
 */
const getArticle = cache(async (slug: string) => {
  const supabase = await createClient();
  const { data: article } = await supabase
    .from('artikel')
    .select('*')
    .eq('slug', slug)
    .single();
    
  return article;
});

/**
 * Helper untuk parse deskripsi
 */
function generateDescriptionFromContent(content: string | any): string {
  const defaultDescription = 'Baca artikel lengkap seputar tenaga kerja, baby sitter, dan ART terpercaya dari PT Jasa Mandiri Agency.';
  
  try {
    const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;
    
    if (parsedContent?.root?.children) {
      const firstParagraph = parsedContent.root.children.find(
        (node: any) => node.type === 'paragraph'
      );
      if (firstParagraph?.children) {
        const textContent = firstParagraph.children
          .filter((child: any) => child.type === 'text')
          .map((child: any) => child.text)
          .join(' ');
          
        if (textContent) {
           return textContent.length > 155 
            ? textContent.substring(0, 155) + '...' 
            : textContent;
        }
      }
    }
  } catch (e) {
    // Silent fail
  }
  return defaultDescription;
}

// --- 2. GENERATE METADATA YANG LEBIH LENGKAP ---
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params;
  const article = await getArticle(slug); // Panggil fungsi cache

  if (!article) {
    return { title: 'Artikel Tidak Ditemukan' };
  }

  const description = generateDescriptionFromContent(article.konten);
  const pageUrl = `${siteUrl}/artikel/${slug}`;
  
  // Ambil gambar sebelumnya (jika ada) atau gunakan gambar artikel
  const previousImages = (await parent).openGraph?.images || [];
  const articleImage = article.gambar_url ? [article.gambar_url] : [];

  return {
    metadataBase: new URL(siteUrl),
    title: article.judul, // Template title biasanya sudah diatur di layout.tsx root
    description: description,
    keywords: ['penyalur kerja', 'baby sitter', 'ART', 'lowongan kerja', article.judul],
    authors: [{ name: 'PT Jasa Mandiri Agency' }],
    creator: 'PT Jasa Mandiri Agency',
    publisher: 'PT Jasa Mandiri Agency',
    
    // PENTING: Canonical URL untuk mencegah duplikat konten
    alternates: {
      canonical: pageUrl,
    },

    // Open Graph Lengkap
    openGraph: {
      title: article.judul,
      description: description,
      url: pageUrl,
      siteName: 'PenyalurKerja.com',
      locale: 'id_ID',
      type: 'article',
      publishedTime: article.published_at || article.created_at,
      modifiedTime: article.created_at,
      authors: ['PT Jasa Mandiri Agency'],
      images: [...articleImage, ...previousImages],
    },

    // Twitter Card (Penting agar saat share link gambarnya besar)
    twitter: {
      card: 'summary_large_image',
      title: article.judul,
      description: description,
      images: articleImage,
    },

    // Kontrol Robot
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// --- 3. HALAMAN UTAMA ---
export default async function ArtikelDetailPage({ params }: Props) {
  const { slug } = params;
  const article = await getArticle(slug); // Panggil fungsi cache (tidak akan hit DB lagi)

  if (!article) {
    notFound();
  }

  const description = generateDescriptionFromContent(article.konten);

  // --- 4. SCHEMA JSON-LD YANG DIPERTAJAM (BlogPosting) ---
  // Gunakan BlogPosting karena lebih spesifik daripada Article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting", 
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/artikel/${article.slug}`
    },
    "headline": article.judul,
    "description": description,
    "image": article.gambar_url ? [article.gambar_url] : [`${siteUrl}/Image/Logo-jm.png`],
    "datePublished": new Date(article.published_at || article.created_at).toISOString(),
    "dateModified": new Date(article.created_at).toISOString(),
    "author": {
      "@type": "Organization",
      "name": "PT Jasa Mandiri Agency",
      "url": siteUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "PT Jasa Mandiri Agency",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/Image/Logo-jm.png` // Pastikan path logo benar
      }
    }
  };

  const initialContent = typeof article.konten === 'object' 
    ? JSON.stringify(article.konten) 
    : article.konten;

  return (
    <main className="container mx-auto p-4 md:p-8 pt-24">
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Breadcrumbs
        crumbs={[
          { name: 'Beranda', path: '/' },
          { name: 'Artikel', path: '/artikel' },
          { name: article.judul, path: `/artikel/${article.slug}` },
        ]}
      />
      
      <article>
        {/* Render Artikel */}
        <ArticleRenderer article={{ ...article, konten: initialContent }} />
      </article>
    </main>
  );
}
