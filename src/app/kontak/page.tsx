// src/app/kontak/page.tsx
import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import KontakContent from '@/app/kontak/KontakContent';

export const metadata: Metadata = {
  title: 'Hubungi Kami | PT Jasa Mandiri Agency',
  description: 'Hubungi PT Jasa Mandiri Agency via WhatsApp atau kunjungi kantor kami di Jakarta Selatan. Buka setiap hari 07:00 - 22:00.',
};

interface FAQItem {
  question: string;
  answer: string;
}
const faqData: FAQItem[] = [
  {
    question: "Bagaimana cara menghubungi PT Jasa Mandiri?",
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

      <div className="pt-20 pb-20 px-4">
        <div className="container mx-auto">
          <Breadcrumbs 
            crumbs={[
              { name: 'Beranda', path: '/' },
              { name: 'Kontak', path: '/kontak' },
            ]}
          />
          {/* Judul Halaman */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-800">
              Hubungi Kami
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Kami siap membantu Anda. Silakan hubungi kami melalui informasi di bawah atau kirimkan pesan melalui formulir.
            </p>
          </div>

          <KontakContent />

        </div>
      </div>
    </main>
  );
}