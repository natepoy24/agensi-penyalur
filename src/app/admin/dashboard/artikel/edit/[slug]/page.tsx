"use client";

import { useActionState, useEffect, useState, useRef } from "react";
import { useFormStatus } from "react-dom";
import { updateArtikel } from "@/app/actions";
import toast from "react-hot-toast";
import { UploadCloud } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { notFound, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";

// Tipe data untuk artikel
interface Artikel {
  id: string;
  judul: string;
  konten: string; // Ini akan menjadi string JSON dari Lexical
  gambar_url: string;
  slug: string;
}

interface FormState {
  error?: string;
}

// Komponen Tombol Submit
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-slate-400"
    >
      {pending ? "Menyimpan..." : "Simpan Perubahan"}
    </button>
  );
}

// Dynamic import untuk LexicalEditor
const LexicalEditor = dynamic(() => import("@/components/LexicalEditor"), {
  ssr: false,
  loading: () => <p>Memuat editor...</p>,
});

export default function EditArtikelPage() {
  const params = useParams<{ slug: string }>();
  const initialState: FormState = { error: undefined };
  const [state, formAction] = useActionState(updateArtikel, initialState);
  const [artikel, setArtikel] = useState<Artikel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editorState, setEditorState] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtikel = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("artikel")
        .select("*")
        .eq("slug", params.slug)
        .single();

      if (error || !data) {
        notFound();
      } else {
        setArtikel(data);
        // Konten dari DB adalah string JSON, kita bisa langsung pass ke initialContent
        setEditorState(JSON.stringify(data.konten));
        setImagePreview(data.gambar_url);
      }
      setIsLoading(false);
    };

    fetchArtikel();
  }, [params.slug]);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  const handleEditorChange = (newEditorState: string) => {
    setEditorState(newEditorState);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return <div className="container mx-auto p-8 pt-24">Memuat data artikel...</div>;
  }

  if (!artikel) {
    return notFound();
  }

  return (
    <div className="container mx-auto p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">
          Edit Artikel
        </h1>
        <form
          action={formAction}
          className="space-y-6 bg-white p-8 rounded-lg shadow-md"
        >
          <input type="hidden" name="id" value={artikel.id} />
          <input
            type="hidden"
            name="current_gambar_url"
            value={artikel.gambar_url}
          />

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
              defaultValue={artikel.judul}
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800">
              Konten
            </label>
            {editorState && (
              <>
                <LexicalEditor
                  onChange={handleEditorChange}
                  initialContent={editorState}
                />
                <input type="hidden" name="konten" value={editorState} />
              </>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800">
              Gambar Utama (Ganti jika perlu)
            </label>
            <label
              htmlFor="gambar_utama"
              className={`mt-1 flex justify-center w-full rounded-lg border-2 border-dashed px-6 py-10 transition-colors border-slate-300 hover:border-slate-400`}
            >
              <div className="text-center">
                {imagePreview && (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={200}
                    height={150}
                    className="mx-auto mb-4 max-h-40 w-auto object-contain"
                  />
                )}
              </div>
              <input
                ref={fileInputRef}
                id="gambar_utama"
                name="gambar_utama"
                type="file"
                className="sr-only"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t">
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}