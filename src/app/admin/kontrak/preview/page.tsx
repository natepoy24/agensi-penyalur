// src/app/admin/kontrak/preview/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

// Komponen Pendukung
import FormInputKontrak from "@/components/FormInputKontrak";
import TemplateKontrak from "@/components/TemplateKontrak";
import TemplatePernyataanPekerja from "@/components/TemplatePernyataanPekerja";

export default function BuatKontrakPage() {
    const supabase = createClient();

    // === STATE UTAMA ===
    const [pekerjaList, setPekerjaList] = useState<any[]>([]);
    const [pasalList, setPasalList] = useState<any[]>([]);
    const [pernyataanList, setPernyataanList] = useState<any[]>([]);

    const [isSavingLaporan, setIsSavingLaporan] = useState(false);
    const [isSavingTemplate, setIsSavingTemplate] = useState(false);

    const [formData, setFormData] = useState({
        nomorKontrak: "",
        jenisKontrak: "1_tahun",
        namaMajikan: "", nikMajikan: "", noHpMajikan: "", alamatMajikan: "",
        provinsiLokasiKerja: "", kotaLokasiKerja: "",
        pekerja_id: "", namaPekerja: "", namaPanggilan: "", nikPekerja: "", noHpPekerja: "",
        umurPekerja: "", tinggiBadan: "", beratBadan: "", jenisKelamin: "", pendidikan: "",
        agama: "", statusPerkawinan: "", tempatLahir: "", tglLahir: "",
        provinsiPekerja: "", kotaAsalPekerja: "", kecamatanPekerja: "", kelurahanPekerja: "",
        namaAyah: "", namaIbu: "", namaKakak: "", namaAdik: "",
        anakKe: "", jumlahSaudara: "", alamatJalanKeluarga: "",
        provinsiKeluarga: "", kotaKeluarga: "", kontakDarurat: "", ijinKerja: "",
        pengalamanKerja: "", lamaKerja: "", gajiTerakhir: "", alamatKerjaSebelumnya: "",
        pekerjaanPokok: "", gajiPekerja: "", biayaAdmin: "", tanggalMasuk: "",
        potonganBulanPertama: "", biayaOngkir: ""
    });

    // === FETCH DATA ===
    useEffect(() => {
        const fetchData = async () => {
            const { data: pList } = await supabase.from('pekerja').select('*').eq('status', 'Tersedia');
            if (pList) setPekerjaList(pList);

            const { data: sData } = await supabase.from('template_pasal').select('*').eq('jenis_kontrak', 'pernyataan_pekerja');
            if (sData) setPernyataanList(sData);

            // --- LOGIKA GENERATOR NOMOR KONTRAK OTOMATIS ---
            const { data: lastLaporan } = await supabase
                .from('laporan_kemnaker')
                .select('id')
                .order('id', { ascending: false })
                .limit(1);

            let nextId = 1;
            if (lastLaporan && lastLaporan.length > 0) {
                nextId = lastLaporan[0].id + 1; // Ambil ID terakhir + 1
            }

            // Format ID menjadi 3 digit (contoh: 1 menjadi 001, 15 menjadi 015)
            const paddedId = String(nextId).padStart(3, '0');
            const d = new Date();
            const autoNomor = `JM/KTR/${d.getFullYear()}/${d.getMonth() + 1}/${paddedId}`;

            // Masukkan nomor otomatis ini ke dalam formData
            setFormData(prev => ({ ...prev, nomorKontrak: autoNomor }));
        };
        fetchData();
    }, [supabase]);

    useEffect(() => {
        const fetchPasal = async () => {
            const { data } = await supabase.from('template_pasal')
                .select('*')
                .eq('jenis_kontrak', formData.jenisKontrak)
                .order('id', { ascending: true });
            if (data) setPasalList(data);
        };
        fetchPasal();
    }, [supabase, formData.jenisKontrak]);

    // === HANDLER ===
    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePekerjaChange = (e: any) => {
        const id = e.target.value;
        if (id === "manual" || id === "") {
            setFormData({ ...formData, pekerja_id: id });
        } else {
            const p = pekerjaList.find(item => item.id.toString() === id);
            if (p) {
                setFormData({
                    ...formData,
                    pekerja_id: id,
                    namaPekerja: p.nama || "",
                    nikPekerja: p.nik || "",
                    tinggiBadan: p.tinggi_badan || "",
                    beratBadan: p.berat_badan || "",
                    pekerjaanPokok: p.kategori || "",
                    gajiPekerja: p.gaji || "",
                    tempatLahir: p.tempat_lahir || "",
                    tglLahir: p.tanggal_lahir || "",
                    noHpPekerja: p.no_hp || "",
                    pendidikan: p.pendidikan || "",
                });
            }
        }
    };

    // FUNGSI SIMPAN LAPORAN KEMNAKER[cite: 5]
    const handleSimpanLaporan = async () => {
        setIsSavingLaporan(true);
        try {
            const { error } = await supabase.from('laporan_kemnaker').insert([{
                nik_tenaga_kerja: formData.nikPekerja,
                nama_tenaga_kerja: formData.namaPekerja,
                kabupaten_domisili: formData.kotaAsalPekerja,
                provinsi_domisili: formData.provinsiPekerja,
                no_hp: formData.noHpPekerja,
                jenis_kelamin: formData.jenisKelamin,
                pendidikan: formData.pendidikan,
                nama_pemberi_kerja: formData.namaMajikan,
                nama_jabatan: formData.pekerjaanPokok,
                kabupaten_lokasi_kerja: formData.kotaLokasiKerja,
                provinsi_lokasi_kerja: formData.provinsiLokasiKerja,
                tanggal_mulai_bekerja: formData.tanggalMasuk,
                upah_diterima: parseFloat(formData.gajiPekerja || "0")
            }]);
            if (error) throw error;
            alert("Laporan Kemnaker berhasil disimpan!");
        } catch (err: any) {
            alert(err.message);
        } finally {
            setIsSavingLaporan(false);
        }
    };

    // FUNGSI SIMPAN TEMPLATE PASAL (YANG TADI HILANG)
    const handleSaveTemplate = async () => {
        setIsSavingTemplate(true);
        try {
            // Gabungkan list pasal kontrak dan pernyataan pekerja untuk diupdate sekaligus
            const allTemplates = [...pasalList, ...pernyataanList];
            const { error } = await supabase.from('template_pasal').upsert(allTemplates);

            if (error) throw error;
            alert("Seluruh perubahan pasal & pernyataan berhasil disimpan ke database!");
        } catch (err: any) {
            alert("Gagal simpan template: " + err.message);
        } finally {
            setIsSavingTemplate(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col">
            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    @page { size: 210mm 330mm; margin: 15mm 0mm; }
                    .no-print { display: none !important; }
                    body { background: white !important; }
                    .page-break { page-break-before: always !important; }
                }
            `}} />

            {/* HEADER NAVBAR - FULL WIDTH */}
            <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-[100] no-print shadow-sm">
                <div className="flex items-center gap-4">
                    <Link href="/admin/dashboard" className="p-2 hover:bg-slate-100 rounded-full">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <h1 className="text-lg font-bold text-black uppercase tracking-tight">Generator Dokumen JM</h1>
                </div>
                <div className="flex gap-2">
                    {/* TOMBOL SIMPAN PASAL */}
                    <button onClick={handleSaveTemplate} disabled={isSavingTemplate} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition-all">
                        <span className="material-symbols-outlined text-sm">save</span>
                        {isSavingTemplate ? "Proses..." : "Simpan Perubahan Pasal"}
                    </button>

                    <button onClick={handleSimpanLaporan} disabled={isSavingLaporan} className="bg-slate-800 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">database</span>
                        {isSavingLaporan ? "..." : "Simpan Laporan"}
                    </button>

                    <button onClick={() => window.print()} className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-md">
                        <span className="material-symbols-outlined text-sm">print</span> Cetak (F4)
                    </button>
                </div>
            </header>

            {/* LAYOUT UTAMA */}
            <div className="flex flex-1 overflow-hidden">

                {/* SIDEBAR EDIT (KIRI) */}
                <aside className="w-[450px] bg-white border-r border-slate-200 no-print overflow-y-auto p-6 h-[calc(100vh-64px)] custom-scrollbar">
                    <FormInputKontrak
                        formData={formData}
                        handleChange={handleChange}
                        handlePekerjaChange={handlePekerjaChange}
                        pekerjaList={pekerjaList}
                        pasalList={pasalList}
                        setPasalList={setPasalList}
                        pernyataanList={pernyataanList}
                        setPernyataanList={setPernyataanList}
                    />
                </aside>

                {/* PREVIEW AREA (KANAN) */}
                <main className="flex-1 overflow-y-auto p-10 bg-slate-200/50 flex flex-col items-center gap-10 print:p-0 print:bg-white">
                    <div className="shadow-2xl print:shadow-none bg-white">
                        <TemplateKontrak formData={formData} pasalList={pasalList} />
                    </div>

                    <div className="shadow-2xl print:shadow-none bg-white page-break">
                        <TemplatePernyataanPekerja formData={formData} pernyataanList={pernyataanList} />
                    </div>
                </main>

            </div>
        </div>
    );
}