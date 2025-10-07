// src/components/ImageCropModal.tsx
"use client";

import { useState, useRef } from 'react';
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// Props: fungsi untuk menutup modal dan fungsi untuk mengirim gambar yang sudah di-crop
type ImageCropModalProps = {
  upImg: string | null;
  onClose: () => void;
  onCropComplete: (croppedImage: Blob) => void;
};

export default function ImageCropModal({ upImg, onClose, onCropComplete }: ImageCropModalProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop>();

  // Fungsi untuk membuat crop area awal saat gambar dimuat
  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const initialCrop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        1 / 1, // Rasio aspek 1:1 (kotak)
        width,
        height
      ),
      width,
      height
    );
    setCrop(initialCrop);
  }

  // Fungsi untuk menghasilkan gambar yang sudah di-crop
  const handleCrop = () => {
    if (!completedCrop || !imgRef.current) {
      alert('Silakan pilih area untuk dipotong.');
      return;
    }

    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;

    const ctx = canvas.getContext('2d');
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

    // Ubah canvas menjadi file Blob (mirip dengan File)
    canvas.toBlob((blob) => {
      if (blob) {
        onCropComplete(blob); // Kirim blob kembali ke form
        onClose(); // Tutup modal
      }
    }, 'image/jpeg', 0.95); // Simpan sebagai JPEG dengan kualitas 95%
  };

  if (!upImg) return null;

  return (
    // Latar belakang overlay
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      {/* Konten Modal */}
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">Potong Gambar</h2>
        <div className="max-h-[60vh] overflow-y-auto">
          <ReactCrop
            crop={crop}
            onChange={c => setCrop(c)}
            onComplete={c => setCompletedCrop(c)}
            aspect={1} // Paksa rasio aspek 1:1
          >
            <img ref={imgRef} src={upImg} onLoad={onImageLoad} alt="Crop preview" />
          </ReactCrop>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="px-4 py-2 text-sm font-semibold border border-slate-300 rounded-md hover:bg-slate-100">
            Batal
          </button>
          <button onClick={handleCrop} className="px-4 py-2 text-sm font-semibold bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
            Simpan & Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
}