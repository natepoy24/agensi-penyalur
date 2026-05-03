// src/app/kontak/page.tsx
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import KontakContent from '@/app/kontak/KontakContent';

export const metadata: Metadata = {
  title: 'Hubungi Kami | Jasa Mandiri Agency',
  description: 'Hubungi Jasa Mandiri Agency via WhatsApp atau kunjungi kantor kami di Jakarta Selatan. Buka setiap hari 07:00 - 22:00.',
};

interface FAQItem {
  question: string;
  answer: string;
}
const faqData: FAQItem[] = [
  {
    question: "Bagaimana cara menghubungi Jasa Mandiri?",
    answer: "Anda bisa menghubungi kami melalui WhatsApp di nomor 0821-2241-5552 atau 0813-2333-7872. Anda juga bisa datang langsung ke kantor kami sesuai alamat yang tertera.",
  },
  {
    question: "Apa jam operasional kantor?",
    answer: "Kantor kami buka setiap hari, Senin hingga Minggu, dari pukul 07:00 hingga 22:00 WIB.",
  },
];

export default function KontakPage() {
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
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="pt-16 pb-24 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <Breadcrumbs 
              crumbs={[
                { name: 'Beranda', path: '/' },
                { name: 'Kontak', path: '/kontak' },
              ]}
            />
            <h1 className="text-4xl md:text-5xl mt-8 font-black text-slate-900 tracking-tight leading-tight">
              Hubungi Kami
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
              Kami siap membantu Anda. Silakan hubungi kami melalui informasi di bawah atau kirimkan pesan melalui formulir.
            </p>
          </div>

          <KontakContent />

        </div>
      </div>
    </main>
  );
}