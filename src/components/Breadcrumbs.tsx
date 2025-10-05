"use client";

import Link from "next/link";

interface BreadcrumbsProps {
  currentPage: string;
  currentPath: string;
  parentPage?: string;
  parentPath?: string;
}

export default function Breadcrumbs({
  currentPage,
  currentPath,
  parentPage,
  parentPath,
}: BreadcrumbsProps) {
  return (
    <nav className="bg-blue-50 py-3 px-4 rounded-lg mb-6">
      <ol className="flex text-gray-700 text-sm md:text-base">
        {/* Beranda */}
        <li>
          <Link href="/" className="text-blue-700 hover:underline font-medium">
            Beranda
          </Link>
        </li>

        {/* Jika ada halaman induk */}
        {parentPage && parentPath && (
          <>
            <li className="mx-2">/</li>
            <li>
              <Link
                href={`/${parentPath}`}
                className="text-blue-700 hover:underline font-medium"
              >
                {parentPage}
              </Link>
            </li>
          </>
        )}

        {/* Halaman sekarang */}
        <li className="mx-2">/</li>
        <li className="font-semibold text-gray-900">{currentPage}</li>
      </ol>
    </nav>
  );
}
