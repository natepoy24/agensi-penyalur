// src/components/ImageLightbox.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';

type ImageLightboxProps = {
  src: string;
  alt: string;
};

export default function ImageLightbox({ src, alt }: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!src) return null;

  return (
    <>
      {/* Gambar kecil yang bisa diklik */}
      <div 
        className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      {/* Modal/Lightbox yang muncul saat gambar diklik */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <Image
              src={src}
              alt={alt}
              width={1200}
              height={800}
              className="w-auto h-auto max-w-full max-h-[90vh] rounded-lg object-contain"
            />
            <button 
              className="absolute -top-2 -right-2 text-white bg-slate-800 rounded-full p-1"
              aria-label="Tutup gambar"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}