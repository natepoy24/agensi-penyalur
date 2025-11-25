// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import slugify from 'slugify';
import { createClient } from '@/utils/supabase/server';

// Daftar area target yang sama dengan di page.tsx
// Ini penting agar Google tahu URL ini valid untuk di-crawl
const TARGET_AREAS = [
  'pondok-indah', 'kemang', 'cilandak', 'lebak-bulus', 'kebayoran', 'kuningan', 'menteng', 
  'fatmawati', 'tb-simatupang', 'tanjung-barat', 'cinere', 'kelapa-gading', 'pik', 
  'pik-1', 'pik-2', 'pik-avenue', 'kembangan', 'bsd', 'bsd-city', 'serpong', 
  'tigaraksa', 'tenjo', 'jakarta-selatan', 'jakarta-barat', 'jakarta-utara', 
  'jakarta-timur', 'jakarta-pusat', 'depok', 'bogor', 'bekasi', 'cibubur', 'bintaro'
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://penyalurkerja.com';
  const supabase = await createClient();

  // 1. Ambil data pekerja (Dinamis dari DB)
  const { data: pekerja, error: pekerjaError } = await supabase
    .from('pekerja')
    .select('kategori, slug, created_at');

  let pekerjaUrls: MetadataRoute.Sitemap = [];
  if (!pekerjaError && pekerja) {
    pekerjaUrls = pekerja.map((p) => {
      const kategoriSlug = slugify(p.kategori, { lower: true, strict: true });
      return {
        url: `${baseUrl}/pekerja/${kategoriSlug}/${p.slug}`,
        lastModified: new Date(p.created_at ?? Date.now()),
        changeFrequency: 'weekly',
        priority: 0.8,
      };
    });
  }

  // 2. Ambil data artikel (Dinamis dari DB)
  const { data: artikel, error: artikelError } = await supabase
    .from('artikel')
    .select('slug, created_at');

  let artikelUrls: MetadataRoute.Sitemap = [];
  if (!artikelError && artikel) {
    artikelUrls = artikel.map((a) => ({
      url: `${baseUrl}/artikel/${a.slug}`,
      lastModified: new Date(a.created_at ?? Date.now()),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  }

  // 3. Generate URL Area (Programmatic SEO)
  const areaUrls: MetadataRoute.Sitemap = TARGET_AREAS.map((slug) => ({
    url: `${baseUrl}/area/${slug}`,
    lastModified: new Date(), // Selalu fresh
    changeFrequency: 'monthly',
    priority: 0.9, // Prioritas tinggi karena ini Landing Page jualan
  }));

  // 4. Halaman Statis Utama
  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/tentang`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/layanan`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/pekerja`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 }, // Halaman list pekerja sering update
    { url: `${baseUrl}/artikel`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/kontak`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/layanan/art`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/layanan/baby-sitter`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/layanan/perawat-lansia`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/lowongan-kerja`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
      { url: `${baseUrl}/syarat-ketentuan`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  // 5. Gabungkan semua
  return [...staticUrls, ...areaUrls, ...pekerjaUrls, ...artikelUrls];
}