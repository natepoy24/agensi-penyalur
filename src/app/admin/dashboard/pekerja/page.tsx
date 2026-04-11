// src/app/admin/dashboard/pekerja/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import DeleteButton from "../DeleteButton";
import slugify from "slugify";

// Definisi Tipe Data Pekerja
interface Pekerja {
    id: number;
    nama: string;
    slug: string;
    kategori: string;
    status: string;
    pengalaman: number;
    gaji: string | number;
    fotoUrl: string;
}

export default function DaftarPekerjaPage() {
    const supabase = createClient();

    // State Penyimpanan Data
    const [allWorkers, setAllWorkers] = useState<Pekerja[]>([]);
    const [filteredWorkers, setFilteredWorkers] = useState<Pekerja[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // State Filter
    const [searchQuery, setSearchQuery] = useState("");
    const [kategoriFilter, setKategoriFilter] = useState("Semua Kategori");
    const [statusFilter, setStatusFilter] = useState("Semua Status");

    // 1. Fetch Semua Data Pertama Kali Render
    useEffect(() => {
        const fetchWorkers = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('pekerja')
                .select('id, nama, slug, kategori, status, pengalaman, gaji, fotoUrl')
                .order('created_at', { ascending: false });

            if (!error && data) {
                setAllWorkers(data);
                setFilteredWorkers(data); // Tampilkan semua di awal
            }
            setIsLoading(false);
        };

        fetchWorkers();
    }, []);

    // 2. Logika Auto-Filter Instan (Tanpa Tombol Terapkan)
    useEffect(() => {
        let result = allWorkers;

        // Filter berdasarkan Nama (Hanya Awalan / Starts With)
        if (searchQuery.trim() !== "") {
            result = result.filter(worker =>
                // UBAH BAGIAN INI: dari .includes menjadi .startsWith
                worker.nama.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        }

        // Filter berdasarkan Kategori
        if (kategoriFilter !== "Semua Kategori") {
            result = result.filter(worker => worker.kategori === kategoriFilter);
        }

        // Filter berdasarkan Status
        if (statusFilter !== "Semua Status") {
            result = result.filter(worker => worker.status === statusFilter);
        }

        setFilteredWorkers(result);
    }, [searchQuery, kategoriFilter, statusFilter, allWorkers]);

    // Fungsi helper warna status
    const getStatusStyle = (status: string) => {
        if (status === 'Tersedia') return 'text-emerald-700 bg-emerald-50 border-emerald-200';
        if (status === 'Akan Tersedia') return 'text-amber-700 bg-amber-50 border-amber-200';
        return 'text-slate-700 bg-slate-50 border-slate-200';
    };

    return (
        <div className="space-y-8 font-['Inter']">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-800 font-['Inter'] tracking-tight">Daftar Pekerja</h2>
                    <p className="text-slate-500 mt-1">Manajemen basis data kandidat dan pekerja aktif.</p>
                </div>
                <Link
                    href="/admin/dashboard/tambah"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
                >
                    <span className="material-symbols-outlined">person_add</span>
                    <span>Tambah Pekerja Baru</span>
                </Link>
            </div>

            {/* Advanced Filters (Auto Update) */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                <div className="flex flex-wrap gap-4">

                    {/* Search Bar Instan */}
                    <div className="flex-1 min-w-[240px] relative">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 ml-1">Cari Nama</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Ketik huruf awal atau nama..."
                                className="w-full bg-slate-50 border-none rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-emerald-500/20 text-sm text-slate-800 transition-all outline-none"
                            />
                        </div>
                    </div>

                    {/* Filter Kategori */}
                    <div className="w-full md:w-56 relative">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 ml-1">Kategori</label>
                        <select
                            value={kategoriFilter}
                            onChange={(e) => setKategoriFilter(e.target.value)}
                            className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-emerald-500/20 text-sm appearance-none text-slate-800 font-medium cursor-pointer"
                        >
                            <option value="Semua Kategori">Semua Kategori</option>
                            <option value="Baby Sitter">Baby Sitter</option>
                            <option value="Asisten Rumah Tangga">Asisten Rumah Tangga</option>
                            <option value="Perawat Lansia">Perawat Lansia</option>
                            <option value="Supir">Supir Pribadi</option>
                            <option value="Tukang Kebun">Tukang Kebun</option>
                        </select>
                    </div>

                    {/* Filter Status */}
                    <div className="w-full md:w-56 relative">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 ml-1">Status</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-emerald-500/20 text-sm appearance-none text-slate-800 font-medium cursor-pointer"
                        >
                            <option value="Semua Status">Semua Status</option>
                            <option value="Tersedia">Tersedia</option>
                            <option value="Akan Tersedia">Akan Tersedia</option>
                        </select>
                    </div>

                </div>
            </section>

            {/* Workers Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Nama Pekerja</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Kategori</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Gaji</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Aksi</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-12 text-slate-400 font-medium">Memuat data pekerja...</td>
                                </tr>
                            ) : filteredWorkers.length > 0 ? (
                                filteredWorkers.map((worker) => {
                                    const catSlug = slugify(worker.kategori, { lower: true, strict: true });

                                    return (
                                        <tr key={worker.id} className="hover:bg-slate-50/80 transition-colors group">
                                            <td className="px-6 py-4 min-w-[250px]">
                                                <div className="flex items-center gap-4">
                                                    <img src={worker.fotoUrl} alt={worker.nama} className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100 shadow-sm" />
                                                    <div>
                                                        <p className="font-bold text-slate-800 font-['Inter']">{worker.nama}</p>
                                                        <p className="text-xs text-slate-400">ID: {worker.id.toString().padStart(4, '0')}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100">
                                                    {worker.kategori}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`flex items-center gap-1.5 w-fit px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(worker.status)}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${worker.status === 'Tersedia' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                                    {worker.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 min-w-[150px]">
                                                <span className="text-sm font-bold text-slate-800">
                                                    Rp {Number(worker.gaji).toLocaleString('id-ID')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-2">
                                                    {/* Tombol Edit */}
                                                    <Link href={`/admin/dashboard/edit/${worker.id}`} className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors" title="Edit Profil">
                                                        <span className="material-symbols-outlined text-xl">edit</span>
                                                    </Link>

                                                    {/* Tombol Lihat Detail Publik */}
                                                    <Link href={`/pekerja/${catSlug}/${worker.slug}`} target="_blank" className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors" title="Lihat Tampilan Publik">
                                                        <span className="material-symbols-outlined text-xl">visibility</span>
                                                    </Link>

                                                    {/* Tombol Hapus (Menggunakan Komponen Client) */}
                                                    <div title="Hapus Pekerja">
                                                        <DeleteButton id={worker.id} fotoUrl={worker.fotoUrl} />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center py-16">
                                        <div className="flex flex-col items-center justify-center text-slate-400">
                                            <span className="material-symbols-outlined text-5xl mb-2 text-slate-300">person_search</span>
                                            <p className="font-medium">Pekerja tidak ditemukan.</p>
                                            <p className="text-sm">Coba ubah filter atau kata kunci pencarian.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}