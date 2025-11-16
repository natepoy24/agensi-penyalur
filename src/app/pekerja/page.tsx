// src/app/pekerja/page.tsx
import PekerjaCard, { type PekerjaProps } from '@/components/PekerjaCard';
import { createClient } from '@/utils/supabase/server';
import FilterControls from '@/components/FilterControls';
import Breadcrumbs from '@/components/Breadcrumbs';
import SchemaInjector from '@/components/SchemaInjector';
import { generateSchema, type FAQItem } from '@/app/lib/schemaGenerator';

export const dynamic = 'force-dynamic';

const faqData: FAQItem[] = [
  {
    question: "Apakah data pekerja di halaman ini selalu terbaru?",
    answer: "Ya, kami memperbarui status ketersediaan pekerja secara real-time. Pekerja dengan status 'Tersedia' siap untuk proses penempatan.",
  },
  {
    question: "Bagaimana cara saya memulai proses wawancara dengan calon pekerja?",
    answer: "Setelah menemukan kandidat yang Anda minati, silakan hubungi kami melalui WhatsApp dengan menyebutkan kode atau nama pekerja. Tim kami akan segera mengatur jadwal wawancara untuk Anda.",
  },
];

export default async function PekerjaPage(
  props: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
  }
) {
  const searchParams = await props.searchParams;
  // Ekstrak semua nilai dari 'searchParams' SEBELUM await pertama
  const kategori = searchParams.kategori;
  const status = searchParams.status;
  const search = searchParams.search;

  const supabase = await createClient();
  let daftarPekerja: PekerjaProps[] = [];

  let query = supabase.from('pekerja').select('*');

  // Gunakan variabel yang sudah diekstrak
  if (kategori) {
    query = query.eq('kategori', kategori);
  }
  if (status) {
    query = query.eq('status', status);
  }
  if (search) {
    query = query.ilike('nama', `%${search}%`);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching pekerja:', error);
  } else if (data) {
    daftarPekerja = data as PekerjaProps[];
  }

  const faqSchema = generateSchema("faq", faqData);

  return (
    <main>
      {/* Inject Schema FAQ */}
      <SchemaInjector schema={faqSchema} />

      <div className="pt-20 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
          <Breadcrumbs 
            crumbs={[
              { name: 'Beranda', path: '/' },
              { name: 'Pekerja', path: '/pekerja' },
            ]}
          />
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-800">Tenaga Kerja Profesional Kami Yang Siap Kerja</h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Temukan partner terpercaya untuk membantu kebutuhan keluarga Anda.
            </p>
          </div>
          <FilterControls />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {daftarPekerja.length > 0 ? (
              daftarPekerja.map((pekerja) => (
                <PekerjaCard key={pekerja.id} pekerja={pekerja} />
              ))
            ) : (
              <p className="col-span-full text-center text-slate-500">
                Tidak ada pekerja yang cocok dengan kriteria Anda.
              </p>
            )}
          </div>

          {/* FAQ Section */}
          <section id="faq" className="max-w-4xl mx-auto mt-20">
            <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
              Pertanyaan Umum Seputar Daftar Pekerja
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

        </div>
      </div>
    </main>
  );
}