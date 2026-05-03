// src/components/FormInputKontrak.tsx
"use client";
import { useState, useEffect } from "react";

interface FormInputKontrakProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handlePekerjaChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    pekerjaList: any[];
    pasalList: any[];
    setPasalList: (data: any[]) => void;
    pernyataanList: any[];
    setPernyataanList: (data: any[]) => void;
}

export default function FormInputKontrak({
    formData,
    handleChange,
    handlePekerjaChange,
    pekerjaList,
    pasalList,
    setPasalList,
    pernyataanList,
    setPernyataanList
}: FormInputKontrakProps) {

    // === STATE API WILAYAH ===
    const [provinces, setProvinces] = useState<any[]>([]);
    const [regsPekerja, setRegsPekerja] = useState<any[]>([]);
    const [regsKeluarga, setRegsKeluarga] = useState<any[]>([]);
    const [regsKerja, setRegsKerja] = useState<any[]>([]);

    // === STATE ACCORDION ===
    const [activeAccordion, setActiveAccordion] = useState<number | string | null>(null);

    useEffect(() => {
        fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
            .then(res => res.json()).then(data => setProvinces(data));
    }, []);

    const formatNamaKota = (n: string) => n.startsWith("KOTA JAKARTA") ? n.replace("KOTA JAKARTA", "KOTA ADM. JAKARTA") : n;

    const handleProvChange = async (e: any, type: string) => {
        handleChange(e);
        const prov = provinces.find(p => p.name === e.target.value);
        if (prov) {
            const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${prov.id}.json`);
            let data = await res.json();
            data = data.map((r: any) => ({ ...r, name: formatNamaKota(r.name) }));
            if (type === 'pekerja') setRegsPekerja(data);
            else if (type === 'keluarga') setRegsKeluarga(data);
            else setRegsKerja(data);
        }
    };

    const toggleAccordion = (id: number | string) => {
        setActiveAccordion(prev => prev === id ? null : id);
    };

    return (
        <div className="space-y-6 overflow-y-auto pr-2">

            {/* 1. JENIS DOKUMEN */}
            <div className="bg-white p-6 rounded-2xl border-l-4 border-l-emerald-500 shadow-sm">
                <label className="block text-sm font-bold mb-2">Jenis Dokumen</label>
                <select name="jenisKontrak" value={formData.jenisKontrak} onChange={handleChange} className="w-full p-3 bg-emerald-50 border rounded-xl font-bold outline-none cursor-pointer">
                    <option value="1_tahun">Kontrak Kerja 1 Tahun</option>
                    <option value="permanen">Perjanjian Kerja (Permanen)</option>
                </select>
            </div>

            {/* 2. MAJIKAN & LOKASI KERJA */}
            <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
                <h2 className="font-bold border-b pb-2 flex items-center gap-2 text-slate-800">
                    <span className="material-symbols-outlined text-emerald-600">apartment</span> Data Majikan & Lokasi
                </h2>
                <div>
                    <label className="text-xs font-bold text-slate-700">Nama Perusahaan/Majikan</label>
                    <input name="namaMajikan" value={formData.namaMajikan || ""} onChange={handleChange} className="w-full p-2 bg-slate-50 border rounded-lg outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-xs font-bold text-slate-700">NIK Majikan</label>
                        <input type="number" name="nikMajikan" value={formData.nikMajikan || ""} onChange={handleChange} className="w-full p-2 bg-slate-50 border rounded-lg outline-none" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-700">No. HP / WA</label>
                        <input type="tel" name="noHpMajikan" value={formData.noHpMajikan || ""} onChange={handleChange} className="w-full p-2 bg-slate-50 border rounded-lg outline-none" />
                    </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border space-y-3 mt-2">
                    <label className="text-xs font-bold text-emerald-700">Alamat Kerja (Sesuai Penempatan)</label>
                    <input name="alamatMajikan" value={formData.alamatMajikan || ""} placeholder="Jalan, No, RT/RW" onChange={handleChange} className="w-full p-2 border rounded-lg text-sm outline-none" />
                    <div className="grid grid-cols-2 gap-2">
                        <select name="provinsiLokasiKerja" value={formData.provinsiLokasiKerja || ""} onChange={(e) => handleProvChange(e, 'kerja')} className="p-2 border rounded-lg text-sm bg-white outline-none">
                            <option value="">Provinsi</option>
                            {provinces.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                        </select>
                        <select name="kotaLokasiKerja" value={formData.kotaLokasiKerja || ""} onChange={handleChange} disabled={!formData.provinsiLokasiKerja} className="p-2 border rounded-lg text-sm bg-white outline-none">
                            <option value="">Kota/Kab</option>
                            {regsKerja.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* 3. BIODATA TENAGA KERJA */}
            <div className="bg-white p-6 rounded-2xl border-t-4 border-t-emerald-500 shadow-sm space-y-4">
                <h2 className="font-bold border-b pb-2 flex items-center gap-2 text-slate-800">
                    <span className="material-symbols-outlined text-emerald-600">badge</span> Biodata Tenaga Kerja
                </h2>

                <select name="pekerja_id" value={formData.pekerja_id || ""} onChange={handlePekerjaChange} className="w-full p-2 border rounded-xl bg-emerald-50/50 outline-none font-medium">
                    <option value="">Pilih Pekerja (Auto-Fill)...</option>
                    {pekerjaList.map((p: any) => <option key={p.id} value={p.id}>{p.nama}</option>)}
                    <option value="manual" className="font-bold text-emerald-700">+ Input Manual</option>
                </select>

                {formData.pekerja_id && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="text-xs font-bold text-slate-700">Nama Lengkap</label><input name="namaPekerja" value={formData.namaPekerja || ""} onChange={handleChange} className="w-full p-2 bg-slate-50 border rounded-lg outline-none" /></div>
                            <div><label className="text-xs font-bold text-slate-700">Nama Panggilan</label><input name="namaPanggilan" value={formData.namaPanggilan || ""} onChange={handleChange} className="w-full p-2 bg-slate-50 border rounded-lg outline-none" /></div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="text-xs font-bold text-slate-700">NIK Tenaga Kerja</label><input name="nikPekerja" value={formData.nikPekerja || ""} onChange={handleChange} className="w-full p-2 bg-slate-50 border rounded-lg outline-none" /></div>
                            <div><label className="text-xs font-bold text-slate-700">No. HP Pekerja</label><input name="noHpPekerja" value={formData.noHpPekerja || ""} onChange={handleChange} className="w-full p-2 bg-slate-50 border rounded-lg outline-none" /></div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="text-xs font-bold text-slate-700">Tempat Lahir</label><input name="tempatLahir" value={formData.tempatLahir || ""} onChange={handleChange} className="w-full p-2 bg-slate-50 border rounded-lg outline-none" /></div>
                            <div><label className="text-xs font-bold text-slate-700">Tanggal Lahir</label><input type="date" name="tglLahir" value={formData.tglLahir || ""} onChange={handleChange} className="w-full p-2 bg-slate-50 border rounded-lg outline-none" /></div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <div><label className="text-xs font-bold text-slate-700">Umur</label><input name="umurPekerja" value={formData.umurPekerja || ""} onChange={handleChange} className="w-full p-2 bg-slate-50 border rounded-lg outline-none" /></div>
                            <div><label className="text-xs font-bold text-slate-700">TB (cm)</label><input name="tinggiBadan" value={formData.tinggiBadan || ""} onChange={handleChange} className="w-full p-2 bg-slate-50 border rounded-lg outline-none" /></div>
                            <div><label className="text-xs font-bold text-slate-700">BB (kg)</label><input name="beratBadan" value={formData.beratBadan || ""} onChange={handleChange} className="w-full p-2 bg-slate-50 border rounded-lg outline-none" /></div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-bold text-slate-700">Jenis Kelamin</label>
                                <select name="jenisKelamin" value={formData.jenisKelamin || ""} onChange={handleChange} className="w-full p-2 bg-slate-50 border rounded-lg outline-none">
                                    <option value="">Pilih...</option><option value="Laki-Laki">Laki-Laki</option><option value="Perempuan">Perempuan</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-700">Pendidikan</label>
                                <select name="pendidikan" value={formData.pendidikan || ""} onChange={handleChange} className="w-full p-2 bg-slate-50 border rounded-lg outline-none">
                                    <option value="">Pilih...</option><option value="SD">SD</option><option value="SMP">SMP</option><option value="SMA/SMK">SMA/SMK</option><option value="D3">D3</option><option value="S1">S1</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-bold text-slate-700">Agama</label>
                                <select name="agama" value={formData.agama || ""} onChange={handleChange} className="w-full p-2 bg-slate-50 border rounded-lg text-sm outline-none">
                                    <option value="">Pilih Agama...</option><option value="Islam">Islam</option><option value="Protestan">Protestan</option><option value="Katolik">Katolik</option><option value="Hindu">Hindu</option><option value="Buddha">Buddha</option><option value="Konghucu">Konghucu</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-700">Status Perkawinan</label>
                                <select name="statusPerkawinan" value={formData.statusPerkawinan || ""} onChange={handleChange} className="w-full p-2 bg-slate-50 border rounded-lg text-sm outline-none">
                                    <option value="">Pilih Status...</option><option value="Belum Menikah">Belum Menikah</option><option value="Menikah">Menikah</option><option value="Janda">Janda</option><option value="Duda">Duda</option>
                                </select>
                            </div>
                        </div>

                        {/* Alamat Pekerja */}
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                            <label className="text-xs font-bold text-emerald-700">Alamat Domisili (KTP Pekerja)</label>
                            <input name="alamatJalanPekerja" placeholder="Nama Jalan, No. Rumah, RT/RW" value={formData.alamatJalanPekerja || ""} onChange={handleChange} className="w-full p-2 border rounded-lg text-sm outline-none" />
                            <div className="grid grid-cols-2 gap-2">
                                <select name="provinsiPekerja" value={formData.provinsiPekerja || ""} onChange={(e) => handleProvChange(e, 'pekerja')} className="p-2 border rounded-lg text-sm bg-white outline-none">
                                    <option value="">Provinsi</option>
                                    {provinces.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                                </select>
                                <select name="kotaAsalPekerja" value={formData.kotaAsalPekerja || ""} onChange={handleChange} disabled={!formData.provinsiPekerja} className="p-2 border rounded-lg text-sm bg-white outline-none">
                                    <option value="">Kota/Kab</option>
                                    {regsPekerja.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <input name="kecamatanPekerja" placeholder="Kecamatan" value={formData.kecamatanPekerja || ""} onChange={handleChange} className="p-2 border rounded-lg text-sm outline-none" />
                                <input name="kelurahanPekerja" placeholder="Kelurahan" value={formData.kelurahanPekerja || ""} onChange={handleChange} className="p-2 border rounded-lg text-sm outline-none" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 4. DATA KELUARGA & DARURAT */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-blue-600">family_history</span> Data Keluarga Pekerja
                </h2>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div><label className="text-xs font-bold text-slate-700">Nama Bapak</label><input name="namaAyah" value={formData.namaAyah || ""} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none" /></div>
                        <div><label className="text-xs font-bold text-slate-700">Nama Ibu</label><input name="namaIbu" value={formData.namaIbu || ""} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none" /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div><label className="text-xs font-bold text-slate-700">Nama Kakak</label><input name="namaKakak" value={formData.namaKakak || ""} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none" /></div>
                        <div><label className="text-xs font-bold text-slate-700">Nama Adik</label><input name="namaAdik" value={formData.namaAdik || ""} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none" /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div><label className="text-xs font-bold text-slate-700">Anak Ke</label><input type="number" name="anakKe" value={formData.anakKe || ""} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none" /></div>
                        <div><label className="text-xs font-bold text-slate-700">Jumlah Saudara</label><input type="number" name="jumlahSaudara" value={formData.jumlahSaudara || ""} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none" /></div>
                    </div>

                    <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 space-y-3">
                        <label className="text-xs font-bold text-blue-700">Alamat Keluarga (Kampung)</label>
                        <input name="alamatJalanKeluarga" placeholder="Nama Jalan/Dusun, No. Rumah, RT/RW" value={formData.alamatJalanKeluarga || ""} onChange={handleChange} className="w-full p-2 border rounded-lg text-sm bg-white outline-none" />
                        <div className="grid grid-cols-2 gap-2">
                            <select name="provinsiKeluarga" value={formData.provinsiKeluarga || ""} onChange={(e) => handleProvChange(e, 'keluarga')} className="p-2 border rounded-lg text-sm bg-white outline-none">
                                <option value="">Provinsi</option>
                                {provinces.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                            </select>
                            <select name="kotaKeluarga" value={formData.kotaKeluarga || ""} onChange={handleChange} disabled={!formData.provinsiKeluarga} className="p-2 border rounded-lg text-sm bg-white outline-none">
                                <option value="">Kota/Kab</option>
                                {regsKeluarga.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-700">Kontak Darurat (Nama & Hubungan)</label>
                        <input name="kontakDarurat" value={formData.kontakDarurat || ""} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none" placeholder="Contoh: Budi (Kakak)" />
                    </div>
                </div>
            </div>

            {/* 5. PENGALAMAN KERJA */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-600">history_edu</span> Pengalaman Kerja Terakhir
                </h2>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-slate-700">Sebagai</label>
                        <input name="pengalamanKerja" value={formData.pengalamanKerja || ""} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none" placeholder="Contoh: ART / Baby Sitter" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div><label className="text-xs font-bold text-slate-700">Lama Kerja</label><input name="lamaKerja" value={formData.lamaKerja || ""} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none" placeholder="Contoh: 2 Tahun" /></div>
                        <div><label className="text-xs font-bold text-slate-700">Gaji Terakhir (Rp)</label><input type="number" name="gajiTerakhir" value={formData.gajiTerakhir || ""} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none" /></div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-700">Alamat Kerja Sebelumnya</label>
                        <textarea name="alamatKerjaSebelumnya" value={formData.alamatKerjaSebelumnya || ""} onChange={handleChange} rows={2} className="w-full p-2 border rounded-lg resize-none outline-none" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-700">Ijin Kerja Dari</label>
                        <input name="ijinKerja" value={formData.ijinKerja || ""} onChange={handleChange} className="w-full p-2 border rounded-lg outline-none" placeholder="Orang Tua / Suami / Wali" />
                    </div>
                </div>
            </div>

            {/* 6. RINCIAN PENEMPATAN & KEUANGAN */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 border-t-4 border-t-emerald-500">
                <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600">payments</span> Rincian Penempatan
                </h2>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-bold text-slate-700">Jabatan Baru</label>
                        <input name="pekerjaanPokok" value={formData.pekerjaanPokok || ""} onChange={handleChange} className="w-full p-2 bg-slate-50 border rounded-lg outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-bold text-slate-700">Gaji Pekerja (Rp)</label>
                            <input type="number" name="gajiPekerja" value={formData.gajiPekerja || ""} onChange={handleChange} className="w-full p-2 bg-slate-50 border rounded-lg outline-none" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-700">Biaya Admin (Rp)</label>
                            <input type="number" name="biayaAdmin" value={formData.biayaAdmin || ""} onChange={handleChange} className="w-full p-2 bg-slate-50 border rounded-lg outline-none" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-bold text-amber-700">Potongan Bln Ke-1 (Rp)</label>
                            <input type="number" name="potonganBulanPertama" value={formData.potonganBulanPertama || ""} onChange={handleChange} className="w-full p-2 border-amber-200 border rounded-lg outline-none" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-amber-700">Biaya Ongkir (Rp)</label>
                            <input type="number" name="biayaOngkir" value={formData.biayaOngkir || ""} onChange={handleChange} className="w-full p-2 border-amber-200 border rounded-lg outline-none" />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-bold text-slate-700">Tanggal Mulai Bekerja</label>
                        <input type="date" name="tanggalMasuk" value={formData.tanggalMasuk || ""} onChange={handleChange} className="w-full p-2 bg-slate-50 border rounded-lg outline-none" />
                    </div>
                </div>
            </div>

            {/* 7. EDITOR PASAL DINAMIS (ACCORDION) */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 border-t-4 border-t-blue-500">
                <h2 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <span className="material-symbols-outlined text-blue-600">gavel</span> Editor Pasal & Pernyataan
                </h2>

                <p className="text-[11px] text-slate-500 mb-5 leading-relaxed">
                    <strong>Variabel ajaib:</strong> <code className="bg-slate-100 text-red-500 px-1 rounded">{"{{gajiPekerja}}"}</code>, <code className="bg-slate-100 text-red-500 px-1 rounded">{"{{biayaAdmin}}"}</code>, <code className="bg-slate-100 text-red-500 px-1 rounded">{"{{potonganBulanPertama}}"}</code>, <code className="bg-slate-100 text-red-500 px-1 rounded">{"{{pekerjaanPokok}}"}</code>, <code className="bg-slate-100 text-red-500 px-1 rounded">{"{{ijinKerja}}"}</code>.
                </p>

                {/* --- BAGIAN KONTRAK KERJA --- */}
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-slate-700 mb-3 bg-slate-100 px-3 py-1.5 rounded-lg inline-block">📋 Surat Kontrak Kerja</h3>
                    <div className="space-y-3">
                        {pasalList.map((pasal, pasalIndex) => (
                            <div key={pasal.id} className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-200">
                                <div
                                    onClick={() => toggleAccordion(`kontrak-${pasal.id}`)}
                                    className="bg-slate-50 hover:bg-slate-100 px-4 py-3 flex justify-between items-center cursor-pointer select-none"
                                >
                                    <span className="font-bold text-sm text-slate-700 truncate pr-4">{pasalIndex + 1}. {pasal.judul}</span>
                                    <span className={`material-symbols-outlined transition-transform duration-300 ${activeAccordion === `kontrak-${pasal.id}` ? 'rotate-180 text-blue-600' : 'text-slate-400'}`}>
                                        expand_more
                                    </span>
                                </div>

                                {activeAccordion === `kontrak-${pasal.id}` && (
                                    <div className="p-4 bg-white border-t border-slate-100 space-y-3 animate-in slide-in-from-top-1 fade-in duration-200">
                                        <input type="text" value={pasal.judul || ""} onChange={(e) => { const newList = [...pasalList]; newList[pasalIndex].judul = e.target.value; setPasalList(newList); }} className="w-full font-bold text-xs bg-white border border-slate-300 px-3 py-2 rounded-lg mb-2" placeholder="Judul Pasal" />
                                        <div className="space-y-2 pl-2">
                                            {pasal.poin.map((p: string, poinIndex: number) => (
                                                <div key={poinIndex} className="flex gap-2">
                                                    <textarea value={p || ""} onChange={(e) => { const newList = [...pasalList]; newList[pasalIndex].poin[poinIndex] = e.target.value; setPasalList(newList); }} className="w-full text-[12px] px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none resize-none" rows={2} />
                                                    <button onClick={() => { const newList = [...pasalList]; newList[pasalIndex].poin.splice(poinIndex, 1); setPasalList(newList); }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg h-fit transition-colors"><span className="material-symbols-outlined text-sm">delete</span></button>
                                                </div>
                                            ))}
                                        </div>
                                        <button onClick={() => { const newList = [...pasalList]; newList[pasalIndex].poin.push("Teks pasal baru..."); setPasalList(newList); }} className="mt-2 text-xs font-bold text-blue-600 flex items-center gap-1 hover:text-blue-800"><span className="material-symbols-outlined text-[14px]">add</span> Tambah Poin</button>
                                    </div>
                                )}
                            </div>
                        ))}
                        <button onClick={() => setPasalList([...pasalList, { id: Date.now(), jenis_kontrak: formData.jenisKontrak, judul: "PASAL BARU", poin: ["Isi pasal..."] }])} className="w-full py-2 border-2 border-dashed border-slate-300 text-slate-500 font-bold text-sm rounded-xl hover:bg-slate-50 hover:border-slate-400 hover:text-slate-700 transition-colors">
                            + Tambah Pasal Kontrak
                        </button>
                    </div>
                </div>

                {/* --- BAGIAN PERNYATAAN PEKERJA --- */}
                <div>
                    <h3 className="text-sm font-bold text-emerald-700 mb-3 bg-emerald-50 px-3 py-1.5 rounded-lg inline-block">📝 Surat Pernyataan Pekerja</h3>
                    <div className="space-y-3">
                        {pernyataanList.map((pernyataan, pIndex) => (
                            <div key={pernyataan.id} className="border border-emerald-200 rounded-xl overflow-hidden transition-all duration-200">
                                <div
                                    onClick={() => toggleAccordion(`pernyataan-${pernyataan.id}`)}
                                    className="bg-emerald-50/50 hover:bg-emerald-100/50 px-4 py-3 flex justify-between items-center cursor-pointer select-none"
                                >
                                    <span className="font-bold text-sm text-emerald-800 truncate pr-4">{pernyataan.judul}</span>
                                    <span className={`material-symbols-outlined transition-transform duration-300 ${activeAccordion === `pernyataan-${pernyataan.id}` ? 'rotate-180 text-emerald-600' : 'text-emerald-400'}`}>
                                        expand_more
                                    </span>
                                </div>

                                {activeAccordion === `pernyataan-${pernyataan.id}` && (
                                    <div className="p-4 bg-white border-t border-emerald-100 space-y-3 animate-in slide-in-from-top-1 fade-in duration-200">
                                        <div className="space-y-2 pl-2">
                                            {pernyataan.poin.map((p: string, poinIndex: number) => (
                                                <div key={poinIndex} className="flex gap-2">
                                                    <span className="text-xs font-bold text-emerald-600 mt-2.5">{poinIndex + 1}.</span>
                                                    <textarea value={p || ""} onChange={(e) => { const newList = [...pernyataanList]; newList[pIndex].poin[poinIndex] = e.target.value; setPernyataanList(newList); }} className="w-full text-[12px] px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none resize-none focus:border-emerald-400" rows={2} />
                                                    <button onClick={() => { const newList = [...pernyataanList]; newList[pIndex].poin.splice(poinIndex, 1); setPernyataanList(newList); }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg h-fit transition-colors"><span className="material-symbols-outlined text-sm">delete</span></button>
                                                </div>
                                            ))}
                                        </div>
                                        <button onClick={() => { const newList = [...pernyataanList]; newList[pIndex].poin.push("Teks pernyataan baru..."); setPernyataanList(newList); }} className="mt-2 text-xs font-bold text-emerald-600 flex items-center gap-1 hover:text-emerald-800"><span className="material-symbols-outlined text-[14px]">add</span> Tambah Poin Pernyataan</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}