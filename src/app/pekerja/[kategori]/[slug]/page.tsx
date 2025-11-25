// src/app/pekerja/[kategori]/[slug]/page.tsx
import { User, Users, Briefcase, MapPin, Sparkles, Wallet, Bike, Dog, Heart, BookOpen, Utensils, Languages, XCircle } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { type PekerjaProps } from '@/components/PekerjaCard';
import ImageLightbox from '@/components/ImageLightbox';
import Breadcrumbs from '@/components/Breadcrumbs';
import slugify from 'slugify'; // Impor slugify
import type { Metadata, ResolvingMetadata } from 'next';

// Fungsi untuk fetch data (bisa digunakan ulang)
async function getPekerja(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('pekerja')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error mengambil detail pekerja:', error.message);
    return null;
  }
  return data as PekerjaProps | null;
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const pekerja = await getPekerja(params.slug);

  if (!pekerja) {
    return { title: 'Pekerja Tidak Ditemukan' };
  }

  // Judul yang Menjual & Unik
  const title = `Profil ${pekerja.nama} - ${pekerja.kategori} Asal ${pekerja.lokasi} | PT Jasa Mandiri Agency`;
  
  // Deskripsi yang mengandung kata kunci
  const description = `Lihat profil lengkap ${pekerja.nama}, ${pekerja.kategori} berpengalaman ${pekerja.pengalaman} tahun asal ${pekerja.lokasi}. Gaji Rp ${pekerja.gaji?.toLocaleString('id-ID')}. Status: ${pekerja.status}.`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [pekerja.fotoUrl], // Agar foto wajah muncul saat share WA
    },
  };
}


// Komponen sekarang menerima 'kategori' dan 'slug' dari params
export default async function PekerjaDetailPage({ params }: { params: { kategori: string, slug: string } }) {
  const pekerja = await getPekerja(params.slug);

  if (!pekerja) {
    redirect('/pekerja');
  }

  // Buat slug untuk kategori (untuk link filter)
  const kategoriSlug = slugify(pekerja.kategori, { lower: true, strict: true });
  const whatsappUrl = `https://api.whatsapp.com/send?phone=6282122415552&text=${encodeURIComponent(`Halo, apakah ${pekerja.kategori} dengan nama ${pekerja.nama} masih tersedia?`)}`;

  // ================================
  // 🔥 SCHEMA PERSON
  // ================================
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": pekerja.nama,
    "image": pekerja.fotoUrl,
    "jobTitle": pekerja.kategori,
    "gender":  "Female", // Default to Female if not specified
    "age": pekerja.umur,
    "nationality": pekerja.suku,
    "description": pekerja.deskripsi,
    "homeLocation": {
      "@type": "Place",
      "name": pekerja.lokasi
    },
    "skills": pekerja.keterampilan?.split(",").map(s => s.trim()),
    "knowsLanguage": pekerja.bahasa_asing?.join(", "),
    "worksFor": {
      "@type": "Organization",
      "name": "PT Jasa Mandiri Agency",
      "url": "https://penyalurkerja.com",
      "logo": "https://penyalurkerja.com/Image/Logo-jm.png" // Pastikan path logo ini benar
    }
  };

  // ================================
  // 🔥 SCHEMA PRODUCT
  // ================================
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product", // Ganti dari Offer ke Product
    "name": `Jasa ${pekerja.kategori} - ${pekerja.nama}`,
    "image": pekerja.fotoUrl,
    "description": `Layanan ${pekerja.kategori} profesional oleh ${pekerja.nama}, pengalaman ${pekerja.pengalaman} tahun.`,
    "brand": {
      "@type": "Brand",
      "name": "PT Jasa Mandiri Agency"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://penyalurkerja.com/pekerja/${kategoriSlug}/${pekerja.slug}`,
      "priceCurrency": "IDR",
      "price": pekerja.gaji,
      "availability": pekerja.status === "Tersedia" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  const formatRupiah = (angka: number | null | undefined) => {
    if (angka === null || typeof angka === 'undefined') return 'N/A';
    return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const keterampilanList = pekerja.keterampilan?.split(',').map((skill: string) => skill.trim()).filter((skill: string) => skill);
  const kekuranganList = pekerja.kekurangan?.split(',').map((item: string) => item.trim()).filter((item: string) => item);

  return (
    <main>
      {/* ================================ */}
      {/* 🔥 SISIPKAN JSON-LD SCHEMA DI SINI */}
      {/* ================================ */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      <div className="bg-slate-50 pt-24 pb-20 px-4">
        <div className="container mx-auto">
          
          {/* --- PERBAIKAN BREADCRUMBS DI SINI --- */}
          <Breadcrumbs 
            crumbs={[
              { name: 'Beranda', path: '/' },
              { name: 'Pekerja', path: '/pekerja' },
              { name: pekerja.kategori, path: `/pekerja?kategori=${pekerja.kategori}` }, // Link ke halaman filter
              { name: pekerja.nama, path: `/pekerja/${kategoriSlug}/${pekerja.slug}` }
            ]}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">   
            {/* Kolom Kiri: Foto dengan Lightbox */}
            <div className="md:col-span-1">
              <ImageLightbox src={pekerja.fotoUrl} alt={`Foto ${pekerja.nama}`} />
            </div>

            {/* Kolom Kanan: Detail Informasi */}
            <div className="md:col-span-2 bg-white p-8 rounded-lg shadow-lg">
              <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${pekerja.status === 'Tersedia' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {pekerja.status}
              </span>
              <h1 className="mt-4 text-4xl font-serif font-bold text-slate-800">{pekerja.nama}</h1>
              <h2 className="mt-2 text-xl font-semibold text-emerald-700">{pekerja.kategori}</h2>
              
              {/* --- 2. PERBAIKAN STRUKTUR DIV DI SINI --- */}
              <div className="mt-6 border-t pt-6 text-slate-600 space-y-4">
                <div className="flex items-center gap-3"><User /><span>Usia: <strong>{pekerja.umur} tahun</strong></span></div>
                <div className="flex items-center gap-3"><Users /><span>Suku: <strong>{pekerja.suku}</strong></span></div>
                <div className="flex items-center gap-3"><Briefcase /><span>Pengalaman: <strong>{pekerja.pengalaman} tahun</strong></span></div>
                <div className="flex items-center gap-3"><MapPin /><span>Kota Asal: <strong>{pekerja.lokasi}</strong></span></div>
                <div className="flex items-center gap-3"><Wallet /><span>Gaji: <strong>Rp {formatRupiah(pekerja.gaji)} / bulan</strong></span></div>
                {pekerja.status_perkawinan && <div className="flex items-center gap-3"><Heart /><span>Status Perkawinan: <strong>{pekerja.status_perkawinan}</strong></span></div>}
                {pekerja.agama && <div className="flex items-center gap-3"><BookOpen /><span>Agama: <strong>{pekerja.agama}</strong></span></div>}
              </div>

              {/* --- Fieldset Kemampuan Khusus BARU --- */}
              <fieldset className="mt-6 border-t pt-2">
                <legend className="text-lg font-bold text-slate-800 mb-3">Kemampuan & Informasi Tambahan</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm text-slate-600">
                  {pekerja.keahlian_khusus && <div className="flex items-start gap-2"><Sparkles className="w-4 h-4 mt-1 shrink-0 text-emerald-600"/><div><strong>Keahlian Khusus:</strong> {pekerja.keahlian_khusus}</div></div>}
                  {pekerja.bahasa_asing && pekerja.bahasa_asing.length > 0 && <div className="flex items-start gap-2"><Languages className="w-4 h-4 mt-1 shrink-0 text-emerald-600"/><div><strong>Bahasa Asing:</strong> {pekerja.bahasa_asing.join(', ')}</div></div>}
                  {pekerja.masakan_khusus && <div className="flex items-start gap-2"><Utensils className="w-4 h-4 mt-1 shrink-0 text-emerald-600"/><div><strong>Masakan Khusus:</strong> {pekerja.masakan_khusus}</div></div>}
                  <div className="flex items-start gap-2"><Bike className="w-4 h-4 mt-1 shrink-0 text-emerald-600"/><div><strong>Bisa Bawa Motor:</strong> {pekerja.bisa_bawa_motor ? 'Ya' : 'Tidak'}</div></div>
                  <div className="flex items-start gap-2"><Dog className="w-4 h-4 mt-1 shrink-0 text-emerald-600"/><div><strong>Takut Anjing:</strong> {pekerja.takut_anjing ? 'Ya' : 'Tidak'}</div></div>
                  <div className="flex items-start gap-2"><Utensils className="w-4 h-4 mt-1 shrink-0 text-emerald-600"/><div><strong>Bisa Masak Babi:</strong> {pekerja.bisa_masak_babi ? 'Ya' : 'Tidak'}</div></div>
                </div>
              </fieldset>

              {keterampilanList && keterampilanList.length > 0 && (
                <div className="mt-6 border-t pt-6">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-600" /> Keterampilan
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {keterampilanList.map((s: string, i: number) => (
                      <span key={i} className="bg-slate-100 text-slate-700 text-sm font-medium px-3 py-1 rounded-full">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {kekuranganList && kekuranganList.length > 0 && (
                <div className="mt-6 border-t pt-6">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-600" />
                    Kekurangan
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {kekuranganList.map((item: string, index: number) => (
                      <span key={index} className="bg-slate-100 text-slate-700 text-sm font-medium px-3 py-1 rounded-full">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 border-t pt-6">
                <h3 className="text-lg font-bold text-slate-800">Tentang {pekerja.nama.split(' ')[0]}</h3>
                <p className="mt-2 text-slate-600">{pekerja.deskripsi}</p>
              </div>

              <div className="mt-8 text-right">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-700 transition-colors"
                >
                  Jadwalkan Wawancara
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}