// src/app/admin/dashboard/kontrak/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function DaftarKontrakPage() {
    const supabase = createClient();

    const [kontrakList, setKontrakList] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchKontrak = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from("kontrak_kerja")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setKontrakList(data || []);
        } catch (error: any) {
            alert("Gagal memuat daftar kontrak: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchKontrak();
    }, []);

    const handleDelete = async (id: number, nomor: string) => {
        const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus surat kontrak nomor ${nomor}?`);
        if (!confirmDelete) return;

        try {
            const { error } = await supabase
                .from("kontrak_kerja")
                .delete()
                .eq("id", id);

            if (error) throw error;
            alert("Kontrak berhasil dihapus!");
            // Refresh data
            setKontrakList(prev => prev.filter(item => item.id !== id));
        } catch (error: any) {
            alert("Gagal menghapus kontrak: " + error.message);
        }
    };

    // Filter daftar kontrak berdasarkan query pencarian
    const filteredKontrak = kontrakList.filter(item => {
        const query = searchQuery.toLowerCase();
        return (
            (item.nomor_kontrak || "").toLowerCase().includes(query) ||
            (item.nama_majikan || "").toLowerCase().includes(query) ||
            (item.nama_pekerja || "").toLowerCase().includes(query)
        );
    });

    return (
        <div className="space-y-6">
            {/* HEADER HALAMAN */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight font-['Plus_Jakarta_Sans']">Daftar Kontrak Kerja</h1>
                    <p className="text-sm text-slate-500 mt-1">Kelola dan cetak ulang surat perjanjian kerja yang telah dibuat.</p>
                </div>

                <div className="flex items-center gap-2">
                    <Link
                        href="/admin/dashboard/kontrak/preview?type=1_tahun"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm transition-all"
                    >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        Kontrak 1 Tahun Baru
                    </Link>
                    <Link
                        href="/admin/dashboard/kontrak/preview?type=permanen"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm transition-all"
                    >
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        Permanen Baru
                    </Link>
                </div>
            </div>

            {/* SEKSI FILTER / PENCARIAN */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400">search</span>
                <input
                    type="text"
                    placeholder="Cari berdasarkan nomor kontrak, nama majikan, atau nama pekerja..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-sm outline-none bg-transparent text-slate-700 placeholder-slate-400"
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery("")}
                        className="text-slate-400 hover:text-slate-600"
                    >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                )}
            </div>

            {/* TABEL DATA KONTRAK */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left text-sm text-slate-600 whitespace-nowrap">
                        <thead className="bg-slate-50 text-slate-800 font-bold border-b border-slate-200">
                            <tr>
                                <th className="px-5 py-4 w-12 text-center">No</th>
                                <th className="px-5 py-4">Nomor Kontrak</th>
                                <th className="px-5 py-4">Majikan (Pihak 1)</th>
                                <th className="px-5 py-4">Tenaga Kerja (Pihak 2)</th>
                                <th className="px-5 py-4">Tipe Perjanjian</th>
                                <th className="px-5 py-4">Mulai Bekerja</th>
                                <th className="px-5 py-4">Dibuat Pada</th>
                                <th className="px-5 py-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-12 text-slate-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="animate-spin material-symbols-outlined text-3xl text-emerald-600">sync</span>
                                            <p className="font-medium text-sm">Sedang memuat data...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredKontrak.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-12 text-slate-500 font-medium">
                                        Tidak ada data kontrak kerja ditemukan.
                                    </td>
                                </tr>
                            ) : (
                                filteredKontrak.map((item, index) => (
                                    <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="px-5 py-4 text-center font-medium text-slate-400">{index + 1}</td>
                                        <td className="px-5 py-4 font-bold text-slate-700">{item.nomor_kontrak}</td>
                                        <td className="px-5 py-4">
                                            <p className="font-semibold text-slate-800">{item.nama_majikan}</p>
                                            <p className="text-xs text-slate-400">HP: {item.no_hp_majikan || "-"}</p>
                                        </td>
                                        <td className="px-5 py-4">
                                            <p className="font-semibold text-slate-800">{item.nama_pekerja}</p>
                                            <p className="text-xs text-slate-400">{item.pekerjaan_pokok || "-"}</p>
                                        </td>
                                        <td className="px-5 py-4">
                                            {item.jenis_kontrak === "permanen" ? (
                                                <span className="bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm">
                                                    Permanen 3 Bulan
                                                </span>
                                            ) : (
                                                <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm">
                                                    Kontrak 1 Tahun
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-5 py-4 font-medium text-slate-600">
                                            {item.tanggal_masuk ? (
                                                new Date(item.tanggal_masuk).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
                                            ) : (
                                                "-"
                                            )}
                                        </td>
                                        <td className="px-5 py-4 text-xs text-slate-400">
                                            {new Date(item.created_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex justify-center gap-2">
                                                <Link
                                                    href={`/admin/dashboard/kontrak/preview?id=${item.id}`}
                                                    className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 hover:text-emerald-700 transition-all flex items-center justify-center shadow-sm"
                                                    title="Edit / Cetak Ulang"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">print</span>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(item.id, item.nomor_kontrak)}
                                                    className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 hover:text-red-700 transition-all flex items-center justify-center shadow-sm"
                                                    title="Hapus Kontrak"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
