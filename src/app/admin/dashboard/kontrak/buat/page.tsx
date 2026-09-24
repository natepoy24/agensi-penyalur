// src/app/admin/dashboard/kontrak/buat/page.tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import FormInputKontrak from "@/components/perjanjiankerja/FormInputKontrak";

// Helper Mappings
const mapToCamelCase = (dbRow: any) => {
    let namaMajikan = dbRow.nama_majikan || "";
    let tipeMajikan = dbRow.tipe_majikan || "perorangan";
    let namaInstansi = dbRow.nama_instansi || "";

    // Parse metadata bridge dari nama_majikan jika ada
    if (namaMajikan.includes("|||")) {
        const parts = namaMajikan.split("|||");
        namaMajikan = parts[0].trim();
        try {
            const meta = JSON.parse(parts[1]);
            if (meta.tipeMajikan) tipeMajikan = meta.tipeMajikan;
            if (meta.namaInstansi) namaInstansi = meta.namaInstansi;
        } catch {}
    }

    // Cek cache localStorage jika ada
    if (dbRow.nomor_kontrak) {
        try {
            const cached = localStorage.getItem("kontrak_items_" + dbRow.nomor_kontrak);
            if (cached) {
                const parsed = JSON.parse(cached);
                if (parsed.tipeMajikan) tipeMajikan = parsed.tipeMajikan;
                if (parsed.namaInstansi) namaInstansi = parsed.namaInstansi;
            }
        } catch {}
    }

    return {
        nomorKontrak: dbRow.nomor_kontrak || "",
        jenisKontrak: dbRow.jenis_kontrak || "1_tahun",
        tipeMajikan,
        namaInstansi,
        namaMajikan,
        nikMajikan: dbRow.nik_majikan || "",
        noHpMajikan: dbRow.no_hp_majikan || "",
        alamatMajikan: dbRow.alamat_majikan || "",
        provinsiLokasiKerja: dbRow.provinsi_lokasi_kerja || "",
        kotaLokasiKerja: dbRow.kota_lokasi_kerja || "",
        pekerja_id: dbRow.pekerja_id ? dbRow.pekerja_id.toString() : "",
        namaPekerja: dbRow.nama_pekerja || "",
        namaPanggilan: dbRow.nama_panggilan || "",
        nikPekerja: dbRow.nik_pekerja || "",
        noHpPekerja: dbRow.no_hp_pekerja || "",
        umurPekerja: dbRow.umur_pekerja || "",
        tinggiBadan: dbRow.tinggi_badan || "",
        beratBadan: dbRow.berat_badan || "",
        jenisKelamin: dbRow.jenis_kelamin || "",
        pendidikan: dbRow.pendidikan || "",
        agama: dbRow.agama || "",
        statusPerkawinan: dbRow.status_perkawinan || "",
        tempatLahir: dbRow.tempat_lahir || "",
        tglLahir: dbRow.tgl_lahir || "",
        provinsiPekerja: dbRow.provinsi_pekerja || "",
        kotaAsalPekerja: dbRow.kota_asal_pekerja || "",
        kecamatanPekerja: dbRow.kecamatan_pekerja || "",
        kelurahanPekerja: dbRow.kelurahan_pekerja || "",
        alamatJalanPekerja: dbRow.alamat_jalan_pekerja || "",
        namaAyah: dbRow.nama_ayah || "",
        namaIbu: dbRow.nama_ibu || "",
        namaKakak: dbRow.nama_kakak || "",
        namaAdik: dbRow.nama_adik || "",
        anakKe: dbRow.anak_ke || "",
        jumlahSaudara: dbRow.jumlah_saudara || "",
        alamatJalanKeluarga: dbRow.alamat_jalan_keluarga || "",
        provinsiKeluarga: dbRow.provinsi_keluarga || "",
        kotaKeluarga: dbRow.kota_keluarga || "",
        kontakDarurat: dbRow.kontak_darurat || "",
        ijinKerja: dbRow.ijin_kerja || "",
        pengalamanKerja: dbRow.pengalaman_kerja || "",
        lamaKerja: dbRow.lama_kerja || "",
        gajiTerakhir: dbRow.gaji_terakhir || "",
        alamatKerjaSebelumnya: dbRow.alamat_kerja_sebelumnya || "",
        pekerjaanPokok: dbRow.pekerjaan_pokok || "",
        gajiPekerja: dbRow.gaji_pekerja || "",
        biayaAdmin: dbRow.biaya_admin || "",
        tanggalMasuk: dbRow.tanggal_masuk || "",
        potonganBulanPertama: dbRow.potongan_bulan_pertama || "",
        biayaOngkir: dbRow.biaya_ongkir || dbRow.Biaya_Ongkir || ""
    };
};

export default function BuatKontrakPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-50 flex items-center justify-center font-medium text-slate-500">
                <span className="material-symbols-outlined text-3xl animate-spin text-emerald-600 mr-2">sync</span>
                Memuat Form Kontrak...
            </div>
        }>
            <BuatKontrakContent />
        </Suspense>
    );
}

function BuatKontrakContent() {
    const supabase = createClient();
    const router = useRouter();
    const searchParams = useSearchParams();
    const typeParam = searchParams.get('type') || '1_tahun';
    const idParam = searchParams.get('id');

    const [pekerjaList, setPekerjaList] = useState<any[]>([]);
    const [pasalList, setPasalList] = useState<any[]>([]);
    const [pernyataanList, setPernyataanList] = useState<any[]>([]);

    const [isSavingTemplate, setIsSavingTemplate] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState({
        nomorKontrak: "",
        jenisKontrak: typeParam,
        tipeMajikan: "perorangan",
        namaInstansi: "",
        namaMajikan: "",
        nikMajikan: "",
        noHpMajikan: "",
        alamatMajikan: "",
        provinsiLokasiKerja: "",
        kotaLokasiKerja: "",
        pekerja_id: "",
        namaPekerja: "",
        namaPanggilan: "",
        nikPekerja: "",
        noHpPekerja: "",
        umurPekerja: "",
        tinggiBadan: "",
        beratBadan: "",
        jenisKelamin: "",
        pendidikan: "",
        agama: "",
        statusPerkawinan: "",
        tempatLahir: "",
        tglLahir: "",
        provinsiPekerja: "",
        kotaAsalPekerja: "",
        kecamatanPekerja: "",
        kelurahanPekerja: "",
        alamatJalanPekerja: "",
        namaAyah: "",
        namaIbu: "",
        namaKakak: "",
        namaAdik: "",
        anakKe: "",
        jumlahSaudara: "",
        alamatJalanKeluarga: "",
        provinsiKeluarga: "",
        kotaKeluarga: "",
        kontakDarurat: "",
        ijinKerja: "",
        pengalamanKerja: "",
        lamaKerja: "",
        gajiTerakhir: "",
        alamatKerjaSebelumnya: "",
        pekerjaanPokok: "",
        gajiPekerja: "",
        biayaAdmin: "",
        tanggalMasuk: new Date().toISOString().split("T")[0],
        potonganBulanPertama: "",
        biayaOngkir: ""
    });

    // Fetch initial data: daftar pekerja & template pernyataan
    useEffect(() => {
        const fetchData = async () => {
            const { data: pList } = await supabase.from('pekerja').select('*').eq('status', 'Tersedia');
            if (pList) setPekerjaList(pList);

            const { data: sData } = await supabase.from('template_pasal').select('*').eq('jenis_kontrak', 'pernyataan_pekerja');
            if (sData) setPernyataanList(sData);

            // Fetch Nomor Kontrak Otomatis jika membuat baru dan belum ada nomor
            if (!idParam) {
                // Cek cache preview terlebih dahulu
                const rawPreview = localStorage.getItem("kontrak_preview_data");
                if (rawPreview) {
                    try {
                        const parsed = JSON.parse(rawPreview);
                        if (!parsed.isExisting && parsed.nomorKontrak) {
                            setFormData(prev => ({
                                ...prev,
                                ...parsed,
                                jenisKontrak: typeParam || parsed.jenisKontrak || "1_tahun"
                            }));
                            if (parsed.pasalList) setPasalList(parsed.pasalList);
                            if (parsed.pernyataanList) setPernyataanList(parsed.pernyataanList);
                            return;
                        }
                    } catch {}
                }

                const { data: lastLaporan } = await supabase
                    .from('laporan_kemnaker')
                    .select('id')
                    .order('id', { ascending: false })
                    .limit(1);

                let nextId = 1;
                if (lastLaporan && lastLaporan.length > 0) {
                    nextId = lastLaporan[0].id + 1;
                }

                const paddedId = String(nextId).padStart(3, '0');
                const d = new Date();
                const autoNomor = `JM/KTR/${d.getFullYear()}/${d.getMonth() + 1}/${paddedId}`;

                setFormData(prev => ({ ...prev, nomorKontrak: autoNomor }));
            }
        };
        fetchData();
    }, [supabase, idParam, typeParam]);

    // Memuat kontrak lama dari DB jika ada idParam
    useEffect(() => {
        if (!idParam) return;
        const loadSavedKontrak = async () => {
            const { data, error } = await supabase
                .from("kontrak_kerja")
                .select("*")
                .eq("id", idParam)
                .single();

            if (error) {
                alert("Gagal memuat kontrak tersimpan: " + error.message);
                return;
            }

            if (data) {
                setFormData(mapToCamelCase(data));
                if (data.pasal_list && Array.isArray(data.pasal_list)) setPasalList(data.pasal_list);
                if (data.pernyataan_list && Array.isArray(data.pernyataan_list)) setPernyataanList(data.pernyataan_list);
            }
        };
        loadSavedKontrak();
    }, [idParam, supabase]);

    // Sinkronkan jenis kontrak jika type query berubah dan bukan edit
    useEffect(() => {
        if (!idParam && typeParam) {
            setFormData(prev => ({ ...prev, jenisKontrak: typeParam }));
        }
    }, [typeParam, idParam]);

    // Ambil template pasal sesuai jenis kontrak (jika bukan edit dari id)
    useEffect(() => {
        if (idParam) return;

        const fetchPasal = async () => {
            const { data } = await supabase.from('template_pasal')
                .select('*')
                .eq('jenis_kontrak', formData.jenisKontrak)
                .order('id', { ascending: true });
            if (data) setPasalList(data);
        };
        fetchPasal();
    }, [supabase, formData.jenisKontrak, idParam]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleJenisKontrakChange = (newType: string) => {
        setFormData(prev => ({ ...prev, jenisKontrak: newType }));
        router.replace(`/admin/dashboard/kontrak/buat?type=${newType}${idParam ? `&id=${idParam}` : ""}`);
    };

    const handlePekerjaChange = (e: any) => {
        const id = e.target.value;
        if (id === "manual" || id === "") {
            setFormData(prev => ({ ...prev, pekerja_id: id }));
        } else {
            const p = pekerjaList.find(item => item.id.toString() === id);
            if (p) {
                setFormData(prev => ({
                    ...prev,
                    pekerja_id: id,
                    namaPekerja: p.nama || "",
                    nikPekerja: p.nik || "",
                    noHpPekerja: p.no_hp || "",
                    tempatLahir: p.tempat_lahir || "",
                    tglLahir: p.tanggal_lahir || "",
                    umurPekerja: p.umur || "",
                    tinggiBadan: p.tinggi_badan || "",
                    beratBadan: p.berat_badan || "",
                    jenisKelamin: p.jenis_kelamin || "",
                    pendidikan: p.pendidikan_terakhir || "",
                    agama: p.agama || "",
                    statusPerkawinan: p.status_perkawinan || "",
                    provinsiPekerja: p.provinsi || "",
                    kotaAsalPekerja: p.lokasi || "",
                    pekerjaanPokok: p.kategori || "",
                    gajiPekerja: p.gaji || "",
                    pengalamanKerja: p.pengalaman || "",
                    namaAyah: p.nama_ayah || "",
                    namaIbu: p.nama_ibu || "",
                    kontakDarurat: p.kontak_darurat || "",
                    ijinKerja: p.ijin_kerja || ""
                }));
            }
        }
    };

    const handleSaveTemplate = async () => {
        setIsSavingTemplate(true);
        try {
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

    const handleLanjutKePreview = () => {
        setErrorMessage("");

        if (!formData.nomorKontrak.trim()) {
            setErrorMessage("Nomor kontrak tidak boleh kosong.");
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        if (!formData.namaMajikan.trim()) {
            setErrorMessage("Nama Majikan / Penanggung Jawab wajib diisi.");
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        if (formData.tipeMajikan === "perusahaan" && !formData.namaInstansi.trim()) {
            setErrorMessage("Nama Instansi wajib diisi karena Anda memilih tipe majikan Perusahaan.");
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        if (!formData.namaPekerja.trim()) {
            setErrorMessage("Nama Tenaga Kerja wajib diisi (Pilih pekerja atau input manual).");
            window.scrollTo({ top: 250, behavior: "smooth" });
            return;
        }

        const previewData = {
            ...formData,
            tipeMajikan: formData.tipeMajikan || "perorangan",
            namaInstansi: formData.tipeMajikan === "perusahaan" ? (formData.namaInstansi || "") : "",
            pasalList,
            pernyataanList,
            isExisting: !!idParam,
            existingId: idParam || null,
        };

        localStorage.setItem("kontrak_preview_data", JSON.stringify(previewData));
        router.push("/admin/dashboard/kontrak/preview" + (idParam ? `?id=${idParam}` : ""));
    };

    return (
        <div className="min-h-screen py-8 px-4 max-w-4xl mx-auto space-y-6">
            {/* Header Navigasi */}
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <Link
                        href="/admin/dashboard/kontrak"
                        className="flex items-center gap-1.5 text-slate-500 hover:text-emerald-600 text-sm font-medium transition-colors"
                    >
                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                        Kembali ke Daftar Kontrak
                    </Link>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-2">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3 font-['Plus_Jakarta_Sans']">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md text-white">
                                <span className="material-symbols-outlined text-[22px]">contract</span>
                            </div>
                            {idParam ? "Edit Surat Kontrak Kerja" : "Buat Surat Kontrak Kerja"}
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">
                            Lengkapi data perjanjian di bawah ini, lalu klik &quot;Lanjut ke Preview Dokumen&quot; untuk memeriksa cetakan PDF.
                        </p>
                    </div>

                    {/* Toggle Pilihan Jenis Kontrak */}
                    <div className="inline-flex p-1 bg-slate-200/80 rounded-2xl border border-slate-300">
                        <button
                            type="button"
                            onClick={() => handleJenisKontrakChange("1_tahun")}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                                formData.jenisKontrak === "1_tahun"
                                    ? "bg-white text-emerald-700 shadow-sm"
                                    : "text-slate-600 hover:text-slate-900"
                            }`}
                        >
                            <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                            Kontrak 1 Tahun
                        </button>
                        <button
                            type="button"
                            onClick={() => handleJenisKontrakChange("permanen")}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                                formData.jenisKontrak === "permanen"
                                    ? "bg-white text-blue-700 shadow-sm"
                                    : "text-slate-600 hover:text-slate-900"
                            }`}
                        >
                            <span className="material-symbols-outlined text-[16px]">verified</span>
                            Permanen 3 Bulan
                        </button>
                    </div>
                </div>
            </div>

            {/* Notifikasi Error jika validasi gagal */}
            {errorMessage && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-sm text-red-700 font-semibold animate-in fade-in slide-in-from-top-2 duration-300">
                    <span className="material-symbols-outlined text-red-500">error</span>
                    <span>{errorMessage}</span>
                </div>
            )}

            {/* Informasi Dasar Kontrak */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h2 className="font-bold border-b pb-2 flex items-center gap-2 text-slate-800">
                    <span className="material-symbols-outlined text-emerald-600">article</span>
                    Informasi Dokumen Kontrak
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                            Nomor Kontrak <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="nomorKontrak"
                            value={formData.nomorKontrak}
                            onChange={handleChange}
                            className="w-full p-2.5 bg-slate-50 border rounded-xl outline-none font-mono text-sm font-bold text-emerald-800 focus:bg-white focus:border-emerald-500 transition-all"
                            placeholder="Contoh: JM/KTR/2026/9/001"
                        />
                        <p className="text-[11px] text-slate-400 mt-1">Dibuat otomatis, dapat diedit jika diperlukan.</p>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                            Tipe Perjanjian
                        </label>
                        <div className="p-2.5 bg-slate-50 border rounded-xl text-sm font-semibold text-slate-700 flex items-center gap-2">
                            {formData.jenisKontrak === "permanen" ? (
                                <>
                                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                                    <span>Permanen (Garansi 3 Bulan)</span>
                                </>
                            ) : (
                                <>
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                                    <span>Kontrak Kerja 1 Tahun</span>
                                </>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                            Tanggal Mulai Bekerja (Masuk)
                        </label>
                        <input
                            type="date"
                            name="tanggalMasuk"
                            value={formData.tanggalMasuk}
                            onChange={handleChange}
                            className="w-full p-2.5 bg-white border rounded-xl outline-none focus:border-emerald-500 text-sm font-medium"
                        />
                    </div>
                </div>
            </div>

            {/* Komponen Form Input Lengkap */}
            <FormInputKontrak
                formData={formData}
                handleChange={handleChange}
                handlePekerjaChange={handlePekerjaChange}
                pekerjaList={pekerjaList}
                pasalList={pasalList}
                setPasalList={setPasalList}
                pernyataanList={pernyataanList}
                setPernyataanList={setPernyataanList}
                handleSaveTemplate={handleSaveTemplate}
                isSavingTemplate={isSavingTemplate}
            />

            {/* Tombol Lanjut ke Preview (Bawah Halaman) */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-4 z-40">
                <div className="text-xs text-slate-500">
                    Pastikan seluruh data majikan dan tenaga kerja telah terisi dengan benar sebelum mencetak.
                </div>
                <button
                    type="button"
                    onClick={handleLanjutKePreview}
                    className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
                >
                    <span>Lanjut ke Preview Dokumen</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
            </div>
        </div>
    );
}
