// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import slugify from 'slugify';
import { createClient } from '@/utils/supabase/server';

// Daftar area target yang sama dengan di page.tsx
const TARGET_AREAS = [
  'pondok-indah', 'kemang', 'cilandak', 'lebak-bulus', 'kebayoran', 'kuningan', 'menteng', 
  'fatmawati', 'tb-simatupang', 'tanjung-barat', 'cinere', 'kelapa-gading', 'pik', 
  'pik-1', 'pik-2', 'pik-avenue', 'kembangan', 'bsd', 'bsd-city', 'serpong', 
  'tigaraksa', 'tenjo', 'jakarta-selatan', 'jakarta-barat', 'jakarta-utara', 
  'jakarta-timur', 'jakarta-pusat', 'depok', 'bogor', 'bekasi', 'cibubur', 'bintaro'
];

const DEFAULT_LOWONGAN_SLUGS = [
  'lowongan-baby-sitter-live-in-jakarta',
  'lowongan-asisten-rumah-tangga-live-in-jakarta',
  'lowongan-perawat-lansia-live-in-jakarta'
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

  // 3. Ambil data lowongan_kerja (Mendukung lowongan 'Buka' & 'Tutup' untuk perayapan Google)
  const { data: lowongan, error: lowonganError } = await supabase
    .from('lowongan_kerja')
    .select('slug, updated_at, date_posted, is_evergreen, status');

  let lowonganUrls: MetadataRoute.Sitemap = [];
  if (!lowonganError && lowongan && lowongan.length > 0) {
    lowonganUrls = lowongan.map((l) => {
      const dateVal = l.updated_at || l.date_posted;
      const validLastModified = l.is_evergreen || !dateVal ? new Date() : new Date(dateVal);
      return {
        url: `${baseUrl}/lowongan-kerja/${l.slug}`,
        lastModified: validLastModified,
        changeFrequency: 'weekly',
        priority: 0.8,
      };
    });
  } else {
    // Fallback URL jika DB belum terisi data lowongan
    lowonganUrls = DEFAULT_LOWONGAN_SLUGS.map((slug) => ({
      url: `${baseUrl}/lowongan-kerja/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  }

  // 4. Generate URL Area (Programmatic SEO)
  const areaUrls: MetadataRoute.Sitemap = TARGET_AREAS.map((slug) => ({
    url: `${baseUrl}/area/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  // 5. Halaman Statis Utama
  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/tentang`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/layanan`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/pekerja`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/artikel`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/kontak`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/layanan/art`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/layanan/baby-sitter`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/layanan/perawat-lansia`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/lowongan-kerja`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/syarat-ketentuan`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  // 6. Gabungkan semua
  return [...staticUrls, ...areaUrls, ...pekerjaUrls, ...artikelUrls, ...lowonganUrls];
}