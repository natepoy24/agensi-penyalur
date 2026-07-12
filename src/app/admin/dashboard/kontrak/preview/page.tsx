// src/app/admin/dashboard/kontrak/preview/page.tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

// Komponen Pendukung
import FormInputKontrak from "@/components/perjanjiankerja/FormInputKontrak";
import TemplateKontrak from "@/components/perjanjiankerja/TemplateKontrak";
import TemplatePernyataanPekerja from "@/components/perjanjiankerja/TemplatePernyataanPekerja";

// Helper Mappings
const mapToCamelCase = (dbRow: any) => {
    return {
        nomorKontrak: dbRow.nomor_kontrak || "",
        jenisKontrak: dbRow.jenis_kontrak || "1_tahun",
        namaMajikan: dbRow.nama_majikan || "",
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
        biayaOngkir: dbRow.biaya_ongkir || ""
    };
};

const mapToSnakeCase = (form: any) => {
    return {
        nomor_kontrak: form.nomorKontrak,
        jenis_kontrak: form.jenisKontrak,
        nama_majikan: form.namaMajikan,
        nik_majikan: form.nikMajikan,
        no_hp_majikan: form.noHpMajikan,
        alamat_majikan: form.alamatMajikan,
        provinsi_lokasi_kerja: form.provinsiLokasiKerja,
        kota_lokasi_kerja: form.kotaLokasiKerja,
        pekerja_id: form.pekerja_id === "manual" || form.pekerja_id === "" ? null : parseInt(form.pekerja_id),
        nama_pekerja: form.namaPekerja,
        nama_panggilan: form.namaPanggilan,
        nik_pekerja: form.nikPekerja,
        no_hp_pekerja: form.noHpPekerja,
        umur_pekerja: form.umurPekerja,
        tinggi_badan: form.tinggiBadan,
        berat_badan: form.beratBadan,
        jenis_kelamin: form.jenisKelamin,
        pendidikan: form.pendidikan,
        agama: form.agama,
        status_perkawinan: form.statusPerkawinan,
        tempat_lahir: form.tempatLahir,
        tgl_lahir: form.tglLahir,
        provinsi_pekerja: form.provinsiPekerja,
        kota_asal_pekerja: form.kotaAsalPekerja,
        kecamatan_pekerja: form.kecamatanPekerja,
        kelurahan_pekerja: form.kelurahanPekerja,
        nama_ayah: form.namaAyah,
        nama_ibu: form.namaIbu,
        nama_kakak: form.namaKakak,
        nama_adik: form.namaAdik,
        anak_ke: form.anakKe,
        jumlah_saudara: form.jumlahSaudara,
        alamat_jalan_keluarga: form.alamatJalanKeluarga,
        provinsi_keluarga: form.provinsiKeluarga,
        kota_keluarga: form.kotaKeluarga,
        kontak_darurat: form.kontakDarurat,
        ijin_kerja: form.ijinKerja,
        pengalaman_kerja: form.pengalamanKerja,
        lama_kerja: form.lamaKerja,
        gaji_terakhir: form.gajiTerakhir,
        alamat_kerja_sebelumnya: form.alamatKerjaSebelumnya,
        pekerjaan_pokok: form.pekerjaanPokok,
        gaji_pekerja: form.gajiPekerja,
        biaya_admin: form.biayaAdmin,
        tanggal_masuk: form.tanggalMasuk,
        potongan_bulan_pertama: form.potonganBulanPertama,
        biaya_ongkir: form.biayaOngkir
    };
};

export default function BuatKontrakPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-100 flex items-center justify-center font-medium text-slate-500">Memuat Dokumen...</div>}>
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

    // === STATE UTAMA ===
    const [pekerjaList, setPekerjaList] = useState<any[]>([]);
    const [pasalList, setPasalList] = useState<any[]>([]);
    const [pernyataanList, setPernyataanList] = useState<any[]>([]);

    const [isSavingLaporan, setIsSavingLaporan] = useState(false);
    const [isSavingTemplate, setIsSavingTemplate] = useState(false);
    const [isSavingKontrak, setIsSavingKontrak] = useState(false);

    const [formData, setFormData] = useState({
        nomorKontrak: "", // Nomor Kontrak Otomatis
        jenisKontrak: typeParam,
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

            // Fetch Nomor Kontrak Otomatis (hanya jika membuat baru)
            if (!idParam) {
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
    }, [supabase, idParam]);

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
                if (data.pasal_list) setPasalList(data.pasal_list);
                if (data.pernyataan_list) setPernyataanList(data.pernyataan_list);
            }
        };
        loadSavedKontrak();
    }, [idParam, supabase]);

    useEffect(() => {
        // Hanya sinkronkan jenis kontrak dari URL jika membuat kontrak baru
        if (!idParam && typeParam) {
            setFormData(prev => ({ ...prev, jenisKontrak: typeParam }));
        }
    }, [typeParam, idParam]);

    useEffect(() => {
        // Hanya ambil template default dari DB jika tidak memuat kontrak yang tersimpan
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

    // === HANDLER INPUT ===
    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // LOGIKA AUTO-FILL BIODATA PEKERJA YANG DISEMPURNAKAN
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
                    // Biodata Utama
                    namaPekerja: p.nama || "",
                    nikPekerja: p.nik || "",
                    noHpPekerja: p.no_hp || "",
                    tempatLahir: p.tempat_lahir || "",
                    tglLahir: p.tanggal_lahir || "",

                    // Fisik & Identitas
                    umurPekerja: p.umur || "",
                    tinggiBadan: p.tinggi_badan || "",
                    beratBadan: p.berat_badan || "",
                    jenisKelamin: p.jenis_kelamin || "",
                    pendidikan: p.pendidikan_terakhir || "",
                    agama: p.agama || "",
                    statusPerkawinan: p.status_perkawinan || "",

                    // Alamat Domisili
                    provinsiPekerja: p.provinsi || "",
                    kotaAsalPekerja: p.lokasi || "",

                    // Pekerjaan & Keluarga
                    pekerjaanPokok: p.kategori || "",
                    gajiPekerja: p.gaji || "",
                    pengalamanKerja: p.pengalaman || "",
                    namaAyah: p.nama_ayah || "",
                    namaIbu: p.nama_ibu || "",
                    kontakDarurat: p.kontak_darurat || "",
                    ijinKerja: p.ijin_kerja || ""
                });
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

    // === FUNGSI SIMPAN KONTRAK KERJA KE DATABASE & LAPORAN KEMNAKER ===
    const handleSimpanKontrak = async () => {
        if (!formData.nomorKontrak) {
            alert("Nomor kontrak tidak boleh kosong.");
            return;
        }
        setIsSavingKontrak(true);
        try {
            const dataToSave = {
                ...mapToSnakeCase(formData),
                pasal_list: pasalList,
                pernyataan_list: pernyataanList
            };

            // 1. Simpan Kontrak Kerja
            if (idParam) {
                // UPDATE
                const { error } = await supabase
                    .from("kontrak_kerja")
                    .update(dataToSave)
                    .eq("id", idParam);

                if (error) throw error;
            } else {
                // INSERT
                const { error } = await supabase
                    .from("kontrak_kerja")
                    .insert([dataToSave]);

                if (error) throw error;
            }

            // 2. Simpan Laporan Kemnaker (secara otomatis)
            try {
                await supabase.from('laporan_kemnaker').insert([{
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
            } catch (laporanErr) {
                console.error("Gagal menyimpan Laporan Kemnaker:", laporanErr);
                // Jangan batalkan penyimpanan kontrak utama jika laporan gagal
            }

            alert("Kontrak dan Laporan Kemnaker berhasil disimpan!");

            // Redirect ke halaman daftar kontrak
            router.push("/admin/dashboard/kontrak");
        } catch (error: any) {
            alert("Gagal menyimpan kontrak: " + error.message);
        } finally {
            setIsSavingKontrak(false);
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
                    <Link href="/admin/dashboard/kontrak" className="p-2 hover:bg-slate-100 rounded-full">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <h1 className="text-lg font-bold text-black uppercase tracking-tight">Generator Dokumen JM</h1>
                </div>
                <div className="flex gap-2">
                    <button onClick={handleSimpanKontrak} disabled={isSavingKontrak} className="bg-emerald-700 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-emerald-800 transition-all shadow-md">
                        <span className="material-symbols-outlined text-sm">save</span>
                        {isSavingKontrak ? "Menyimpan..." : idParam ? "Simpan Kontrak & Laporan" : "Simpan Kontrak & Laporan"}
                    </button>

                    <button onClick={() => window.print()} className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-md hover:bg-emerald-700 transition-all">
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
                        handleSaveTemplate={handleSaveTemplate}
                        isSavingTemplate={isSavingTemplate}
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