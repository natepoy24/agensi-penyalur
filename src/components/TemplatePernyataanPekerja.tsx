// src/components/TemplatePernyataanPekerja.tsx
"use client";

interface TemplatePernyataanProps {
    formData: any;
    pernyataanList: any[];
}

export default function TemplatePernyataanPekerja({ formData, pernyataanList }: TemplatePernyataanProps) {

    // Helper Format Rupiah
    const formatRupiah = (angka: string) => {
        if (!angka) return "...........................";
        return new Intl.NumberFormat('id-ID').format(Number(angka));
    };

    // FUNGSI REPLACE VARIABEL (PENTING: Menangani Potongan Bulan 1-3)
    const parseVariabelText = (text: string) => {
        let result = text;
        result = result.replace(/\{\{namaMajikan\}\}/g, formData.namaMajikan || ".......");
        result = result.replace(/\{\{pekerjaanPokok\}\}/g, formData.pekerjaanPokok || ".......");
        result = result.replace(/\{\{gajiPekerja\}\}/g, formData.gajiPekerja ? formatRupiah(formData.gajiPekerja) : ".......");
        result = result.replace(/\{\{ijinKerja\}\}/g, formData.ijinKerja || ".......");

        // Mengisi potongan bulan pertama, kedua, dan ketiga dengan nilai yang sama
        const nilaiPotongan = formData.potonganBulanPertama ? formatRupiah(formData.potonganBulanPertama) : ".......";
        result = result.replace(/\{\{potonganBulanPertama\}\}/g, nilaiPotongan);

        return result;
    };

    return (
        <div className="w-[210mm] min-h-[330mm] bg-white relative px-10 py-10 print:w-full print:min-h-0 print:shadow-none print:px-10 print:py-0 z-10 text-black print:bg-transparent page-break-before-always">

            {/* WATERMARK LOGO */}
            <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none z-0 print:fixed print:inset-0 flex items-center justify-center overflow-hidden">
                <img src="/Image/Logo-jm.webp" alt="Watermark" className="w-[150mm] opacity-[0.100]" />
            </div>

            <table className="w-full relative z-10 border-collapse">
                {/* HEADER / KOP SURAT */}
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
                        </td>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td className="pt-0">
                            <div className="text-center mb-6">
                                <h2 className="text-[16px] font-bold uppercase underline tracking-wider text-slate-800">Surat Pernyataan Pekerja</h2>
                            </div>

                            <div className="text-[12px] space-y-5 text-slate-800">
                                <p>Yang bertanda tangan di bawah ini menyatakan bahwa benar ini data saya dan keluarga saya :</p>

                                {/* I. BIODATA PEKERJA */}
                                <div>
                                    <h3 className="font-bold border-b border-black w-fit mb-2 uppercase">I. Biodata Pekerja</h3>
                                    <div className="grid grid-cols-2 gap-x-10">
                                        <table className="w-full">
                                            <tbody>
                                                <tr><td className="w-32">Nama / Panggilan</td><td>: <strong>{formData.namaPekerja || "...."}</strong> / {formData.namaPanggilan || "...."}</td></tr>
                                                <tr><td>NIK KTP</td><td>: {formData.nikPekerja || "...."}</td></tr>
                                                <tr><td>Tempat Tgl Lahir</td><td>: {formData.tempatLahir || "...."}, {formData.tglLahir || "...."}</td></tr>
                                                <tr><td>Agama / J.Kelamin</td><td>: {formData.agama || "...."} / {formData.jenisKelamin || "...."}</td></tr>
                                                <tr><td>Pendidikan / Status</td><td>: {formData.pendidikan || "...."} / {formData.statusPerkawinan || "...."}</td></tr>
                                                <tr><td>TB / BB</td><td>: {formData.tinggiBadan || "...."} cm / {formData.beratBadan || "...."} kg</td></tr>
                                            </tbody>
                                        </table>
                                        <table className="w-full">
                                            <tbody>
                                                <tr><td className="w-24 align-top">Alamat</td><td>: {formData.alamatJalanPekerja || "...."}</td></tr>
                                                <tr><td>Kelurahan</td><td>: {formData.kelurahanPekerja || "...."}</td></tr>
                                                <tr><td>Kecamatan</td><td>: {formData.kecamatanPekerja || "...."}</td></tr>
                                                <tr><td>Kabupaten</td><td>: {formData.kotaAsalPekerja || "...."}</td></tr>
                                                <tr><td>Provinsi</td><td>: {formData.provinsiPekerja || "...."}</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* II. KELUARGA[cite: 6] */}
                                <div>
                                    <h3 className="font-bold border-b border-black w-fit mb-2 uppercase">II. Keluarga</h3>
                                    <div className="grid grid-cols-2 gap-x-10">
                                        <table className="w-full">
                                            <tbody>
                                                <tr><td className="w-32">Nama Bapak / Ibu</td><td>: {formData.namaAyah || "...."} / {formData.namaIbu || "...."}</td></tr>
                                                <tr><td>Nama Kakak / Adik</td><td>: {formData.namaKakak || "...."} / {formData.namaAdik || "...."}</td></tr>
                                                <tr><td>Anak Ke</td><td>: {formData.anakKe || "...."} dari {formData.jumlahSaudara || "...."} bersaudara</td></tr>
                                            </tbody>
                                        </table>
                                        <table className="w-full">
                                            <tbody>
                                                <tr><td className="w-24 align-top">Alamat Ortu</td><td>: {formData.alamatJalanKeluarga || "...."}</td></tr>
                                                <tr><td>Kab / Prov</td><td>: {formData.kotaKeluarga || "...."} / {formData.provinsiKeluarga || "...."}</td></tr>
                                                <tr><td>Kontak Darurat</td><td>: {formData.kontakDarurat || "...."}</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* III. PENGALAMAN KERJA[cite: 6] */}
                                <div>
                                    <h3 className="font-bold border-b border-black w-fit mb-2 uppercase">III. Pengalaman Kerja Terakhir</h3>
                                    <table className="w-full border-collapse border border-slate-400 text-center text-[11.5px]">
                                        <thead className="bg-slate-50 uppercase font-bold">
                                            <tr>
                                                <td className="border border-slate-400 p-2">Sebagai</td>
                                                <td className="border border-slate-400 p-2">Lama Kerja</td>
                                                <td className="border border-slate-400 p-2">Gaji Terakhir</td>
                                                <td className="border border-slate-400 p-2">Alamat / Lokasi Kerja</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border border-slate-400 p-2">{formData.pengalamanKerja || "-"}</td>
                                                <td className="border border-slate-400 p-2">{formData.lamaKerja || "-"}</td>
                                                <td className="border border-slate-400 p-2">Rp {formatRupiah(formData.gajiTerakhir)}</td>
                                                <td className="border border-slate-400 p-2">{formData.alamatKerjaSebelumnya || "-"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* IV. PERNYATAAN PEKERJA[cite: 5, 6] */}
                                <div>
                                    <h3 className="font-bold border-b border-black w-fit mb-2 uppercase">IV. Pernyataan Pekerja</h3>
                                    <ol className="list-decimal pl-5 space-y-1.5 text-justify leading-relaxed">
                                        {pernyataanList[0]?.poin.map((p: string, i: number) => (
                                            <li key={i}>{parseVariabelText(p)}</li>
                                        ))}
                                    </ol>
                                </div>

                                <p className="pt-0 text-center italic">Demikian Surat pernyataan ini Saya Mengerti dan paham serta membacanya dalam keadaan sadar sehat jasmani dan rohani tanpa ada paksaan dari pihak manapun.</p>

                                <div className="mt-12 flex justify-between px-10 print:break-inside-avoid">
                                    <div className="text-center">
                                        <p className="mb-20 font-bold">CV JASA MANDIRI</p>
                                        <p className="font-bold underline uppercase">( ATEP JAENUDIN )</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="mb-20 font-medium text-slate-600">Jakarta, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                        <p className="font-bold underline uppercase">( {formData.namaPekerja || "________________"} )</p>
                                        <p className="font-bold text-[10px] mt-1 uppercase text-slate-500">Tenaga Kerja</p>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}