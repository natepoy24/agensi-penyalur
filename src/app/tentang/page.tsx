// src/app/tentang/page.tsx

export default function TentangPage() {
  return (
    <main>
      <div className="bg-white pt-35 pb-20 px-4">
        <div className="container mx-auto">
          {/* Judul Halaman */}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-800">
              Tentang APSA
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Membangun kepercayaan dengan menyediakan partner rumah tangga yang andal dan profesional.
            </p>
          </div>

          {/* Konten Visi & Misi */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Visi Kami</h2>
              <p className="mt-4 text-slate-600">
                Menjadi agensi penyalur tenaga kerja domestik terdepan di Indonesia yang dikenal karena integritas, kualitas layanan, dan kepedulian terhadap kesejahteraan pekerja dan klien.
              </p>
              
              <h2 className="text-3xl font-bold text-slate-800 mt-8">Misi Kami</h2>
              <ul className="mt-4 list-disc list-inside text-slate-600 space-y-2">
                <li>Melakukan proses seleksi dan verifikasi yang ketat dan transparan.</li>
                <li>Memberikan pelatihan profesional berkelanjutan kepada seluruh tenaga kerja.</li>
                <li>Menciptakan hubungan kerja yang harmonis dan saling menguntungkan.</li>
                <li>Menjamin keamanan dan kenyamanan bagi setiap keluarga yang kami layani.</li>
              </ul>
            </div>
            
            {/* Anda bisa menambahkan gambar di sini nanti */}
            <div className="bg-slate-200 h-80 rounded-lg">
              {/* Placeholder untuk gambar tim atau kantor */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}