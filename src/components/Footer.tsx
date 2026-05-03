// src/components/Footer.tsx
import Link from 'next/link';
import { MessageCircle, ShieldCheck, MapPin, Mail, Clock } from 'lucide-react';

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
    <footer className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white pt-20 pb-8 overflow-hidden print:hidden">
      {/* Decorative gradient orb */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

        {/* Kolom 1: Tentang Perusahaan */}
        <div className="space-y-6">
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-200 inline-block mb-1">
              PT Jasa Mandiri
            </h3>
            <span className="text-emerald-500/80 text-xs font-semibold tracking-widest uppercase">Agency</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Perusahaan penyalur pekerja rumah tangga, baby sitter, dan perawat lansia resmi, terverifikasi, dan profesional. Solusi terpercaya untuk kenyamanan keluarga Anda.
          </p>
          <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-700/50 hover:border-emerald-500/30 transition-colors">
            <h4 className="text-sm font-semibold text-emerald-300 flex items-center gap-2 mb-3">
              <ShieldCheck size={18} className="text-emerald-400" />
              Legalitas & Pengawasan:
            </h4>
            <ul className="text-xs text-slate-400 space-y-2 list-none">
              <li className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-emerald-500 before:rounded-full">Kementerian Tenaga Kerja RI</li>
              <li className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-emerald-500 before:rounded-full">Disnaker Provinsi DKI Jakarta</li>
              <li className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-emerald-500 before:rounded-full">APPSI (Asosiasi Pelatihan & Penempatan)</li>
            </ul>
          </div>
        </div>

        {/* Kolom 2: Layanan & Navigasi */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            Layanan Kami
          </h3>
          <nav className="flex flex-col gap-4 text-sm text-slate-400">
            {[
              { name: 'Baby Sitter Profesional', path: '/layanan/baby-sitter' },
              { name: 'Asisten Rumah Tangga (ART)', path: '/layanan/art' },
              { name: 'Perawat Lansia (Homecare)', path: '/layanan/perawat-lansia' },
              { name: 'Stok Pekerja Ready', path: '/pekerja' },
              { name: 'Lowongan Kerja', path: '/lowongan-kerja' },
              { name: 'Syarat dan Ketentuan', path: '/syarat-ketentuan' },
            ].map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="group flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <span className="w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-3"></span>
                <span className="transform transition-transform duration-300 group-hover:translate-x-1">{link.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Kolom 3: Hubungi Kami */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6">Hubungi Kami</h3>
          <div className="space-y-5 text-sm text-slate-400">
            <div className="flex gap-3 items-start group">
              <MapPin size={18} className="text-emerald-500 shrink-0 mt-1" />
              <address className="leading-relaxed not-italic group-hover:text-emerald-50 transition-colors">
                Jl. Gunung Balong III No. 78, RT.11/RW.04<br />
                Lebak Bulus, Cilandak<br />
                Jakarta Selatan, 12440
              </address>
            </div>

            <div className="flex gap-3 items-center group">
              <Mail size={18} className="text-emerald-500 shrink-0" />
              <a href="mailto:info@penyalurkerja.com" className="hover:text-emerald-400 transition-colors">
                info@penyalurkerja.com
              </a>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href="https://api.whatsapp.com/send?phone=6282122415552"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-slate-800/80 hover:bg-emerald-900/40 border border-slate-700/50 hover:border-emerald-500/50 px-4 py-2.5 rounded-xl transition-all duration-300 group"
              >
                <MessageCircle size={20} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-white font-medium">0821-2241-5552</div>
                  <div className="text-xs text-slate-500 group-hover:text-emerald-300/80">Admin 1</div>
                </div>
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=6281323337872"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-slate-800/80 hover:bg-emerald-900/40 border border-slate-700/50 hover:border-emerald-500/50 px-4 py-2.5 rounded-xl transition-all duration-300 group"
              >
                <MessageCircle size={20} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-white font-medium">0813-2333-7872</div>
                  <div className="text-xs text-slate-500 group-hover:text-emerald-300/80">Admin 2</div>
                </div>
              </a>
            </div>

            <div className="flex gap-3 items-start pt-4 border-t border-slate-800/50">
              <Clock size={18} className="text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Jam Operasional</p>
                <p className="text-slate-300">Senin - Minggu: 07:00 - 22:00 WIB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom 4: Coverage Area (Internal Link SEO) */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6">Area Layanan</h3>
          <div className="flex flex-wrap gap-2.5">
            {popularAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/area/${area.slug}`}
                className="text-xs bg-slate-800/50 hover:bg-emerald-600 hover:text-white text-slate-400 px-3 py-1.5 rounded-full transition-all duration-300 border border-slate-700/50 hover:border-emerald-500 shadow-sm hover:shadow-emerald-500/20"
              >
                {area.name}
              </Link>
            ))}
            <span className="text-xs text-slate-500 px-2 py-1.5 self-center italic">dan sekitarnya...</span>
          </div>
        </div>
      </div>

      {/* Bagian Copyright */}
      <div className="border-t border-slate-800/80 pt-8 relative z-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {currentYear} PT Jasa Mandiri Agency. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/syarat-ketentuan" className="hover:text-emerald-400 transition-colors">Syarat & Ketentuan</Link>
            <Link href="/sitemap.xml" className="hover:text-emerald-400 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}