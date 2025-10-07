import { NextRequest, NextResponse } from "next/server";
import { removeBackground } from "@imgly/background-removal";

// Edge runtime lebih cepat dan aman di Vercel Free plan
export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    // Ambil file dari request
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "File tidak ditemukan." }, { status: 400 });
    }

    // Konversi file ke ArrayBuffer
    const inputBuffer = Buffer.from(await file.arrayBuffer());

    // Hapus background (client-side engine WASM di Edge)
    const outputBlob = await removeBackground(inputBuffer);
    const outputBuffer = Buffer.from(await outputBlob.arrayBuffer());

    // Ambil background template dari public folder (bukan dari fs)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/Image/templatebg.jpeg`);
    if (!res.ok) throw new Error("Template tidak ditemukan.");
    const templateArrayBuffer = await res.arrayBuffer();
    const templateBuffer = Buffer.from(templateArrayBuffer);

    // Gunakan sharp di edge-safe mode
    const sharpMod = await import("sharp");
    const sharpInstance = sharpMod.default;

    const result = await sharpInstance(templateBuffer)
      .composite([{ input: outputBuffer, gravity: "south" }])
      .toFormat("webp", { quality: 85 })
      .toBuffer();

    // Kirim hasil base64
    const base64 = result.toString("base64");
    return NextResponse.json({
      success: true,
      image: `data:image/webp;base64,${base64}`,
    });
  } catch (error) {
    console.error("❌ Gagal remove background:", error);
    const message = error instanceof Error ? error.message : "Gagal memproses gambar.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
