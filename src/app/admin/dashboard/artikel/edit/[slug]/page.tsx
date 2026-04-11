// src/app/admin/dashboard/artikel/edit/[slug]/page.tsx
"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { updateArtikel } from "@/app/actions";
import { createClient } from "@/utils/supabase/client";
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
    <button type="submit" disabled={pending} className="px-8 py-2.5 text-sm font-bold bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2">
      <span className="material-symbols-outlined text-[18px]">publish</span>
      {pending ? "Menyimpan Perubahan..." : "Update Artikel"}
    </button>
  );
}

export default function EditArtikelPage() {
  const { slug } = useParams();
  const router = useRouter();
  const supabase = createClient();

  const initialState = { error: undefined };
  const [state, formAction] = useActionState(updateArtikel, initialState);

  const editorContentRef = useRef("");
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State Data Artikel
  const [article, setArticle] = useState<any>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Ambil data artikel dari database
  useEffect(() => {
    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from("artikel")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error || !data) {
        toast.error("Artikel tidak ditemukan!");
        router.push("/admin/dashboard/artikel");
        return;
      }

      setArticle(data);
      setCoverPreview(data.gambar_url);

      // Mengubah Object JSON Supabase menjadi string untuk Lexical
      editorContentRef.current = typeof data.konten === 'string' ? data.konten : JSON.stringify(data.konten);
      setIsLoading(false);
    };

    fetchArticle();
  }, [slug]);

  useEffect(() => {
    if (state?.error) toast.error(state.error);
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

  const handleFormSubmit = (formData: FormData) => {
    if (!editorContentRef.current || editorContentRef.current.length < 50) {
      toast.error("Konten artikel tidak boleh kosong.");
      return;
    }
    formData.set("konten", editorContentRef.current);
    formAction(formData);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[70vh]"><div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="font-['Inter'] relative w-full max-w-[1400px] mx-auto">
      <form ref={formRef} action={handleFormSubmit}>
        {/* Hidden inputs untuk mengirim ID dan Gambar Lama */}
        <input type="hidden" name="id" defaultValue={article?.id} />
        <input type="hidden" name="gambar_url_lama" defaultValue={article?.gambar_url || ""} />

        <header className="sticky top-0 z-40 bg-slate-50/90 backdrop-blur-md flex justify-between items-center py-4 border-b border-slate-200 mb-8 -mx-8 px-8">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard/artikel" className="text-slate-400 hover:text-emerald-600 transition-colors flex items-center justify-center p-2 hover:bg-slate-200 rounded-full">
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-600">Edit Artikel</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              <span className="text-xs font-bold text-emerald-600">{article.kategori ? "Terpublikasi" : "Draft"}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <SubmitButton />
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 w-full bg-white min-h-[800px] rounded-2xl shadow-sm border border-slate-100 p-10 md:p-16">
            <textarea name="judul" defaultValue={article.judul} required rows={1} onInput={handleTitleInput} placeholder="Judul Artikel..." className="w-full text-4xl md:text-5xl font-extrabold font-['Plus_Jakarta_Sans'] text-slate-800 placeholder:text-slate-200 bg-transparent border-none resize-none overflow-hidden leading-tight focus:ring-0 p-0 mb-8 transition-colors" />
            <div className="prose prose-lg max-w-none prose-emerald">
              <LexicalEditor
                initialContent={editorContentRef.current}
                onChange={(value) => (editorContentRef.current = value)}
              />
            </div>
          </div>

          <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-6 sticky top-24">
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
                  <span className="material-symbols-outlined text-4xl text-slate-300">add_photo_alternate</span>
                )}
                {/* File input tidak required karena kita pakai gambar lama jika tidak diubah */}
                <input ref={fileInputRef} id="gambar_utama" name="gambar_utama" type="file" className="hidden" accept="image/png, image/jpeg, image/jpg, image/webp" onChange={handleFileChange} />
              </div>
            </div>

            {/* TagSelector */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Tags</label>
              <TagSelector defaultValue={article.tags || ""} />
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Pengaturan Publikasi</label>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 ml-1">Status Visibilitas</label>
                  <select name="kategori" defaultValue={article.kategori ? "true" : "false"} required className="w-full bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 text-slate-700 py-3 px-4 font-medium cursor-pointer">
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