"use client";

import FaqAccordion from '@/components/FaqAccordion';
import { useState } from 'react';
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Bagaimana cara menghubungi Jasa Mandiri?",
    answer: "Anda bisa menghubungi kami melalui WhatsApp di nomor 0821-2241-5552 atau 0813-2333-7872. Anda juga bisa datang langsung ke kantor kami sesuai alamat yang tertera.",
  },
  {
    question: "Apa jam operasional kantor?",
    answer: "Kantor kami buka setiap hari, Senin hingga Minggu, dari pukul 07:00 hingga 22:00 WIB.",
  },
];

export default function KontakContent() {
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
    <>
      {/* Grid: Info Kontak & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-24">
        
        {/* --- Kolom Kiri: Informasi Kontak (Diperbarui) --- */}
        <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 md:p-12 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 space-y-10">
            <div className="flex items-start gap-6">
              <div className="bg-emerald-500/20 p-4 rounded-2xl shrink-0">
                <MapPin className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Alamat Kantor</h3>
                <p className="text-slate-300 leading-relaxed font-light">Jl Gunung Balong III No 78<br/>Lebak Bulus, Cilandak<br/>Jakarta Selatan 12440</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="bg-blue-500/20 p-4 rounded-2xl shrink-0">
                <Mail className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                <a href="mailto:info@penyalurkerja.com" className="text-slate-300 hover:text-blue-400 transition-colors font-light">info@penyalurkerja.com</a>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="bg-emerald-500/20 p-4 rounded-2xl shrink-0">
                <Phone className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Telepon / WhatsApp</h3>
                <div className="space-y-2">
                  <p className="text-slate-300 font-light">
                    <a href="https://api.whatsapp.com/send?phone=6282122415552" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">0821-2241-5552</a>
                  </p>
                  <p className="text-slate-300 font-light">
                    <a href="https://api.whatsapp.com/send?phone=6281323337872" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">0813-2333-7872</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="bg-purple-500/20 p-4 rounded-2xl shrink-0">
                <Clock className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Jam Operasional</h3>
                <p className="text-slate-300 font-light">Senin - Minggu<br/>07:00 - 22:00 WIB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Formulir Kontak */}
        <div className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100 relative">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-800 mb-2">Kirim Pesan</h2>
            <p className="text-slate-500 font-light">Isi formulir di bawah ini dan tim kami akan segera menghubungi Anda.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
              <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-slate-900 transition-all font-medium" placeholder="Masukkan nama Anda" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">Alamat Email</label>
              <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-slate-900 transition-all font-medium" placeholder="nama@email.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-2">Pesan Anda</label>
              <textarea id="message" name="message" rows={5} required value={formData.message} onChange={handleChange} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 text-slate-900 transition-all font-medium resize-none" placeholder="Bagaimana kami bisa membantu Anda?"></textarea>
            </div>
            <div className="pt-2">
              <button type="submit" className="w-full py-4 px-6 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 transition-all duration-300 flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                Kirim Pesan
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* --- Bagian Peta (Baru) --- */}
      <div className="mb-24">
        <h2 className="text-3xl font-black text-slate-800 text-center mb-8">Lokasi Kami</h2>
        <div className="w-full aspect-[21/9] min-h-[400px] rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 bg-slate-100">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.687293502949!2d106.78843769999999!3d-6.304753400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69efd022e06d2b%3A0xfc3df798e49f58fb!2sJasa%20ART!5e0!3m2!1sid!2sid!4v1759607438399!5m2!1sid!2sid"
            width="100%" 
            height="100%" 
            title="Peta Lokasi Kantor Jasa Mandiri Agency"
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale-[20%] contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
          ></iframe>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto">
        <FaqAccordion faqData={faqData} />
      </div>
    </>
  );
}