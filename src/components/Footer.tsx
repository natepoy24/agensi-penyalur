// src/components/Footer.tsx
import Link from 'next/link';
import { MessageCircle, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Daftar area prioritas untuk ditampilkan di Footer (Internal Link SEO)
  const popularAreas = [
    { name: "Jakarta Selatan", slug: "jakarta-selatan" },
    { name: "Jakarta Barat", slug: "jakarta-barat" },
    { name: "Jakarta Utara", slug: "jakarta-utara" },
    { name: "Jakarta Timur", slug: "jakarta-timur" },
    { name: "Jakarta Pusat", slug: "jakarta-pusat" },
    { name: "Depok", slug: "depok" },
    { name: "Bogor", slug: "bogor" },
    { name: "Tangerang", slug: "tangerang" },
    { name: "Tangerang Selatan", slug: "tangerang-selatan" },
    { name: "Bekasi", slug: "bekasi" },
    { name: "BSD City", slug: "bsd-city" },
    { name: "Bintaro", slug: "bintaro" },
    { name: "Cibubur", slug: "cibubur" },
    { name: "PIK (Pantai Indah Kapuk)", slug: "pik" },
    { name: "Pondok Indah", slug: "pondok-indah" },
    { name: "Kelapa Gading", slug: "kelapa-gading" },
    { name: "Menteng", slug: "menteng" },
    { name: "Kemang", slug: "kemang" },
  ];

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        {/* Kolom 1: Tentang Perusahaan */}
        <div>
          <h3 className="text-xl font-bold text-emerald-400 mb-6">PT Jasa Mandiri Agency</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Perusahaan penyalur pekerja rumah tangga, baby sitter, dan perawat lansia resmi, terverifikasi, dan profesional. Solusi terpercaya untuk kenyamanan keluarga Anda.
          </p>
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <h4 className="text-sm font-semibold text-emerald-300 flex items-center gap-2 mb-3">
              <ShieldCheck size={16} />
              Legalitas & Pengawasan:
            </h4>
            <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
              <li>Kementerian Tenaga Kerja RI</li>
              <li>Disnaker Provinsi DKI Jakarta</li>
              <li>APPSI (Asosiasi Pelatihan & Penempatan Pekerja Seluruh Indonesia)</li>
            </ul>
          </div>
        </div>

        {/* Kolom 2: Layanan & Navigasi */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6">Layanan Kami</h3>
          <nav className="flex flex-col gap-3 text-sm text-slate-400">
            <Link href="/layanan/baby-sitter" className="hover:text-emerald-400 transition-colors">Baby Sitter Profesional</Link>
            <Link href="/layanan/art" className="hover:text-emerald-400 transition-colors">Asisten Rumah Tangga (ART)</Link>
            <Link href="/layanan/perawat-lansia" className="hover:text-emerald-400 transition-colors">Perawat Lansia (Homecare)</Link>
            <Link href="/pekerja" className="hover:text-emerald-400 transition-colors">Stok Pekerja Ready</Link>
            <Link href="/lowongan-kerja" className="hover:text-emerald-400 transition-colors">Lowongan Kerja</Link>
            <Link href="/syarat-ketentuan" className="hover:text-emerald-400 transition-colors">Syarat dan Ketentuan</Link>
          </nav>
        </div>

        {/* Kolom 3: Hubungi Kami */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6">Kantor Pusat</h3>
          <div className="space-y-4 text-sm text-slate-400">
            <p className="leading-relaxed">
              Jl. Gunung Balong III No. 78<br/>
              Lebak Bulus, Cilandak<br/>
              Jakarta Selatan, 12440
            </p>
            <div className="space-y-2">
              <a href="mailto:info@penyalurkerja.com" className="block hover:text-emerald-400 transition-colors">
                info@penyalurkerja.com
              </a>
              <a 
                href="https://api.whatsapp.com/send?phone=6282122415552" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle size={16} className="text-green-500" /> 0821-2241-5552 (Admin 1)
              </a>
              <a 
                href="https://api.whatsapp.com/send?phone=6281323337872" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle size={16} className="text-green-500" /> 0813-2333-7872 (Admin 2)
              </a>
            </div>
            <div className="pt-4">
               <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Jam Operasional</p>
               <p>Senin - Minggu: 07:00 - 22:00 WIB</p>
            </div>
          </div>
        </div>

        {/* Kolom 4: Coverage Area (Internal Link SEO) */}
        <div>
            <h3 className="text-lg font-bold text-white mb-6">Area Layanan</h3>
            <div className="flex flex-wrap gap-2">
              {popularAreas.map((area) => (
                <Link 
                  key={area.slug} 
                  href={`/area/${area.slug}`}
                  className="text-xs bg-slate-800 hover:bg-emerald-900 hover:text-emerald-300 text-slate-400 px-3 py-1.5 rounded-full transition-colors border border-slate-700"
                >
                  {area.name}
                </Link>
              ))}
              <span className="text-xs text-slate-500 px-2 py-1 self-center">dan sekitarnya...</span>
            </div>
        </div>
      </div>

      {/* Bagian Copyright */}
      <div className="border-t border-slate-800 pt-8">
        <div className="container mx-auto px-6 text-center text-xs text-slate-500">
          <p>&copy; {currentYear} PT Jasa Mandiri Agency. All rights reserved. | <Link href="/sitemap.xml" className="hover:text-emerald-400">Sitemap</Link></p>
        </div>
      </div>
    </footer>
  );
}