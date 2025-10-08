// src/app/admin/dashboard/tambah/AddPekerjaForm.tsx
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

  // State modal crop
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [croppedImageFile, setCroppedImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        {/* ... sisa form Anda tidak perlu diubah ... */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nama */}
          <div>
            <label
              htmlFor="nama"
              className="block text-sm font-semibold text-slate-800"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md text-slate-900"
            />
          </div>

          {/* Umur */}
          <div>
            <label
              htmlFor="umur"
              className="block text-sm font-semibold text-slate-800"
            >
              Umur
            </label>
            <input
              type="number"
              id="umur"
              name="umur"
              defaultValue={18}
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md text-slate-900"
            />
          </div>

          {/* Kategori */}
          <div>
            <label
              htmlFor="kategori"
              className="block text-sm font-semibold text-slate-800"
            >
              Kategori
            </label>
            <select
              id="kategori"
              name="kategori"
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md text-slate-900"
            >
              <option value="Baby Sitter">Baby Sitter</option>
              <option value="Perawat Lansia">Perawat Lansia</option>
              <option value="Asisten Rumah Tangga">
                Asisten Rumah Tangga
              </option>
              <option value="Supir">Supir</option>
              <option value="Tukang Kebun">Tukang Kebun</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-semibold text-slate-800"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md text-slate-900"
            >
              <option value="Tersedia">Tersedia</option>
              <option value="Akan Tersedia">Akan Tersedia</option>
            </select>
          </div>

          {/* Pengalaman */}
          <div>
            <label
              htmlFor="pengalaman"
              className="block text-sm font-semibold text-slate-800"
            >
              Pengalaman (Tahun)
            </label>
            <input
              type="number"
              id="pengalaman"
              name="pengalaman"
              required
              defaultValue={0}
              className="mt-1 block w-full px-3 py-2 border rounded-md text-slate-900"
            />
          </div>

          {/* Gaji */}
          <div>
            <label
              htmlFor="gaji"
              className="block text-sm font-semibold text-slate-800"
            >
              Gaji (per bulan)
            </label>
            <input
              type="number"
              id="gaji"
              name="gaji"
              required
              defaultValue={0}
              className="mt-1 block w-full px-3 py-2 border rounded-md text-slate-900"
            />
          </div>

          <SukuInput />

          {/* Kota Asal */}
          <div className="md:col-span-2">
            <label
              htmlFor="lokasi"
              className="block text-sm font-semibold text-slate-800"
            >
              Kota Asal
            </label>
            <input
              type="text"
              id="lokasi"
              name="lokasi"
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md text-slate-900"
            />
          </div>

          {/* Foto */}
          <div className="md:col-span-2">
            <label
              htmlFor="fotoUrl"
              className="block text-sm font-semibold text-slate-800"
            >
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
            {croppedImageFile && (
              <p className="text-xs text-green-600 mt-2">
                ✓ Gambar sudah dipotong. Siap diunggah.
              </p>
            )}
          </div>

          {/* Keterampilan */}
          <div className="md:col-span-2">
            <label
              htmlFor="keterampilan"
              className="block text-sm font-semibold text-slate-800"
            >
              Keterampilan
            </label>
            <p className="text-xs text-slate-500 mb-1">
              Pisahkan setiap keterampilan dengan koma
            </p>
            <textarea
              id="keterampilan"
              name="keterampilan"
              rows={3}
              className="mt-1 block w-full px-3 py-2 border rounded-md text-slate-900"
            ></textarea>
          </div>

          {/* Deskripsi */}
          <div className="md:col-span-2">
            <label
              htmlFor="deskripsi"
              className="block text-sm font-semibold text-slate-800"
            >
              Deskripsi
            </label>
            <textarea
              id="deskripsi"
              name="deskripsi"
              rows={4}
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md text-slate-900"
            ></textarea>
          </div>
        </div>

        {/* Tombol Submit */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t">
          <SubmitButton />
        </div>
      </form>
    </>
  );
}