// src/app/tentang/page.tsx
import Image from 'next/image';

const workflowSteps = [
  { step: "1", title: "Perekrutan & Validasi", description: "Proses dimulai dari Job Order, perekrutan, hingga validasi data calon pekerja secara ketat." },
  { step: "2", title: "Penampungan & Pelatihan", description: "Pekerja ditampung di mess dan mendapatkan pelatihan sesuai kebutuhan spesifik pekerjaan." },
  { step: "3", title: "Uji Kompentensi", description: "Untuk kategori pekerja highrisk seperti baby sitter dan perawat lansia, akan kami adakan uji kompentensi terlebih dahulu sebelum disalurkan, dan setiap setahun sekali, kami juga mengadakan sertifikasi baby sitter dan perawat lansia, sudah diawasi langsung oleh kemnaker." },
  { step: "4", title: "Orientasi & Kontrak", description: "Orientasi pra-penempatan dan penandatanganan kontrak kerja yang jelas dan transparan." },
  { step: "5", title: "Penempatan", description: "Pekerja diantar dan ditempatkan di lokasi pengguna jasa sesuai dengan kesepakatan." },
  { step: "6", title: "Monitoring & Pelaporan", description: "Kami melakukan monitoring pasca-penempatan dan melaporkan status ke instansi terkait." },
];

export default function TentangPage() {
  return (
    <main className="pt-32 pb-20 px-4">
      <div className="container mx-auto">
        {/* Judul Halaman */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Tentang Kami</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Mengenal lebih dekat visi, misi, dan komitmen kami dalam memberdayakan dan melayani.
          </p>
        </div>

        {/* Kisah Kami Section */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold text-gray-800">Kisah Kami: Visi untuk Memberdayakan</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Jasa mandiri lahir dari kepedulian mendalam terhadap dua aspek fundamental: kebutuhan keluarga akan bantuan domestik yang tepercaya dan potensi besar masyarakat untuk berkembang jika diberi kesempatan. Kami melihat sebuah jembatan yang perlu dibangun antara keluarga yang mencari ketenangan dan individu berbakat yang mencari jalan menuju kehidupan yang lebih baik.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Lebih dari sekadar agensi, kami adalah mitra dalam peningkatan kesejahteraan sosial. Misi kami adalah menciptakan lapangan kerja yang layak, terutama bagi masyarakat menengah ke bawah, serta memberikan bimbingan dan arahan agar mereka dapat meraih peluang kerja yang lebih baik.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <Image 
                src="/Image/kisah-kami.jpg"
                alt="Tim jasa mandiri sedang berdiskusi"
                width={600}
                height={450}
                className="rounded-xl shadow-2xl w-full"
              />
            </div>
          </div>
        </section>
        
        {/* Profil Perusahaan Section */}
        <section className="bg-white p-8 md:p-12 rounded-xl shadow-lg max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Profil Perusahaan</h2>
          <p className="text-gray-600 leading-relaxed text-center">
            Jasa Mandiri adalah lembaga penyalur pekerja rumah tangga yang berdedikasi untuk menjembatani kebutuhan keluarga di Indonesia dengan para pekerja profesional dan terpercaya. Berdiri sejak tahun 2010, kami telah berhasil membantu ribuan keluarga menemukan asisten yang tepat.
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed text-center">
            Visi kami adalah menjadi mitra terdepan dan paling diandalkan bagi setiap keluarga dalam menyediakan solusi tenaga kerja domestik yang berkualitas. Misi kami adalah melakukan proses seleksi yang ketat, memberikan pelatihan yang relevan, dan memastikan penempatan yang sesuai demi kepuasan klien dan kesejahteraan pekerja.
          </p>
        </section>

        {/* Kode Etik APPSI Section */}
        <section className="max-w-4xl mx-auto bg-blue-50 p-8 md:p-12 rounded-xl mb-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center">Kode Etik & Kemitraan APPSI</h2>
          <p className="mt-6 text-gray-600 leading-relaxed text-center">
            Di bawah naungan Asosiasi Pelatihan Penempatan Pekerja Rumah Tangga Seluruh Indonesia (APPSI), kami berpedoman pada kode etik yang telah ditandatangani Menaker pada 18 Maret 2015, yaitu:
          </p>
          <ol className="mt-6 list-decimal list-inside space-y-3 text-gray-700 md:w-4/5 mx-auto">
            <li>Tidak merekrut, menerima, dan menempatkan pekerja rumah tangga di bawah usia 18 tahun.</li>
            <li>Memberikan sarana dan prasarana penampungan yang layak bagi calon pekerja.</li>
            <li>Memberikan pengarahan dan pelatihan sesuai standar yang berlaku.</li>
            <li>Memastikan pekerja mendapatkan jaminan kesehatan, sosial, dan kesejahteraan.</li>
            <li>Memastikan pekerja memiliki perjanjian kerja yang memuat hak dan kewajiban secara seimbang.</li>
            <li>Melakukan pemantauan paska penempatan kerja di rumah pemberi kerja.</li>
            <li>Mencegah terjadinya tindakan kekerasan terhadap pekerja rumah tangga.</li>
          </ol>
        </section>

        {/* Alur Kerja Section */}
        <section className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Alur Kerja Profesional Kami</h2>
            <p className="mt-4 text-lg text-gray-600">Kami mengikuti proses yang terstruktur untuk memastikan kualitas dan keamanan.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* --- PERBAIKAN DI BARIS INI --- */}
            {workflowSteps.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}