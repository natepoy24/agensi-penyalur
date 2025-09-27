// src/components/Header.tsx
"use client"; // Tambahkan ini di baris paling atas!

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Impor ikon untuk menu

export default function Header() {
  // State untuk mengontrol visibilitas menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* HEADER UTAMA */}
      <header className="fixed top-0 left-0 w-full bg-white/80 shadow-md backdrop-blur-sm z-50">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          {/* Bagian Logo */}
          <Link href="/" className="text-xl font-bold text-slate-800">
            APSA
          </Link>

          {/* Bagian Menu Navigasi untuk DESKTOP */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link href="/" className="hover:text-emerald-600 transition-colors">
              Beranda
            </Link>
            <Link href="/tentang" className="hover:text-emerald-600 transition-colors">
              Tentang Kami
            </Link>
            <Link href="/layanan" className="hover:text-emerald-600 transition-colors">
              Layanan
            </Link>
            <Link href="/pekerja" className="hover:text-emerald-600 transition-colors">
              Pekerja
            </Link>
            <Link href="/kontak" className="hover:text-emerald-600 transition-colors">
              Kontak
            </Link>
          </nav>

          {/* Tombol Login Admin untuk DESKTOP */}
          <Link
            href="/admin/login"
            className="hidden md:inline-block px-4 py-2 text-sm font-semibold border border-slate-300 rounded-md hover:bg-slate-100 transition-colors"
          >
            Login Admin
          </Link>

          {/* Tombol Hamburger untuk MOBILE */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(true)}>
              <Menu className="h-6 w-6 text-slate-800" />
            </button>
          </div>
        </div>
      </header>

      {/* MENU MOBILE (MUNCUL SAAT isMenuOpen === true) */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center md:hidden">
          {/* Tombol Tutup (X) */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-7 right-4"
          >
            <X className="h-8 w-8 text-slate-800" />
          </button>

          {/* Navigasi Mobile */}
          <nav className="flex flex-col items-center gap-8 text-xl font-medium text-slate-800">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>Beranda</Link>
            <Link href="/tentang" onClick={() => setIsMenuOpen(false)}>Tentang Kami</Link>
            <Link href="/layanan" onClick={() => setIsMenuOpen(false)}>Layanan</Link>
            <Link href="/pekerja" onClick={() => setIsMenuOpen(false)}>Pekerja</Link>
            <Link href="/kontak" onClick={() => setIsMenuOpen(false)}>Kontak</Link>
            <Link 
              href="/admin/login" 
              className="mt-4 px-6 py-2 border border-slate-400 rounded-md" 
              onClick={() => setIsMenuOpen(false)}
            >
              Login Admin
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}