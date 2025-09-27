// src/app/kontak/page.tsx
"use client";

import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

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
    alert('Pesan Anda sudah kami terima, mohon tunggu balasan dari kami');
  };

  return (
    <main>
      <div className="bg-white pt-32 pb-20 px-4">
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
            
            {/* Kolom Kiri: Informasi Kontak */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <MapPin className="w-8 h-8 text-emerald-600" /> Alamat Kantor
                </h3>
                <p className="mt-2 text-slate-600">Jl. Jenderal Sudirman Kav. 52-53, Jakarta Selatan, Indonesia</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <Mail className="w-8 h-8 text-emerald-600" /> Email
                </h3>
                <p className="mt-2 text-slate-600">info@apsa.com</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <Phone className="w-8 h-8 text-emerald-600" /> Telepon
                </h3>
                <p className="mt-2 text-slate-600">(021) 123-4567</p>
              </div>
            </div>

            {/* Kolom Kanan: Formulir Kontak */}
            <div className="bg-slate-50 p-8 rounded-lg border">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700">Nama Lengkap</label>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-slate-900" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">Alamat Email</label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-slate-900" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700">Pesan Anda</label>
                  <textarea id="message" name="message" rows={5} required value={formData.message} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-slate-900"></textarea>
                </div>
                <div>
                  <button type="submit" className="w-full py-3 px-4 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-700 transition-colors">
                    Kirim Pesan
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}