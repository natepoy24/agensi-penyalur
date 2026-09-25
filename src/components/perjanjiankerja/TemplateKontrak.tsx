// src/components/perjanjiankerja/TemplateKontrak.tsx
"use client";

interface TemplateKontrakProps {
    formData: {
        nomorKontrak: string;
        jenisKontrak: string;
        tipeMajikan?: string;
        namaInstansi?: string;
        namaMajikan: string;
        nikMajikan: string;
        alamatMajikan: string;
        noHpMajikan: string;
        pekerja_id: string;
        namaPekerja: string;
        nikPekerja: string;
        noHpPekerja: string;
        jenisKelamin: string;
        pendidikan: string;
        umurPekerja: string;
        provinsiPekerja: string;
        kotaAsalPekerja: string;
        pekerjaanPokok: string;
        gajiPekerja: string;
        biayaAdmin: string;
        tanggalMasuk: string;
        potonganBulanPertama: string;
        biayaOngkir: string;
        includeTtd?: boolean;
    };
    pasalList: any[];
    paperSize?: "f4" | "a4";
    includeTtd?: boolean;
}

export default function TemplateKontrak({ formData, pasalList, paperSize = "f4", includeTtd }: TemplateKontrakProps) {
    const isA4 = paperSize === "a4";
    const showTtd = includeTtd !== undefined ? includeTtd : (formData.includeTtd ?? true);

    const formatRupiah = (angka: string) => {
        if (!angka) return "...........................";
        return new Intl.NumberFormat("id-ID").format(Number(angka));
    };

    const formatTanggal = (tanggal: string) => {
        if (!tanggal) return "...........................";
        return new Date(tanggal).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    // Logika Tanggal
    const baseDate = formData.tanggalMasuk ? new Date(formData.tanggalMasuk) : new Date();
    const formattedTandaTangan = baseDate.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const date90Days = new Date(baseDate);
    date90Days.setDate(baseDate.getDate() + 90);
    const formatted90Days = date90Days.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const date1Year = new Date(baseDate);
    date1Year.setFullYear(baseDate.getFullYear() + 1);
    const formatted1Year = date1Year.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    // Replace Variabel Template
    const parseVariabelText = (text: string) => {
        let result = text || "";
        result = result.replace(/\{\{gajiPekerja\}\}/g, formData.gajiPekerja ? formatRupiah(formData.gajiPekerja) : ".......");
        result = result.replace(/\{\{biayaAdmin\}\}/g, formData.biayaAdmin ? formatRupiah(formData.biayaAdmin) : ".......");
        result = result.replace(/\{\{tanggalMasuk\}\}/g, formData.tanggalMasuk ? formatTanggal(formData.tanggalMasuk) : ".......");
        result = result.replace(/\{\{pekerjaanPokok\}\}/g, formData.pekerjaanPokok || ".......");
        result = result.replace(/\{\{potonganBulanPertama\}\}/g, formData.potonganBulanPertama ? formatRupiah(formData.potonganBulanPertama) : ".......");
        result = result.replace(/\{\{biayaOngkir\}\}/g, formData.biayaOngkir ? formatRupiah(formData.biayaOngkir) : ".......");
        return result;
    };

    const bodyTextSize = isA4 ? "text-[12px]" : "text-[13px]";
    const subPointTextSize = isA4 ? "text-[11.5px]" : "text-[12.5px]";
    const pasalSpacing = isA4 ? "space-y-2.5" : "space-y-3";

    return (
        <div className={`w-[210mm] bg-white relative px-10 ${isA4 ? "py-6" : "py-8"} print:w-full print:shadow-none print:px-8 print:py-6 z-10 text-black box-border`}>
            {/* WATERMARK */}
            <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none z-0 print:fixed print:inset-0 flex items-center justify-center overflow-hidden">
                <img src="/Image/Logo-jm.webp" alt="Watermark" className="w-[140mm] opacity-[0.08]" />
            </div>

            <div className="relative z-10">
                {/* KOP SURAT */}
                <div className="flex items-center justify-between border-b-[3px] border-emerald-800 pb-2 mb-3" style={{ borderBottomStyle: "double" }}>
                    <img src="/Image/Logo-jm.webp" alt="Logo Jasa Mandiri" className="w-16 h-16 object-contain shrink-0" />
                    <div className="flex-1 text-center px-1.5">
                        <h1 className="text-2xl font-black text-emerald-800 uppercase tracking-wider mb-1 font-['Plus_Jakarta_Sans'] leading-none">
                            CV JASA MANDIRI
                        </h1>
                        <p className="text-[11.5px] font-bold text-slate-800 uppercase tracking-wide mb-1 leading-none">
                            Perusahaan Penempatan Pekerja Rumah Tangga Indonesia
                        </p>
                        <p className="text-[9.5px] text-slate-600 font-medium leading-tight">
                            Jl. Gunung Balong III No. 78 RT 11/RW 04, Lebak Bulus, Cilandak, Jakarta Selatan 12440 | www.penyalurkerja.com | info@penyalurkerja.com | Tlp: 081808334430 - 0881-800-9992
                        </p>
                    </div>
                    <img src="/Image/Logo-appsi.png" alt="Logo APPSI" className="w-16 h-16 object-contain shrink-0" />
                </div>

                {/* JUDUL SURAT */}
                <div className="text-center mb-3 mt-1">
                    <h2 className="text-lg font-bold uppercase underline underline-offset-4 tracking-wide text-slate-900 leading-tight">
                        Surat Perjanjian Kerja
                    </h2>
                    <p className="text-xs font-semibold text-slate-600 font-mono mt-0.5">
                        Nomor: {formData.nomorKontrak || `JM/KTR/${new Date().getFullYear()}/${new Date().getMonth() + 1}/001`}
                    </p>
                </div>

                {/* PIHAK PERTAMA & PIHAK KEDUA */}
                <div className={`${bodyTextSize} text-slate-800 mb-3 leading-snug`}>
                    <p className="mb-1 font-medium">Yang bertanda tangan di bawah ini:</p>
                    <table className="w-full mb-1">
                        <tbody>
                            <tr>
                                <td className="w-32 align-top text-slate-700">Nama</td>
                                <td className="w-3 align-top">:</td>
                                <td><strong className="uppercase">{formData.namaMajikan || "..................................................."}</strong></td>
                            </tr>
                            {formData.tipeMajikan === "perusahaan" && formData.namaInstansi && (
                                <tr>
                                    <td className="align-top text-slate-700">Nama Instansi</td>
                                    <td className="align-top">:</td>
                                    <td><strong className="uppercase text-emerald-800">{formData.namaInstansi}</strong></td>
                                </tr>
                            )}
                            <tr>
                                <td className="align-top text-slate-700">Nomor KTP/NIK</td>
                                <td className="align-top">:</td>
                                <td>{formData.nikMajikan || "..................................................."}</td>
                            </tr>
                            <tr>
                                <td className="align-top text-slate-700">No. HP / WA</td>
                                <td className="align-top">:</td>
                                <td>{formData.noHpMajikan || "..................................................."}</td>
                            </tr>
                            <tr>
                                <td className="align-top text-slate-700">Alamat Domisili</td>
                                <td className="align-top">:</td>
                                <td>{formData.alamatMajikan || "..................................................."}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="italic text-[11px] text-slate-600 mb-2">Selanjutnya disebut sebagai <strong>PIHAK KESATU (Pengguna Jasa)</strong>.</p>

                    <table className="w-full mb-1">
                        <tbody>
                            <tr>
                                <td className="w-32 align-top text-slate-700">Nama</td>
                                <td className="w-3 align-top">:</td>
                                <td><strong className="uppercase">Atep Jaenudin</strong></td>
                            </tr>
                            <tr>
                                <td className="align-top text-slate-700">Jabatan / Instansi</td>
                                <td className="align-top">:</td>
                                <td>CV Jasa Mandiri</td>
                            </tr>
                            <tr>
                                <td className="align-top text-slate-700">Alamat</td>
                                <td className="align-top">:</td>
                                <td>Jl. Gunung Balong III No.78 Kel. Lebak Bulus Kec. Cilandak Jakarta Selatan 12440</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="italic text-[11px] text-slate-600 mb-3">Selanjutnya disebut sebagai <strong>PIHAK KEDUA (Perusahaan Penyalur)</strong>.</p>

                    {/* KETERANGAN PEKERJA BOX */}
                    <div className="bg-slate-50 border border-slate-300 p-2.5 rounded-lg mb-3">
                        <p className="font-bold underline text-xs mb-1 text-slate-900">Keterangan Pekerja yang Ditempatkan:</p>
                        <table className="w-full text-[11.5px]">
                            <tbody>
                                <tr>
                                    <td className="w-32 align-top text-slate-700">Nama Pekerja</td>
                                    <td className="w-3 align-top">:</td>
                                    <td><strong className="text-slate-900">{formData.namaPekerja || "..................................................."}</strong></td>
                                </tr>
                                <tr>
                                    <td className="align-top text-slate-700">Umur</td>
                                    <td className="align-top">:</td>
                                    <td>{formData.umurPekerja ? `${formData.umurPekerja} Tahun` : "..................................................."}</td>
                                </tr>
                                <tr>
                                    <td className="align-top text-slate-700">Kota Asal</td>
                                    <td className="align-top">:</td>
                                    <td>{formData.kotaAsalPekerja || "..................................................."}</td>
                                </tr>
                                <tr>
                                    <td className="align-top text-slate-700">Pekerjaan Pokok</td>
                                    <td className="align-top">:</td>
                                    <td>{formData.pekerjaanPokok || "..................................................."}</td>
                                </tr>
                                <tr>
                                    <td className="align-top text-slate-700">Gaji Per Bulan</td>
                                    <td className="align-top">:</td>
                                    <td><strong>Rp {formatRupiah(formData.gajiPekerja)}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="font-bold mb-2.5 text-slate-900 leading-snug">
                        Dengan ini saya (pengguna jasa) mengetahui dan setuju terhadap peraturan penempatan tenaga kerja yang tercantum di bawah ini:
                    </p>

                    {/* SELURUH PASAL 1 S/D PASAL 6 DENGAN SLICING DI PASAL 3 (SUBPASAL D DAN SETERUSNYA DI HALAMAN BERIKUTNYA) */}
                    <div className={`${pasalSpacing} my-3`}>
                        {pasalList.map((pasal, pIdx) => {
                            const isPasal3 = pIdx === 2;
                            return (
                                <div
                                    key={pasal.id || pIdx}
                                    className="space-y-1"
                                >
                                    <div className="flex items-start gap-2">
                                        <span className="w-5 shrink-0 font-bold text-slate-900">{pIdx + 1}.</span>
                                        <span className="flex-1 font-bold uppercase tracking-wide text-slate-900">
                                            {pasal.judul}
                                        </span>
                                    </div>
                                    <div className="pl-6 space-y-0.5">
                                        {pasal.poin.map((teksPoin: string, idx: number) => {
                                            const isSubpasalD = isPasal3 && idx === 3;
                                            return (
                                                <div
                                                    key={idx}
                                                    className={`flex items-start gap-2 ${subPointTextSize} ${isSubpasalD ? "html2pdf-break-before pt-6 print:pt-8" : ""}`}
                                                    style={isSubpasalD ? { pageBreakBefore: "always", breakBefore: "page" } : undefined}
                                                >
                                                    <span className="w-4 shrink-0 font-medium text-slate-700">
                                                        {String.fromCharCode(97 + idx)}.
                                                    </span>
                                                    <span className="flex-1 leading-snug text-slate-800 text-justify">
                                                        {parseVariabelText(teksPoin)}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* PENUTUP, MASA BERLAKU, & TANDA TANGAN (TERKUNCI AGAR TIDAK TERPISAH JELEK) */}
                <div className="break-inside-avoid mt-4" style={{ breakInside: "avoid", pageBreakInside: "avoid" }}>
                    <p className={`text-center italic ${subPointTextSize} text-slate-700 mb-2.5`}>
                        Demikian surat persetujuan ini saya sepakati dengan sadar dan tanpa paksaan dari pihak manapun.
                    </p>

                    <div className={`font-bold ${bodyTextSize} text-slate-900 bg-slate-50 border border-slate-300 px-3 py-1.5 rounded-lg mb-4`}>
                        {formData.jenisKontrak === "permanen" ? (
                            <p>Masa berlaku garansi sampai dengan tanggal : <span className="underline text-emerald-800">{formatted90Days}</span></p>
                        ) : (
                            <p>Masa kontrak kerja sampai dengan tanggal : <span className="underline text-emerald-800">{formatted1Year}</span></p>
                        )}
                    </div>

                    <div className="flex justify-end px-8 mb-2">
                        <p className={`${bodyTextSize} text-slate-800 font-medium`}>Jakarta, {formattedTandaTangan}</p>
                    </div>

                    <div className="flex justify-between px-10 mb-2">
                        <div className="text-center w-56 flex flex-col items-center">
                            <p className={`${bodyTextSize} font-semibold text-slate-800`}>CV Jasa Mandiri</p>
                            {showTtd ? (
                                <div className="relative w-36 h-20 flex items-center justify-center my-0.5">
                                    {/* Stempel Logo JM */}
                                    <img
                                        src="/Image/Logo-jm.png"
                                        alt="Stempel Jasa Mandiri"
                                        className="absolute w-20 h-20 object-contain opacity-40 pointer-events-none select-none"
                                    />
                                    {/* TTD Atep Jaenudin */}
                                    <img
                                        src="/Image/ttd-atep.png"
                                        alt="Tanda Tangan Atep Jaenudin"
                                        className="absolute w-28 h-16 object-contain z-10 pointer-events-none select-none"
                                    />
                                </div>
                            ) : (
                                <div className="h-20" />
                            )}
                            <p className={`${bodyTextSize} font-bold underline uppercase text-slate-900`}>( Atep Jaenudin )</p>
                        </div>
                        <div className="text-center w-56 flex flex-col items-center">
                            <p className={`${bodyTextSize} font-semibold text-slate-800`}>Pengguna Jasa</p>
                            <div className="h-20" />
                            <p className={`${bodyTextSize} font-bold underline uppercase text-slate-900`}>
                                ( {formData.namaMajikan || "_________________________"} )
                            </p>
                            {formData.tipeMajikan === "perusahaan" && formData.namaInstansi && (
                                <p className="text-[12px] font-bold text-emerald-800 uppercase mt-0.5 leading-tight">
                                    {formData.namaInstansi}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}