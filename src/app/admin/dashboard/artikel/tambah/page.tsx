// src/app/admin/dashboard/artikel/tambah/page.tsx
"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { addArtikel } from "@/app/actions";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

// Impor komponen editor Lexical yang baru
const LexicalEditor = dynamic(() => import("@/components/LexicalEditor"), {
  ssr: false,
  loading: () => <p>Memuat Editor...</p>,
});

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-2 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-700 disabled:bg-slate-400"
    >
      {pending ? "Menerbitkan..." : "Terbitkan Artikel"}
    </button>
  );
}

export default function TambahArtikelPage() {
  const initialState = { error: undefined };
  const [state, formAction] = useActionState(addArtikel, initialState);

  const editorContentRef = useRef("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  const handlePreview = () => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const judul = formData.get("judul") as string;
    const imageFile = formData.get("gambar_utama") as File;
    const konten = editorContentRef.current;

    if (!judul || !konten) {
      toast.error("Judul dan Konten harus diisi untuk melihat pratinjau.");
      return;
    }

    const gambarUrl = imageFile && imageFile.size > 0 ? URL.createObjectURL(imageFile) : "/Image/placeholder.png";

    const previewData = { judul, konten, gambarUrl };
    sessionStorage.setItem("articlePreview", JSON.stringify(previewData));
    window.open("/admin/dashboard/artikel/preview", "_blank");
  };
  
  return (
    <div className="container mx-auto p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">
          Tulis Artikel Baru
        </h1>
        <form
          ref={formRef}
          action={(formData) => {
            formData.set("konten", editorContentRef.current);
            formAction(formData);
          }}
          className="space-y-6 bg-white p-8 rounded-lg shadow-md"
        >
          {/* Judul Artikel */}
          <div>
            <label
              htmlFor="judul"
              className="block text-sm font-semibold text-slate-800"
            >
              Judul Artikel
            </label>
            <input
              type="text"
              id="judul"
              name="judul"
              required
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900"
            />
          </div>

          {/* Konten Artikel */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1">
              Konten
            </label>
            <LexicalEditor
              onChange={(value) => (editorContentRef.current = value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800">
              Gambar Utama
            </label>
            <input
              id="gambar_utama"
              name="gambar_utama"
              type="file"
              className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={handlePreview}
              className="px-6 py-2 bg-slate-500 text-white font-semibold rounded-md hover:bg-slate-600"
            >
              Pratinjau
            </button>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}