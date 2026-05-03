// src/components/FaqAccordion.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

// Definisikan tipe data untuk satu item FAQ
export type FaqItemData = {
  question: string;
  answer: string;
};

// Definisikan tipe data untuk props komponen FaqItem
type FaqItemComponentProps = {
  item: FaqItemData;
  isOpen: boolean;
  onClick: () => void;
};

// Komponen untuk satu item pertanyaan/jawaban
const FaqItem = ({ item, isOpen, onClick }: FaqItemComponentProps) => (
  <div 
    className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
      isOpen 
        ? "border-emerald-500/50 shadow-lg shadow-emerald-500/5" 
        : "border-slate-200 shadow-sm hover:border-emerald-300 hover:shadow-md"
    }`}
  >
    <button 
      onClick={onClick} 
      className="w-full text-left p-6 flex justify-between items-center focus:outline-none group"
      aria-expanded={isOpen}
    >
      <span className={`font-semibold text-lg transition-colors duration-300 pr-8 ${isOpen ? "text-emerald-700" : "text-slate-800 group-hover:text-emerald-600"}`}>
        {item.question}
      </span>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-emerald-100 text-emerald-600" : "bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500"}`}>
        <ChevronDown 
          className={`h-5 w-5 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} 
        />
      </div>
    </button>
    <div 
      className={`grid transition-all duration-500 ease-in-out ${
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">
        <p className="p-6 pt-0 text-slate-600 leading-relaxed bg-white">
          {item.answer}
        </p>
      </div>
    </div>
  </div>
);

// Komponen utama Accordion
export default function FaqAccordion({ faqData }: { faqData: FaqItemData[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    // Jika item yang sama diklik lagi, tutup. Jika item lain, buka.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-20 max-w-4xl mx-auto px-4">
      <div className="text-center mb-12">
        <span className="text-emerald-600 font-semibold tracking-wider text-sm uppercase mb-2 block">Pusat Bantuan</span>
        <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Pertanyaan Umum (FAQ)</h3>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">Kami mengumpulkan pertanyaan yang sering ditanyakan untuk membantu Anda memahami layanan kami lebih baik.</p>
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