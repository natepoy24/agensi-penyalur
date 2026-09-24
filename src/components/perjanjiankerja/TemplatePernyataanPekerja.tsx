// src/components/perjanjiankerja/TemplatePernyataanPekerja.tsx
"use client";

interface TemplatePernyataanProps {
    formData: any;
    pernyataanList: any[];
    paperSize?: "f4" | "a4";
}

export default function TemplatePernyataanPekerja({
    formData,
    pernyataanList,
    paperSize = "f4",
}: TemplatePernyataanProps) {
    const isA4 = paperSize === "a4";

    // Helper Format Rupiah
    const formatRupiah = (angka: string) => {
        if (!angka) return "...........................";
        return new Intl.NumberFormat("id-ID").format(Number(angka));
    };

    // Logika Tanggal
    const baseDate = formData.tanggalMasuk ? new Date(formData.tanggalMasuk) : new Date();
    const formattedTanggalMasuk = baseDate.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    // FUNGSI REPLACE VARIABEL
    const parseVariabelText = (text: string) => {
        let result = text || "";
        result = result.replace(/\{\{namaMajikan\}\}/g, formData.namaMajikan ? formData.namaMajikan.split("|||")[0].trim() : ".......");
        result = result.replace(/\{\{pekerjaanPokok\}\}/g, formData.pekerjaanPokok || ".......");
        result = result.replace(/\{\{gajiPekerja\}\}/g, formData.gajiPekerja ? formatRupiah(formData.gajiPekerja) : ".......");
        result = result.replace(/\{\{ijinKerja\}\}/g, formData.ijinKerja || ".......");

        const nilaiPotongan = formData.potonganBulanPertama ? formatRupiah(formData.potonganBulanPertama) : ".......";
        result = result.replace(/\{\{potonganBulanPertama\}\}/g, nilaiPotongan);

        return result;
    };

    const paddingYStyle = isA4 ? "py-6 px-10" : "py-8 px-10";
    const sectionSpacing = isA4 ? "space-y-3.5" : "space-y-4";
    const textSize = isA4 ? "text-[10.5px]" : "text-[11.5px]";
    const smallTextSize = isA4 ? "text-[10px]" : "text-[11px]";
    const statementTextSize = isA4 ? "text-[10px]" : "text-[10.5px]";

    const poinList = pernyataanList[0]?.poin || [];

    return (
        <div
            className={`w-[210mm] bg-white relative ${paddingYStyle} print:w-full print:shadow-none print:px-8 print:py-5 z-10 text-black flex flex-col justify-between box-border`}
        >
            {/* WATERMARK */}
            <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none z-0 print:fixed print:inset-0 flex items-center justify-center overflow-hidden">
                <img src="/Image/Logo-jm.webp" alt="Watermark" className="w-[140mm] opacity-[0.08]" />
            </div>

            <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                    {/* KOP SURAT */}
                    <div className="flex items-center justify-between border-b-[3px] border-emerald-800 pb-2 mb-2" style={{ borderBottomStyle: "double" }}>
                        <img src="/Image/Logo-jm.webp" alt="Logo Jasa Mandiri" className="w-14 h-14 object-contain shrink-0" />
                        <div className="flex-1 text-center px-3">
                            <h1 className="text-xl font-black text-emerald-800 uppercase tracking-widest mb-0.5 font-['Plus_Jakarta_Sans'] leading-none">
                                CV JASA MANDIRI
                            </h1>
                            <p className="text-[10px] font-bold text-slate-800 uppercase tracking-wide mb-0.5 leading-none">
                                Perusahaan Penempatan Pekerja Rumah Tangga Indonesia
                            </p>
                            <p className="text-[8.5px] font-bold text-emerald-600 mb-0.5 leading-none">
                                Baby Sitter - Perawat Lansia - Pekerja Rumah Tangga - OB - Supir - Tukang Kebun - dll
                            </p>
                            <div className="text-[8.5px] text-slate-600 font-medium leading-tight">
                                <p>Jl Gunung Balong III No 78 Rt 11 Rw 04 Kel Lebak Bulus Kec Cilandak Jakarta Selatan 12440</p>
                                <p>www.penyalurkerja.com | info@penyalurkerja.com | Tlp: 081808334430 - 0881-800-9992</p>
                            </div>
                        </div>
                        <img src="/Image/Logo-appsi.png" alt="Logo APPSI" className="w-14 h-14 object-contain shrink-0" />
                    </div>

                    {/* JUDUL SURAT */}
                    <div className="text-center mb-2.5">
                        <h2 className="text-base font-bold uppercase underline underline-offset-4 tracking-wider text-slate-900">
                            Surat Pernyataan Pekerja
                        </h2>
                    </div>

                    <p className={`${smallTextSize} text-slate-800 mb-2 font-medium`}>
                        Yang bertanda tangan di bawah ini menyatakan bahwa benar ini data saya dan keluarga saya :
                    </p>

                    <div className={sectionSpacing}>
                        {/* I. BIODATA PEKERJA */}
                        <div>
                            <h3 className="font-bold border-b border-slate-800 w-fit mb-1.5 uppercase text-[11px] text-slate-900 tracking-wide">
                                I. Biodata Pekerja
                            </h3>
                            <div className="grid grid-cols-2 gap-x-6">
                                <table className={`w-full ${textSize}`}>
                                    <tbody>
                                        <tr>
                                            <td className="w-28 text-slate-600">Nama Lengkap</td>
                                            <td className="w-3 text-center">:</td>
                                            <td><strong className="text-slate-900 uppercase">{formData.namaPekerja || "........................"}</strong></td>
                                        </tr>
                                        <tr>
                                            <td className="text-slate-600">Nama Panggilan</td>
                                            <td className="text-center">:</td>
                                            <td>{formData.namaPanggilan || "........................"}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-slate-600">NIK KTP</td>
                                            <td className="text-center">:</td>
                                            <td>{formData.nikPekerja || "........................"}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-slate-600">Tempat, Tgl Lahir</td>
                                            <td className="text-center">:</td>
                                            <td>{formData.tempatLahir ? `${formData.tempatLahir}, ${formData.tglLahir || ""}` : "........................"}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-slate-600">Agama / Gender</td>
                                            <td className="text-center">:</td>
                                            <td>{(formData.agama || "-") + " / " + (formData.jenisKelamin || "-")}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-slate-600">Pendidikan / Status</td>
                                            <td className="text-center">:</td>
                                            <td>{(formData.pendidikan || "-") + " / " + (formData.statusPerkawinan || "-")}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-slate-600">Tinggi / Berat Badan</td>
                                            <td className="text-center">:</td>
                                            <td>{formData.tinggiBadan ? `${formData.tinggiBadan} cm / ${formData.beratBadan || "-"} kg` : "........................"}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table className={`w-full ${textSize}`}>
                                    <tbody>
                                        <tr>
                                            <td className="w-24 text-slate-600 align-top">Alamat Jalan</td>
                                            <td className="w-3 text-center align-top">:</td>
                                            <td className="align-top">{formData.alamatJalanPekerja || "........................"}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-slate-600">Kelurahan</td>
                                            <td className="text-center">:</td>
                                            <td>{formData.kelurahanPekerja || "........................"}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-slate-600">Kecamatan</td>
                                            <td className="text-center">:</td>
                                            <td>{formData.kecamatanPekerja || "........................"}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-slate-600">Kab / Kota</td>
                                            <td className="text-center">:</td>
                                            <td>{formData.kotaAsalPekerja || "........................"}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-slate-600">Provinsi</td>
                                            <td className="text-center">:</td>
                                            <td>{formData.provinsiPekerja || "........................"}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-slate-600">No. HP / WA</td>
                                            <td className="text-center">:</td>
                                            <td>{formData.noHpPekerja || "........................"}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* II. KELUARGA */}
                        <div>
                            <h3 className="font-bold border-b border-slate-800 w-fit mb-1.5 uppercase text-[11px] text-slate-900 tracking-wide">
                                II. Data Keluarga
                            </h3>
                            <div className="grid grid-cols-2 gap-x-6">
                                <table className={`w-full ${textSize}`}>
                                    <tbody>
                                        <tr>
                                            <td className="w-28 text-slate-600">Nama Bapak / Ibu</td>
                                            <td className="w-3 text-center">:</td>
                                            <td>{(formData.namaAyah || "-") + " / " + (formData.namaIbu || "-")}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-slate-600">Nama Kakak / Adik</td>
                                            <td className="text-center">:</td>
                                            <td>{(formData.namaKakak || "-") + " / " + (formData.namaAdik || "-")}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-slate-600">Anak Ke</td>
                                            <td className="text-center">:</td>
                                            <td>{formData.anakKe ? `${formData.anakKe} dari ${formData.jumlahSaudara || "-"} bersaudara` : "........................"}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table className={`w-full ${textSize}`}>
                                    <tbody>
                                        <tr>
                                            <td className="w-24 text-slate-600 align-top">Alamat Ortu</td>
                                            <td className="w-3 text-center align-top">:</td>
                                            <td className="align-top">{formData.alamatJalanKeluarga || "........................"}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-slate-600">Kab / Prov</td>
                                            <td className="text-center">:</td>
                                            <td>{(formData.kotaKeluarga || "-") + " / " + (formData.provinsiKeluarga || "-")}</td>
                                        </tr>
                                        <tr>
                                            <td className="text-slate-600">Kontak Darurat</td>
                                            <td className="text-center">:</td>
                                            <td><strong>{formData.kontakDarurat || "........................"}</strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* III. PENGALAMAN KERJA TERAKHIR */}
                        <div>
                            <h3 className="font-bold border-b border-slate-800 w-fit mb-1.5 uppercase text-[11px] text-slate-900 tracking-wide">
                                III. Pengalaman Kerja Terakhir
                            </h3>
                            <table className={`w-full border-collapse border border-slate-400 text-center ${smallTextSize}`}>
                                <thead className="bg-slate-100 uppercase font-bold text-slate-800">
                                    <tr>
                                        <th className="border border-slate-400 py-1 px-2 font-bold">Sebagai</th>
                                        <th className="border border-slate-400 py-1 px-2 font-bold">Lama Kerja</th>
                                        <th className="border border-slate-400 py-1 px-2 font-bold">Gaji Terakhir</th>
                                        <th className="border border-slate-400 py-1 px-2 font-bold">Alamat / Lokasi Kerja</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-slate-400 py-1 px-2">{formData.pengalamanKerja || "-"}</td>
                                        <td className="border border-slate-400 py-1 px-2">{formData.lamaKerja || "-"}</td>
                                        <td className="border border-slate-400 py-1 px-2">Rp {formatRupiah(formData.gajiTerakhir)}</td>
                                        <td className="border border-slate-400 py-1 px-2">{formData.alamatKerjaSebelumnya || "-"}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* IV. PERNYATAAN PEKERJA (FLEX ITEMS - TIDAK ADA MASALAH OVERLAP ANGKA) */}
                        <div>
                            <h3 className="font-bold border-b border-slate-800 w-fit mb-1.5 uppercase text-[11px] text-slate-900 tracking-wide">
                                IV. Pernyataan Pekerja
                            </h3>
                            <div className="space-y-1">
                                {poinList.map((p: string, i: number) => (
                                    <div key={i} className={`flex items-start gap-2 ${statementTextSize}`}>
                                        <span className="w-4 shrink-0 font-bold text-slate-900 text-left">
                                            {i + 1}.
                                        </span>
                                        <span className="flex-1 leading-snug text-slate-800 text-justify">
                                            {parseVariabelText(p)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* KALIMAT PENUTUP DIBERI JARAK LEGA */}
                        <p className={`text-center italic ${statementTextSize} text-slate-700 leading-relaxed my-6 px-4`}>
                            Demikian Surat pernyataan ini Saya Mengerti dan paham serta membacanya dalam keadaan sadar sehat jasmani dan rohani tanpa ada paksaan dari pihak manapun.
                        </p>
                    </div>
                </div>

                {/* BAGIAN TANDA TANGAN DIBERI JARAK LEGA DENGAN TINGGI CUKUP UNTUK TTD / MATERAI */}
                <div className="mt-8">
                    <div className="flex justify-end px-12 mb-4">
                        <p className={`${smallTextSize} text-slate-800 font-medium`}>Jakarta, {formattedTanggalMasuk}</p>
                    </div>

                    <div className="flex justify-between px-16 mb-8">
                        <div className="text-center w-56">
                            <p className={`${smallTextSize} mb-24 font-bold text-slate-900`}>CV JASA MANDIRI</p>
                            <p className={`${smallTextSize} font-bold underline uppercase text-slate-900`}>( ATEP JAENUDIN )</p>
                        </div>
                        <div className="text-center w-56">
                            <p className={`${smallTextSize} mb-24 font-bold text-slate-900`}>Tenaga Kerja</p>
                            <p className={`${smallTextSize} font-bold underline uppercase text-slate-900`}>
                                ( {formData.namaPekerja || "________________"} )
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}