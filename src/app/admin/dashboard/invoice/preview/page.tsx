"use client";
// src/app/admin/dashboard/invoice/preview/page.tsx

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface InvoicePreviewData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  customerName: string;
  customerAddress: string;
  itemType: string;
  workerName: string;
  price: number;
  ongkosKirim: number;
  customItems: { name: string; price: number }[];
  paymentMethodId?: number | null;
  paymentMethod: {
    bank_name: string;
    account_name: string;
    account_number: string;
  } | null;
  grandTotal: number;
  isExisting?: boolean;
}

function formatRupiah(n: number) {
  return "Rp " + (n || 0).toLocaleString("id-ID").replace(/,/g, ".");
}

function formatNumber(n: number) {
  return (n || 0).toLocaleString("id-ID").replace(/,/g, ".");
}

function formatDateIndo(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const months = [
    "JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI",
    "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER",
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function formatDateSlash(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return `${String(d.getDate()).padStart(2, "0")} / ${String(d.getMonth() + 1).padStart(2, "0")} / ${d.getFullYear()}`;
}

export default function InvoicePreviewPage() {
  const router = useRouter();
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<InvoicePreviewData | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("invoice_preview_data");
    if (!raw) {
      router.replace("/admin/dashboard/invoice/buat");
      return;
    }
    try {
      const parsed = JSON.parse(raw);
      setData(parsed);
      if (parsed.isExisting) {
        setSaved(true);
      }
    } catch {
      router.replace("/admin/dashboard/invoice/buat");
    }
  }, [router]);

  const handleDownloadPDF = async () => {
    if (!data) return;

    setIsDownloading(true);
    setErrorMessage("");

    try {
      // 1. Simpan ke database jika belum tersimpan
      if (!saved && !data.isExisting) {
        const res = await fetch("/api/invoice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            invoice_number: data.invoiceNumber,
            invoice_date: data.invoiceDate,
            due_date: data.dueDate || null,
            customer_name: data.customerName,
            customer_address: data.customerAddress,
            item_type: data.itemType,
            worker_name: data.workerName,
            price: data.price,
            ongkos_kirim: data.ongkosKirim || 0,
            custom_items: data.customItems || [],
            total: data.grandTotal,
            payment_method_id: data.paymentMethodId || null,
          }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Gagal menyimpan invoice ke database");
        setSaved(true);
        toast.success("Invoice berhasil disimpan ke database!");
        // Simpan cache rincian invoice ke localStorage
        try {
          localStorage.setItem("invoice_items_" + data.invoiceNumber, JSON.stringify(data));
        } catch {}
      }

      // 2. Unduh PDF menggunakan html2pdf.js
      const element = invoiceRef.current;
      if (!element) throw new Error("Element invoice tidak ditemukan");

      const rawNum = data.invoiceNumber || "INVOICE";
      const cleanFilename = rawNum.trim().replace(/[/\\?%*:|"<>]/g, "-");
      const filename = cleanFilename.toLowerCase().endsWith(".pdf") ? cleanFilename : `${cleanFilename}.pdf`;

      const html2pdf = (await import("html2pdf.js")).default;
      const opt = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: filename,
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          scrollY: 0,
          scrollX: 0,
          onclone: (clonedDoc: Document) => {
            // 1. Bersihkan fungsi warna lab(...) dan oklch(...) dari seluruh tag <style>
            try {
              const styleTags = clonedDoc.querySelectorAll("style");
              styleTags.forEach((styleTag) => {
                if (styleTag.textContent && (styleTag.textContent.includes("lab(") || styleTag.textContent.includes("oklch("))) {
                  styleTag.textContent = styleTag.textContent
                    .replace(/lab\([^)]+\)/g, "#000000")
                    .replace(/oklch\([^)]+\)/g, "#000000");
                }
              });
            } catch {}

            // 2. Bersihkan computed colors pada elemen di dalam area render
            const area = clonedDoc.getElementById("invoice-render-area");
            if (!area) return;
            const allElements = [area, ...Array.from(area.querySelectorAll("*"))] as HTMLElement[];
            allElements.forEach((el) => {
              const cs = window.getComputedStyle(el);
              if (cs.color && (cs.color.includes("lab") || cs.color.includes("oklch"))) {
                el.style.color = "#000000";
              }
              if (cs.backgroundColor && (cs.backgroundColor.includes("lab") || cs.backgroundColor.includes("oklch"))) {
                el.style.backgroundColor = el.id === "invoice-render-area" ? "#ffffff" : "transparent";
              }
              if (cs.borderColor && (cs.borderColor.includes("lab") || cs.borderColor.includes("oklch"))) {
                el.style.borderColor = "#cbd5e1";
              }
              if (cs.outlineColor && (cs.outlineColor.includes("lab") || cs.outlineColor.includes("oklch"))) {
                el.style.outlineColor = "transparent";
              }
            });
          },
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait" as const,
        },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };

      // Ambil output sebagai Blob PDF dengan MIME type application/pdf
      const pdfBlob = await html2pdf().set(opt).from(element).outputPdf("blob");
      const blob = new Blob([pdfBlob], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      toast.success("PDF Invoice berhasil diunduh!");
    } catch (err: unknown) {
      const errText = err instanceof Error ? err.message : "Gagal mengunduh PDF";
      setErrorMessage(errText);
      toast.error(errText);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrintBrowser = () => {
    window.print();
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-slate-400 flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-5xl animate-spin text-emerald-600">progress_activity</span>
          <p className="text-sm font-medium">Memuat invoice...</p>
        </div>
      </div>
    );
  }

  const pm = data.paymentMethod;

  return (
    <div className="min-h-screen bg-slate-200">
      {/* ===== PRINT STYLES UNTUK CETAK NATIVE BROWSER ===== */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 8mm 12mm;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
          .invoice-page-container {
            padding: 0 !important;
            margin: 0 !important;
            background: white !important;
          }
          #invoice-render-area {
            width: 100% !important;
            max-width: 100% !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
          }
        }
      `}</style>

      {/* ===== TOOLBAR (tidak ikut cetak/download) ===== */}
      <header className="no-print sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm px-6 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/dashboard/invoice/buat")}
            className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Edit Form
          </button>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 text-sm">Invoice:</span>
            <span className="font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md text-sm font-bold border border-emerald-200">
              {data.invoiceNumber}
            </span>
          </div>
          {saved && (
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              Tersimpan di Database
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {errorMessage && (
            <span className="text-xs text-red-600 font-semibold bg-red-50 border border-red-200 px-3 py-1 rounded-lg">
              {errorMessage}
            </span>
          )}

          <button
            type="button"
            onClick={handlePrintBrowser}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl font-bold text-sm transition-all border border-slate-300 cursor-pointer"
            title="Cetak lewat dialog browser"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            Cetak
          </button>

          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-5 py-2 rounded-xl font-bold text-sm transition-all shadow-md shadow-emerald-200 disabled:opacity-60 cursor-pointer"
          >
            {isDownloading ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                Mengunduh PDF...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">download</span>
                {saved ? "Unduh PDF" : "Simpan & Unduh PDF"}
              </>
            )}
          </button>
        </div>
      </header>

      {/* ===== PREVIEW CANVAS ===== */}
      <div className="invoice-page-container flex justify-center py-8 px-4">
        {/* Card shadow wrapper on screen */}
        <div className="shadow-2xl rounded-xl overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
          {/* Target capture html2pdf (pas 1 halaman A4, bebas oklch/lab) */}
          <div
            id="invoice-render-area"
            ref={invoiceRef}
            style={{
              width: "720px",
              boxSizing: "border-box",
              backgroundColor: "#ffffff",
              color: "#000000",
              fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              padding: "32px 40px",
            }}
          >
            {/* ── HEADER ── */}
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
              <tbody>
                <tr>
                  <td style={{ width: "72px", verticalAlign: "middle", paddingRight: "12px" }}>
                    <Image
                      src="/Image/Logo-jm.png"
                      alt="Logo Jasa Mandiri"
                      width={64}
                      height={64}
                      priority
                      unoptimized
                      style={{ objectFit: "contain" }}
                    />
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    <div style={{ fontSize: "20px", fontWeight: 900, color: "#000000", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                      JASA MANDIRI
                    </div>
                    <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 500, marginTop: "2px" }}>
                      Penyalur tenaga kerja
                    </div>
                  </td>
                  <td style={{ verticalAlign: "middle", textAlign: "right" }}>
                    <div style={{ fontSize: "32px", fontWeight: 900, letterSpacing: "3px", color: "#000000" }}>
                      INVOICE
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ── INFO SECTION ── */}
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "16px" }}>
              <tbody>
                <tr>
                  {/* Recipient */}
                  <td style={{ verticalAlign: "top", width: "58%" }}>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                      Invoice to:
                    </div>
                    <div style={{ fontSize: "15px", fontWeight: 900, textTransform: "uppercase", color: "#000000", marginBottom: "4px" }}>
                      {data.customerName}
                    </div>
                    <div style={{ fontSize: "12px", color: "#334155", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                      {data.customerAddress}
                    </div>
                  </td>

                  {/* Spacer */}
                  <td style={{ width: "4%" }} />

                  {/* Invoice Details */}
                  <td style={{ verticalAlign: "top", width: "38%" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <tbody>
                        <tr>
                          <td style={{ fontSize: "12px", fontWeight: 700, color: "#1e293b", paddingBottom: "6px", paddingRight: "8px", whiteSpace: "nowrap" }}>
                            Invoice#
                          </td>
                          <td style={{ fontSize: "12px", textAlign: "right", paddingBottom: "6px", fontFamily: "monospace", fontWeight: 700, color: "#000000" }}>
                            {data.invoiceNumber}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontSize: "12px", fontWeight: 700, color: "#1e293b", paddingRight: "8px", whiteSpace: "nowrap" }}>
                            Date
                          </td>
                          <td style={{ fontSize: "12px", textAlign: "right", fontWeight: 500, color: "#000000" }}>
                            {formatDateSlash(data.invoiceDate)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ── TOP TABLE BORDER ── */}
            <div style={{ borderTop: "1.5px solid #000000", marginTop: "8px", marginBottom: "8px" }} />

            {/* ── ITEMS TABLE ── */}
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #94a3b8" }}>
                  <th style={{ textAlign: "left", fontSize: "12px", fontWeight: 700, padding: "8px", color: "#000000" }}>
                    Item
                  </th>
                  <th style={{ textAlign: "right", fontSize: "12px", fontWeight: 700, padding: "8px", color: "#000000", whiteSpace: "nowrap", width: "130px" }}>
                    Price
                  </th>
                  <th style={{ textAlign: "right", fontSize: "12px", fontWeight: 700, padding: "8px", color: "#000000", whiteSpace: "nowrap", width: "140px" }}>
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* 1. Administrasi Pengambilan (Hanya ditampilkan jika nominal > 0) */}
                {Number(data.price || 0) > 0 && (
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "10px 8px", fontSize: "12px", color: "#000000" }}>
                      Administrasi Pengambilan {data.itemType} {data.workerName && data.workerName !== "-" ? `(${data.workerName})` : ""}
                    </td>
                    <td style={{ padding: "10px 8px", textAlign: "right", fontSize: "12px", color: "#000000", whiteSpace: "nowrap", verticalAlign: "middle" }}>
                      <div style={{ fontSize: "9px", color: "#64748b", lineHeight: 1, marginBottom: "2px" }}>Rp</div>
                      <div>{formatNumber(data.price)}</div>
                    </td>
                    <td style={{ padding: "10px 8px", textAlign: "right", fontSize: "12px", color: "#000000", fontWeight: 600, whiteSpace: "nowrap", verticalAlign: "middle" }}>
                      {formatRupiah(data.price)}
                    </td>
                  </tr>
                )}

                {/* 2. Ongkos Kirim (bila ada) */}
                {data.ongkosKirim > 0 && (
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "10px 8px", fontSize: "12px", color: "#000000" }}>
                      Ongkos Kirim
                    </td>
                    <td style={{ padding: "10px 8px", textAlign: "right", fontSize: "12px", color: "#000000", whiteSpace: "nowrap", verticalAlign: "middle" }}>
                      <div style={{ fontSize: "9px", color: "#64748b", lineHeight: 1, marginBottom: "2px" }}>Rp</div>
                      <div>{formatNumber(data.ongkosKirim)}</div>
                    </td>
                    <td style={{ padding: "10px 8px", textAlign: "right", fontSize: "12px", color: "#000000", fontWeight: 600, whiteSpace: "nowrap", verticalAlign: "middle" }}>
                      {formatRupiah(data.ongkosKirim)}
                    </td>
                  </tr>
                )}

                {/* 3. Custom Items */}
                {data.customItems.map((ci, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "10px 8px", fontSize: "12px", color: "#000000" }}>
                      {ci.name || `Item Tambahan #${idx + 1}`}
                    </td>
                    <td style={{ padding: "10px 8px", textAlign: "right", fontSize: "12px", color: "#000000", whiteSpace: "nowrap", verticalAlign: "middle" }}>
                      <div style={{ fontSize: "9px", color: "#64748b", lineHeight: 1, marginBottom: "2px" }}>Rp</div>
                      <div>{formatNumber(ci.price || 0)}</div>
                    </td>
                    <td style={{ padding: "10px 8px", textAlign: "right", fontSize: "12px", color: "#000000", fontWeight: 600, whiteSpace: "nowrap", verticalAlign: "middle" }}>
                      {formatRupiah(ci.price || 0)}
                    </td>
                  </tr>
                ))}

                {/* Spacer empty line matching reference template */}
                <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td colSpan={3} style={{ padding: "8px" }} />
                </tr>
              </tbody>
            </table>

            {/* ── SUBTOTAL SECTION ── */}
            <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "8px", paddingBottom: "8px" }}>
              <div style={{ width: "280px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 8px" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#000000" }}>Subtotal</span>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#000000" }}>
                  {formatRupiah(data.grandTotal)}
                </span>
              </div>
            </div>

            {/* ── FOOTER DIVIDER ── */}
            <div style={{ borderTop: "1.5px solid #000000", marginTop: "20px", marginBottom: "16px" }} />

            {/* ── LOWER SECTION (PAYMENT METHOD & TOTAL / TTD) ── */}
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  {/* Left: Payment Method */}
                  <td style={{ verticalAlign: "top", width: "55%" }}>
                    <div style={{ fontWeight: 900, fontSize: "12px", color: "#000000", marginBottom: "6px", letterSpacing: "0.05em" }}>
                      PAYMENT METHOD
                    </div>
                    <div style={{ fontSize: "11.5px", lineHeight: 1.75, color: "#000000" }}>
                      <div style={{ fontWeight: 700 }}>{pm ? pm.bank_name : "BANK MANDIRI"}</div>
                      <div>Account Name: {pm ? pm.account_name : "JASA MANDIRI"}</div>
                      <div style={{ fontWeight: 600 }}>
                        REKENING NO : {pm ? pm.account_number : "1010011900915"}
                      </div>
                      <div>Tenggat Waktu : {formatDateIndo(data.dueDate)}</div>
                    </div>
                    <div style={{ fontSize: "10px", color: "#475569", marginTop: "10px", lineHeight: 1.5, maxWidth: "260px" }}>
                      Apabila pembayaran melebihi tenggat waktu maka pekerja akan di jemput kembali
                    </div>
                  </td>

                  {/* Spacer */}
                  <td style={{ width: "5%" }} />

                  {/* Right: Total & TTD */}
                  <td style={{ verticalAlign: "top", width: "40%", textAlign: "right" }}>
                    {/* Grand Total */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "6px", borderBottom: "2px solid #000000", paddingLeft: "4px", paddingRight: "4px", marginBottom: "16px" }}>
                      <span style={{ fontSize: "15px", fontWeight: 900, color: "#000000" }}>Total</span>
                      <span style={{ fontSize: "17px", fontWeight: 900, color: "#000000" }}>
                        {formatRupiah(data.grandTotal)}
                      </span>
                    </div>

                    {/* Signature Block */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "auto", width: "180px", marginTop: "8px" }}>
                      <div style={{ position: "relative", width: "140px", height: "85px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {/* Stempel (background logo with transparency) */}
                        <Image
                          src="/Image/Logo-jm.png"
                          alt="Stempel Jasa Mandiri"
                          width={80}
                          height={80}
                          priority
                          unoptimized
                          style={{
                            position: "absolute",
                            objectFit: "contain",
                            opacity: 0.4,
                            pointerEvents: "none",
                          }}
                        />
                        {/* Signature */}
                        <Image
                          src="/Image/ttd-atep.png"
                          alt="Tanda Tangan Atep Jaenudin"
                          width={120}
                          height={65}
                          priority
                          unoptimized
                          style={{
                            position: "absolute",
                            objectFit: "contain",
                            zIndex: 10,
                            pointerEvents: "none",
                          }}
                        />
                      </div>
                      <div style={{ width: "150px", borderTop: "1px solid #334155", marginTop: "4px", marginBottom: "4px" }} />
                      <div style={{ fontWeight: 700, fontSize: "10.5px", letterSpacing: "0.05em", color: "#000000", textAlign: "center" }}>
                        ATEP JAENUDIN
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
