// src/app/artikel/page.tsx
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';

export const revalidate = 3600; // Revalidate data setiap 1 jam

export default async function ArtikelListPage() {
  const supabase = await createClient();
  const { data: articles, error } = await supabase
    .from('artikel')
    .select('id, judul, slug, gambar_url, published_at')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles:', error);
  }

  return (
    <main className="container mx-auto p-8 pt-24">
          <Breadcrumbs 
            crumbs={[
              { name: 'Beranda', path: '/' },
              { name: 'Artikel', path: '/artikel' },
            ]}
          />
      <h1 className="text-4xl font-bold text-slate-800 mb-2">Artikel & Berita</h1>
      <p className="text-slate-600 mb-12">
        Informasi terkini seputar tenaga kerja domestik dan tips bermanfaat untuk keluarga Anda.
      </p>

      {articles && articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link href={`/artikel/${article.slug}`} key={article.id} className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src={article.gambar_url}
                  alt={`Gambar untuk ${article.judul}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-slate-500 mb-2">
                  {new Date(article.published_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <h2 className="text-xl font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">
                  {article.judul}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-500 py-16">Belum ada artikel yang dipublikasikan.</p>
      )}
    </main>
  );
}
