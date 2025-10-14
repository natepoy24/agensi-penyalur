"use client";

import Link from 'next/link';

type Crumb = {
  name: string;
  path: string;
};

type BreadcrumbsProps = {
  crumbs?: Crumb[]; // buat optional
};

export default function Breadcrumbs({ crumbs = [] }: BreadcrumbsProps) { // default []
  return (
    <nav className="bg-blue-50 py-3 px-4 rounded-lg mb-8">
      <ol className="flex items-center gap-2 text-sm text-gray-600">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              {!isLast ? (
                <Link href={crumb.path} className="text-blue-700 hover:underline font-medium">
                  {crumb.name}
                </Link>
              ) : (
                <span className="font-semibold text-gray-800" aria-current="page">
                  {crumb.name}
                </span>
              )}
              {!isLast && <span className="text-gray-400">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
