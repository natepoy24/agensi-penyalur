// src/app/layanan/page.tsx
import { Baby, Home, UserRound } from 'lucide-react';

export default function LayananPage() {
  return (
    <main>
      <div className="bg-slate-50 pt-32 pb-20 px-4">
        <div className="container mx-auto">
          {/* Judul Halaman */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-800">
              Layanan Profesional Kami
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Kami menyediakan tiga kategori utama tenaga kerja untuk memenuhi kebutuhan spesifik keluarga Anda.
            </p>
          </div>

          {/* Grid Kartu Layanan */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Kartu 1: Baby Sitter */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <Baby className="w-12 h-12 text-emerald-600" />
              <h3 className="mt-4 text-2xl font-bold text-slate-800">Baby Sitter</h3>
              <p className="mt-2 text-slate-600">
                Partner terpercaya untuk menjaga, merawat, dan mendukung tumbuh kembang buah hati Anda dengan penuh kasih sayang dan kesabaran.
              </p>
            </div>

            {/* Kartu 2: Perawat Lansia */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <UserRound className="w-12 h-12 text-emerald-600" />
              <h3 className="mt-4 text-2xl font-bold text-slate-800">Perawat Lansia</h3>
              <p className="mt-2 text-slate-600">
                Pendamping profesional dan sabar untuk merawat anggota keluarga senior, memastikan mereka mendapatkan perhatian dan bantuan terbaik.
              </p>
            </div>
            
            {/* Kartu 3: Asisten Rumah Tangga */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <Home className="w-12 h-12 text-emerald-600" />
              <h3 className="mt-4 text-2xl font-bold text-slate-800">Asisten Rumah Tangga</h3>
              <p className="mt-2 text-slate-600">
                Tenaga kerja yang cekatan dan terampil untuk membantu menjaga kebersihan dan kerapian rumah Anda sehari-hari.
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}