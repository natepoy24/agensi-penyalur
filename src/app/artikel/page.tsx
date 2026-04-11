// src/app/artikel/page.tsx
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Breadcrumbs from '@/components/Breadcrumbs';

// Memastikan data artikel selalu segar
export const revalidate = 60; 

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

export default async function ArtikelDaftarPage() {
  const supabase = await createClient();

  // Hanya ambil artikel yang sudah ter-publish (kategori = true)
  const { data: articles } = await supabase
    .from("artikel")
    .select("id, judul, slug, gambar_url, published_at, views, tags")
    .eq("kategori", true) 
    .order("published_at", { ascending: false });

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
    <main className="max-w-7xl mx-auto py-24 px-6 font-['Inter'] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="mb-8">
        <Breadcrumbs 
          crumbs={[
            { name: 'Beranda', path: '/' },
            { name: 'Artikel', path: '/artikel' },
          ]}
        />
      </div>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 font-['Plus_Jakarta_Sans'] tracking-tight mb-4">
          Pusat Informasi & <span className="text-emerald-600">Edukasi</span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          Temukan tips, panduan, dan berita terbaru seputar layanan asisten rumah tangga, baby sitter, dan perawat lansia.
        </p>
      </div>

      {articles && articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => {
            // Pecah tag menjadi array
            const tagsArray = article.tags 
              ? article.tags.split(',').map((t: string) => t.trim()).filter(Boolean) 
              : [];

            return (
              <Link href={`/artikel/${article.slug}`} key={article.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                
                {/* Image Thumbnail */}
                <div className="w-full aspect-[4/3] bg-slate-100 overflow-hidden relative">
                  <img 
                    src={article.gambar_url || "/Image/placeholder.png"} 
                    alt={article.judul} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  
                  {/* Badge Views di atas gambar */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                    <span className="material-symbols-outlined text-[14px] text-emerald-600">visibility</span>
                    <span className="text-xs font-bold text-slate-700">{article.views || 0}</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  
                  {/* Tanggal Publish */}
                  <div className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                    {new Date(article.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 font-['Plus_Jakarta_Sans'] leading-tight mb-4 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {article.judul}
                  </h3>

                  {/* MENAMPILKAN TAGS PADA CARD */}
                  <div className="mt-auto pt-4 border-t border-slate-50 flex flex-wrap gap-2">
                    {tagsArray.slice(0, 3).map((tag: string) => (
                      <span key={tag} className="px-2.5 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider rounded-md border border-slate-100 group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:border-emerald-100 transition-colors">
                        #{tag}
                      </span>
                    ))}
                    {tagsArray.length > 3 && (
                      <span className="px-2.5 py-1 bg-slate-50 text-slate-400 text-[10px] font-bold rounded-md border border-slate-100">
                        +{tagsArray.length - 3}
                      </span>
                    )}
                  </div>
                  
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
          <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">article</span>
          <h3 className="text-xl font-bold text-slate-700 mb-2">Belum ada artikel publik</h3>
          <p className="text-slate-500">Artikel yang diterbitkan akan muncul di sini.</p>
        </div>
      )}

      {/* FAQ Section */}
      <section id="faq" className="max-w-4xl mx-auto mt-24">
        <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center font-['Plus_Jakarta_Sans']">
          Pertanyaan Umum
        </h2>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <details key={index} className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <summary className="flex justify-between items-center font-bold cursor-pointer text-slate-700">
                {item.question}
                <span className="ml-4 transition-transform duration-200 group-open:rotate-180 text-emerald-600">▼</span>
              </summary>
              <p className="mt-4 text-slate-500 leading-relaxed text-sm">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

    </main>
  );
}
