// src/components/Header.tsx
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import SignOutButton from './SignOutButton';

export default function Header({ user }: { user: User | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="w-full bg-white shadow-md z-40">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div>
            <Link href="/" className="text-xl font-bold text-emerald-500">
              PT Jasa Mandiri
            </Link>
            <p className="text-xs text-red-700 font-bold -mt-1">
              Perusahaan Penempatan Kerja
            </p>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link href="/" className="hover:text-emerald-600">Beranda</Link>
            <Link href="/tentang" className="hover:text-emerald-600">Tentang Kami</Link>
            <Link href="/layanan" className="hover:text-emerald-600">Layanan</Link>
            <Link href="/pekerja" className="hover:text-emerald-600">Pekerja</Link>
            <Link href="/kontak" className="hover:text-emerald-600">Kontak</Link>
            <Link href="/artikel" className="hover:text-emerald-600">Artikel</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link href="/admin/dashboard" className="text-sm font-semibold text-emerald-600 hover:underline">
                  Dasbor
                </Link>
                <SignOutButton />
              </>
            ) : (
              <Link href="/admin/login" className="px-4 py-2 text-sm font-semibold bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
                Login Admin
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(true)} aria-label="Buka menu">
              <Menu className="h-6 w-6 text-slate-800" />
            </button>
          </div>
        </div>
      </header>
      
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center md-hidden">
          <button onClick={closeMenu} className="absolute top-7 right-4" aria-label="Tutup menu">
            <X className="h-8 w-8 text-slate-800" />
          </button>
          
          <nav className="flex flex-col items-center gap-8 text-2xl font-semibold text-slate-800">
            <Link href="/" onClick={closeMenu}>Beranda</Link>
            <Link href="/tentang" onClick={closeMenu}>Tentang Kami</Link>
            <Link href="/layanan" onClick={closeMenu}>Layanan</Link>
            <Link href="/pekerja" onClick={closeMenu}>Pekerja</Link>
            <Link href="/kontak" onClick={closeMenu}>Kontak</Link>
            <Link href="/artikel" onClick={closeMenu}>Artikel</Link>
            
            {/* --- PERUBAHAN DI SINI --- */}
            <div className="mt-8 border-t border-slate-200 pt-8 w-full flex flex-col items-center gap-6">
              {user ? (
                <>
                  <Link 
                    href="/admin/dashboard" 
                    className="px-6 py-2 border-2 border-emerald-600 text-emerald-600 rounded-md text-xl"
                    onClick={closeMenu}
                  >
                    Dasbor
                  </Link>
                  <SignOutButton />
                </>
              ) : (
                <Link 
                  href="/admin/login"
                  className="px-6 py-2 bg-emerald-600 text-white rounded-md text-xl"
                  onClick={closeMenu}
                >
                  Login Admin
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
} 