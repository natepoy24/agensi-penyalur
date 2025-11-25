"use client";

import { useActionState, useEffect, useState, useRef } from "react";
import { useFormStatus } from "react-dom";
import { addPekerja } from "@/app/actions";
import toast from "react-hot-toast";
import SukuInput from "@/components/SukuInput";
import ImageCropModal from "@/components/ImageCropModal";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-2 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-700 disabled:bg-slate-400"
    >
      {pending ? "Menyimpan..." : "Simpan Pekerja"}
    </button>
  );
}

export default function AddPekerjaForm() {
  const initialState = { error: undefined, success: undefined };
  const [state, formAction] = useActionState(addPekerja, initialState);

  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [croppedImageFile, setCroppedImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [bahasaLain, setBahasaLain] = useState(false);
  const [bisaMasakKhusus, setBisaMasakKhusus] = useState(false);

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
    <>
      {imageToCrop && (
        <ImageCropModal
          upImg={imageToCrop}
          onClose={() => setImageToCrop(null)}
          onComplete={handleCropComplete}
        />
      )}

      <form
        action={handleFormSubmit}
        className="space-y-6 bg-white p-8 rounded-lg shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nama */}
          <div>
            <label htmlFor="nama" className="block text-sm font-semibold text-slate-800">
              Nama Lengkap
            </label>
            <input type="text" id="nama" name="nama" required className="mt-1 block w-full px-3 py-2 border rounded-md text-slate-900" />
          </div>

          {/* Umur */}
          <div>
            <label htmlFor="umur" className="block text-sm font-semibold text-slate-800">
              Umur
            </label>
            <input type="number" id="umur" name="umur" defaultValue={18} required className="mt-1 block w-full px-3 py-2 border rounded-md text-slate-900" />
          </div>

          {/* Kategori */}
          <div>
            <label htmlFor="kategori" className="block text-sm font-semibold text-slate-800">
              Kategori
            </label>
            <select id="kategori" name="kategori" required className="mt-1 block w-full px-3 py-2 border rounded-md text-slate-900">
              <option value="Baby Sitter">Baby Sitter</option>
              <option value="Perawat Lansia">Perawat Lansia</option>
              <option value="Asisten Rumah Tangga">Asisten Rumah Tangga</option>
              <option value="Supir">Supir</option>
              <option value="Tukang Kebun">Tukang Kebun</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-semibold text-slate-800">
              Status
            </label>
            <select id="status" name="status" required className="mt-1 block w-full px-3 py-2 border rounded-md text-slate-900">
              <option value="Tersedia">Tersedia</option>
              <option value="Akan Tersedia">Akan Tersedia</option>
            </select>
          </div>

          {/* Pengalaman */}
          <div>
            <label htmlFor="pengalaman" className="block text-sm font-semibold text-slate-800">
              Pengalaman (Tahun)
            </label>
            <input type="number" id="pengalaman" name="pengalaman" required defaultValue={0} className="mt-1 block w-full px-3 py-2 border rounded-md text-slate-900" />
          </div>

          {/* Gaji */}
          <div>
            <label htmlFor="gaji" className="block text-sm font-semibold text-slate-800">
              Gaji (per bulan)
            </label>
            <input type="number" id="gaji" name="gaji" required defaultValue={0} className="mt-1 block w-full px-3 py-2 border rounded-md text-slate-900" />
          </div>

          <SukuInput />

          {/* Kota Asal */}
          <div className="md:col-span-2">
            <label htmlFor="lokasi" className="block text-sm font-semibold text-slate-800">
              Kota Asal
            </label>
            <input type="text" id="lokasi" name="lokasi" required className="mt-1 block w-full px-3 py-2 border rounded-md text-slate-900" />
          </div>

          {/* Foto */}
          <div className="md:col-span-2">
            <label htmlFor="fotoUrl" className="block text-sm font-semibold text-slate-800">
              Foto Pekerja
            </label>
            <input
              ref={fileInputRef}
              type="file"
              id="fotoUrl"
              name="fotoUrl"
              required={!croppedImageFile}
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
              className="mt-1 block w-full cursor-pointer rounded-lg border border-slate-300 text-sm text-slate-500 file:mr-4 file:border-0 file:bg-emerald-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-700"
            />
            {croppedImageFile && <p className="text-xs text-green-600 mt-2">✓ Gambar sudah dipotong. Siap diunggah.</p>}
          </div>

          {/* Status Perkawinan & Agama */}
          <div>
            <label htmlFor="status_perkawinan" className="block text-sm font-semibold text-slate-800">
              Status Perkawinan
            </label>
            <select id="status_perkawinan" name="status_perkawinan" required className="mt-1 block w-full border rounded-md text-slate-900">
              <option value="Belum Menikah">Belum Menikah</option>
              <option value="Nikah">Nikah</option>
              <option value="Janda">Janda</option>
              <option value="Duda">Duda</option>
            </select>
          </div>

          <div>
            <label htmlFor="agama" className="block text-sm font-semibold text-slate-800">
              Agama
            </label>
            <select id="agama" name="agama" required className="mt-1 block w-full border rounded-md text-slate-900">
              <option value="Islam">Islam</option>
              <option value="Protestan">Protestan</option>
              <option value="Katolik">Katolik</option>
              <option value="Hindu">Hindu</option>
              <option value="Buddha">Buddha</option>
              <option value="Konghucu">Konghucu</option>
            </select>
          </div>

          {/* Bisa Bawa Motor */}
          <div>
            <label className="block text-sm font-semibold text-slate-800">Bisa Bawa Motor?</label>
            <div className="mt-2 flex gap-6">
              <label><input type="radio" name="bisa_bawa_motor" value="true" className="mr-1"/> Ya</label>
              <label><input type="radio" name="bisa_bawa_motor" value="false" defaultChecked className="mr-1"/> Tidak</label>
            </div>
          </div>

          {/* Takut Anjing */}
          <div>
            <label className="block text-sm font-semibold text-slate-800">Takut Anjing?</label>
            <div className="mt-2 flex gap-4">
              <label><input type="radio" name="takut_anjing" value="true" className="mr-1"/> Ya</label>
              <label><input type="radio" name="takut_anjing" value="false" defaultChecked className="mr-1"/> Tidak</label>
            </div>
          </div>

          {/* Bisa Masak Babi */}
          <div>
            <label className="block text-sm font-semibold text-slate-800">Bisa Masak Babi?</label>
            <div className="mt-2 flex gap-4">
              <label><input type="radio" name="bisa_masak_babi" value="true" className="mr-1"/> Ya</label>
              <label><input type="radio" name="bisa_masak_babi" value="false" defaultChecked className="mr-1"/> Tidak</label>
            </div>
          </div>

          {/* Masakan Khusus */}
          <div>
            <label className="block text-sm font-semibold text-slate-800">Bisa Masak Makanan Khusus?</label>
            <div className="mt-2 flex gap-4">
              <label><input type="radio" name="masakan_khusus_radio" value="true" onChange={() => setBisaMasakKhusus(true)} checked={bisaMasakKhusus} className="mr-1"/> Ya</label>
              <label><input type="radio" name="masakan_khusus_radio" value="false" onChange={() => setBisaMasakKhusus(false)} checked={!bisaMasakKhusus} className="mr-1"/> Tidak</label>
            </div>
            {bisaMasakKhusus && (
              <input type="text" name="masakan_khusus_text" placeholder="Sebutkan masakan khusus" className="mt-2 block w-full border rounded-md text-slate-900 px-3 py-2"/>
            )}
          </div>

          {/* Keahlian Khusus */}
          <div className="md:col-span-2">
            <label htmlFor="keahlian_khusus" className="block text-sm font-semibold text-slate-900">
              Keahlian Khusus
            </label>
            <textarea id="keahlian_khusus" name="keahlian_khusus" rows={3} className="mt-1 block w-full border rounded-md text-slate-900 px-3 py-2"></textarea>
          </div>


          {/* Bahasa Asing */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-800">Bisa Bahasa Asing</label>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
              <label><input type="checkbox" name="bahasa_asing" value="Inggris" className="mr-1" /> Inggris</label>
              <label><input type="checkbox" name="bahasa_asing" value="Kanton" className="mr-1" /> Kanton</label>
              <label><input type="checkbox" name="bahasa_asing" value="Mandarin" className="mr-1" /> Mandarin</label>
              <label><input type="checkbox" name="bahasa_asing" value="Arab" className="mr-1" /> Arab</label>
              <label><input type="checkbox" name="bahasa_asing" value="Korea" className="mr-1" /> Korea</label>
              <label><input type="checkbox" name="bahasa_lain_checkbox" onChange={(e) => setBahasaLain(e.target.checked)} className="mr-1" /> Lainnya...</label>
            </div>
            {bahasaLain && (
              <input type="text" name="bahasa_lain_text" placeholder="Sebutkan bahasa lain" className="mt-2 block w-full border rounded-md text-slate-900" />
            )}
          </div>

          {/* Keterampilan */}
          <div className="md:col-span-2">
            <label htmlFor="keterampilan" className="block text-sm font-semibold text-slate-800">
              Keterampilan
            </label>
            <p className="text-xs text-slate-500 mb-1">Pisahkan dengan koma</p>
            <textarea id="keterampilan" name="keterampilan" rows={3} className="mt-1 block w-full px-3 py-2 border rounded-md text-slate-900"></textarea>
          </div>

          {/* Kekurangan */}
          <div className="md:col-span-2">
            <label htmlFor="kekurangan" className="block text-sm font-semibold text-slate-800">Kekurangan</label>
            <p className="text-xs text-slate-500 mb-1">Pisahkan dengan koma</p>
            <textarea id="kekurangan" name="kekurangan" rows={3} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900"></textarea>
          </div>

          {/* Deskripsi */}
          <div className="md:col-span-2">
            <label htmlFor="deskripsi" className="block text-sm font-semibold text-slate-800">
              Deskripsi
            </label>
            <textarea id="deskripsi" name="deskripsi" rows={4} required className="mt-1 block w-full px-3 py-2 border rounded-md text-slate-900"></textarea>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-4 border-t">
          <SubmitButton />
        </div>
      </form>
    </>
  );
}
