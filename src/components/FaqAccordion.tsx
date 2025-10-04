// src/components/FaqAccordion.tsx
"use client";

import { useState } from "react";
import { PlusCircle, MinusCircle } from "lucide-react";

// Definisikan tipe data untuk satu item FAQ
type FaqItemData = {
  q: string;
  a: string;
};

// Data untuk FAQ, sekarang menggunakan tipe yang sudah kita definisikan
const faqData: FaqItemData[] = [
  { 
    q: "Bagaimana proses seleksi pekerja di Jasa mandiri?", 
    a: "Setiap calon pekerja kami melalui proses seleksi yang sangat ketat, meliputi verifikasi identitas (KTP, KK), wawancara mendalam, uji kompetensi(kecuali ART), serta pengecekan latar belakang untuk memastikan mereka dapat dipercaya." 
  },
  { 
    q: "Berapa lama waktu yang dibutuhkan untuk mendapatkan pekerja?", 
    a: "Jika anda memilih pekerja dengan kategori tersedia yang ada di list kami, anda dapat mendapatkan pekerja dalam waktu singkat, anda memesan hari ini, kami bisa antarkan langsung ke tempat anda. Namun jika tidak ada kandidat kami yang cocok, kami akan berusaha menyediakan calon yang cocok dalam waktu 1-7 hari kerja setelah kriteria kami terima secara lengkap, tergantung pada ketersediaan kandidat." 
  },
  { 
    q: "Apa yang terjadi jika saya tidak cocok dengan pekerja?", 
    a: "Kami memberikan garansi penggantian pekerja. Tergantung sistem yang Anda pilih, Anda memiliki hak penggantian beberapa kali dalam periode garansi. Kami akan membantu mencarikan kandidat baru." 
  },
];

// Definisikan tipe data untuk props komponen FaqItem
type FaqItemComponentProps = {
  item: FaqItemData;
  isOpen: boolean;
  onClick: () => void;
};

// Komponen untuk satu item pertanyaan/jawaban
const FaqItem = ({ item, isOpen, onClick }: FaqItemComponentProps) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden">
    <button 
      onClick={onClick} 
      className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
      aria-expanded={isOpen}
    >
      <span className="font-semibold text-lg text-gray-800">{item.q}</span>
      {isOpen ? 
        <MinusCircle className="h-6 w-6 text-blue-500 flex-shrink-0" /> : 
        <PlusCircle className="h-6 w-6 text-blue-500 flex-shrink-0" />
      }
    </button>
    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
      <p className="p-6 pt-0 text-gray-600">{item.a}</p>
    </div>
  </div>
);

// Komponen utama Accordion
export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    // Jika item yang sama diklik lagi, tutup. Jika item lain, buka.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-20 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-gray-800">Pertanyaan Umum (FAQ)</h3>
        <p className="mt-4 text-lg text-gray-600">Jawaban atas pertanyaan yang paling sering diajukan.</p>
      </div>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <FaqItem 
            key={index}
            item={item}
            isOpen={openIndex === index}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </section>
  );
}