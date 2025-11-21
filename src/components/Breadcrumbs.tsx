// src/components/Breadcrumbs.tsx
"use client";

import Link from 'next/link';

// Definisikan tipe untuk satu "remah roti" (crumb)
type Crumb = {
  name: string;
  path: string;
};

// Komponen sekarang menerima array dari Crumb
type BreadcrumbsProps = {
  crumbs?: Crumb[]; // Dibuat opsional agar tidak error jika lupa diisi
};

export default function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  // Jika 'crumbs' tidak ada atau kosong, jangan tampilkan apa-apa
  if (!crumbs || crumbs.length === 0) {
    return null;
  }

  // Buat skema Breadcrumbs secara manual
  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      // Pastikan URL lengkap
      item: `https://penyalurkerja.com${crumb.path}`,
    })),
  };

  return (
    <>
      {/* Sisipkan skema Breadcrumbs JSON-LD secara langsung */}
      {breadcrumbsSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
        />
      )}
      <nav className="bg-blue-50 py-3 px-4 rounded-lg mb-8">
      <ol className="flex items-center gap-2 text-sm text-gray-600">
        {crumbs.map((crumb, index) => {
          // Cek apakah ini adalah crumb terakhir dalam daftar
          const isLast = index === crumbs.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {/* Jika bukan yang terakhir, tampilkan sebagai link */}
              {!isLast ? (
                <Link href={crumb.path} className="text-blue-700 hover:underline font-medium">
                  {crumb.name}
                </Link>
              ) : (
                /* Jika yang terakhir, tampilkan sebagai teks biasa */
                <span className="font-semibold text-gray-800" aria-current="page">
                  {crumb.name}
                </span>
              )}

              {/* Tampilkan pemisah '/' jika bukan yang terakhir */}
              {!isLast && (
                <span className="text-gray-400">/</span>
              )}
            </li>
          );
        })}
      </ol>
      </nav>
    </>
  );
}