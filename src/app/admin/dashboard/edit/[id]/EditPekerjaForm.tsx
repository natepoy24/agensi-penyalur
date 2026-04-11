"use client";

import { useActionState, useEffect, useState, useRef } from "react";
import { useFormStatus } from "react-dom";
import { updatePekerja } from "@/app/actions";
import toast from "react-hot-toast";
import SukuInput from "@/components/SukuInput";
import KeterampilanSelector from "@/components/KeterampilanSelector";
import ImageCropModal from "@/components/ImageCropModal";
import Link from "next/link";
import { type PekerjaProps } from "@/components/PekerjaCard";
import Image from "next/image";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-8 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/30 hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? "Memperbarui Profil..." : "Perbarui Profil"}
    </button>
  );
}

const BAHASA_PRESET = ["Inggris", "Kanton", "Mandarin", "Arab", "Korea"];
const getBahasaLain = (bahasa: string[] | undefined) => {
  if (!bahasa) return '';
  return bahasa.find(b => !BAHASA_PRESET.includes(b)) || '';
};

export default function EditPekerjaForm({ pekerja }: { pekerja: PekerjaProps }) {
  const initialState = { error: undefined, success: undefined };
  const [state, formAction] = useActionState(updatePekerja, initialState as any);

  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [croppedImageFile, setCroppedImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const bahasaLainValue = getBahasaLain(pekerja.bahasa_asing);
  const [bahasaLain, setBahasaLain] = useState(!!bahasaLainValue);
  const [bisaMasakKhusus, setBisaMasakKhusus] = useState(!!pekerja.masakan_khusus);

  useEffect(() => {
    if (state?.error) toast.error(state.error);
  }, [state]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageToCrop(URL.createObjectURL(file));
  };

  const handleCropComplete = (croppedFile: File) => {
    setCroppedImageFile(croppedFile);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFormSubmit = (formData: FormData) => {
    if (croppedImageFile) {
      formData.set("fotoUrl", croppedImageFile, croppedImageFile.name);
    } else if (fileInputRef.current?.files?.[0]) {
      formData.set("fotoUrl", fileInputRef.current.files[0]);
    }
    formAction(formData);
  };

  return (
    <div className="max-w-5xl mx-auto font-['Inter']">
      {imageToCrop && (
        <ImageCropModal upImg={imageToCrop} onClose={() => setImageToCrop(null)} onComplete={handleCropComplete} />
      )}

      {/* Header Breadcrumbs */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
          <Link href="/admin/dashboard" className="hover:text-emerald-600">Pekerja</Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-emerald-600 font-medium">Edit Profil Pekerja</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-extrabold font-['Plus_Jakarta_Sans'] text-slate-800 tracking-tight">Edit Profil Pekerja</h2>
            <p className="text-slate-500 mt-1">Perbarui informasi profil {pekerja.nama}.</p>
          </div>
        </div>
      </div>

      <form action={handleFormSubmit} className="space-y-10">
        <input type="hidden" name="id" defaultValue={pekerja?.id} />
        <input type="hidden" name="currentFotoUrl" defaultValue={pekerja?.fotoUrl || ""} />

        {/* SECTION 1: PROFIL DASAR */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <span className="material-symbols-outlined">person</span>
            </div>
            <h3 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-slate-800">Profil Dasar</h3>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <label className="block text-sm font-semibold text-slate-600 mb-2">Nama Lengkap Pekerja</label>
              <input type="text" name="nama" required defaultValue={pekerja.nama} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/20 text-slate-800" placeholder="Masukkan nama lengkap sesuai KTP" />
            </div>

            <div className="col-span-12 md:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <label className="block text-sm font-semibold text-slate-600 mb-2">Umur</label>
              <div className="relative">
                <input type="number" name="umur" required defaultValue={pekerja.umur} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/20 text-slate-800" placeholder="00" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">Tahun</span>
              </div>
            </div>

            <div className="col-span-12 md:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <label className="block text-sm font-semibold text-slate-600 mb-2">Kategori Pekerjaan</label>
              <select name="kategori" required defaultValue={pekerja.kategori} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/20 text-slate-800 font-medium">
                <option value="Baby Sitter">Baby Sitter</option>
                <option value="Perawat Lansia">Perawat Lansia</option>
                <option value="Asisten Rumah Tangga">Asisten Rumah Tangga</option>
                <option value="Supir">Supir Pribadi</option>
                <option value="Tukang Kebun">Tukang Kebun</option>
              </select>
            </div>

            <div className="col-span-12 md:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <label className="block text-sm font-semibold text-slate-600 mb-2">Status Pekerja</label>
              <select name="status" required defaultValue={pekerja.status} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/20 text-slate-800">
                <option value="Tersedia">Tersedia</option>
                <option value="Akan Tersedia">Akan Tersedia</option>
              </select>
            </div>

            <div className="col-span-12 md:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <label className="block text-sm font-semibold text-slate-600 mb-2">Ekspektasi Gaji (Bulanan)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 font-bold">Rp</span>
                <input type="number" name="gaji" required defaultValue={pekerja.gaji} className="w-full bg-slate-50 border-none rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-emerald-500/20 font-medium text-slate-800" placeholder="2500000" />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: FISIK & LATAR BELAKANG */}
        <section>
          <div className="grid grid-cols-12 gap-6 bg-slate-100 p-8 rounded-3xl border border-slate-200">
            <div className="col-span-12">
              <h3 className="text-lg font-bold font-['Plus_Jakarta_Sans'] text-slate-800 mb-4 border-b border-slate-200 pb-2">Data Fisik & Latar Belakang</h3>
            </div>

            {/* Suku Input Component Wrapper */}
            <div className="col-span-12 md:col-span-6">
              <SukuInput defaultValue={pekerja.suku} />
            </div>

            <div className="col-span-12 md:col-span-6">
              <label className="block text-sm font-semibold text-slate-600 mb-2">Kota Asal / Domisili</label>
              <input type="text" name="lokasi" required defaultValue={pekerja.lokasi} className="w-full bg-white border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/20 text-slate-800" placeholder="Contoh: Jakarta Selatan" />
            </div>

            <div className="col-span-12 md:col-span-4">
              <label className="block text-sm font-semibold text-slate-600 mb-2">Pendidikan Terakhir</label>
              <select name="pendidikan_terakhir" required defaultValue={pekerja.pendidikan_terakhir || "SMP"} className="w-full bg-white border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/20 text-slate-800">
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
                <option value="SMA">SMA</option>
                <option value="SMK">SMK</option>
                <option value="D3">D3</option>
                <option value="S1">S1</option>
              </select>
            </div>

            <div className="col-span-12 md:col-span-4">
              <label className="block text-sm font-semibold text-slate-600 mb-2">Tinggi Badan</label>
              <div className="relative">
                <input type="number" name="tinggi_badan" defaultValue={pekerja.tinggi_badan || ""} className="w-full bg-white border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/20 text-slate-800" placeholder="160" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">cm</span>
              </div>
            </div>

            <div className="col-span-12 md:col-span-4">
              <label className="block text-sm font-semibold text-slate-600 mb-2">Berat Badan</label>
              <div className="relative">
                <input type="number" name="berat_badan" defaultValue={pekerja.berat_badan || ""} className="w-full bg-white border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/20 text-slate-800" placeholder="55" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">kg</span>
              </div>
            </div>

            <div className="col-span-12 md:col-span-6">
              <label className="block text-sm font-semibold text-slate-600 mb-2">Status Perkawinan</label>
              <select name="status_perkawinan" required defaultValue={pekerja.status_perkawinan} className="w-full bg-white border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/20 text-slate-800">
                <option value="Belum Menikah">Belum Menikah</option>
                <option value="Nikah">Nikah</option>
                <option value="Janda">Janda</option>
                <option value="Duda">Duda</option>
              </select>
            </div>

            <div className="col-span-12 md:col-span-6">
              <label className="block text-sm font-semibold text-slate-600 mb-2">Agama</label>
              <select name="agama" required defaultValue={pekerja.agama} className="w-full bg-white border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/20 text-slate-800">
                <option value="Islam">Islam</option>
                <option value="Protestan">Protestan</option>
                <option value="Katolik">Katolik</option>
                <option value="Hindu">Hindu</option>
                <option value="Buddha">Buddha</option>
                <option value="Konghucu">Konghucu</option>
              </select>
            </div>
          </div>
        </section>

        {/* SECTION 3: KEAHLIAN SPESIFIK */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600">
              <span className="material-symbols-outlined">workspace_premium</span>
            </div>
            <h3 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-slate-800">Keahlian & Kemampuan</h3>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <label className="block text-sm font-semibold text-slate-600 mb-2">Pengalaman Kerja</label>
              <div className="relative">
                <input type="number" name="pengalaman" required defaultValue={pekerja.pengalaman} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/20 text-slate-800" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">Tahun</span>
              </div>
            </div>

            <div className="col-span-12 md:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <label className="block text-sm font-semibold text-slate-600 mb-3">Kemampuan Khusus</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="text-xs text-slate-400 block mb-1">Bawa Motor?</span>
                  <label className="inline-flex items-center bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 cursor-pointer">
                    <input type="checkbox" name="bisa_bawa_motor" value="true" defaultChecked={pekerja.bisa_bawa_motor} className="text-emerald-500 focus:ring-emerald-500 rounded border-slate-300" />
                    <span className="ml-2 text-sm text-slate-700">Ya, Bisa</span>
                  </label>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block mb-1">Takut Anjing?</span>
                  <label className="inline-flex items-center bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 cursor-pointer">
                    <input type="checkbox" name="takut_anjing" value="true" defaultChecked={pekerja.takut_anjing} className="text-red-500 focus:ring-red-500 rounded border-slate-300" />
                    <span className="ml-2 text-sm text-slate-700">Ya, Takut</span>
                  </label>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block mb-1">Masak Babi?</span>
                  <label className="inline-flex items-center bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 cursor-pointer">
                    <input type="checkbox" name="bisa_masak_babi" value="true" defaultChecked={pekerja.bisa_masak_babi} className="text-emerald-500 focus:ring-emerald-500 rounded border-slate-300" />
                    <span className="ml-2 text-sm text-slate-700">Ya, Bisa</span>
                  </label>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block mb-1">Masakan Khusus?</span>
                  <label className="inline-flex items-center bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 cursor-pointer">
                    <input type="checkbox" name="masakan_khusus_radio" value="true" defaultChecked={bisaMasakKhusus} onChange={(e) => setBisaMasakKhusus(e.target.checked)} className="text-emerald-500 focus:ring-emerald-500 rounded border-slate-300" />
                    <span className="ml-2 text-sm text-slate-700">Ya, Ada</span>
                  </label>
                </div>
              </div>
              {bisaMasakKhusus && (
                <input type="text" name="masakan_khusus_text" defaultValue={pekerja.masakan_khusus || ''} placeholder="Sebutkan, misal: Diet Khusus, Vegetarian..." className="mt-3 w-full bg-slate-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 text-slate-800" />
              )}
            </div>

            <div className="col-span-12 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <label className="block text-sm font-semibold text-slate-600 mb-3">Kemampuan Bahasa Asing</label>
              <div className="flex flex-wrap gap-3">
                {BAHASA_PRESET.map((lang) => (
                  <label key={lang} className="inline-flex items-center bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 cursor-pointer hover:bg-emerald-50 transition-colors">
                    <input type="checkbox" name="bahasa_asing" value={lang} defaultChecked={pekerja.bahasa_asing?.includes(lang)} className="text-emerald-500 focus:ring-emerald-500 rounded border-slate-300 w-4 h-4" />
                    <span className="ml-2 text-sm font-medium text-slate-700">{lang}</span>
                  </label>
                ))}
                <label className="inline-flex items-center bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 cursor-pointer">
                  <input type="checkbox" checked={bahasaLain} onChange={(e) => setBahasaLain(e.target.checked)} className="text-emerald-500 focus:ring-emerald-500 rounded border-slate-300 w-4 h-4" />
                  <span className="ml-2 text-sm font-medium text-slate-700">Lainnya...</span>
                </label>
              </div>
              {bahasaLain && (
                <input type="text" name="bahasa_lain_text" defaultValue={bahasaLainValue} placeholder="Sebutkan bahasa asing lainnya" className="mt-3 w-1/3 bg-slate-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 text-slate-800" />
              )}
            </div>

            {/* Komponen Keterampilan Modal Baru */}
            <div className="col-span-12 md:col-span-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <label className="block text-sm font-semibold text-slate-600 mb-2">Daftar Keterampilan</label>
              <KeterampilanSelector defaultValue={pekerja.keterampilan} />
            </div>

            <div className="col-span-12 md:col-span-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
              <label className="block text-sm font-semibold text-slate-600 mb-2">Kelebihan / Keahlian Khusus</label>
              <textarea name="keahlian_khusus" rows={3} defaultValue={pekerja.keahlian_khusus || ''} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/20 resize-none flex-1 text-slate-800" placeholder="Ceritakan keahlian unik pekerja..."></textarea>
            </div>

            <div className="col-span-12 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <label className="block text-sm font-semibold text-slate-600 mb-2">Kekurangan Pekerja</label>
              <p className="text-xs text-slate-400 mb-2">Kejujuran penting bagi majikan. Sebutkan jika ada (contoh: mabuk darat, lambat belajar).</p>
              <textarea name="kekurangan" rows={2} defaultValue={pekerja.kekurangan || ''} className="w-full bg-red-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500/20 resize-none text-red-800" placeholder="Pisahkan dengan koma..."></textarea>
            </div>

            <div className="col-span-12 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <label className="block text-sm font-semibold text-slate-600 mb-2">Deskripsi Lengkap / Promosi</label>
              <textarea name="deskripsi" required rows={4} defaultValue={pekerja.deskripsi} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500/20 resize-none text-slate-800" placeholder="Tuliskan biografi singkat dan alasan mengapa majikan harus memilih pekerja ini..."></textarea>
            </div>
          </div>
        </section>

        {/* SECTION 4: MEDIA UPLOAD */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <span className="material-symbols-outlined">cloud_upload</span>
            </div>
            <h3 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-slate-800">Media & Foto</h3>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/3">
              <div className="relative group aspect-[3/4] w-full max-w-xs mx-auto rounded-3xl overflow-hidden bg-slate-50 flex flex-col items-center justify-center border-2 border-dashed border-emerald-300 hover:border-emerald-500 hover:bg-emerald-50 transition-all cursor-pointer">
                {croppedImageFile || imageToCrop ? (
                  <div className="absolute inset-0 bg-emerald-100 flex flex-col items-center justify-center">
                    <span className="material-symbols-outlined text-5xl text-emerald-500 mb-2">check_circle</span>
                    <p className="font-bold text-emerald-700 text-sm">Foto Baru Siap!</p>
                  </div>
                ) : pekerja.fotoUrl ? (
                  <div className="w-full h-full relative">
                    <Image src={pekerja.fotoUrl} alt={pekerja.nama} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-sm font-semibold bg-black/50 px-3 py-1.5 rounded-full">Ganti Foto</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-5xl text-slate-400 group-hover:text-emerald-500 mb-4 transition-colors">add_a_photo</span>
                    <div className="text-center px-6">
                      <p className="text-sm font-bold text-slate-700 mb-1">Unggah Foto Utama</p>
                      <p className="text-xs text-slate-400">Pilih foto, lalu *crop* wajah pekerja. (JPG/PNG)</p>
                    </div>
                  </>
                )}
                <input ref={fileInputRef} type="file" name="fotoUrl" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
              </div>
            </div>

            <div className="w-full md:w-2/3 bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <span className="material-symbols-outlined">verified_user</span>
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-800">Standar Foto Profesional</h5>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    Foto berkualitas tinggi meningkatkan peluang pekerja dipilih klien hingga 80%. Pastikan latar belakang bersih, pencahayaan terang, dan pekerja tersenyum ramah tanpa aksesoris berlebihan di wajah. Jika tidak diperbarui, foto lama akan tetap digunakan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM STICKY ACTION BAR */}
        <div className="sticky bottom-4 z-40 bg-white/90 backdrop-blur-md p-4 rounded-3xl border border-slate-200 shadow-xl flex justify-end items-center gap-6 mt-12">
          <Link href="/admin/dashboard" className="text-slate-500 font-medium hover:text-red-500 transition-colors text-sm">Batal</Link>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}