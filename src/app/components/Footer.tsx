// src/components/Footer.tsx
import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Kolom 1: Tentang Agensi */}
        <div>
          <h3 className="text-lg font-bold">APSA</h3>
          <p className="mt-4 text-sm text-slate-300">
            Menyediakan tenaga kerja terverifikasi dan profesional untuk ketenangan Anda.
          </p>
        </div>

        {/* Kolom 2: Link Navigasi Cepat */}
        <div>
          <h3 className="text-lg font-bold">Navigasi</h3>
          <nav className="mt-4 flex flex-col gap-2 text-sm">
            <Link href="/tentang" className="text-slate-300 hover:text-white">Tentang Kami</Link>
            <Link href="/layanan" className="text-slate-300 hover:text-white">Layanan</Link>
            <Link href="/pekerja" className="text-slate-300 hover:text-white">Pekerja</Link>
            <Link href="/kontak" className="text-slate-300 hover:text-white">Kontak</Link>
          </nav>
        </div>

        {/* Kolom 3: Kontak */}
        <div>
          <h3 className="text-lg font-bold">Hubungi Kami</h3>
          <div className="mt-4 text-sm text-slate-300">
            <p>Jl. Jenderal Sudirman Kav. 52-53, Jakarta Selatan</p>
            <p className="mt-2">info@apsa.com</p>
            <p>(021) 123-4567</p>
          </div>
        </div>

        {/* Kolom 4: Media Sosial */}
        <div>
          <h3 className="text-lg font-bold">Ikuti Kami</h3>
          <div className="mt-4 flex gap-4">
            <Link href="#" className="text-slate-300 hover:text-white"><Facebook size={20} /></Link>
            <Link href="#" className="text-slate-300 hover:text-white"><Twitter size={20} /></Link>
            <Link href="#" className="text-slate-300 hover:text-white"><Instagram size={20} /></Link>
          </div>
        </div>
      </div>

      {/* Bagian Copyright */}
      <div className="border-t border-slate-700 mt-8">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} APSA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}