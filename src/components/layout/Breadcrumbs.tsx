// src/components/Breadcrumbs.tsx
"use client";

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

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
      <nav className="inline-flex py-2.5 px-5 rounded-full bg-slate-50/80 border border-slate-100 shadow-sm backdrop-blur-sm mb-8 w-fit">
        <ol className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-500">
          {crumbs.map((crumb, index) => {
            // Cek apakah ini adalah crumb terakhir dalam daftar
            const isLast = index === crumbs.length - 1;

            return (
              <li key={index} className="flex items-center gap-2">
                {/* Jika bukan yang terakhir, tampilkan sebagai link */}
                {!isLast ? (
                  <Link 
                    href={crumb.path} 
                    className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 hover:underline transition-colors"
                  >
                    {index === 0 && <Home size={14} className="mb-0.5" />}
                    {crumb.name}
                  </Link>
                ) : (
                  /* Jika yang terakhir, tampilkan sebagai teks biasa */
                  <span className="flex items-center gap-1.5 font-semibold text-slate-800" aria-current="page">
                    {index === 0 && <Home size={14} className="mb-0.5" />}
                    {crumb.name}
                  </span>
                )}

                {/* Tampilkan pemisah jika bukan yang terakhir */}
                {!isLast && (
                  <ChevronRight size={14} className="text-slate-400" />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}