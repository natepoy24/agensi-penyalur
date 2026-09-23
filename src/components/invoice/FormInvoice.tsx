"use client";

// src/components/invoice/FormInvoice.tsx
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface PaymentMethod {
  id: number;
  bank_name: string;
  account_name: string;
  account_number: string;
  is_default: boolean;
}

interface CustomItem {
  name: string;
  price: number;
  priceCustom: boolean;
}

interface InvoiceFormData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  customerName: string;
  customerAddress: string;
  itemType: string;
  itemTypeLainnya: string;
  workerName: string;
  price: number;
  priceCustom: boolean;
  paymentMethodId: number | null;
}

function generateInvoiceNumber(date: string): string {
  if (!date) return "";
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const random = Math.floor(Math.random() * 91) + 10;
  return `INV-${day}${month}${year}-${random}`;
}

function addDays(dateStr: string, days: number): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

const PRICE_OPTIONS = [2200000, 2500000, 2700000];
const ONGKIR_OPTIONS = [0, 100000, 150000, 200000, 250000];

export default function FormInvoice() {
  const router = useRouter();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoadingPM, setIsLoadingPM] = useState(true);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [newPayment, setNewPayment] = useState({ bank_name: "", account_name: "", account_number: "" });
  const [isSavingPayment, setIsSavingPayment] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Ongkos kirim state (default 0)
  const [ongkosKirim, setOngkosKirim] = useState(0);
  const [ongkosKirimCustom, setOngkosKirimCustom] = useState(false);

  // Custom items state (tidak disimpan ke DB)
  const [customItems, setCustomItems] = useState<CustomItem[]>([]);

  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState<InvoiceFormData>({
    invoiceNumber: "",
    invoiceDate: today,
    dueDate: addDays(today, 1),
    customerName: "",
    customerAddress: "",
    itemType: "ART",
    itemTypeLainnya: "",
    workerName: "",
    price: 2500000,
    priceCustom: false,
    paymentMethodId: null,
  });

  // Load payment methods
  useEffect(() => {
    fetch("/api/payment-methods")
      .then((r) => r.json())
      .then((data: PaymentMethod[]) => {
        if (!Array.isArray(data)) return;
        setPaymentMethods(data);
        const defaultPM = data.find((pm) => pm.is_default);
        if (defaultPM) setForm((prev) => ({ ...prev, paymentMethodId: defaultPM.id }));
      })
      .finally(() => setIsLoadingPM(false));
  }, []);

  // Auto-generate invoice number saat date berubah
  useEffect(() => {
    if (form.invoiceDate) {
      setForm((prev) => ({ ...prev, invoiceNumber: generateInvoiceNumber(form.invoiceDate) }));
    }
  }, [form.invoiceDate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "invoiceDate") updated.dueDate = addDays(value, 1);
      if (name === "price") updated.price = Number(value);
      return updated;
    });
  };

  const selectedPaymentMethod = paymentMethods.find((pm) => pm.id === form.paymentMethodId);
  const getItemLabel = () => form.itemType === "Lainnya" ? (form.itemTypeLainnya || "Lainnya") : form.itemType;

  // Kalkulasi total
  const customItemsTotal = customItems.reduce((sum, ci) => sum + (ci.price || 0), 0);
  const grandTotal = form.price + ongkosKirim + customItemsTotal;

  const formatRupiah = (n: number) => "Rp " + n.toLocaleString("id-ID").replace(/,/g, ".");
  const formatDateIndo = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const months = ["JANUARI","FEBRUARI","MARET","APRIL","MEI","JUNI","JULI","AGUSTUS","SEPTEMBER","OKTOBER","NOVEMBER","DESEMBER"];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };
  const formatDateSlash = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2,"0")} / ${String(d.getMonth()+1).padStart(2,"0")} / ${d.getFullYear()}`;
  };

  // Custom items handlers
  const addCustomItem = () => {
    setCustomItems((prev) => [...prev, { name: "", price: 0, priceCustom: false }]);
  };
  const removeCustomItem = (idx: number) => {
    setCustomItems((prev) => prev.filter((_, i) => i !== idx));
  };
  const updateCustomItem = (idx: number, field: keyof CustomItem, value: string | number | boolean) => {
    setCustomItems((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  };

  const handleAddPaymentMethod = async () => {
    if (!newPayment.bank_name || !newPayment.account_name || !newPayment.account_number) {
      setMessage({ type: "error", text: "Semua field rekening wajib diisi" });
      return;
    }
    setIsSavingPayment(true);
    try {
      const res = await fetch("/api/payment-methods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPayment),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setPaymentMethods((prev) => [...prev, data]);
      setForm((prev) => ({ ...prev, paymentMethodId: data.id }));
      setNewPayment({ bank_name: "", account_name: "", account_number: "" });
      setShowAddPayment(false);
      setMessage({ type: "success", text: "Rekening berhasil ditambahkan!" });
    } catch (err: unknown) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Gagal menyimpan rekening" });
    } finally {
      setIsSavingPayment(false);
    }
  };

  const handleDownloadPDF = useCallback(() => {
    if (!form.customerName || !form.workerName || !form.invoiceDate) {
      setMessage({ type: "error", text: "Nama customer, nama pekerja, dan tanggal invoice wajib diisi!" });
      return;
    }
    if (form.itemType === "Lainnya" && !form.itemTypeLainnya.trim()) {
      setMessage({ type: "error", text: "Harap isi jenis pekerjaan lainnya!" });
      return;
    }

    const totalGrand = form.price + ongkosKirim + customItems.reduce((s, ci) => s + (ci.price || 0), 0);
    const itemLabel = getItemLabel();

    const previewData = {
      invoiceNumber: form.invoiceNumber,
      invoiceDate: form.invoiceDate,
      dueDate: form.dueDate,
      customerName: form.customerName,
      customerAddress: form.customerAddress,
      itemType: itemLabel,
      workerName: form.workerName,
      price: form.price,
      ongkosKirim,
      customItems: customItems.map((ci) => ({ name: ci.name, price: ci.price || 0 })),
      paymentMethodId: form.paymentMethodId,
      paymentMethod: selectedPaymentMethod
        ? {
            bank_name: selectedPaymentMethod.bank_name,
            account_name: selectedPaymentMethod.account_name,
            account_number: selectedPaymentMethod.account_number,
          }
        : null,
      grandTotal: totalGrand,
    };

    localStorage.setItem("invoice_preview_data", JSON.stringify(previewData));
    router.push("/admin/dashboard/invoice/preview");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, selectedPaymentMethod, ongkosKirim, customItems]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Message */}
      {message && (
        <div className={`px-5 py-3 rounded-xl text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300 ${message.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          <span className="material-symbols-outlined text-[18px]">{message.type === "success" ? "check_circle" : "error"}</span>
          {message.text}
        </div>
      )}

      {/* Invoice Info */}
      <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-4">
        <h2 className="font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-600">receipt_long</span>
          Informasi Invoice
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-600 mb-1 block">Invoice Number</label>
            <input name="invoiceNumber" value={form.invoiceNumber} onChange={handleChange} readOnly
              className="w-full p-2.5 bg-slate-50 border rounded-xl outline-none font-mono text-sm font-bold text-emerald-700" />
            <p className="text-[10px] text-slate-400 mt-1">Auto-generate dari tanggal invoice</p>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600 mb-1 block">Tanggal Invoice <span className="text-red-500">*</span></label>
            <input type="date" name="invoiceDate" value={form.invoiceDate} onChange={handleChange}
              className="w-full p-2.5 bg-white border rounded-xl outline-none focus:border-emerald-400 text-sm" />
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-600 mb-1 block">
            Tenggat Waktu (Due Date) <span className="text-slate-400 font-normal">- default +1 hari</span>
          </label>
          <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange}
            className="w-full p-2.5 bg-white border rounded-xl outline-none focus:border-emerald-400 text-sm" />
        </div>
      </div>

      {/* Customer Info */}
      <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-4">
        <h2 className="font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-blue-500">person</span>
          Data Majikan / Customer
        </h2>
        <div>
          <label className="text-xs font-bold text-slate-600 mb-1 block">Nama Majikan / Customer <span className="text-red-500">*</span></label>
          <input name="customerName" value={form.customerName} onChange={handleChange}
            className="w-full p-2.5 border rounded-xl outline-none focus:border-blue-400 text-sm uppercase"
            placeholder="Contoh: MIJKE MANDAS" />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-600 mb-1 block">Alamat Customer <span className="text-red-500">*</span></label>
          <textarea name="customerAddress" value={form.customerAddress} onChange={handleChange} rows={3}
            className="w-full p-2.5 border rounded-xl outline-none focus:border-blue-400 text-sm resize-none"
            placeholder={"Contoh: JL. Melati Cilandak Timur\nJakarta Selatan"} />
        </div>
      </div>

      {/* Item Utama */}
      <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-4">
        <h2 className="font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-amber-500">work</span>
          Detail Item / Pekerjaan
        </h2>

        {/* Jenis */}
        <div>
          <label className="text-xs font-bold text-slate-600 mb-1 block">Jenis Pekerjaan <span className="text-red-500">*</span></label>
          <select name="itemType" value={form.itemType} onChange={handleChange}
            className="w-full p-2.5 border rounded-xl outline-none focus:border-amber-400 text-sm bg-white">
            <option value="ART">ART (Asisten Rumah Tangga)</option>
            <option value="Baby Sitter">Baby Sitter</option>
            <option value="Perawat Lansia">Perawat Lansia</option>
            <option value="Lainnya">Lainnya (input manual)</option>
          </select>
          {form.itemType === "Lainnya" && (
            <input name="itemTypeLainnya" value={form.itemTypeLainnya} onChange={handleChange}
              className="mt-2 w-full p-2.5 border rounded-xl outline-none focus:border-amber-400 text-sm"
              placeholder="Tulis jenis pekerjaan..." />
          )}
        </div>

        {/* Nama Pekerja */}
        <div>
          <label className="text-xs font-bold text-slate-600 mb-1 block">Nama Pekerja <span className="text-red-500">*</span></label>
          <input name="workerName" value={form.workerName} onChange={handleChange}
            className="w-full p-2.5 border rounded-xl outline-none focus:border-amber-400 text-sm"
            placeholder="Nama lengkap pekerja" />
        </div>

        {/* Harga Administrasi */}
        <div>
          <label className="text-xs font-bold text-slate-600 mb-1 block">Harga / Biaya Administrasi <span className="text-red-500">*</span></label>
          <div className="flex flex-wrap gap-2 mb-2">
            {PRICE_OPTIONS.map((p) => (
              <button key={p} type="button"
                onClick={() => setForm((prev) => ({ ...prev, price: p, priceCustom: false }))}
                className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${form.price === p && !form.priceCustom ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-400"}`}>
                {formatRupiah(p)}
              </button>
            ))}
            <button type="button" onClick={() => setForm((prev) => ({ ...prev, priceCustom: true }))}
              className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${form.priceCustom ? "bg-slate-700 text-white border-slate-700" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"}`}>
              Custom
            </button>
          </div>
          {form.priceCustom && (
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">Rp</span>
              <input type="number" name="price" value={form.price} onChange={handleChange}
                className="w-full pl-10 p-2.5 border rounded-xl outline-none focus:border-emerald-400 text-sm"
                placeholder="Masukkan nominal" />
            </div>
          )}
        </div>

        {/* Ongkos Kirim */}
        <div className="pt-3 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-600 mb-2 block flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-slate-400">local_shipping</span>
            Ongkos Kirim
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {ONGKIR_OPTIONS.map((o) => (
              <button key={o} type="button"
                onClick={() => { setOngkosKirim(o); setOngkosKirimCustom(false); }}
                className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${ongkosKirim === o && !ongkosKirimCustom ? "bg-orange-500 text-white border-orange-500" : "bg-white text-slate-600 border-slate-200 hover:border-orange-300"}`}>
                {o === 0 ? "Rp 0 (Tanpa Ongkir)" : formatRupiah(o)}
              </button>
            ))}
            <button type="button" onClick={() => setOngkosKirimCustom(true)}
              className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${ongkosKirimCustom ? "bg-slate-700 text-white border-slate-700" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"}`}>
              Custom
            </button>
          </div>
          {ongkosKirimCustom && (
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">Rp</span>
              <input type="number" value={ongkosKirim}
                onChange={(e) => setOngkosKirim(Number(e.target.value))}
                className="w-full pl-10 p-2.5 border rounded-xl outline-none focus:border-orange-400 text-sm"
                placeholder="Masukkan ongkos kirim" />
            </div>
          )}
        </div>

        {/* Custom Items */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-slate-400">add_shopping_cart</span>
              Item Tambahan
              <span className="text-slate-400 font-normal">(tidak disimpan ke database)</span>
            </label>
            <button type="button" onClick={addCustomItem}
              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
              <span className="material-symbols-outlined text-[14px]">add</span> Tambah Item
            </button>
          </div>

          {customItems.length === 0 && (
            <p className="text-xs text-slate-400 italic text-center py-2">Belum ada item tambahan</p>
          )}

          <div className="space-y-3">
            {customItems.map((ci, idx) => (
              <div key={idx} className="bg-slate-50 rounded-xl border border-slate-200 p-3 space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Item #{idx + 1}</span>
                  <button type="button" onClick={() => removeCustomItem(idx)}
                    className="text-red-400 hover:text-red-600 transition-colors">
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
                <input
                  value={ci.name}
                  onChange={(e) => updateCustomItem(idx, "name", e.target.value)}
                  className="w-full p-2 border rounded-lg text-sm outline-none focus:border-slate-400 bg-white"
                  placeholder="Nama item (contoh: Biaya Transportasi)" />
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-1.5">
                    {[50000, 100000, 200000, 500000].map((preset) => (
                      <button key={preset} type="button"
                        onClick={() => { updateCustomItem(idx, "price", preset); updateCustomItem(idx, "priceCustom", false); }}
                        className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${ci.price === preset && !ci.priceCustom ? "bg-slate-700 text-white border-slate-700" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"}`}>
                        {formatRupiah(preset)}
                      </button>
                    ))}
                    <button type="button"
                      onClick={() => updateCustomItem(idx, "priceCustom", true)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${ci.priceCustom ? "bg-slate-700 text-white border-slate-700" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"}`}>
                      Custom
                    </button>
                  </div>
                  {ci.priceCustom && (
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">Rp</span>
                      <input type="number" value={ci.price}
                        onChange={(e) => updateCustomItem(idx, "price", Number(e.target.value))}
                        className="w-full pl-8 p-2 border rounded-lg text-sm outline-none focus:border-slate-400 bg-white"
                        placeholder="Nominal" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-4">
        <h2 className="font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-purple-500">account_balance</span>
          Metode Pembayaran
        </h2>
        {isLoadingPM ? (
          <div className="text-sm text-slate-400 animate-pulse">Memuat rekening...</div>
        ) : (
          <div className="space-y-2">
            {paymentMethods.map((pm) => (
              <label key={pm.id}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${form.paymentMethodId === pm.id ? "border-purple-400 bg-purple-50" : "border-slate-200 hover:border-slate-300"}`}>
                <input type="radio" name="paymentMethodId" value={pm.id}
                  checked={form.paymentMethodId === pm.id}
                  onChange={() => setForm((prev) => ({ ...prev, paymentMethodId: pm.id }))}
                  className="mt-0.5 accent-purple-600" />
                <div className="text-sm">
                  <div className="font-bold text-slate-800 flex items-center gap-2">
                    {pm.bank_name}
                    {pm.is_default && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">Default</span>}
                  </div>
                  <div className="text-slate-500">a/n {pm.account_name}</div>
                  <div className="text-slate-500 font-mono">{pm.account_number}</div>
                </div>
              </label>
            ))}
          </div>
        )}
        <button type="button" onClick={() => setShowAddPayment(!showAddPayment)}
          className="text-sm text-purple-600 font-bold flex items-center gap-1 hover:text-purple-800 transition-colors">
          <span className="material-symbols-outlined text-[16px]">{showAddPayment ? "remove" : "add"}</span>
          {showAddPayment ? "Batal" : "Tambah Rekening Lain"}
        </button>
        {showAddPayment && (
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
            <p className="text-xs font-bold text-purple-700">Tambah Rekening Baru (Tersimpan ke Database)</p>
            <input value={newPayment.bank_name} onChange={(e) => setNewPayment((p) => ({ ...p, bank_name: e.target.value }))}
              className="w-full p-2 border rounded-lg text-sm outline-none focus:border-purple-400"
              placeholder="Nama Bank (contoh: BCA, BRI)" />
            <input value={newPayment.account_name} onChange={(e) => setNewPayment((p) => ({ ...p, account_name: e.target.value }))}
              className="w-full p-2 border rounded-lg text-sm outline-none focus:border-purple-400"
              placeholder="Atas Nama" />
            <input value={newPayment.account_number} onChange={(e) => setNewPayment((p) => ({ ...p, account_number: e.target.value }))}
              className="w-full p-2 border rounded-lg text-sm outline-none focus:border-purple-400"
              placeholder="Nomor Rekening" />
            <button type="button" onClick={handleAddPaymentMethod} disabled={isSavingPayment}
              className="w-full bg-purple-600 text-white py-2 rounded-xl text-sm font-bold hover:bg-purple-700 transition-colors disabled:opacity-60">
              {isSavingPayment ? "Menyimpan..." : "Simpan Rekening"}
            </button>
          </div>
        )}
      </div>

      {/* Preview Summary */}
      <div className="bg-slate-800 text-white rounded-2xl p-5 space-y-2 text-sm">
        <div className="font-bold text-slate-300 text-xs uppercase tracking-wider mb-3">Preview Invoice</div>
        <div className="flex justify-between">
          <span className="text-slate-400">Invoice #</span>
          <span className="font-mono font-bold text-emerald-400">{form.invoiceNumber || "—"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Customer</span>
          <span className="uppercase">{form.customerName || "—"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Item</span>
          <span>Adm. {getItemLabel()} ({form.workerName || "—"})</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Biaya Admin</span>
          <span>{formatRupiah(form.price)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Ongkos Kirim</span>
          <span>{ongkosKirim > 0 ? formatRupiah(ongkosKirim) : "Rp 0 (Tanpa Ongkir)"}</span>
        </div>
        {customItems.map((ci, idx) => (
          <div key={idx} className="flex justify-between text-slate-300">
            <span className="text-slate-400">{ci.name || `Item #${idx + 1}`}</span>
            <span>{formatRupiah(ci.price || 0)}</span>
          </div>
        ))}
        <div className="border-t border-slate-600 pt-2 mt-2 flex justify-between font-bold text-base">
          <span>Grand Total</span>
          <span className="text-emerald-400">{formatRupiah(grandTotal)}</span>
        </div>
      </div>

      {/* Download / Preview Button */}
      <button
        type="button"
        onClick={handleDownloadPDF}
        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all shadow-lg shadow-emerald-200"
      >
        <span className="material-symbols-outlined text-[20px]">visibility</span>
        Lihat Preview &amp; Download Invoice
      </button>
    </div>
  );
}
