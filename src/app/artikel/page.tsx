// src/app/artikel/page.tsx
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from '@/components/Breadcrumbs';
import FaqAccordion from '@/components/FaqAccordion';

export const metadata: Metadata = {
  title: "Blog & Pusat Edukasi: Panduan ART & Baby Sitter | Jasa Mandiri",
  description: "Temukan tips pengasuhan anak, panduan asisten rumah tangga (ART), dan edukasi cara tepat mengelola pekerja domestik. Dibawakan langsung oleh ahlinya.",
  alternates: {
    canonical: "https://penyalurkerja.com/artikel",
  }
};

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

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "url": "https://penyalurkerja.com/artikel",
    "name": "Edukasi Jasa Mandiri",
    "description": "Pusat informasi seputar pengasuhan anak, tips asisten rumah tangga, dan perawatan lansia."
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <div className="pt-16 pb-24 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <Breadcrumbs 
              crumbs={[
                { name: 'Beranda', path: '/' },
                { name: 'Artikel', path: '/artikel' },
              ]}
            />
            <h1 className="text-4xl md:text-5xl mt-8 font-black text-slate-900 tracking-tight leading-tight">
              Pusat Informasi & <span className="text-emerald-600">Edukasi</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
              Temukan tips, panduan, dan berita terbaru seputar layanan asisten rumah tangga, baby sitter, dan perawat lansia.
            </p>

            {/* Silo Internal Linking untuk Topical Authority */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link href="/layanan/baby-sitter" className="px-6 py-3 rounded-full border-2 border-emerald-100 bg-emerald-50 text-emerald-800 font-bold hover:bg-emerald-600 hover:border-emerald-600 hover:text-white transition shadow-sm">
                Tanya Baby Sitter
              </Link>
              <Link href="/layanan/art" className="px-6 py-3 rounded-full border-2 border-blue-100 bg-blue-50 text-blue-800 font-bold hover:bg-blue-600 hover:border-blue-600 hover:text-white transition shadow-sm">
                Butuh ART (Pembantu)
              </Link>
              <Link href="/layanan/perawat-lansia" className="px-6 py-3 rounded-full border-2 border-purple-100 bg-purple-50 text-purple-800 font-bold hover:bg-purple-600 hover:border-purple-600 hover:text-white transition shadow-sm">
                Cari Perawat Lansia
              </Link>
            </div>
          </div>

          {articles && articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
              {articles.map((article) => {
                // Pecah tag menjadi array
                const tagsArray = article.tags 
                  ? article.tags.split(',').map((t: string) => t.trim()).filter(Boolean) 
                  : [];

                return (
                  <Link href={`/artikel/${article.slug}`} key={article.id} className="group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                    
                    {/* Image Thumbnail */}
                    <div className="w-full aspect-[4/3] bg-slate-100 overflow-hidden relative">
                      <img 
                        src={article.gambar_url || "/Image/placeholder.png"} 
                        alt={article.judul} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      
                      {/* Badge Views di atas gambar */}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-white/50">
                        <span className="material-symbols-outlined text-[14px] text-emerald-600">visibility</span>
                        <span className="text-xs font-bold text-slate-800">{article.views || 0}</span>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col flex-1">
                      
                      {/* Tanggal Publish */}
                      <div className="text-xs font-bold text-emerald-600 mb-3 uppercase tracking-widest">
                        {new Date(article.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                      
                      <h3 className="text-2xl font-black text-slate-800 leading-tight mb-4 group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {article.judul}
                      </h3>

                      {/* MENAMPILKAN TAGS PADA CARD */}
                      <div className="mt-auto pt-6 border-t border-slate-100 flex flex-wrap gap-2">
                        {tagsArray.slice(0, 3).map((tag: string) => (
                          <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider rounded-lg border border-slate-200 group-hover:bg-emerald-50 group-hover:text-emerald-700 group-hover:border-emerald-200 transition-colors">
                            #{tag}
                          </span>
                        ))}
                        {tagsArray.length > 3 && (
                          <span className="px-3 py-1 bg-slate-50 text-slate-400 text-xs font-bold rounded-lg border border-slate-200">
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
            <div className="text-center py-24 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200 mb-24 max-w-4xl mx-auto">
              <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 block">article</span>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Belum ada artikel publik</h3>
              <p className="text-slate-500 font-light">Artikel yang diterbitkan akan muncul di sini.</p>
            </div>
          )}

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <FaqAccordion faqData={faqData} />
          </div>

        </div>
      </div>
    </main>
  );
}
