// src/components/ImageCropModal.tsx
"use client";

import { useRef, useState } from "react";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
// DITAMBAHKAN: Impor tipe SupabaseClient
import { type SupabaseClient } from "@supabase/supabase-js";

type ImageCropModalProps = {
  upImg: string | null;
  onClose: () => void;
  onComplete: (file: File) => void;
  // DIUBAH: Gunakan tipe SupabaseClient yang spesifik, bukan 'any'
  supabase: SupabaseClient; 
};

// Fungsi helper untuk mengubah Blob menjadi Base64
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export default function ImageCropModal({ upImg, onClose, onComplete, supabase }: ImageCropModalProps) {
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

  async function handleProcessImage() {
    if (!completedCrop || !imgRef.current) {
      alert("Silakan pilih area untuk dipotong.");
      return;
    }

    setProcessing(true);
    setProgress(0);
    setStatus("1/2: Memotong gambar...");

    const croppedBlob = await getCroppedBlob(imgRef.current, completedCrop);
    if (!croppedBlob) {
        setProcessing(false);
        return;
    }
    setProgress(50);
    setStatus("2/2: Memproses gambar di server...");

    // DIUBAH: Blok try...catch yang lebih type-safe
    try {
        const base64Image = await blobToBase64(croppedBlob);
        const { data: finalImageBlob, error } = await supabase.functions.invoke(
            'process-worker-image',
            { body: { image: base64Image } }
        );

        if (error) {
            throw new Error(error.message);
        }

        const finalFile = new File([finalImageBlob], "processed-image.webp", { type: "image/webp" });
        setStatus("✓ Gambar sudah siap diunggah.");
        setProgress(100);

        onComplete(finalFile);
        onClose();

    } catch (err) { // Tangkap sebagai 'unknown'
        let errorMessage = "Terjadi kesalahan yang tidak diketahui.";
        // Lakukan pengecekan tipe sebelum mengakses properti
        if (err instanceof Error) {
            errorMessage = "Terjadi kesalahan saat memproses gambar di server: " + err.message;
            console.error("Gagal memproses gambar di server:", err);
        } else {
            console.error("Error tidak terduga:", err);
        }
        
        alert(errorMessage);
        setStatus("Gagal memproses gambar.");
        setProgress(0);
    } finally {
        setProcessing(false);
    }
  }

  function getCroppedBlob(image: HTMLImageElement, crop: Crop): Promise<Blob | null> {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const outputWidth = 800;
    const outputHeight = 800;
    canvas.width = outputWidth;
    canvas.height = outputHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return Promise.resolve(null);

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;
    const cropWidth = crop.width * scaleX;
    const cropHeight = crop.height * scaleY;
    
    ctx.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, outputWidth, outputHeight);
    
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/png", 1);
    });
  }

  return (
    upImg && (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
        {/* ... sisa JSX Anda tidak berubah ... */}
        <div className="bg-white rounded-xl shadow-xl p-6 max-w-lg w-full">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Potong & Siapkan Foto</h2>
          <div className="max-h-[60vh] overflow-y-auto mb-4 bg-slate-100 p-2 rounded-md">
            <ReactCrop crop={crop} onChange={setCrop} onComplete={setCompletedCrop} aspect={1}>
              <img ref={imgRef} src={upImg} onLoad={onImageLoad} alt="Preview" style={{ maxHeight: '60vh' }}/>
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
            <button onClick={onClose} disabled={processing} className="px-4 py-2 text-sm font-semibold border rounded-md hover:bg-slate-100 disabled:opacity-60">
              Batal
            </button>
            <button onClick={handleProcessImage} disabled={processing} className="px-4 py-2 text-sm font-semibold bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-60">
              {processing ? "Memproses..." : "Simpan & Lanjutkan"}
            </button>
          </div>
        </div>
      </div>
    )
  );
}