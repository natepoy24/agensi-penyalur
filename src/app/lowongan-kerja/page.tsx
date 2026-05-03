// src/app/lowongan-kerja/page.tsx
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqAccordion from '@/components/FaqAccordion';
import { CheckCircle, User, Briefcase, BookOpen, Heart, Soup, Home, Phone, MapPin, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "Lowongan Kerja ART, Babysitter, Perawat Lansia | Jasa Mandiri",
  description: "Bergabunglah dengan Jasa Mandiri. Kami membuka lowongan untuk posisi Asisten Rumah Tangga (ART), Babysitter, dan Perawat Lansia dengan penempatan di seluruh Indonesia.",
  keywords: ["lowongan kerja art", "loker babysitter", "lowongan perawat lansia", "kerja prt", "lowongan kerja penyalur resmi"],
};

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Apakah ada biaya pendaftaran untuk melamar?",
    answer: "Tidak ada biaya pendaftaran sama sekali. Proses perekrutan di Jasa Mandiri sepenuhnya gratis.",
  },
  {
    question: "Apakah saya harus punya pengalaman untuk melamar?",
    answer: "Kami menerima pelamar dengan pengalaman maupun non-pengalaman. Kami akan memberikan pelatihan dasar yang diperlukan sebelum penempatan kerja.",
  },
  {
    question: "Apa saja fasilitas yang didapatkan selama bekerja?",
    answer: "Anda akan mendapatkan gaji bulanan, tempat tinggal dan makan yang layak ditanggung oleh pengguna jasa, serta fasilitas lain seperti THR dan BPJS sesuai dengan peraturan yang berlaku.",
  },
];

const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": "Lowongan ART, Babysitter & Perawat Lansia - Penempatan Seluruh Indonesia",
    "description": "<p>Jasa Mandiri membuka lowongan untuk Asisten Rumah Tangga, Babysitter, dan Perawat Lansia untuk penempatan di berbagai kota di seluruh Indonesia. Kami mencari individu yang penuh kasih, sabar, dan bertanggung jawab.</p>",
    "hiringOrganization": {
        "@type": "Organization",
        "name": "Jasa Mandiri",
        "sameAs": "https://penyalurkerja.com"
    },
    "employmentType": "FULL_TIME",
    "datePosted": "2024-01-01",
    "validThrough": "2028-12-31",
    "jobLocation": {
        "@type": "Place",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Jl. Gunung balong no 78 RT11/04",
            "addressLocality": "Jakarta Selatan",
            "addressRegion": "DKI Jakarta",
            "postalCode": "12440",
            "addressCountry": "ID"
        }
    },
    "baseSalary": {
        "@type": "MonetaryAmount",
        "currency": "IDR",
        "value": {
            "@type": "QuantitativeValue",
            "minValue": 2500000,
            "maxValue": 5000000,
            "unitText": "MONTH"
        }
    }
};

export default function LowonganKerjaPage() {
  // Buat skema FAQ secara manual
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema, null, 2) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="pt-16 pb-24 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <Breadcrumbs 
            crumbs={[
              { name: 'Beranda', path: '/' },
              { name: 'Lowongan Kerja', path: '/lowongan-kerja' },
            ]}
          />
          <div className="text-center mt-12 mb-16">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">Bergabung Bersama Kami</h1>
            <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
              <strong className="font-semibold text-slate-800">Jasa Mandiri</strong> adalah perusahaan penyalur tenaga kerja resmi untuk babysitter, ART, dan perawat lansia. Kami mencari individu penuh kasih, sabar, dan bertanggung jawab untuk bergabung dengan tim profesional kami.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-24">
            {/* Kualifikasi */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800">Kualifikasi Pelamar</h2>
                  <p className="text-slate-500 font-medium">Posisi: Babysitter / Perawat Lansia & ART</p>
                </div>
              </div>
              
              <ul className="space-y-4 text-slate-700 font-medium">
                <li className="flex items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <User className="w-6 h-6 mr-4 text-blue-500 shrink-0" />
                  <span>Wanita, usia 18 - 45 Tahun</span>
                </li>
                <li className="flex items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <Briefcase className="w-6 h-6 mr-4 text-blue-500 shrink-0" />
                  <span>Pengalaman & non-pengalaman diterima</span>
                </li>
                <li className="flex items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <BookOpen className="w-6 h-6 mr-4 text-blue-500 shrink-0" />
                  <span>Pendidikan tidak diutamakan</span>
                </li>
                <li className="flex items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <CheckCircle className="w-6 h-6 mr-4 text-blue-500 shrink-0" />
                  <span>Jujur, bersih, rapi, dan bertanggung jawab</span>
                </li>
                <li className="flex items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <Heart className="w-6 h-6 mr-4 text-blue-500 shrink-0" />
                  <span>Penyayang anak/lansia dan sabar</span>
                </li>
                <li className="flex items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <Soup className="w-6 h-6 mr-4 text-blue-500 shrink-0" />
                  <span>Bisa memasak masakan sederhana (atau bersedia belajar)</span>
                </li>
                <li className="flex items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <Home className="w-6 h-6 mr-4 text-blue-500 shrink-0" />
                  <span>Bersedia tinggal di dalam (menginap)</span>
                </li>
              </ul>
            </div>

            {/* Fasilitas & Cara Melamar */}
            <div className="flex flex-col gap-8">
              {/* Fasilitas */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 p-10 rounded-[2.5rem] shadow-sm border border-emerald-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <h3 className="text-2xl font-black text-slate-800 mb-6">Fasilitas yang Didapat:</h3>
                <ul className="space-y-4 text-slate-700 font-medium">
                  <li className="flex items-start bg-white/60 p-4 rounded-2xl border border-white/50 shadow-sm">
                    <CheckCircle className="w-6 h-6 mr-4 text-emerald-500 shrink-0" />
                    <span>Gaji Pokok <strong>Rp 2.500.000 - Rp 5.000.000</strong></span>
                  </li>
                  <li className="flex items-start bg-white/60 p-4 rounded-2xl border border-white/50 shadow-sm">
                    <CheckCircle className="w-6 h-6 mr-4 text-emerald-500 shrink-0" />
                    <span>Tempat tinggal dan makan ditanggung penuh oleh pengguna jasa</span>
                  </li>
                  <li className="flex items-start bg-white/60 p-4 rounded-2xl border border-white/50 shadow-sm">
                    <CheckCircle className="w-6 h-6 mr-4 text-emerald-500 shrink-0" />
                    <span>Fasilitas lainnya (Cuti, THR, dll) sesuai peraturan yang berlaku</span>
                  </li>
                </ul>
              </div>

              {/* Cara Melamar */}
              <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-8 text-emerald-400">Cara Melamar:</h3>
                  <div className="space-y-6">
                    <div className="flex items-start bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                      <Phone className="w-8 h-8 mr-5 text-emerald-400 shrink-0" />
                      <div>
                        <p className="font-bold text-lg mb-2">Hubungi kami via WhatsApp:</p>
                        <div className="flex flex-col gap-2">
                          <a href="https://wa.me/628119119996" className="text-white hover:text-emerald-400 text-lg font-medium transition-colors">0811-911-9996</a>
                          <a href="https://wa.me/6282122415552" className="text-white hover:text-emerald-400 text-lg font-medium transition-colors">0821-2241-5552</a>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                      <MapPin className="w-8 h-8 mr-5 text-emerald-400 shrink-0" />
                      <div>
                        <p className="font-bold text-lg mb-2">Alamat Kantor:</p>
                        <p className="text-slate-300 font-light leading-relaxed">Jl Gunung Balong III No 78, Lebak Bulus, Cilandak, Jakarta Selatan</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
             <FaqAccordion faqData={faqData} />
          </div>

        </div>
      </div>
    </main>
  );
}
