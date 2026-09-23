// src/app/admin/dashboard/invoice/buat/page.tsx
import FormInvoice from "@/components/invoice/FormInvoice";
import Link from "next/link";

export default function BuatInvoicePage() {
  return (
    <div className="min-h-screen py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <Link
            href="/admin/dashboard/invoice"
            className="flex items-center gap-1 text-slate-400 hover:text-emerald-600 text-sm transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Kembali
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-white text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              receipt_long
            </span>
          </div>
          Buat Invoice Baru
        </h1>
        <p className="text-slate-500 text-sm mt-1 ml-13">
          Isi form di bawah, lalu klik &quot;Download PDF &amp; Simpan&quot; untuk mengunduh invoice dan menyimpan ke database.
        </p>
      </div>

      <FormInvoice />
    </div>
  );
}
