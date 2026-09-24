// src/app/admin/dashboard/kontrak/preview/page.tsx
"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import TemplateKontrak from "@/components/perjanjiankerja/TemplateKontrak";
import TemplatePernyataanPekerja from "@/components/perjanjiankerja/TemplatePernyataanPekerja";

interface KontrakPreviewData {
    nomorKontrak: string;
    jenisKontrak: string;
    tipeMajikan?: string;
    namaInstansi?: string;
    namaMajikan: string;
    nikMajikan: string;
    noHpMajikan: string;
    alamatMajikan: string;
    provinsiLokasiKerja: string;
    kotaLokasiKerja: string;
    pekerja_id: string;
    namaPekerja: string;
    namaPanggilan: string;
    nikPekerja: string;
    noHpPekerja: string;
    umurPekerja: string;
    tinggiBadan: string;
    beratBadan: string;
    jenisKelamin: string;
    pendidikan: string;
    agama: string;
    statusPerkawinan: string;
    tempatLahir: string;
    tglLahir: string;
    provinsiPekerja: string;
    kotaAsalPekerja: string;
    kecamatanPekerja: string;
    kelurahanPekerja: string;
    alamatJalanPekerja: string;
    namaAyah: string;
    namaIbu: string;
    namaKakak: string;
    namaAdik: string;
    anakKe: string;
    jumlahSaudara: string;
    alamatJalanKeluarga: string;
    provinsiKeluarga: string;
    kotaKeluarga: string;
    kontakDarurat: string;
    ijinKerja: string;
    pengalamanKerja: string;
    lamaKerja: string;
    gajiTerakhir: string;
    alamatKerjaSebelumnya: string;
    pekerjaanPokok: string;
    gajiPekerja: string;
    biayaAdmin: string;
    tanggalMasuk: string;
    potonganBulanPertama: string;
    biayaOngkir: string;
    pasalList: any[];
    pernyataanList: any[];
    isExisting?: boolean;
    existingId?: string | number | null;
}

const mapToCamelCase = (dbRow: any): KontrakPreviewData => {
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
        biayaOngkir: dbRow.biaya_ongkir || dbRow.Biaya_Ongkir || "",
        pasalList: Array.isArray(dbRow.pasal_list) ? dbRow.pasal_list : [],
        pernyataanList: Array.isArray(dbRow.pernyataan_list) ? dbRow.pernyataan_list : [],
        isExisting: true,
        existingId: dbRow.id,
    };
};

const mapToSnakeCase = (form: KontrakPreviewData) => {
    return {
        nomor_kontrak: form.nomorKontrak,
        jenis_kontrak: form.jenisKontrak,
        nama_majikan: form.namaMajikan,
        nik_majikan: form.nikMajikan,
        no_hp_majikan: form.noHpMajikan,
        alamat_majikan: form.alamatMajikan,
        provinsi_lokasi_kerja: form.provinsiLokasiKerja,
        kota_lokasi_kerja: form.kotaLokasiKerja,
        pekerja_id: form.pekerja_id === "manual" || !form.pekerja_id ? null : parseInt(form.pekerja_id),
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
        alamat_jalan_pekerja: form.alamatJalanPekerja,
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
        biaya_ongkir: form.biayaOngkir,
        Biaya_Ongkir: form.biayaOngkir
    };
};

export default function KontrakPreviewPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-slate-400 flex flex-col items-center gap-3">
                    <span className="material-symbols-outlined text-5xl animate-spin text-emerald-600">progress_activity</span>
                    <p className="text-sm font-medium">Memuat preview kontrak...</p>
                </div>
            </div>
        }>
            <KontrakPreviewContent />
        </Suspense>
    );
}

function KontrakPreviewContent() {
    const supabase = createClient();
    const router = useRouter();
    const searchParams = useSearchParams();
    const idParam = searchParams.get("id");

    const kontrakRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<KontrakPreviewData | null>(null);
    const [paperSize, setPaperSize] = useState<"f4" | "a4">("f4");
    const [isDownloading, setIsDownloading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Load preview data from localStorage or Database if idParam is given
    useEffect(() => {
        const loadData = async () => {
            if (idParam) {
                const { data: dbData, error } = await supabase
                    .from("kontrak_kerja")
                    .select("*")
                    .eq("id", idParam)
                    .single();

                if (error || !dbData) {
                    setErrorMessage("Gagal memuat kontrak dari database: " + (error?.message || "Data tidak ditemukan"));
                    return;
                }

                const mapped = mapToCamelCase(dbData);
                setData(mapped);
                setSaved(true);
                return;
            }

            const raw = localStorage.getItem("kontrak_preview_data");
            if (!raw) {
                router.replace("/admin/dashboard/kontrak/buat");
                return;
            }

            try {
                const parsed = JSON.parse(raw);
                setData(parsed);
                if (parsed.isExisting) {
                    setSaved(true);
                }
            } catch {
                router.replace("/admin/dashboard/kontrak/buat");
            }
        };

        loadData();
    }, [idParam, router, supabase]);

    // Simpan ke database Supabase (kontrak_kerja + laporan_kemnaker)
    const saveToDatabase = async (currentData: KontrakPreviewData) => {
        const basePayload = mapToSnakeCase(currentData);
        const dataToSave = {
            ...basePayload,
            pasal_list: currentData.pasalList || [],
            pernyataan_list: currentData.pernyataanList || [],
        };

        // Siapkan bridge metadata jika kolom tipe_majikan / nama_instansi belum ada di tabel Supabase
        const bridgeNama = (currentData.tipeMajikan === "perusahaan" && currentData.namaInstansi)
            ? `${(currentData.namaMajikan || "").split("|||")[0].trim()}|||${JSON.stringify({
                tipeMajikan: "perusahaan",
                namaInstansi: currentData.namaInstansi
            })}`
            : (currentData.namaMajikan || "").split("|||")[0].trim();

        // 1. Coba update/insert dengan kolom native tipe_majikan & nama_instansi
        const payloadWithColumns = {
            ...dataToSave,
            nama_majikan: currentData.namaMajikan.split("|||")[0].trim(),
            tipe_majikan: currentData.tipeMajikan || "perorangan",
            nama_instansi: currentData.tipeMajikan === "perusahaan" ? (currentData.namaInstansi || "") : "",
        };

        let currentId = currentData.existingId || idParam;

        if (currentId) {
            // Update
            let res = await supabase.from("kontrak_kerja").update(payloadWithColumns).eq("id", currentId);
            if (res.error && (res.error.code === "PGRST204" || res.error.code === "42703")) {
                // Fallback ke schema default tanpa kolom tipe_majikan / nama_instansi
                res = await supabase.from("kontrak_kerja").update({
                    ...dataToSave,
                    nama_majikan: bridgeNama
                }).eq("id", currentId);
            }
            if (res.error) throw new Error(res.error.message);
        } else {
            // Insert
            let res = await supabase.from("kontrak_kerja").insert([payloadWithColumns]).select("id").single();
            if (res.error && (res.error.code === "PGRST204" || res.error.code === "42703")) {
                // Fallback
                res = await supabase.from("kontrak_kerja").insert([{
                    ...dataToSave,
                    nama_majikan: bridgeNama
                }]).select("id").single();
            }
            if (res.error) throw new Error(res.error.message);
            if (res.data?.id) currentId = res.data.id;
        }

        // 2. Simpan atau perbarui Laporan Kemnaker secara otomatis
        try {
            const pemberiKerjaLabel = currentData.tipeMajikan === "perusahaan" && currentData.namaInstansi
                ? `${currentData.namaMajikan.split("|||")[0].trim()} (${currentData.namaInstansi})`
                : currentData.namaMajikan.split("|||")[0].trim();

            await supabase.from("laporan_kemnaker").insert([{
                nik_tenaga_kerja: currentData.nikPekerja,
                nama_tenaga_kerja: currentData.namaPekerja,
                kabupaten_domisili: currentData.kotaAsalPekerja,
                provinsi_domisili: currentData.provinsiPekerja,
                no_hp: currentData.noHpPekerja,
                jenis_kelamin: currentData.jenisKelamin,
                pendidikan: currentData.pendidikan,
                nama_pemberi_kerja: pemberiKerjaLabel,
                nama_jabatan: currentData.pekerjaanPokok,
                kabupaten_lokasi_kerja: currentData.kotaLokasiKerja,
                provinsi_lokasi_kerja: currentData.provinsiLokasiKerja,
                tanggal_mulai_bekerja: currentData.tanggalMasuk,
                upah_diterima: parseFloat(currentData.gajiPekerja || "0")
            }]);
        } catch (laporanErr) {
            console.error("Gagal menyimpan Laporan Kemnaker:", laporanErr);
        }

        // Cache rincian kontrak ke localStorage
        try {
            localStorage.setItem("kontrak_items_" + currentData.nomorKontrak, JSON.stringify({
                ...currentData,
                id: currentId
            }));
        } catch {}

        setSaved(true);
        setData(prev => prev ? ({ ...prev, isExisting: true, existingId: currentId }) : prev);
        return currentId;
    };

    // Fungsi unduh PDF menggunakan html2pdf.js yang sama seperti invoice
    const handleDownloadPDF = async () => {
        if (!data) return;

        setIsDownloading(true);
        setErrorMessage("");

        try {
            // 1. Simpan ke database jika belum tersimpan
            if (!saved && !data.isExisting) {
                await saveToDatabase(data);
            }

            // 2. Unduh PDF menggunakan html2pdf.js
            const element = kontrakRef.current;
            if (!element) throw new Error("Element dokumen kontrak tidak ditemukan");

            const rawNum = data.nomorKontrak || "KONTRAK-KERJA";
            const cleanFilename = rawNum.trim().replace(/[/\\?%*:|"<>]/g, "-");
            const filename = cleanFilename.toLowerCase().endsWith(".pdf") ? cleanFilename : `KONTRAK-${cleanFilename}.pdf`;

            const isA4 = paperSize === "a4";
            const html2pdf = (await import("html2pdf.js")).default;
            const opt = {
                margin: [0, 0, 0, 0] as [number, number, number, number],
                filename: filename,
                image: { type: "jpeg" as const, quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    scrollY: 0,
                    scrollX: 0,
                    onclone: (clonedDoc: Document) => {
                        // 1. Bersihkan fungsi warna lab(...) dan oklch(...) dari seluruh tag <style>
                        try {
                            const styleTags = clonedDoc.querySelectorAll("style");
                            styleTags.forEach((styleTag) => {
                                if (styleTag.textContent && (styleTag.textContent.includes("lab(") || styleTag.textContent.includes("oklch("))) {
                                    styleTag.textContent = styleTag.textContent
                                        .replace(/lab\([^)]+\)/g, "#000000")
                                        .replace(/oklch\([^)]+\)/g, "#000000");
                                }
                            });
                        } catch {}

                        // 2. Hilangkan gap dan margin dari render area agar tidak memicu halaman kosong
                        const area = clonedDoc.getElementById("kontrak-render-area");
                        if (!area) return;
                        area.style.gap = "0px";
                        area.style.rowGap = "0px";
                        area.style.columnGap = "0px";
                        area.style.padding = "0px";
                        area.style.margin = "0px";

                        // 3. Bersihkan computed colors pada elemen di dalam area render
                        const allElements = [area, ...Array.from(area.querySelectorAll("*"))] as HTMLElement[];
                        allElements.forEach((el) => {
                            const cs = window.getComputedStyle(el);
                            if (cs.color && (cs.color.includes("lab") || cs.color.includes("oklch"))) {
                                el.style.color = "#000000";
                            }
                            if (cs.backgroundColor && (cs.backgroundColor.includes("lab") || cs.backgroundColor.includes("oklch"))) {
                                el.style.backgroundColor = el.id === "kontrak-render-area" ? "#ffffff" : "transparent";
                            }
                            if (cs.borderColor && (cs.borderColor.includes("lab") || cs.borderColor.includes("oklch"))) {
                                el.style.borderColor = "#cbd5e1";
                            }
                            if (cs.outlineColor && (cs.outlineColor.includes("lab") || cs.outlineColor.includes("oklch"))) {
                                el.style.outlineColor = "transparent";
                            }
                            el.style.boxShadow = "none";
                            el.style.filter = "none";
                        });
                        area.style.boxShadow = "none";
                        area.style.filter = "none";
                        const wrappers = clonedDoc.querySelectorAll(".doc-page-wrapper");
                        wrappers.forEach((w) => {
                            (w as HTMLElement).style.border = "none";
                            (w as HTMLElement).style.boxShadow = "none";
                            (w as HTMLElement).style.outline = "none";
                        });
                    },
                },
                jsPDF: {
                    unit: "mm",
                    format: isA4 ? "a4" : ([210, 330] as [number, number]),
                    orientation: "portrait" as const,
                },
                pagebreak: { mode: ["css"], avoid: [".break-inside-avoid", "tr"] },
            };

            // Ambil output sebagai Blob PDF dengan MIME type application/pdf
            const pdfBlob = await html2pdf().set(opt).from(element).outputPdf("blob");
            const blob = new Blob([pdfBlob], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => URL.revokeObjectURL(url), 2000);
        } catch (err: unknown) {
            setErrorMessage(err instanceof Error ? err.message : "Gagal mengunduh PDF");
        } finally {
            setIsDownloading(false);
        }
    };

    const handlePrintBrowser = () => {
        window.print();
    };

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-slate-400 flex flex-col items-center gap-3">
                    <span className="material-symbols-outlined text-5xl animate-spin text-emerald-600">progress_activity</span>
                    <p className="text-sm font-medium">Memuat dokumen kontrak...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-200">
            {/* STYLES UNTUK CETAK NATIVE BROWSER */}
            <style>{`
                @media print {
                    @page {
                        size: ${paperSize === "a4" ? "210mm 297mm" : "210mm 330mm"};
                        margin: 0mm;
                    }
                    html, body {
                        margin: 0 !important;
                        padding: 0 !important;
                        background: white !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    .no-print {
                        display: none !important;
                    }
                    .kontrak-page-container {
                        padding: 0 !important;
                        margin: 0 !important;
                        background: white !important;
                    }
                    #kontrak-render-area {
                        width: 100% !important;
                        max-width: 100% !important;
                        box-shadow: none !important;
                        border-radius: 0 !important;
                        border: none !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        background: white !important;
                        gap: 0 !important;
                    }
                }
            `}</style>

            {/* TOOLBAR ATAS (tidak ikut cetak/download) */}
            <header className="no-print sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm px-6 py-3 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => router.push(`/admin/dashboard/kontrak/buat${data.existingId || idParam ? `?id=${data.existingId || idParam}` : ""}`)}
                        className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                        Edit Form
                    </button>
                    <span className="text-slate-300">|</span>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 text-sm hidden sm:inline">No. Kontrak:</span>
                        <span className="font-mono text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md text-sm font-bold border border-emerald-200">
                            {data.nomorKontrak}
                        </span>
                    </div>

                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold hidden md:inline-flex items-center gap-1 ${
                        data.jenisKontrak === "permanen"
                            ? "bg-blue-100 text-blue-800 border border-blue-200"
                            : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    }`}>
                        {data.jenisKontrak === "permanen" ? "Permanen 3 Bulan" : "Kontrak 1 Tahun"}
                    </span>

                    {saved && (
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">check_circle</span>
                            Tersimpan
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    {errorMessage && (
                        <span className="text-xs text-red-600 font-semibold bg-red-50 border border-red-200 px-3 py-1 rounded-lg">
                            {errorMessage}
                        </span>
                    )}

                    {/* OPSI UKURAN KERTAS (F4 / A4) */}
                    <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-300 text-xs font-bold">
                        <span className="text-slate-500 px-2 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">description</span>
                            Kertas:
                        </span>
                        <button
                            type="button"
                            onClick={() => setPaperSize("f4")}
                            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
                                paperSize === "f4"
                                    ? "bg-emerald-600 text-white shadow-sm"
                                    : "text-slate-600 hover:text-slate-900"
                            }`}
                        >
                            F4 (Folio)
                        </button>
                        <button
                            type="button"
                            onClick={() => setPaperSize("a4")}
                            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
                                paperSize === "a4"
                                    ? "bg-emerald-600 text-white shadow-sm"
                                    : "text-slate-600 hover:text-slate-900"
                            }`}
                        >
                            A4
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={handlePrintBrowser}
                        className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl font-bold text-sm transition-all border border-slate-300 cursor-pointer"
                        title={`Cetak (${paperSize.toUpperCase()}) lewat dialog browser native`}
                    >
                        <span className="material-symbols-outlined text-[18px]">print</span>
                        Cetak ({paperSize.toUpperCase()})
                    </button>

                    <button
                        type="button"
                        onClick={handleDownloadPDF}
                        disabled={isDownloading}
                        className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-5 py-2 rounded-xl font-bold text-sm transition-all shadow-md shadow-emerald-200 disabled:opacity-60 cursor-pointer"
                    >
                        {isDownloading ? (
                            <>
                                <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                                <span>Membuat PDF ({paperSize.toUpperCase()})...</span>
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-[18px]">download</span>
                                <span>Unduh PDF ({paperSize.toUpperCase()})</span>
                            </>
                        )}
                    </button>
                </div>
            </header>

            {/* PREVIEW AREA */}
            <main className="kontrak-page-container py-10 px-4 flex flex-col items-center gap-10 print:p-0 print:gap-0 print:bg-white">
                <div
                    ref={kontrakRef}
                    id="kontrak-render-area"
                    className="flex flex-col items-center gap-10 print:gap-0 w-full"
                >
                    {/* DOKUMEN 1: SURAT PERJANJIAN KERJA */}
                    <div className="doc-page-wrapper bg-white">
                        <TemplateKontrak
                            formData={data}
                            pasalList={data.pasalList || []}
                            paperSize={paperSize}
                        />
                    </div>

                    {/* DOKUMEN 2: SURAT PERNYATAAN PEKERJA (Pindah ke Halaman Baru) */}
                    <div className="doc-page-wrapper bg-white" style={{ pageBreakBefore: "always" }}>
                        <TemplatePernyataanPekerja
                            formData={data}
                            pernyataanList={data.pernyataanList || []}
                            paperSize={paperSize}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}