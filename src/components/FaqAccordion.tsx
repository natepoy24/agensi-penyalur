// src/components/FaqAccordion.tsx
"use client";

import { useState } from "react";
import { PlusCircle, MinusCircle } from "lucide-react";

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
  <div className="bg-white rounded-xl shadow-md overflow-hidden">
    <button 
      onClick={onClick} 
      className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
      aria-expanded={isOpen}
    >
      <span className="font-semibold text-lg text-gray-800">{item.question}</span>
      {isOpen ? 
        <MinusCircle className="h-6 w-6 text-blue-500 flex-shrink-0" /> : 
        <PlusCircle className="h-6 w-6 text-blue-500 flex-shrink-0" />
      }
    </button>
    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
      <p className="p-6 pt-0 text-gray-600">{item.answer}</p>
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