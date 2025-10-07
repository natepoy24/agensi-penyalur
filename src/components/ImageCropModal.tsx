"use client";

import { useRef, useState } from "react";
import ReactCrop, { Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

type ImageCropModalProps = {
  upImg: string | null;
  onClose: () => void;
  onComplete: (file: File) => void;
};

export default function ImageCropModal({ upImg, onClose, onComplete }: ImageCropModalProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop>();
  const [status, setStatus] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [processing, setProcessing] = useState(false);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const initialCrop = centerCrop(
      makeAspectCrop({ unit: "%", width: 90 }, 1 / 1, width, height),
      width,
      height
    );
    setCrop(initialCrop);
  }

  async function handleCrop() {
    if (!completedCrop || !imgRef.current) {
      alert("Silakan pilih area untuk dipotong terlebih dahulu.");
      return;
    }

    setProcessing(true);
    setStatus("Memotong gambar...");
    setProgress(10);

    const image = imgRef.current;
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      setStatus("Menghapus latar belakang di server...");
      setProgress(40);

      try {
        const formData = new FormData();
        formData.append("file", blob);

        const res = await fetch("/api/remove-bg", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Gagal memproses gambar di server");

        const resultBlob = await res.blob();
        setProgress(90);
        setStatus("Menyiapkan hasil akhir...");

        // Buat file hasil akhir
        const finalFile = new File([resultBlob], "processed-image.webp", {
          type: "image/webp",
        });

        // Isi otomatis ke input file di form
        const inputEl = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (inputEl) {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(finalFile);
          inputEl.files = dataTransfer.files;
        }

        setProgress(100);
        setStatus("✓ Gambar sudah dipotong & siap diunggah.");
        onComplete(finalFile);
        onClose();
      } catch (err) {
        console.error(err);
        setStatus("Terjadi kesalahan saat memproses gambar.");
      } finally {
        setProcessing(false);
      }
    }, "image/jpeg", 0.95);
  }

  return (
    upImg && (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-6 max-w-lg w-full">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Potong & Hapus Latar</h2>

          <div className="max-h-[60vh] overflow-y-auto mb-4">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
            >
              <img ref={imgRef} src={upImg} onLoad={onImageLoad} alt="Preview" />
            </ReactCrop>
          </div>

          {processing && (
            <div className="mb-3 text-sm text-slate-700 flex flex-col items-center">
              <div className="w-full bg-slate-200 rounded-full h-2 mb-2 overflow-hidden">
                <div
                  className="bg-emerald-500 h-2 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span>{status}</span>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={onClose}
              disabled={processing}
              className="px-4 py-2 text-sm font-semibold border border-slate-300 rounded-md hover:bg-slate-100"
            >
              Batal
            </button>
            <button
              onClick={handleCrop}
              disabled={processing}
              className="px-4 py-2 text-sm font-semibold bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-60"
            >
              {processing ? "Memproses..." : "Simpan & Lanjutkan"}
            </button>
          </div>
        </div>
      </div>
    )
  );
}
