// src/app/lowongan-kerja/page.tsx
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import SchemaInjector from "@/components/SchemaInjector";
import { type FAQItem } from "@/app/lib/schemaGenerator";
import { CheckCircle, User, Briefcase, BookOpen, Heart, Soup, Home, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Lowongan Kerja ART, Babysitter, Perawat Lansia | PT Jasa Mandiri",
  description: "Bergabunglah dengan PT Jasa Mandiri. Kami membuka lowongan untuk posisi Asisten Rumah Tangga (ART), Babysitter, dan Perawat Lansia dengan penempatan di seluruh Indonesia.",
  keywords: ["lowongan kerja art", "loker babysitter", "lowongan perawat lansia", "kerja prt", "lowongan kerja penyalur resmi"],
};

const faqData: FAQItem[] = [
  {
    question: "Apakah ada biaya pendaftaran untuk melamar?",
    answer: "Tidak ada biaya pendaftaran sama sekali. Proses perekrutan di PT Jasa Mandiri sepenuhnya gratis.",
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
    "description": "<p>PT Jasa Mandiri membuka lowongan untuk Asisten Rumah Tangga, Babysitter, dan Perawat Lansia untuk penempatan di berbagai kota di seluruh Indonesia. Kami mencari individu yang penuh kasih, sabar, dan bertanggung jawab.</p>",
    "hiringOrganization": {
        "@type": "Organization",
        "name": "PT Jasa Mandiri",
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
  return (
    <main>
      <SchemaInjector type="job" data={jobPostingSchema} />
      <SchemaInjector type="faq" data={faqData} />

      <div className="pt-20 pb-20 px-4">
        <div className="container mx-auto">
          <Breadcrumbs 
            crumbs={[
              { name: 'Beranda', path: '/' },
              { name: 'Lowongan Kerja', path: '/lowongan-kerja' },
            ]}
          />
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Bergabung Bersama Kami</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              PT Jasa Mandiri adalah perusahaan penyalur tenaga kerja resmi untuk babysitter, ART, dan perawat lansia. Kami mencari individu penuh kasih, sabar, dan bertanggung jawab untuk bergabung dengan tim profesional kami.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Kualifikasi */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Posisi: Babysitter / Perawat Lansia & ART</h2>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Kualifikasi:</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start"><User className="w-5 h-5 mr-3 text-blue-500 mt-1 shrink-0" />Wanita, usia 18 - 45 Tahun</li>
                <li className="flex items-start"><Briefcase className="w-5 h-5 mr-3 text-blue-500 mt-1 shrink-0" />Pengalaman & non-pengalaman diterima</li>
                <li className="flex items-start"><BookOpen className="w-5 h-5 mr-3 text-blue-500 mt-1 shrink-0" />Pendidikan tidak diutamakan</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 mr-3 text-blue-500 mt-1 shrink-0" />Jujur, bersih, rapi, dan bertanggung jawab</li>
                <li className="flex items-start"><Heart className="w-5 h-5 mr-3 text-blue-500 mt-1 shrink-0" />Penyayang anak/lansia dan sabar</li>
                <li className="flex items-start"><Soup className="w-5 h-5 mr-3 text-blue-500 mt-1 shrink-0" />Bisa memasak masakan sederhana (atau bersedia belajar)</li>
                <li className="flex items-start"><Home className="w-5 h-5 mr-3 text-blue-500 mt-1 shrink-0" />Bersedia tinggal di dalam (menginap)</li>
              </ul>
            </div>

            {/* Fasilitas & Cara Melamar */}
            <div className="bg-blue-50 p-8 rounded-xl border border-blue-200">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Fasilitas:</h3>
              <ul className="space-y-3 text-gray-600 mb-8">
                <li className="flex items-start"><CheckCircle className="w-5 h-5 mr-3 text-green-500 mt-1 shrink-0" />Gaji Rp 2.500.000 - Rp 5.000.000</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 mr-3 text-green-500 mt-1 shrink-0" />Tempat tinggal dan makan disiapkan oleh pengguna jasa</li>
                <li className="flex items-start"><CheckCircle className="w-5 h-5 mr-3 text-green-500 mt-1 shrink-0" />Fasilitas lainnya (THR, BPJS, dll) sesuai peraturan</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-700 mb-4">Cara Melamar:</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="w-5 h-5 mr-3 text-blue-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold">Hubungi kami via WhatsApp:</p>
                    <a href="https://wa.me/628119119996" className="text-blue-600 hover:underline">0811-911-9996</a> atau <a href="https://wa.me/6282122415552" className="text-blue-600 hover:underline">0821-2241-5552</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 text-blue-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold">Alamat Kantor:</p>
                    <p>Jl Gunung Balong III No 78, Lebak Bulus, Cilandak, Jakarta Selatan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <section id="faq" className="max-w-4xl mx-auto mt-20">
            <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
              Pertanyaan Umum Pelamar
            </h2>
            <div className="space-y-4">
              {faqData.map((item, index) => (
                <details key={index} className="group bg-white p-6 rounded-lg shadow-sm border">
                  <summary className="flex justify-between items-center font-semibold cursor-pointer text-gray-800">
                    {item.question}
                    <span className="ml-4 transition-transform duration-200 group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-600 leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
