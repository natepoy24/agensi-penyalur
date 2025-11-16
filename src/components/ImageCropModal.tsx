// src/components/ImageCropModal.tsx
"use client";

import { useRef, useState } from "react";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { removeBackground } from "@imgly/background-removal";

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
  
  // DITAMBAHKAN: State untuk mengontrol opsi remove background
  const [shouldRemoveBg, setShouldRemoveBg] = useState(true);

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
    setStatus("1/3: Memotong gambar...");

    const croppedBlob = await getCroppedBlob(imgRef.current, completedCrop);
    if (!croppedBlob) {
        setProcessing(false);
        return;
    }
    setProgress(33);

    let blobToMerge = croppedBlob; // Secara default, gunakan gambar hasil crop

    // DIUBAH: Logika kondisional untuk remove background
    if (shouldRemoveBg) {
      setStatus("2/3: Menghapus latar belakang...");
      try {
        blobToMerge = await removeBackground(croppedBlob, {
          progress: (progValue, currentStep) => {
            const currentProgress = 33 + Math.round(Number(progValue) * 33);
            setProgress(currentProgress);
            setStatus(`2/3: Menghapus latar belakang... (${currentStep})`);
          },
        });
      } catch (err) {
        console.error("Gagal hapus background:", err);
        alert("Terjadi kesalahan saat menghapus latar belakang. Pastikan gambar jelas.");
        setProcessing(false);
        return;
      }
    } else {
      // Jika tidak, lewati langkah remove background
      setStatus("2/3: Melewati penghapusan latar...");
    }
    
    setProgress(66);
    setStatus("3/3: Menempelkan ke template...");
    
    const finalFile = await mergeWithTemplate(blobToMerge);
    setStatus("✓ Gambar sudah siap diunggah.");
    setProgress(100);
    
    onComplete(finalFile);
    onClose();
  }

  // Fungsi helper untuk mendapatkan hasil crop sebagai Blob
  function getCroppedBlob(image: HTMLImageElement, crop: Crop): Promise<Blob | null> {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;
    const ctx = canvas.getContext("2d");
    if (!ctx) return Promise.resolve(null);

    ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, canvas.width, canvas.height);
    
    return new Promise((resolve) => {
      // DIUBAH: Simpan sebagai PNG untuk menjaga transparansi jika ada
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/png"); 
    });
  }

  // Fungsi helper untuk menggabungkan dengan template
  async function mergeWithTemplate(foregroundBlob: Blob): Promise<File> {
    const template = await loadImage("/Image/templatebg.png"); // Asumsi template 500x500px
    const foreground = await createImageBitmap(foregroundBlob);
    const canvas = document.createElement("canvas");
    canvas.width = template.width;   // 500px
    canvas.height = template.height; // 500px
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Gagal membuat context.");

    ctx.drawImage(template, 0, 0, template.width, template.height);

    const targetWidth = template.width * 0.6;
    const targetHeight = (foreground.height / foreground.width) * targetWidth;
    const x = (template.width - targetWidth) / 2;
    
    // DIUBAH: Kalkulasi posisi Y baru agar bagian bawah gambar berada di 454.7px
    // y adalah koordinat pojok KIRI ATAS gambar, jadi kita hitung dari bawah.
    const y = 454.7 - targetHeight;

    ctx.drawImage(foreground, x, y, targetWidth, targetHeight);

    return new Promise((resolve) => {
      canvas.toBlob((finalBlob) => {
        if (!finalBlob) return;
        const file = new File([finalBlob], "processed-image.webp", { type: "image/webp" });
        resolve(file);
      }, "image/webp", 0.9);
    });
  }

  return (
    upImg && (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-6 max-w-lg w-full">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Siapkan Foto Pekerja</h2>

          <div className="max-h-[60vh] overflow-y-auto mb-4">
            <ReactCrop crop={crop} onChange={setCrop} onComplete={setCompletedCrop} aspect={1}>
              <img ref={imgRef} src={upImg} onLoad={onImageLoad} alt="Preview" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                ref={imgRef} 
                src={upImg} 
                onLoad={onImageLoad} 
                alt="Preview" 
              />
            </ReactCrop>
          </div>

          {/* DITAMBAHKAN: Checkbox untuk opsi remove background */}
          <div className="flex items-center mb-4 select-none">
            <input
              id="removeBgCheckbox"
              type="checkbox"
              checked={shouldRemoveBg}
              onChange={(e) => setShouldRemoveBg(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
            <label htmlFor="removeBgCheckbox" className="ml-2 block text-sm text-gray-900 cursor-pointer">
              Hapus Latar Belakang (centang jika foto punya background)
            </label>
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

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}