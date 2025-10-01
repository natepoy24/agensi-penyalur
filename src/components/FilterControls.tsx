// src/components/FilterControls.tsx
"use client";

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

export default function FilterControls() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mb-10 flex flex-col md:flex-row gap-4 rounded-lg bg-slate-50 p-4 border">
      <div className="relative flex-grow">
        <input 
          type="text" 
          name="search"
          placeholder="Cari berdasarkan nama..." 
          onChange={handleFilterChange}
          defaultValue={searchParams.get('search') || ''}
          className="w-full rounded-md border border-slate-300 py-2 pl-10 pr-4 focus:border-emerald-500 focus:ring-emerald-500 text-slate-900" 
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
      </div>
      <select 
        name="kategori"
        onChange={handleFilterChange}
        defaultValue={searchParams.get('kategori') || ''}
        className="rounded-md border border-slate-300 py-2 px-4 focus:border-emerald-500 focus:ring-emerald-500 text-slate-900"
      >
        <option value="">Semua Kategori</option>
        <option value="Baby Sitter">Baby Sitter</option>
        <option value="Perawat Lansia">Perawat Lansia</option>
        <option value="Asisten Rumah Tangga">Asisten Rumah Tangga</option>
      </select>
      <select 
        name="status"
        onChange={handleFilterChange}
        defaultValue={searchParams.get('status') || ''}
        className="rounded-md border border-slate-300 py-2 px-4 focus:border-emerald-500 focus:ring-emerald-500 text-slate-900"
      >
        <option value="">Semua Status</option>
        <option value="Tersedia">Tersedia</option>
        <option value="Akan Tersedia">Akan Tersedia</option>
      </select>
    </div>
  );
}