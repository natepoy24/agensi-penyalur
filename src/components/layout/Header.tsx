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
      <header className="relative w-full z-40 bg-white shadow-sm border-b border-slate-100 py-3 mb-6 print:hidden">

        {/* KONTAINER UTAMA: flex-row dan justify-between menjamin sejajar menyamping */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-row items-center justify-between gap-4">

          {/* BAGIAN 1: LOGO (Kiri) */}
          <div className="flex items-center shrink-0">
            <Link href="/" aria-label="Beranda Jasa Mandiri" className="flex flex-row items-center gap-2 sm:gap-3">
              <img
                src="/Image/Logo-jm.webp"
                alt="Logo Jasa Mandiri"
                className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform hover:scale-105"
              />

              <div className="flex flex-col justify-center select-none font-['Plus_Jakarta_Sans',sans-serif]">
                {/* TEKS JASA MANDIRI (Gradasi di depan, shadow di belakang) */}
                <span
                  className="text-[1.3rem] sm:text-[1.6rem] md:text-[1.7rem] lg:text-3xl font-black uppercase tracking-tighter leading-none"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #7ed957 0%, #0097b2 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    // SOLUSI: Gunakan filter drop-shadow agar tidak tembus pandang
                    filter: 'drop-shadow(3px 3px 0px #c81c1c)'
                  }}
                >
                  Jasa Mandiri
                </span>

                {/* TEKS PERUSAHAAN (Gradasi di depan, shadow di belakang) */}
                <span
                  className="text-[0.6rem] sm:text-[0.65rem] md:text-[0.75rem] font-bold uppercase tracking-wide leading-tight mt-0.5"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #ff3131 0%, #ff914d 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    // SOLUSI: Gunakan filter drop-shadow agar tidak tembus pandang
                    filter: 'drop-shadow(1px 1px 0px #0e5923)'
                  }}
                >
                  Perusahaan Penempatan Kerja
                </span>
              </div>
            </Link>
          </div>

          {/* BAGIAN 2: NAVIGASI DESKTOP (Tengah) */}
          <nav className="hidden lg:flex flex-row items-center gap-5 xl:gap-8 text-[15px] font-semibold text-slate-700">
            {[
              { name: 'Beranda', path: '/' },
              { name: 'Tentang Kami', path: '/tentang' },
              { name: 'Layanan', path: '/layanan' },
              { name: 'Pekerja', path: '/pekerja' },
              { name: 'Kontak', path: '/kontak' },
              { name: 'Artikel', path: '/artikel' },
              { name: 'Lowongan Kerja', path: '/lowongan-kerja' },
            ].map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="relative py-2 text-slate-600 hover:text-emerald-600 transition-colors whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-emerald-600 after:transition-all after:duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* BAGIAN 3: AUTH / LOGIN (Kanan) */}
          <div className="hidden lg:flex flex-row items-center gap-4 shrink-0">
            {user ? (
              <>
                <Link href="/admin/dashboard" className="text-[15px] font-semibold text-emerald-600 hover:text-emerald-700 transition-colors whitespace-nowrap">
                  Dasbor
                </Link>
                <div className="hover:scale-105 transition-transform">
                  <SignOutButton />
                </div>
              </>
            ) : (
              <Link href="/admin/login" className="px-5 py-2.5 text-[15px] font-semibold bg-emerald-500 text-white rounded-full hover:bg-emerald-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap">
                Login Admin
              </Link>
            )}
          </div>

          {/* BAGIAN 4: TOMBOL MENU MOBILE (Layar Kecil) */}
          <div className="lg:hidden flex items-center shrink-0">
            <button onClick={() => setIsMenuOpen(true)} aria-label="Buka menu" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <Menu className="h-6 w-6 text-slate-800" />
            </button>
          </div>

        </div>
      </header>

      {/* --- MENU MOBILE BACKGROUND & DRAWER --- */}
      <div
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={closeMenu}
      />

      <div
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-out flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="p-6 flex justify-between items-center border-b border-slate-100">
          <span className="font-bold text-lg text-slate-800">Menu Navigasi</span>
          <button onClick={closeMenu} aria-label="Tutup menu" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="h-6 w-6 text-slate-500" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-4 text-lg font-medium text-slate-700">
          {[
            { name: 'Beranda', path: '/' },
            { name: 'Tentang Kami', path: '/tentang' },
            { name: 'Layanan', path: '/layanan' },
            { name: 'Pekerja', path: '/pekerja' },
            { name: 'Kontak', path: '/kontak' },
            { name: 'Artikel', path: '/artikel' },
            { name: 'Lowongan Kerja', path: '/lowongan-kerja' },
          ].map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={closeMenu}
              className="py-3 px-4 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}

          <div className="mt-8 border-t border-slate-100 pt-8 flex flex-col gap-4">
            {user ? (
              <>
                <Link
                  href="/admin/dashboard"
                  className="w-full text-center px-6 py-3 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-colors"
                  onClick={closeMenu}
                >
                  Dasbor
                </Link>
                <div className="w-full" onClick={closeMenu}>
                  <SignOutButton />
                </div>
              </>
            ) : (
              <Link
                href="/admin/login"
                className="w-full text-center px-6 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 hover:shadow-lg transition-all"
                onClick={closeMenu}
              >
                Login Admin
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}