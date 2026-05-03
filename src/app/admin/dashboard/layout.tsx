// src/app/admin/dashboard/layout.tsx
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "@/app/actions";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 1. Cek apakah ini halaman preview kontrak yang butuh layar penuh
  const isFullscreenPage = pathname?.includes("/kontrak/preview");

  // State untuk kontrol Sidebar (Default: Terbuka / false)
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Opsional: Auto-collapse jika masuk ke halaman form tambah/edit agar layar lebih lega
  useEffect(() => {
    if (pathname?.includes("tambah") || pathname?.includes("edit")) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [pathname]);

  // 2. JIKA HALAMAN PREVIEW KONTRAK: Render bersih tanpa Topbar & Sidebar
  if (isFullscreenPage) {
    return (
      <div className="min-h-screen bg-slate-50 font-['Inter'] relative z-[60]">
        <div className="fixed inset-0 bg-slate-50 -z-10"></div>
        {children}
      </div>
    );
  }

  // 3. JIKA HALAMAN DASHBOARD LAINNYA: Render normal
  return (
    <div className="min-h-screen bg-slate-50 flex font-['Inter'] relative z-[60]">
      {/* Background putih penuh untuk menutupi layout global publik */}
      <div className="fixed inset-0 bg-slate-50 -z-10"></div>

      {/* TOPBAR */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md flex justify-between items-center px-6 z-50 border-b border-slate-200 shadow-sm">
        {/* KIRI: Logo & Navigasi Eksternal */}
        <div className="flex items-center gap-6">
          <Link href="/admin/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm">
              JM
            </div>
            <span className="text-lg font-bold text-slate-800 font-['Plus_Jakarta_Sans'] tracking-tight">Jasa Mandiri</span>
          </Link>

          <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
        </div>

        {/* KANAN: Navigasi Eksternal */}
        <div className="flex items-center gap-6 ml-auto">
          <div className="relative w-full max-w-md hidden sm:block">
            <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
              <Link href="/" className="text-slate-500 hover:text-emerald-600 flex items-center gap-1.5 transition-colors">
                <span className="material-symbols-outlined text-[18px]">logout</span>
                Keluar dari Dashboard
              </Link>
              <Link href="/pekerja" className="text-slate-500 hover:text-emerald-600 flex items-center gap-1.5 transition-colors">
                <span className="material-symbols-outlined text-[18px]">group</span>
                List Pekerja Publik
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* SIDEBAR DENGAN FITUR COLLAPSE/EXTEND */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-slate-200 flex flex-col py-6 z-40 overflow-y-auto transition-all duration-300 ease-in-out ${isCollapsed ? "w-20 px-2" : "w-64 px-4"
          }`}
      >
        <nav className="space-y-2 flex-1">
          <Link
            href="/admin/dashboard"
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-xl transition-all duration-200 ${pathname === "/admin/dashboard" ? "bg-emerald-50 text-emerald-700 font-semibold" : "text-slate-500 hover:bg-slate-100 hover:text-emerald-700"}`}
            title="Dashboard Overview"
          >
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
            {!isCollapsed && <span className="whitespace-nowrap">Dashboard Overview</span>}
          </Link>

          <Link
            href="/admin/dashboard/pekerja"
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-xl transition-all duration-200 ${pathname?.includes("pekerja") || pathname?.includes("tambah") || pathname?.includes("edit") ? "bg-emerald-50 text-emerald-700 font-semibold" : "text-slate-500 hover:bg-slate-100 hover:text-emerald-700"}`}
            title="List Pekerja"
          >
            <span className="material-symbols-outlined text-2xl">person</span>
            {!isCollapsed && <span className="whitespace-nowrap">List Pekerja</span>}
          </Link>

          <Link
            href="/admin/dashboard/artikel"
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-xl transition-all duration-200 ${pathname?.includes("artikel") ? "bg-emerald-50 text-emerald-700 font-semibold" : "text-slate-500 hover:bg-slate-100 hover:text-emerald-700"}`}
            title="Artikel & SEO"
          >
            <span className="material-symbols-outlined text-2xl">description</span>
            {!isCollapsed && <span className="whitespace-nowrap">Artikel & SEO</span>}
          </Link>

          {/* Tambahan Link Menu Kontrak */}
          <Link
            href="/admin/dashboard/kontrak/preview"
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-xl transition-all duration-200 ${pathname?.includes("kontrak") ? "bg-emerald-50 text-emerald-700 font-semibold" : "text-slate-500 hover:bg-slate-100 hover:text-emerald-700"}`}
            title="Buat Kontrak"
          >
            <span className="material-symbols-outlined text-2xl">contract</span>
            {!isCollapsed && <span className="whitespace-nowrap">Buat Kontrak</span>}
          </Link>

          <Link
            href="/admin/dashboard/laporan"
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-xl transition-all duration-200 ${pathname?.includes("/laporan") ? "bg-emerald-50 text-emerald-700 font-semibold" : "text-slate-500 hover:bg-slate-100 hover:text-emerald-700"}`}
            title="Data Laporan"
          >
            <span className="material-symbols-outlined text-2xl">table_chart</span>
            {!isCollapsed && <span className="whitespace-nowrap">Data Laporan</span>}
          </Link>
        </nav>

        {/* BAGIAN BAWAH SIDEBAR */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-2">
          {/* Tombol Toggle Extend/Collapse */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-start px-4 gap-3'} py-3 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors font-medium`}
            title={isCollapsed ? "Perluas Sidebar" : "Perkecil Sidebar"}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isCollapsed ? "keyboard_double_arrow_right" : "keyboard_double_arrow_left"}
            </span>
            {!isCollapsed && <span>Sembunyikan Menu</span>}
          </button>

          {/* Tombol Logout */}
          <button
            onClick={() => signOut()}
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-start px-4 gap-2'} py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-semibold w-full`}
            title="Logout Akun"
          >
            <span className="material-symbols-outlined text-[20px]">power_settings_new</span>
            {!isCollapsed && <span className="whitespace-nowrap">Logout Akun</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main
        className={`flex-1 mt-16 p-8 min-h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out ${isCollapsed ? "ml-20" : "ml-64"
          }`}
      >
        {children}
      </main>
    </div>
  );
}