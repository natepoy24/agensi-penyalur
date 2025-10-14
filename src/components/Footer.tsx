// src/components/Footer.tsx
import Link from 'next/link';
import { MessageCircle, ShieldCheck } from 'lucide-react'; // Impor ikon ShieldCheck

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-white">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
        
        {/* Kolom 1: Tentang Perusahaan (dibuat lebih lebar) */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-bold">PT Jasa Mandiri</h3>
          <p className="mt-4 text-sm text-slate-300">
            Perusahaan penyalur pekerja rumah tangga terverifikasi dan profesional untuk ketenangan Anda.
          </p>
          {/* --- KONTEN BARU DITAMBAHKAN DI SINI --- */}
          <div className="mt-6">
            <h4 className="text-base font-semibold text-slate-200 flex items-center gap-2">
              <ShieldCheck size={18} />
              Terverifikasi & Diawasi Oleh:
            </h4>
            <ul className="mt-3 text-sm text-slate-300 list-inside list-disc pl-2 space-y-1">
              <li>Kementerian Tenaga Kerja RI</li>
              <li>Disnaker Provinsi DKI Jakarta</li>
              <li>Sudinaker Jakarta Selatan</li>
            </ul>
          </div>
        </div>

        {/* Kolom 2: Link Navigasi */}
        <div>
          <h3 className="text-lg font-bold">Navigasi</h3>
          <nav className="mt-4 flex flex-col gap-2 text-sm">
            <Link href="/tentang" className="text-slate-300 hover:text-white">Tentang Kami</Link>
            <Link href="/layanan" className="text-slate-300 hover:text-white">Layanan</Link>
            <Link href="/pekerja" className="text-slate-300 hover:text-white">Pekerja</Link>
            <Link href="/kontak" className="text-slate-300 hover:text-white">Kontak</Link>
            <Link href="/artikel" className="text-slate-300 hover:text-white">Artikel</Link>
          </nav>
        </div>

        {/* Kolom 3: Hubungi Kami */}
        <div>
          <h3 className="text-lg font-bold">Hubungi Kami</h3>
          <div className="mt-4 text-sm text-slate-300 space-y-3">
            <p>Jl Gunung Balong III No 78 Lebak Bulus, Cilandak, Jak-Sel 12440</p>
            <p>
              <a href="mailto:info@penyalurkerja.com" className="hover:text-white">info@penyalurkerja.com</a>
            </p>
            <a href="https://api.whatsapp.com/send?phone=6282122415552" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
              <MessageCircle size={16} /> 0821-2241-5552
            </a>
            <a href="https://api.whatsapp.com/send?phone=6281323337872" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
              <MessageCircle size={16} /> 0813-2333-7872
            </a>
          </div>
        </div>

        {/* Kolom 4: Jam Operasional & Area Layanan */}
        <div>
            <h3 className="text-lg font-bold">Jam Operasional</h3>
            <p className="mt-4 text-sm text-slate-300">Senin - Minggu<br/>07:00 - 22:00 WIB</p>
            
            <div className="mt-4">
              <h3 className="text-lg font-bold">Area Layanan</h3>
              <ul className="mt-4 text-sm text-slate-300 list-inside">
                <li>Jabodetabek</li>
                <li>Luar Jabodetabek (sesuai kesepakatan)</li>
              </ul>
            </div>
        </div>
      </div>

      {/* Bagian Copyright */}
      <div className="border-t border-slate-700">
        <div className="container mx-auto px-6 py-6 text-center text-sm text-slate-400">
          <p>&copy; {currentYear} PT Jasa Mandiri. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}