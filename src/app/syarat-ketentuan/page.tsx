import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ShieldCheck, CreditCard, RefreshCw } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan Layanan | PT Jasa Mandiri Agency',
  description: 'Kebijakan garansi penggantian pekerja, prosedur pembayaran, dan syarat ketentuan penggunaan jasa penyalur PT Jasa Mandiri Agency.',
};

export default function SyaratKetentuanPage() {
  return (
    <main className="bg-slate-50 min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Breadcrumbs 
          crumbs={[
            { name: 'Beranda', path: '/' },
            { name: 'Syarat & Ketentuan', path: '/syarat-ketentuan' },
          ]} 
        />

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 md:p-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Syarat & Ketentuan Layanan</h1>
          <p className="text-slate-500 mb-10">Terakhir diperbarui: November 2025</p>

          {/* 1. Kebijakan Garansi (Refund/Replacement Policy) */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <RefreshCw size={20} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Kebijakan Garansi & Penggantian</h2>
            </div>
            <div className="prose prose-slate text-slate-600 max-w-none">
              <p>
                PT Jasa Mandiri Agency berkomitmen memberikan kepuasan maksimal bagi pengguna jasa. Berikut adalah ketentuan garansi kami:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-4">
                <li><strong>Masa Garansi:</strong> 3 Bulan (90 hari) terhitung sejak pekerja mulai bekerja.</li>
                <li><strong>Hak Penggantian:</strong> Klien berhak mendapatkan hingga <strong>3 (tiga) kali penggantian</strong> pekerja selama masa garansi jika pekerja dianggap tidak cocok, sakit, atau mengundurkan diri.</li>
                <li>
                  <strong>Prosedur Klaim Garansi:</strong>
                  <ol className="list-decimal pl-5 mt-2">
                    <li>Hubungi admin kami via WhatsApp jika ada keluhan.</li>
                    <li>Kami akan melakukan mediasi terlebih dahulu.</li>
                    <li>Jika tidak ada solusi, kami akan menyiapkan kandidat pengganti dalam waktu maksimal 7 hari kerja.</li>
                    <li>Penggantian pekerja tidak dikenakan biaya administrasi tambahan.</li>
                  </ol>
                </li>
                <li>
                  <strong>Kebijakan Refund (Pengembalian Dana):</strong> Jika kami gagal menyediakan pekerja pengganti dalam waktu 30 hari kerja setelah klaim disetujui, atau klien ingin membatalkan kontrak, klien berhak mengajukan pengembalian biaya administrasi (selama kewajiban gaji pekerja telah dipenuhi) sebesar 50% dibulan pertama, dan 30% dibulan selanjutnya.
                </li>
              </ul>
            </div>
          </section>

          <hr className="my-8 border-slate-200" />

          {/* 2. Pembayaran (Secure Payment) */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                <CreditCard size={20} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Metode Pembayaran Aman</h2>
            </div>
            <div className="prose prose-slate text-slate-600 max-w-none">
              <p>
                Untuk menjamin keamanan transaksi, seluruh pembayaran biaya administrasi <strong>WAJIB</strong> ditransfer ke rekening resmi perusahaan:
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mt-4">
                <p className="font-semibold text-slate-800">Bank BCA</p>
                <p className="text-2xl font-bold text-slate-900 my-1">1010-0119-0091-5</p>
                <p className="text-slate-600">a.n. <strong>JASA MANDIRI</strong></p>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
                <p className="text-sm text-yellow-800 font-medium flex items-start gap-2">
                  <ShieldCheck size={18} className="mt-0.5 flex-shrink-0" />
                  Peringatan: Kami tidak bertanggung jawab atas pembayaran yang dilakukan ke rekening pribadi staf atau oknum yang mengatasnamakan perusahaan. Pastikan transfer hanya ke rekening PT.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}