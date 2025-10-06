  // src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { createClient } from '@/utils/supabase/server'
import slugify from 'slugify';

// Tipe data untuk pekerja (sederhana)
type Pekerja = {
  kategori: string;
  slug: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // GANTI INI dengan URL domain Anda saat sudah live
  const baseUrl = 'https://penyalurkerja.com'; 

  // 1. Ambil semua data pekerja untuk membuat URL dinamis
  const supabase = await createClient();
  const { data: pekerja, error } = await supabase
    .from('pekerja')
    .select('kategori, slug');

  if (error) {
    console.error('Error fetching data for sitemap:', error);
  }

  const pekerjaUrls = pekerja?.map((p: Pekerja) => {
    const kategoriSlug = slugify(p.kategori, { lower: true, strict: true });
    return {
      url: `${baseUrl}/pekerja/${kategoriSlug}/${p.slug}`,
      lastModified: new Date(),
    }
  }) ?? []; // Jika 'pekerja' null, kembalikan array kosong

  // 2. Daftar halaman statis Anda
  const staticUrls = [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/tentang`, lastModified: new Date() },
    { url: `${baseUrl}/layanan`, lastModified: new Date() },
    { url: `${baseUrl}/layanan/art`, lastModified: new Date() },
    { url: `${baseUrl}/layanan/baby-sitter`, lastModified: new Date() },
    { url: `${baseUrl}/layanan/perawat-lansia`, lastModified: new Date() },
    { url: `${baseUrl}/pekerja`, lastModified: new Date() },
    { url: `${baseUrl}/kontak`, lastModified: new Date() },
  ];

  // 3. Gabungkan halaman statis dan dinamis
  return [
    ...staticUrls,
    ...pekerjaUrls
  ];
}