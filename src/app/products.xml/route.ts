// src/app/products.xml/route.ts
import { createClient } from '@/utils/supabase/server';
import slugify from 'slugify';

/**

 * Helper untuk membersihkan teks agar aman untuk XML.
 * Mengubah '&' menjadi '&amp;', '<' menjadi '&lt;', dll
 */

function escapeXml(unsafe: string | null | undefined): string {
  if (!unsafe) return '';
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

/**
 * Helper untuk memetakan Kategori Pekerja ke Google Product Taxonomy.
 * PERBAIKAN: Semua karakter '&' diganti '&amp;' dan '>' diganti '&gt;'
 */
function getGoogleCategory(kategori: string): string {
  switch (kategori) {
    case 'Baby Sitter':
      // ID: 536 (Baby Care)
      return 'Baby &gt; Baby Care'; 
    
    case 'Perawat Lansia':
      // ID: 5235 (Health & Beauty > Health Care > Patient Care)
      return 'Health &amp; Beauty &gt; Health Care &gt; Patient Care';
    
    case 'Asisten Rumah Tangga':
      // ID: 630 (Home & Garden > ...)
      return 'Home &amp; Garden &gt; Household Supplies &gt; Household Cleaning Supplies';
    
    case 'Tukang Kebun':
      // ID: 657 (Home & Garden > Lawn & Garden)
      return 'Home &amp; Garden &gt; Lawn &amp; Garden';
    
    case 'Supir':
      // ID: 888 (Vehicles & Parts > ...)
      return 'Vehicles &amp; Parts &gt; Vehicle Parts &amp; Accessories';
      
    default:
      // Fallback
      return 'Home &amp; Garden';
  }
}

export async function GET() {
  const supabase = await createClient();
  
  // Ambil data pekerja yang statusnya 'Tersedia'
  const { data: workers } = await supabase
    .from('pekerja')
    .select('*')
    .eq('status', 'Tersedia');

  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
<channel>
<title>Stok Pekerja PT Jasa Mandiri</title>
<link>https://penyalurkerja.com</link>
<description>Daftar tenaga kerja ready stock (ART, Baby Sitter, Perawat Lansia) siap kerja.</description>
`;

  const xmlItems = workers?.map((worker) => {
    // 1. Buat Slug Kategori yang aman
    const categorySlug = slugify(worker.kategori, { lower: true, strict: true });
    
    // 2. URL Produk Final
    const url = `https://penyalurkerja.com/pekerja/${categorySlug}/${worker.slug}`;
    
    // 3. Tentukan Kategori Google yang pas (Sudah di-escape)
    const googleCategory = getGoogleCategory(worker.kategori);

    // 4. Deskripsi Produk (Dipotong max 150 karakter & di-escape)
    let cleanDescription = worker.deskripsi 
      ? worker.deskripsi.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' 
      : `Jasa ${worker.kategori} profesional dan terpercaya.`;
    
    // Escape semua field text
    cleanDescription = escapeXml(cleanDescription);
    const title = escapeXml(`Jasa ${worker.kategori} - ${worker.nama} (${worker.lokasi})`);
    const location = escapeXml(worker.lokasi);
    const category = escapeXml(worker.kategori);
    const brand = "PT Jasa Mandiri"; // Brand aman

    return `
<item>
<g:id>${worker.id}</g:id>
<g:title>${title}</g:title>
<g:description>${cleanDescription}</g:description>
<g:link>${url}</g:link>
<g:image_link>${worker.fotoUrl}</g:image_link>
<g:condition>new</g:condition>
<g:availability>in_stock</g:availability>
<g:price>${worker.gaji} IDR</g:price>
<g:brand>${brand}</g:brand>
<g:google_product_category>${googleCategory}</g:google_product_category>
<g:custom_label_0>${location}</g:custom_label_0>
<g:custom_label_1>${category}</g:custom_label_1>
</item>
    `;
  }).join('') || '';

  const xmlFooter = `
</channel>
</rss>`;

  return new Response(xmlHeader + xmlItems + xmlFooter, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}