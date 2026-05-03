// src/components/TemplateKontrak.tsx
"use client";

interface TemplateKontrakProps {
    formData: {
        nomorKontrak: string;
        jenisKontrak: string;
        namaMajikan: string; nikMajikan: string; alamatMajikan: string; noHpMajikan: string;
        pekerja_id: string; namaPekerja: string; nikPekerja: string; noHpPekerja: string;
        jenisKelamin: string; pendidikan: string; umurPekerja: string;
        provinsiPekerja: string; kotaAsalPekerja: string;
        pekerjaanPokok: string; gajiPekerja: string; biayaAdmin: string; tanggalMasuk: string;
        potonganBulanPertama: string; biayaOngkir: string;
    };
    pasalList: any[];
}

export default function TemplateKontrak({ formData, pasalList }: TemplateKontrakProps) {
    const formatRupiah = (angka: string) => { if (!angka) return "..........................."; return new Intl.NumberFormat('id-ID').format(Number(angka)); };
    const formatTanggal = (tanggal: string) => { if (!tanggal) return "..........................."; return new Date(tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }); };

    // === LOGIKA TANGGAL PINTAR ===
    // Jika tanggalMasuk diisi, gunakan itu. Jika kosong, gunakan hari ini.
    const baseDate = formData.tanggalMasuk ? new Date(formData.tanggalMasuk) : new Date();

    // Format Tanggal Tanda Tangan
    const formattedTandaTangan = baseDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    // Hitung 90 Hari Kedepan (Untuk Garansi Permanen)
    const date90Days = new Date(baseDate);
    date90Days.setDate(baseDate.getDate() + 90);
    const formatted90Days = date90Days.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    // Hitung 1 Tahun Kedepan (Untuk Kontrak 1 Tahun)
    const date1Year = new Date(baseDate);
    date1Year.setFullYear(baseDate.getFullYear() + 1);
    const formatted1Year = date1Year.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    // FUNGSI SAKTI REPLACE VARIABEL
    const parseVariabelText = (text: string) => {
        let result = text;
        result = result.replace(/\{\{gajiPekerja\}\}/g, formData.gajiPekerja ? formatRupiah(formData.gajiPekerja) : ".......");
        result = result.replace(/\{\{biayaAdmin\}\}/g, formData.biayaAdmin ? formatRupiah(formData.biayaAdmin) : ".......");
        result = result.replace(/\{\{tanggalMasuk\}\}/g, formData.tanggalMasuk ? formatTanggal(formData.tanggalMasuk) : ".......");
        result = result.replace(/\{\{pekerjaanPokok\}\}/g, formData.pekerjaanPokok || ".......");
        result = result.replace(/\{\{potonganBulanPertama\}\}/g, formData.potonganBulanPertama ? formatRupiah(formData.potonganBulanPertama) : ".......");
        result = result.replace(/\{\{biayaOngkir\}\}/g, formData.biayaOngkir ? formatRupiah(formData.biayaOngkir) : ".......");
        return result;
    };

    return (
        <div className="w-[210mm] min-h-[330mm] bg-white shadow-2xl relative px-10 py-10 print:w-full print:min-h-0 print:shadow-none print:px-10 print:py-0 z-10 text-black print:bg-transparent">
            <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none z-0 print:fixed print:inset-0 flex items-center justify-center overflow-hidden">
                <img src="/Image/Logo-jm.webp" alt="Watermark" className="w-[150mm] opacity-[0.1]" />
            </div>

            <table className="w-full relative z-10 border-collapse">
                <thead className="print:table-header-group">
                    <tr>
                        <td>
                            <div className="flex items-center justify-between border-b-[3px] border-emerald-800 pb-2 mb-3" style={{ borderBottomStyle: 'double' }}>
                                <img src="/Image/Logo-jm.webp" alt="Logo Jasa Mandiri" className="w-16 h-16 object-contain shrink-0" />
                                <div className="flex-1 text-center px-4">
                                    <h1 className="text-2xl font-black text-emerald-800 uppercase tracking-widest mb-0.5 font-['Plus_Jakarta_Sans'] leading-none">CV Jasa Mandiri</h1>
                                    <p className="text-[11px] font-bold text-slate-800 uppercase tracking-wide mb-0.5 leading-none">Lembaga Penempatan Pekerja Rumah Tangga Indonesia</p>
                                    <p className="text-[9.5px] font-bold text-emerald-600 mb-1 leading-none">Baby Sitter - Perawat Lansia - Pekerja Rumah Tangga - OB - Supir - Tukang Kebun - dll</p>
                                    <div className="text-[9.5px] text-slate-600 font-medium leading-tight space-y-0.5">
                                        <p>Jl Gunung Balong III No 78 Rt 11 Rw 04 Kel Lebak Bulus Kec Cilandak Jakarta Selatan 12440</p>
                                        <p>www.penyalurkerja.com | info@penyalurkerja.com | Tlp: 081808334430 - 082122415552</p>
                                    </div>
                                </div>
                                <img src="/Image/Logo-appsi.png" alt="Logo APPSI" className="w-16 h-16 object-contain shrink-0" />
                            </div>
                            <div className="h-2"></div>
                        </td>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>
                            <div className="text-center mb-6 mt-2">
                                <h2 className="text-lg font-bold uppercase underline underline-offset-4 mb-1 tracking-wide text-slate-800">
                                    {formData.jenisKontrak === '1_tahun' ? 'Surat Kontrak Kerja 1 Tahun' : 'Surat Perjanjian Kerja'}
                                </h2>
                                {/* Panggil formData.nomorKontrak di sini, dengan fallback statis jika koneksi lambat */}
                                <p className="text-xs font-medium text-slate-500">
                                    Nomor: {formData.nomorKontrak || `JM/KTR/${new Date().getFullYear()}/${new Date().getMonth() + 1}/001`}
                                </p>
                            </div>

                            <div className="space-y-4 text-[12.5px] text-slate-800 leading-relaxed text-justify mb-8">
                                <div className="mb-4">
                                    <p className="mb-2">Yang bertanda tangan di bawah ini:</p>
                                    <table className="w-full mb-2">
                                        <tbody>
                                            <tr><td className="w-36 align-top">Nama</td><td className="w-3 align-top">:</td><td><strong className="uppercase">{formData.namaMajikan || "..................................................."}</strong></td></tr>
                                            <tr><td className="align-top">Nomor KTP/NIK</td><td className="align-top">:</td><td>{formData.nikMajikan || "..................................................."}</td></tr>
                                            <tr><td className="align-top">No. HP / WA</td><td className="align-top">:</td><td>{formData.noHpMajikan || "..................................................."}</td></tr>
                                            <tr><td className="align-top">Alamat Domisili</td><td className="align-top">:</td><td>{formData.alamatMajikan || "..................................................."}</td></tr>
                                        </tbody>
                                    </table>
                                    <p className="italic text-xs text-slate-600 mb-4">Selanjutnya disebut sebagai <strong>PIHAK KESATU (Pengguna Jasa)</strong>.</p>

                                    <table className="w-full mb-2">
                                        <tbody>
                                            <tr><td className="w-36 align-top">Nama</td><td className="w-3 align-top">:</td><td><strong className="uppercase">Atep Jaenudin</strong></td></tr>
                                            <tr><td className="align-top">Jabatan / Instansi</td><td className="align-top">:</td><td>CV Jasa Mandiri</td></tr>
                                            <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td>Jl. Gunung Balong III No.78 Kel. Lebak Bulus Kec. Cilandak Jakarta Selatan 12440</td></tr>
                                        </tbody>
                                    </table>
                                    <p className="italic text-xs text-slate-600">Selanjutnya disebut sebagai <strong>PIHAK KEDUA (Lembaga Penyalur)</strong>.</p>
                                </div>

                                <div className="mb-6 bg-slate-50 border border-slate-200 p-4 rounded-lg print:bg-transparent print:border-none print:p-0">
                                    <p className="font-bold underline mb-2">Keterangan Pekerja yang Ditempatkan:</p>
                                    <table className="w-full">
                                        <tbody>
                                            <tr><td className="w-36 align-top">Nama Pekerja</td><td className="w-3 align-top">:</td><td><strong>{formData.namaPekerja || "..................................................."}</strong></td></tr>
                                            <tr><td className="align-top">Umur</td><td className="align-top">:</td><td>{formData.umurPekerja ? `${formData.umurPekerja} Tahun` : "..................................................."}</td></tr>
                                            <tr><td className="align-top">Kota Asal</td><td className="align-top">:</td><td>{formData.kotaAsalPekerja || "..................................................."}</td></tr>
                                            <tr><td className="align-top">Pekerjaan Pokok</td><td className="align-top">:</td><td>{formData.pekerjaanPokok || "..................................................."}</td></tr>
                                            <tr><td className="align-top">Gaji Per Bulan</td><td className="align-top">:</td><td>Rp {formatRupiah(formData.gajiPekerja)}</td></tr>
                                        </tbody>
                                    </table>
                                </div>

                                <p className="font-bold mt-6 mb-2">Dengan ini saya (pengguna jasa) mengetahui dan setuju terhadap peraturan penempatan tenaga kerja yang tercantum dibawah ini:</p>

                                <div className="pl-2">
                                    <ol className="list-decimal pl-5 space-y-4 font-semibold text-[12.5px]">
                                        {pasalList.map((pasal) => (
                                            <li key={pasal.id}>
                                                {pasal.judul}
                                                <ol className="list-[lower-alpha] pl-5 mt-1 space-y-1 font-normal">
                                                    {pasal.poin.map((teksPoin: string, idx: number) => (
                                                        <li key={idx}>{parseVariabelText(teksPoin)}</li>
                                                    ))}
                                                </ol>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                                <p className="mt-6 text-center">Demikian surat persetujuan ini saya sepakati dengan sadar dan tanpa paksaan dari pihak manapun.</p>

                                {/* KETERANGAN TAMBAHAN: MASA BERLAKU */}
                                <div className="mt-4 font-bold text-[13px] text-slate-800 print:break-inside-avoid">
                                    {formData.jenisKontrak === 'permanen'
                                        ? <p>Masa berlaku garansi sampai dengan tanggal : <span className="underline">{formatted90Days}</span></p>
                                        : <p>Masa kontrak kerja sampai dengan tanggal : <span className="underline">{formatted1Year}</span></p>
                                    }
                                </div>

                            </div>

                            {/* TANGGAL TANDA TANGAN (Otomatis menyesuaikan Tanggal Masuk Kerja) */}
                            <div className="mt-6 flex justify-end px-8 print:break-inside-avoid">
                                <p className="text-[13px] text-slate-800 font-medium">Jakarta, {formattedTandaTangan}</p>
                            </div>

                            <div className="mt-2 flex justify-between px-8 print:break-inside-avoid">
                                <div className="text-center">
                                    <p className="text-[13px] mb-20 font-medium text-slate-800">Pihak Kesatu (Pengguna Jasa)</p>
                                    <p className="text-[13px] font-bold underline uppercase">( {formData.namaMajikan || "_________________________"} )</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[13px] mb-20 font-medium text-slate-800">Pihak Kedua (CV Jasa Mandiri)</p>
                                    <p className="text-[13px] font-bold underline uppercase">( Atep Jaenudin )</p>
                                </div>
                            </div>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}