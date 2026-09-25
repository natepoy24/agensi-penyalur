// src/app/admin/dashboard/invoice/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface PaymentMethod {
  bank_name: string;
  account_name: string;
  account_number: string;
}

interface Invoice {
  id: number;
  invoice_number: string;
  invoice_date: string;
  due_date: string;
  customer_name: string;
  customer_address: string;
  item_type: string;
  worker_name: string;
  price: number;
  subtotal?: number;
  total: number;
  ongkos_kirim?: number;
  custom_items?: { name: string; price: number }[];
  payment_methods: PaymentMethod | null;
  created_at: string;
}

function formatRupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID").replace(/,/g, ".");
}

function formatDateIndo(dateStr: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
    "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export default function InvoiceListPage() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handlePreviewExisting = (inv: Invoice) => {
    let ongkosKirim = inv.ongkos_kirim || 0;
    let customItems: { name: string; price: number }[] = inv.custom_items || [];
    let price = inv.price;
    let itemType = inv.item_type;

    // 1. Ekstrak metadata yang tersimpan di item_type (bridge metadata)
    if (inv.item_type && inv.item_type.includes("|||")) {
      const parts = inv.item_type.split("|||");
      itemType = parts[0];
      try {
        const meta = JSON.parse(parts[1]);
        if (meta.price) price = meta.price;
        if (meta.ongkos_kirim !== undefined && !inv.ongkos_kirim) ongkosKirim = meta.ongkos_kirim;
        if (meta.custom_items && (!inv.custom_items || inv.custom_items.length === 0)) {
          customItems = meta.custom_items;
        }
      } catch (e) {
        console.error("Error parsing invoice meta:", e);
      }
    }

    // 2. Cek cache localStorage jika ada rincian lengkap tersimpan
    try {
      const cached = localStorage.getItem("invoice_items_" + inv.invoice_number);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.price) price = parsed.price;
        if (parsed.ongkosKirim !== undefined) ongkosKirim = parsed.ongkosKirim;
        if (parsed.customItems && parsed.customItems.length > 0) customItems = parsed.customItems;
      }
    } catch {}

    const totalGrand = inv.total || (price + ongkosKirim + customItems.reduce((s, c) => s + (c.price || 0), 0));

    const previewData = {
      invoiceNumber: inv.invoice_number,
      invoiceDate: inv.invoice_date,
      dueDate: inv.due_date || "",
      customerName: inv.customer_name,
      customerAddress: inv.customer_address,
      itemType: itemType,
      workerName: inv.worker_name,
      price: price,
      ongkosKirim: ongkosKirim,
      customItems: customItems,
      paymentMethod: inv.payment_methods || null,
      grandTotal: totalGrand,
      isExisting: true,
    };
    localStorage.setItem("invoice_preview_data", JSON.stringify(previewData));
    router.push("/admin/dashboard/invoice/preview");
  };

  const loadInvoices = () => {
    setIsLoading(true);
    fetch("/api/invoice")
      .then((r) => r.json())
      .then((data) => {
        // Guard: pastikan data adalah array (bukan error object)
        setInvoices(Array.isArray(data) ? data : []);
      })
      .catch(() => setInvoices([]))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  const handleDelete = async (id: number, invNum: string) => {
    if (!confirm(`Hapus invoice ${invNum}? Tindakan ini tidak bisa dibatalkan.`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/invoice?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessage({ type: "success", text: `Invoice ${invNum} berhasil dihapus.` });
      toast.success(`Invoice ${invNum} berhasil dihapus.`);
      loadInvoices();
    } catch (err: unknown) {
      const errText = err instanceof Error ? err.message : "Gagal menghapus invoice";
      setMessage({ type: "error", text: errText });
      toast.error(errText);
    } finally {
      setDeletingId(null);
    }
  };

  const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.total || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
              <span
                className="material-symbols-outlined text-white text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                receipt_long
              </span>
            </div>
            Daftar Invoice
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Kelola semua invoice yang telah dibuat dan diunduh.
          </p>
        </div>
        <Link
          href="/admin/dashboard/invoice/buat"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Buat Invoice Baru
        </Link>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`px-5 py-3 rounded-xl text-sm font-medium flex items-center gap-2 ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {message.type === "success" ? "check_circle" : "error"}
          </span>
          {message.text}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border p-5 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Invoice</div>
          <div className="text-3xl font-black text-slate-800">{invoices.length}</div>
        </div>
        <div className="bg-white rounded-2xl border p-5 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Revenue</div>
          <div className="text-xl font-black text-emerald-600">{formatRupiah(totalRevenue)}</div>
        </div>
        <div className="bg-white rounded-2xl border p-5 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Invoice Terbaru</div>
          <div className="text-base font-bold text-slate-700">
            {invoices[0]?.invoice_number || "—"}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-4xl text-slate-300 animate-spin">progress_activity</span>
              <p className="text-slate-400 text-sm">Memuat data invoice...</p>
            </div>
          </div>
        ) : invoices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="material-symbols-outlined text-5xl text-slate-200 mb-3">receipt_long</span>
            <p className="text-slate-500 font-medium">Belum ada invoice</p>
            <p className="text-slate-400 text-sm mt-1">Klik &quot;Buat Invoice Baru&quot; untuk memulai.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b">
                  <th className="text-left font-bold text-slate-600 px-5 py-4">Invoice #</th>
                  <th className="text-left font-bold text-slate-600 px-4 py-4">Tanggal</th>
                  <th className="text-left font-bold text-slate-600 px-4 py-4">Customer</th>
                  <th className="text-left font-bold text-slate-600 px-4 py-4">Pekerja</th>
                  <th className="text-left font-bold text-slate-600 px-4 py-4">Item</th>
                  <th className="text-right font-bold text-slate-600 px-4 py-4">Total</th>
                  <th className="text-center font-bold text-slate-600 px-4 py-4">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 font-mono font-bold text-emerald-700">
                      {inv.invoice_number}
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      <div>{formatDateIndo(inv.invoice_date)}</div>
                      {inv.due_date && (
                        <div className="text-xs text-slate-400">
                          Tenggat: {formatDateIndo(inv.due_date)}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-bold text-slate-800 uppercase">{inv.customer_name}</div>
                      <div className="text-xs text-slate-400 truncate max-w-[150px]">{inv.customer_address}</div>
                    </td>
                    <td className="px-4 py-4 text-slate-700 font-medium">
                      {inv.worker_name && inv.worker_name !== "-" ? inv.worker_name : "-"}
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {(inv.price || 0) > 0
                        ? `Adm. ${inv.item_type.split("|||")[0]}`
                        : (inv.custom_items && inv.custom_items.length > 0
                          ? inv.custom_items[0].name + (inv.custom_items.length > 1 ? ` (+${inv.custom_items.length - 1})` : "")
                          : (inv.item_type.split("|||")[0] || "Non-Adm"))}
                    </td>
                    <td className="px-4 py-4 text-right font-bold text-slate-800">
                      {formatRupiah(inv.total)}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handlePreviewExisting(inv)}
                          className="p-1.5 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Lihat / Cetak Invoice"
                        >
                          <span className="material-symbols-outlined text-[20px]">print</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(inv.id, inv.invoice_number)}
                          disabled={deletingId === inv.id}
                          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Hapus Invoice"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {deletingId === inv.id ? "progress_activity" : "delete"}
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
