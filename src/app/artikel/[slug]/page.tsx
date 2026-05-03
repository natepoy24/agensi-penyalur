// src/app/artikel/[slug]/page.tsx
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import ArticleRenderer from './ArticleRenderer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import type { Metadata, ResolvingMetadata } from 'next';
import { cache } from 'react';

export const revalidate = 3600; // Revalidate setiap 1 jam

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://penyalurkerja.com';

// 🔥 PERBAIKAN 1: Update Tipe Props untuk Next.js 15
// params sekarang adalah Promise, bukan objek langsung
type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * --- OPTIMASI CACHING (DEDUPING) ---
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
 * Helper untuk parse deskripsi dari konten Lexical atau string
 */
interface LexicalNode {
  type: string;
  children?: LexicalNode[];
  text?: string;
}

function generateDescriptionFromContent(content: string | { root: { children: LexicalNode[] } }): string {
  const defaultDescription = 'Baca artikel lengkap seputar tenaga kerja, baby sitter, dan ART terpercaya dari Jasa Mandiri Agency.';

  try {
    const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;

    if (parsedContent?.root?.children) {
      const firstParagraph = parsedContent.root.children.find(
        (node: LexicalNode) => node.type === 'paragraph'
      );
      if (firstParagraph?.children) {
        const textContent = firstParagraph.children
          .filter((child: LexicalNode) => child.type === 'text')
          .map((child: LexicalNode) => child.text)
          .join(' ');

        if (textContent) {
          return textContent.length > 155
            ? textContent.substring(0, 155) + '...'
            : textContent;
        }
      }
    }
  } catch (_e) {
    // Silent fail, gunakan default
  }
  return defaultDescription;
}

// --- GENERATE METADATA ---
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // 🔥 PERBAIKAN 2: Await params sebelum mengambil propertinya
  const { slug } = await params;

  const article = await getArticle(slug);

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
    title: article.judul,
    description: description,
    keywords: ['penyalur kerja', 'baby sitter', 'ART', 'lowongan kerja', article.judul],
    authors: [{ name: 'Jasa Mandiri Agency' }],
    creator: 'Jasa Mandiri Agency',
    publisher: 'Jasa Mandiri Agency',

    alternates: {
      canonical: pageUrl,
    },

    openGraph: {
      title: article.judul,
      description: description,
      url: pageUrl,
      siteName: 'PenyalurKerja.com',
      locale: 'id_ID',
      type: 'article',
      publishedTime: article.published_at || article.created_at,
      modifiedTime: article.created_at,
      authors: ['Jasa Mandiri Agency'],
      images: [...articleImage, ...previousImages],
    },

    twitter: {
      card: 'summary_large_image',
      title: article.judul,
      description: description,
      images: articleImage,
    },

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

// --- HALAMAN UTAMA ---
export default async function ArtikelDetailPage({ params }: Props) {
  // 🔥 PERBAIKAN 3: Await params sebelum mengambil propertinya
  const { slug } = await params;

  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const description = generateDescriptionFromContent(article.konten);

  // Schema JSON-LD (BlogPosting)
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
      "name": "Jasa Mandiri Agency",
      "url": siteUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "Jasa Mandiri Agency",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/Image/Logo-jm.png`
      }
    }
  };

  const initialContent = typeof article.konten === 'object'
    ? JSON.stringify(article.konten)
    : article.konten;

  const tagsArray = article.tags
    ? article.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
    : [];

  return (
    <main className="container mx-auto p-4 md:p-8 pt-24 mb-24 max-w-7xl font-['Inter']">
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mb-12 max-w-4xl mx-auto px-0 md:px-8">
        <Breadcrumbs
          crumbs={[
            { name: 'Beranda', path: '/' },
            { name: 'Artikel', path: '/artikel' },
            { name: article.judul, path: `/artikel/${article.slug}` },
          ]}
        />
      </div>

      <article>
        {/* Render Artikel dengan layout Container Putih besar */}
        <ArticleRenderer article={{ ...article, konten: initialContent }} />
      </article>

      {/* --- KOMPONEN CALL TO ACTION (BOTTOM OF FUNNEL SEO) --- */}
      <div className="max-w-4xl mx-auto px-0 md:px-8">
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 rounded-[3rem] p-10 md:p-14 text-center shadow-[0_20px_60px_-15px_rgba(5,150,105,0.3)] border border-emerald-800 overflow-hidden relative">
          {/* Dekorasi Aksent (Visual Speed/CSS) */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

          {(() => {
            // Sistem Logika untuk menyusun tawaran dinamis berbasis Tags artikel
            const lowerTags = tagsArray.map((t: string) => t.toLowerCase());
            const isBaby = lowerTags.some((t: string) => t.includes('bayi') || t.includes('suster') || t.includes('anak') || t.includes('newborn') || t.includes('balita') || t.includes('baby'));
            const isLansia = lowerTags.some((t: string) => t.includes('lansia') || t.includes('jompo') || t.includes('orang tua') || t.includes('perawat'));

            let ctaTitle = "Solusi Cepat Urusan Rumah Tangga Bebas Pusing";
            let ctaDesc = "Tak mau pusing mengerjakan urusan bersih-bersih dan mengatur rumah sendiri? Konsultasikan kandidat ART terpercaya Anda pada Admin kami secara gratis.";
            let ctaLink = "/layanan/art";
            let ctaBtn = "Cari Asisten Rumah Tangga (ART)";
            let waUrl = "https://api.whatsapp.com/send?phone=6282122415552&text=Halo%20Admin,%20saya%20butuh%20ART%20sekarang.";

            if (isBaby) {
              ctaTitle = "Masa Tumbuh Kembang Anak Lebih Maksimal Bersama Suster Tersertifikasi";
              ctaDesc = "Beban kerja tinggi namun khawatir buah hati dirawat orang sembarangan? Tenangkan diri, kami memiliki katalog Baby Sitter yang telah lolos 4 lapis seleksi psikologis.";
              ctaLink = "/layanan/baby-sitter";
              ctaBtn = "Pilih Profil Baby Sitter";
              waUrl = "https://api.whatsapp.com/send?phone=6282122415552&text=Halo%20Admin,%20saya%20butuh%20info%20Baby%20Sitter%20sekarang.";
            } else if (isLansia) {
              ctaTitle = "Perawatan Orang Tua Terkasih Lebih Optimal Tanpa Meninggalkan Karir Anda";
              ctaDesc = "Ciptakan kemandirian dengan mendatangkan perawat lansia profesional untuk menjaga kesehatan dan nutrisi harian di rumah.";
              ctaLink = "/layanan/perawat-lansia";
              ctaBtn = "Lihat Kandidat Perawat Lansia";
              waUrl = "https://api.whatsapp.com/send?phone=6282122415552&text=Halo%20Admin,%20saya%20butuh%20Perawat%20Lansia%20sekarang.";
            }

            return (
              <div className="relative z-10 max-w-2xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4 leading-snug">
                  {ctaTitle}
                </h3>
                <p className="text-emerald-50 mb-8 text-base md:text-lg opacity-90 leading-relaxed font-light">
                  {ctaDesc}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-full shadow-lg transition-transform hover:-translate-y-1 whitespace-nowrap">
                    Tanya Ketersediaan (WhatsApp)
                  </a>
                  <Link href={ctaLink} className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-emerald-400 text-white font-extrabold rounded-full hover:bg-emerald-800 transition-colors whitespace-nowrap">
                    {ctaBtn}
                  </Link>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </main>
  );
}