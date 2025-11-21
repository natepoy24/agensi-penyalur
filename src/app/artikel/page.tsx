// src/app/artikel/page.tsx
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '@/components/Breadcrumbs';

export const revalidate = 3600; // Revalidate data setiap 1 jam

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Seberapa sering artikel baru diterbitkan?",
    answer: "Kami berusaha untuk menerbitkan artikel baru secara berkala, membahas tips, berita, dan wawasan terbaru seputar dunia kerja domestik dan pengasuhan anak.",
  },
  {
    question: "Bisakah saya menyarankan topik untuk artikel selanjutnya?",
    answer: "Tentu saja! Kami sangat menghargai masukan dari pembaca. Silakan kirimkan saran topik Anda melalui halaman kontak kami, dan tim redaksi kami akan mempertimbangkannya.",
  },
];

export default async function ArtikelListPage() {
  const supabase = await createClient();
  const { data: articles, error } = await supabase
    .from('artikel')
    .select('id, judul, slug, gambar_url, published_at')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles:', error);
  }

  // Buat skema FAQ secara manual
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className="container mx-auto p-8 pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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

      {/* FAQ Section */}
      <section id="faq" className="max-w-4xl mx-auto mt-20">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
          Pertanyaan Umum Seputar Artikel
        </h2>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <details key={index} className="group bg-white p-6 rounded-lg shadow-sm border">
              <summary className="flex justify-between items-center font-semibold cursor-pointer text-gray-800">
                {item.question}
                <span className="ml-4 transition-transform duration-200 group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

    </main>
  );
}
