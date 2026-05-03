// src/app/admin/dashboard/laporan/page.tsx
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import * as XLSX from "xlsx";

export default function LaporanKemnakerPage() {
    const supabase = createClient();

    // State Data Laporan
    const [laporanList, setLaporanList] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // State Filter Bulan
    const [filterBulan, setFilterBulan] = useState(() => {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    });

    // State Modal Edit
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editData, setEditData] = useState<any>(null);

    // === STATE API WILAYAH INDONESIA ===
    const [provinces, setProvinces] = useState<any[]>([]);
    const [regsDomisili, setRegsDomisili] = useState<any[]>([]);
    const [regsLokasi, setRegsLokasi] = useState<any[]>([]);

    useEffect(() => {
        fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
            .then(res => res.json())
            .then(data => setProvinces(data));
    }, []);

    const formatNamaKota = (n: string) => {
        if (n.startsWith("KOTA JAKARTA")) return n.replace("KOTA JAKARTA", "KOTA ADM. JAKARTA");
        if (n === "KABUPATEN KEPULAUAN SERIBU") return "KAB. ADM. KEPULAUAN SERIBU";
        return n;
    };

    const fetchLaporan = async () => {
        setIsLoading(true);
        try {
            let query = supabase.from('laporan_kemnaker').select('*').order('created_at', { ascending: false });

            if (filterBulan) {
                const [year, month] = filterBulan.split('-');
                const startDate = new Date(parseInt(year), parseInt(month) - 1, 1).toISOString();
                const endDate = new Date(parseInt(year), parseInt(month), 1).toISOString();

                query = query.gte('created_at', startDate).lt('created_at', endDate);
            }

            const { data, error } = await query;
            if (error) throw error;
            setLaporanList(data || []);
        } catch (error: any) {
            alert("Gagal memuat data: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLaporan();
    }, [filterBulan]);

    const handleOpenEdit = async (item: any) => {
        setEditData(item);
        setIsEditModalOpen(true);

        if (item.provinsi_domisili) {
            const prov = provinces.find(p => p.name === item.provinsi_domisili);
            if (prov) {
                const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${prov.id}.json`);
                let data = await res.json();
                setRegsDomisili(data.map((r: any) => ({ ...r, name: formatNamaKota(r.name) })));
            }
        }

        if (item.provinsi_lokasi_kerja) {
            const prov = provinces.find(p => p.name === item.provinsi_lokasi_kerja);
            if (prov) {
                const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${prov.id}.json`);
                let data = await res.json();
                setRegsLokasi(data.map((r: any) => ({ ...r, name: formatNamaKota(r.name) })));
            }
        }
    };

    const handleProvChange = async (e: React.ChangeEvent<HTMLSelectElement>, type: 'domisili' | 'lokasi') => {
        const val = e.target.value;
        const prov = provinces.find(p => p.name === val);

        if (type === 'domisili') {
            setEditData({ ...editData, provinsi_domisili: val, kabupaten_domisili: "" });
        } else {
            setEditData({ ...editData, provinsi_lokasi_kerja: val, kabupaten_lokasi_kerja: "" });
        }

        if (prov) {
            const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${prov.id}.json`);
            let data = await res.json();
            data = data.map((r: any) => ({ ...r, name: formatNamaKota(r.name) }));
            if (type === 'domisili') setRegsDomisili(data);
            else setRegsLokasi(data);
        } else {
            if (type === 'domisili') setRegsDomisili([]);
            else setRegsLokasi([]);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Yakin ingin menghapus data laporan ini?")) return;
        try {
            const { error } = await supabase.from('laporan_kemnaker').delete().eq('id', id);
            if (error) throw error;
            alert("Data berhasil dihapus!");
            fetchLaporan();
        } catch (error: any) {
            alert("Gagal menghapus: " + error.message);
        }
    };

    const handleSaveEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { error } = await supabase
                .from('laporan_kemnaker')
                .update({
                    nik_tenaga_kerja: editData.nik_tenaga_kerja,
                    nama_tenaga_kerja: editData.nama_tenaga_kerja,
                    kabupaten_domisili: editData.kabupaten_domisili,
                    provinsi_domisili: editData.provinsi_domisili,
                    no_hp: editData.no_hp,                  // Pastikan no hp terupdate
                    jenis_kelamin: editData.jenis_kelamin,  // Tambahan update J.Kelamin
                    pendidikan: editData.pendidikan,        // Tambahan update Pendidikan
                    nama_pemberi_kerja: editData.nama_pemberi_kerja,
                    nama_jabatan: editData.nama_jabatan,
                    kabupaten_lokasi_kerja: editData.kabupaten_lokasi_kerja,
                    provinsi_lokasi_kerja: editData.provinsi_lokasi_kerja,
                    upah_diterima: editData.upah_diterima,
                    tanggal_mulai_bekerja: editData.tanggal_mulai_bekerja
                })
                .eq('id', editData.id);

            if (error) throw error;
            alert("Data laporan berhasil diperbarui!");
            setIsEditModalOpen(false);
            fetchLaporan();
        } catch (error: any) {
            alert("Gagal update data: " + error.message);
        }
    };

    const handleExportExcel = () => {
        if (laporanList.length === 0) {
            alert("Tidak ada data untuk di-export pada bulan ini.");
            return;
        }

        const excelData = laporanList.map((item, index) => ({
            "No": index + 1,
            "NIK": item.nik_tenaga_kerja,
            "Nama Tenaga Kerja": item.nama_tenaga_kerja,
            "Kabupaten/Kota (domisili)": item.kabupaten_domisili,
            "Provinsi": item.provinsi_domisili,
            "No HP": item.no_hp,
            "Jenis Kelamin": item.jenis_kelamin,
            "Pendidikan": item.pendidikan,
            "Nama Perusahaan/Pemberi Kerja": item.nama_pemberi_kerja,
            "Nama Jabatan": item.nama_jabatan,
            "Kabupaten/Kota Lokasi Kerja": item.kabupaten_lokasi_kerja,
            "Provinsi Lokasi Kerja": item.provinsi_lokasi_kerja,
            "Tanggal Mulai Bekerja": item.tanggal_mulai_bekerja,
            "Upah yang Diterima": item.upah_diterima
        }));

        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Kemnaker");

        const wscols = [
            { wch: 5 }, { wch: 20 }, { wch: 25 }, { wch: 20 }, { wch: 20 },
            { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 25 }, { wch: 20 },
            { wch: 20 }, { wch: 20 }, { wch: 15 }, { wch: 15 }
        ];
        worksheet['!cols'] = wscols;

        XLSX.writeFile(workbook, `Laporan_Kemnaker_${filterBulan}.xlsx`);
    };

    return (
        <div className="space-y-6">
            {/* HEADER & ACTIONS */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Laporan Penempatan</h1>
                    <p className="text-sm text-slate-500">Kelola dan unduh data penempatan tenaga kerja bulanan.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
                        <span className="material-symbols-outlined text-slate-400">calendar_month</span>
                        <input
                            type="month"
                            value={filterBulan}
                            onChange={(e) => setFilterBulan(e.target.value)}
                            className="bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer"
                        />
                    </div>

                    <button
                        onClick={handleExportExcel}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors shadow-md"
                    >
                        <span className="material-symbols-outlined">download</span> Export .xlsx
                    </button>
                </div>
            </div>

            {/* TABEL DATA */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left text-sm text-slate-600 whitespace-nowrap">
                        <thead className="bg-slate-50 text-slate-800 font-bold border-b border-slate-200">
                            <tr>
                                <th className="px-4 py-3">No</th>
                                <th className="px-4 py-3">Tenaga Kerja</th>
                                <th className="px-4 py-3">Jabatan</th>
                                <th className="px-4 py-3">Pemberi Kerja</th>
                                <th className="px-4 py-3">Lokasi Kerja</th>
                                <th className="px-4 py-3">Tgl Mulai</th>
                                <th className="px-4 py-3 text-right">Upah (Rp)</th>
                                <th className="px-4 py-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan={8} className="text-center py-10">Memuat data...</td></tr>
                            ) : laporanList.length === 0 ? (
                                <tr><td colSpan={8} className="text-center py-10 text-slate-500">Tidak ada laporan di bulan ini.</td></tr>
                            ) : (
                                laporanList.map((item, index) => (
                                    <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="px-4 py-3 font-medium">{index + 1}</td>
                                        <td className="px-4 py-3">
                                            <p className="font-bold text-slate-800">{item.nama_tenaga_kerja}</p>
                                            <p className="text-xs text-slate-500">NIK: {item.nik_tenaga_kerja}</p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md text-xs font-bold">{item.nama_jabatan}</span>
                                        </td>
                                        <td className="px-4 py-3 font-medium">{item.nama_pemberi_kerja}</td>
                                        <td className="px-4 py-3">
                                            <p>{item.kabupaten_lokasi_kerja}</p>
                                            <p className="text-xs text-slate-500">{item.provinsi_lokasi_kerja}</p>
                                        </td>
                                        <td className="px-4 py-3">{item.tanggal_mulai_bekerja}</td>
                                        <td className="px-4 py-3 text-right font-bold text-slate-700">
                                            {new Intl.NumberFormat('id-ID').format(item.upah_diterima)}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => handleOpenEdit(item)}
                                                    className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                                    title="Edit Data"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                                    title="Hapus Data"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">delete</span>
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

            {/* MODAL EDIT DATA DENGAN API WILAYAH */}
            {isEditModalOpen && editData && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-lg text-slate-800">Edit Data Laporan</h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-red-500">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleSaveEdit} className="p-6 overflow-y-auto custom-scrollbar space-y-4">

                            {/* Baris 1: Nama & NIK */}
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="text-xs font-bold text-slate-700">Nama Pekerja</label><input required value={editData.nama_tenaga_kerja || ""} onChange={e => setEditData({ ...editData, nama_tenaga_kerja: e.target.value })} className="w-full p-2 border rounded-lg outline-none bg-slate-50" /></div>
                                <div><label className="text-xs font-bold text-slate-700">NIK Pekerja</label><input required value={editData.nik_tenaga_kerja || ""} onChange={e => setEditData({ ...editData, nik_tenaga_kerja: e.target.value })} className="w-full p-2 border rounded-lg outline-none bg-slate-50" /></div>
                            </div>

                            {/* Baris 2 (TAMBAHAN): No HP, J.Kelamin, Pendidikan */}
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-700">No. HP</label>
                                    <input required value={editData.no_hp || ""} onChange={e => setEditData({ ...editData, no_hp: e.target.value })} className="w-full p-2 border rounded-lg outline-none bg-slate-50" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700">J. Kelamin</label>
                                    <select required value={editData.jenis_kelamin || ""} onChange={e => setEditData({ ...editData, jenis_kelamin: e.target.value })} className="w-full p-2 border rounded-lg outline-none bg-slate-50">
                                        <option value="">Pilih...</option>
                                        <option value="Laki-Laki">Laki-Laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700">Pendidikan</label>
                                    <select required value={editData.pendidikan || ""} onChange={e => setEditData({ ...editData, pendidikan: e.target.value })} className="w-full p-2 border rounded-lg outline-none bg-slate-50">
                                        <option value="">Pilih...</option>
                                        <option value="SD">SD</option>
                                        <option value="SMP">SMP</option>
                                        <option value="SMA/SMK">SMA/SMK</option>
                                        <option value="D3">D3</option>
                                        <option value="S1">S1</option>
                                    </select>
                                </div>
                            </div>

                            {/* API Wilayah Domisili */}
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 mt-2">
                                <label className="text-xs font-bold text-emerald-700 mb-2 block">Wilayah Domisili (KTP)</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <select required value={editData.provinsi_domisili || ""} onChange={e => handleProvChange(e, 'domisili')} className="w-full p-2 border rounded-lg outline-none bg-white text-sm">
                                        <option value="">Pilih Provinsi</option>
                                        {provinces.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                                    </select>
                                    <select required value={editData.kabupaten_domisili || ""} onChange={e => setEditData({ ...editData, kabupaten_domisili: e.target.value })} disabled={!editData.provinsi_domisili} className="w-full p-2 border rounded-lg outline-none bg-white text-sm disabled:bg-slate-100">
                                        <option value="">Pilih Kab/Kota</option>
                                        {regsDomisili.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="text-xs font-bold text-slate-700">Pemberi Kerja / Majikan</label><input required value={editData.nama_pemberi_kerja || ""} onChange={e => setEditData({ ...editData, nama_pemberi_kerja: e.target.value })} className="w-full p-2 border rounded-lg outline-none bg-slate-50" /></div>
                                <div><label className="text-xs font-bold text-slate-700">Jabatan</label><input required value={editData.nama_jabatan || ""} onChange={e => setEditData({ ...editData, nama_jabatan: e.target.value })} className="w-full p-2 border rounded-lg outline-none bg-slate-50" /></div>
                            </div>

                            {/* API Wilayah Lokasi Kerja */}
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                                <label className="text-xs font-bold text-emerald-700 mb-2 block">Wilayah Lokasi Kerja</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <select required value={editData.provinsi_lokasi_kerja || ""} onChange={e => handleProvChange(e, 'lokasi')} className="w-full p-2 border rounded-lg outline-none bg-white text-sm">
                                        <option value="">Pilih Provinsi</option>
                                        {provinces.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                                    </select>
                                    <select required value={editData.kabupaten_lokasi_kerja || ""} onChange={e => setEditData({ ...editData, kabupaten_lokasi_kerja: e.target.value })} disabled={!editData.provinsi_lokasi_kerja} className="w-full p-2 border rounded-lg outline-none bg-white text-sm disabled:bg-slate-100">
                                        <option value="">Pilih Kab/Kota</option>
                                        {regsLokasi.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="text-xs font-bold text-slate-700">Tanggal Masuk</label><input type="date" required value={editData.tanggal_mulai_bekerja || ""} onChange={e => setEditData({ ...editData, tanggal_mulai_bekerja: e.target.value })} className="w-full p-2 border rounded-lg outline-none bg-slate-50" /></div>
                                <div><label className="text-xs font-bold text-slate-700">Upah Diterima (Rp)</label><input type="number" required value={editData.upah_diterima || ""} onChange={e => setEditData({ ...editData, upah_diterima: e.target.value })} className="w-full p-2 border rounded-lg outline-none bg-slate-50" /></div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-5 py-2 text-slate-500 font-bold hover:bg-slate-100 rounded-xl transition-colors">Batal</button>
                                <button type="submit" className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-md">Simpan Perubahan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}