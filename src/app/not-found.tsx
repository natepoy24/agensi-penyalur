import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center max-w-lg">
        <div className="bg-green-200 p-2 rounded-full inline-block mb-3 mt-8 md:mt-0">
          <Image
            src="/Image/Logo-jm.png"
            alt="Logo PT Jasa Mandiri Agency"
            width={125}
            height={125}
            className="w-[75px] h-[75px] md:w-[125px] md:h-[125px]"
          />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Halaman Tidak Ditemukan</h1>
        <p className="text-slate-600 mb-8">
          Maaf, halaman pekerja atau artikel yang Anda cari mungkin sudah dihapus atau sudah mendapatkan majikan baru.
        </p>
        
        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Cari Kandidat Lain:</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              href="/pekerja?kategori=Baby+Sitter" 
              className="px-5 py-2 bg-white border border-slate-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition"
            >
              Stok Baby Sitter
            </Link>
            <Link 
              href="/pekerja?kategori=Asisten+Rumah+Tangga" 
              className="px-5 py-2 bg-white border border-slate-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition"
            >
              Stok ART
            </Link>
            <Link 
              href="/pekerja?kategori=Perawat+Lansia" 
              className="px-5 py-2 bg-white border border-slate-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition"
            >
              Stok Perawat Lansia
            </Link>
          </div>
        </div>

        <div className="mt-10 mb-8 md:mb-0">
          <Link href="/" className="text-blue-600 hover:underline font-semibold">
            &larr; Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}