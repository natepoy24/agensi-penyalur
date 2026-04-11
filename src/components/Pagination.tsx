'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  // Logic to show a limited number of page links, e.g., max 5 pages visible around current page
  const getVisiblePages = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);
    
    if (currentPage <= 3) {
      end = Math.min(totalPages, 5);
    }
    if (currentPage >= totalPages - 2) {
      start = Math.max(1, totalPages - 4);
    }
    
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center items-center mt-12 gap-2 flex-wrap">
      {/* Previous Button */}
      <Link
        href={createPageURL(currentPage - 1)}
        className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
          currentPage <= 1
            ? 'pointer-events-none opacity-50 bg-gray-100 text-gray-400'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
        aria-disabled={currentPage <= 1}
      >
        Sebelumnya
      </Link>

      {/* Pages (Mobile and Desktop friendly) */}
      <div className="flex gap-1 flex-wrap justify-center">
        {visiblePages[0] > 1 && (
          <>
            <Link
              href={createPageURL(1)}
              className="px-3 md:px-4 py-2 border rounded-md text-sm font-medium transition-colors bg-white text-gray-700 hover:bg-gray-50"
            >
              1
            </Link>
            {visiblePages[0] > 2 && <span className="px-2 py-2 text-gray-500">...</span>}
          </>
        )}

        {visiblePages.map((page) => (
          <Link
            key={page}
            href={createPageURL(page)}
            className={`px-3 md:px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
              currentPage === page
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {page}
          </Link>
        ))}

        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && <span className="px-2 py-2 text-gray-500">...</span>}
            <Link
              href={createPageURL(totalPages)}
              className="px-3 md:px-4 py-2 border rounded-md text-sm font-medium transition-colors bg-white text-slate-700 hover:bg-slate-50"
            >
              {totalPages}
            </Link>
          </>
        )}
      </div>

      {/* Next Button */}
      <Link
        href={createPageURL(currentPage + 1)}
        className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
          currentPage >= totalPages
            ? 'pointer-events-none opacity-50 bg-gray-100 text-gray-400'
            : 'bg-white text-slate-700 hover:bg-slate-50'
        }`}
        aria-disabled={currentPage >= totalPages}
      >
        Selanjutnya
      </Link>
    </div>
  );
}
