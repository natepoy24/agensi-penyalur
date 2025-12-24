'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface FloatingWhatsAppProps {
  phoneNumber: string;
  message?: string;
}

export default function FloatingWhatsApp({ 
  phoneNumber, 
  message = "Halo, saya tertarik dengan layanan PT Jasa Mandiri Agency." 
}: FloatingWhatsAppProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Efek delay agar bubble muncul setelah halaman dimuat (lebih smooth)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Membersihkan nomor telepon dan memastikan format internasional (62)
  // Contoh: 0812... menjadi 62812...
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const formattedPhone = cleanPhone.startsWith('0') 
    ? '62' + cleanPhone.slice(1) 
    : cleanPhone;

  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* CTA Bubble */}
      {isVisible && (
        // hidden md:block -> Sembunyikan bubble di mobile, tampilkan di desktop
        <div className="hidden md:block relative bg-white p-4 rounded-xl shadow-xl border border-slate-100 max-w-[250px] animate-fade-in-up">
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute -top-2 -left-2 bg-slate-200 text-slate-600 rounded-full p-1 hover:bg-red-100 hover:text-red-500 transition-colors"
            aria-label="Tutup"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
          </button>
          <p className="text-sm font-bold text-slate-800 mb-1">Butuh pekerja cepat?</p>
          <p className="text-xs text-slate-500 leading-relaxed">Konsultasi gratis sekarang! Kami siap membantu anda menemukan pekerja yang tepat.</p>
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45 border-r border-b border-slate-100"></div>
        </div>
      )}

      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
        aria-label="Hubungi kami via WhatsApp"
        title="Chat WhatsApp"
      >
        {/* Ikon WhatsApp SVG */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </Link>
    </div>
  );
}