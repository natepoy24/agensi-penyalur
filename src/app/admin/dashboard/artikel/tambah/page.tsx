// src/app/admin/dashboard/artikel/tambah/page.tsx
"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { addArtikel } from "@/app/actions";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
import Link from "next/link";
import TagSelector from "@/components/TagSelector";

const LexicalEditor = dynamic(() => import("@/components/LexicalEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-96 flex items-center justify-center bg-slate-50 animate-pulse rounded-xl border border-slate-100">
      <p className="text-slate-400 font-medium">Memuat Editor Menulis...</p>
    </div>
  ),
});

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-8 py-2.5 text-sm font-bold bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
    >
      <span className="material-symbols-outlined text-[18px]">publish</span>
      {pending ? "Menyimpan..." : "Simpan Artikel"}
    </button>
  );
}

export default function TambahArtikelPage() {
  const initialState = { error: undefined };
  const [state, formAction] = useActionState(addArtikel, initialState);

  const editorContentRef = useRef("");
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  const handleTitleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        toast.error("Ukuran foto maksimal adalah 3MB.");
        e.target.value = "";
        return;
      }
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handlePreview = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const judul = formData.get("judul") as string;
    const konten = editorContentRef.current;

    if (!judul || !konten) {
      toast.error("Judul dan Konten harus diisi untuk melihat pratinjau.");
      return;
    }

    const previewData = { judul, konten, gambarUrl: coverPreview || "/Image/placeholder.png" };
    sessionStorage.setItem("articlePreview", JSON.stringify(previewData));
    window.open("/admin/dashboard/artikel/preview", "_blank");
  };

  const handleFormSubmit = (formData: FormData) => {
    const imageFile = formData.get("gambar_utama") as File;
    if (imageFile && imageFile.size > 3 * 1024 * 1024) {
      toast.error("Ukuran foto maksimal adalah 3MB. Silakan kompres foto Anda.");
      return;
    }

    if (!editorContentRef.current || editorContentRef.current.length < 50) {
      toast.error("Konten artikel tidak boleh kosong.");
      return;
    }

    formData.set("konten", editorContentRef.current);
    formAction(formData);
  };

  return (
    <div className="font-['Inter'] relative w-full max-w-[1400px] mx-auto">
      <form ref={formRef} action={handleFormSubmit}>

        <header className="sticky top-0 z-40 bg-slate-50/90 backdrop-blur-md flex justify-between items-center py-4 border-b border-slate-200 mb-8 -mx-8 px-8">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard/artikel" className="text-slate-400 hover:text-emerald-600 transition-colors flex items-center justify-center p-2 hover:bg-slate-200 rounded-full">
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-600">Artikel Baru</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">edit_document</span> Draft
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={handlePreview} className="px-6 py-2.5 text-sm font-semibold text-slate-600 hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all shadow-sm">
              Pratinjau
            </button>
            <SubmitButton />
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 w-full bg-white min-h-[800px] rounded-2xl shadow-sm border border-slate-100 p-10 md:p-16">
            <textarea name="judul" required rows={1} onInput={handleTitleInput} placeholder="Judul Artikel..." className="w-full text-4xl md:text-5xl font-extrabold font-['Plus_Jakarta_Sans'] text-slate-800 placeholder:text-slate-200 bg-transparent border-none resize-none overflow-hidden leading-tight focus:ring-0 p-0 mb-8 transition-colors" />
            <div className="prose prose-lg max-w-none prose-emerald">
              <LexicalEditor onChange={(value) => (editorContentRef.current = value)} />
            </div>
          </div>

          <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-6 sticky top-24">
            {/* Kartu Gambar Utama */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Gambar Utama (Cover)</label>
              <div onClick={() => fileInputRef.current?.click()} className="group relative aspect-[16/9] bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl overflow-hidden cursor-pointer hover:border-emerald-500 transition-all flex flex-col items-center justify-center">
                {coverPreview ? (
                  <>
                    <img src={coverPreview} alt="Cover Preview" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                      <span className="material-symbols-outlined text-white text-3xl">change_circle</span>
                      <span className="text-white text-xs font-medium mt-1">Ganti Foto</span>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-4xl text-slate-300 group-hover:text-emerald-500 transition-colors mb-2">add_photo_alternate</span>
                    <span className="text-xs font-medium text-slate-400 group-hover:text-emerald-600 transition-colors">Klik untuk Pilih Gambar</span>
                  </>
                )}
                <input ref={fileInputRef} id="gambar_utama" name="gambar_utama" type="file" className="hidden" accept="image/png, image/jpeg, image/jpg, image/webp" onChange={handleFileChange} required />
              </div>
              <p className="text-[10px] text-slate-400 mt-3 text-center">Format: JPG, PNG, WEBP (Maks. 3MB)</p>
            </div>

            {/* TagSelector */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Tags</label>
              <TagSelector defaultValue="" />
            </div>

            {/* KARTU STATUS PUBLIKASI */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Pengaturan Publikasi</label>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 ml-1">Status Visibilitas</label>
                  <select name="kategori" required className="w-full bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 text-slate-700 py-3 px-4 font-medium cursor-pointer">
                    <option value="true">Publish Sekarang</option>
                    <option value="false">Simpan sebagai Draft</option>
                  </select>
                </div>
              </div>
            </div>

          </aside>
        </div>
      </form>
    </div>
  );
}