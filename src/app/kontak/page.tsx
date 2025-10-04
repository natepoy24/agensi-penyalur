// src/app/kontak/page.tsx
"use client";

import { useState } from 'react';
import { Clock, Mail, MapPin, Phone } from 'lucide-react'; // Impor ikon Clock

export default function KontakPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Data Formulir yang Terkirim:", formData);
    alert('Fungsionalitas kirim email akan dibuat nanti.');
  };

  return (
    <main>
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          {/* Judul Halaman */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-800">
              Hubungi Kami
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Kami siap membantu Anda. Silakan hubungi kami melalui informasi di bawah atau kirimkan pesan melalui formulir.
            </p>
          </div>

          {/* Grid: Info Kontak & Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            
            {/* --- Kolom Kiri: Informasi Kontak (Diperbarui) --- */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <MapPin className="w-8 h-8 text-blue-600" /> Alamat Kantor
                </h3>
                <p className="mt-2 text-slate-600">Jl Gunung Balong III No 78 Lebak Bulus Cilandak Jak-Sel 12440</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <Mail className="w-8 h-8 text-blue-600" /> Email
                </h3>
                <a href="mailto:info@penyalurkerja.com" className="mt-2 text-slate-600 hover:text-blue-600">{`info@penyalurkerja.com`}</a>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <Phone className="w-8 h-8 text-blue-600" /> Telepon
                </h3>
                <p className="mt-2 text-slate-600">Call / Whatsapp: <a href="https://api.whatsapp.com/send?phone=6282122415552" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">0821-2241-5552</a></p>
                <p className="mt-1 text-slate-600">Call / Whatsapp: <a href="https://api.whatsapp.com/send?phone=6281323337872" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">0813-2333-7872</a></p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <Clock className="w-8 h-8 text-blue-600" /> Jam Operasional
                </h3>
                <p className="mt-2 text-slate-600">Senin - Minggu, 07:00 - 22:00</p>
              </div>
            </div>

            {/* Kolom Kanan: Formulir Kontak */}
            <div className="bg-slate-50 p-8 rounded-lg border">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700">Nama Lengkap</label>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-900" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">Alamat Email</label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-900" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700">Pesan Anda</label>
                  <textarea id="message" name="message" rows={5} required value={formData.message} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-900"></textarea>
                </div>
                <div>
                  <button type="submit" className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors">
                    Kirim Pesan
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* --- Bagian Peta (Baru) --- */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Lokasi Kami</h2>
            <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.687293502949!2d106.78843769999999!3d-6.304753400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69efd022e06d2b%3A0xfc3df798e49f58fb!2sJasa%20ART!5e0!3m2!1sid!2sid!4v1759607438399!5m2!1sid!2sid"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}