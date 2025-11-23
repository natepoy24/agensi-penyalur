  // src/app/sitemap.ts
import { MetadataRoute } from 'next'
import slugify from 'slugify';
import { createClient } from '@/utils/supabase/server';

// Tipe data untuk item sitemap
type Pekerja = {
  kategori: string;
  slug: string;
  created_at: string;
}

type Artikel = {
  slug: string;
  created_at: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://penyalurkerja.com';
  const supabase = await createClient();

  // 1. Ambil data pekerja
  const { data: pekerja, error: pekerjaError } = await supabase
    .from('pekerja')
    .select('kategori, slug, created_at');

  let pekerjaUrls: MetadataRoute.Sitemap = [];
  if (pekerjaError) {
    console.error('Sitemap: Failed to fetch pekerja data.', pekerjaError);
  } else if (pekerja) {
    pekerjaUrls = pekerja.map((p) => {
      const kategoriSlug = slugify(p.kategori, { lower: true, strict: true });
      return {
        url: `${baseUrl}/pekerja/${kategoriSlug}/${p.slug}`,
        lastModified: new Date(p.created_at ?? Date.now()),
      };
    });
  }

  // 2. Ambil data artikel
  const { data: artikel, error: artikelError } = await supabase
    .from('artikel')
    .select('slug, created_at');

  let artikelUrls: MetadataRoute.Sitemap = [];
  if (artikelError) {
    console.error('Sitemap: Failed to fetch artikel data.', artikelError);
  } else if (artikel) {
    artikelUrls = artikel.map((a) => ({
      url: `${baseUrl}/artikel/${a.slug}`,
      lastModified: new Date(a.created_at ?? Date.now()),
    }));
  }

  // 3. Daftar halaman statis Anda
  const staticUrls = [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/tentang`, lastModified: new Date() },
    { url: `${baseUrl}/layanan`, lastModified: new Date() },
    { url: `${baseUrl}/pekerja`, lastModified: new Date() },
    { url: `${baseUrl}/artikel`, lastModified: new Date() },
    { url: `${baseUrl}/kontak`, lastModified: new Date() },
  ];

  // 4. Gabungkan semua URL
  return [...staticUrls, ...pekerjaUrls, ...artikelUrls];
}