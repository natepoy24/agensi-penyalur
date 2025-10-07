import { NextRequest, NextResponse } from "next/server";
import { removeBackground } from "@imgly/background-removal";
import sharp from "sharp";
import path from "path";
import fs from "fs";

export const runtime = "nodejs"; // Pastikan dijalankan di server, bukan edge

export async function POST(req: NextRequest) {
  try {
    // Ambil file dari request
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "File tidak ditemukan." }, { status: 400 });
    }

    // Convert File ke Buffer
    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    // Jalankan proses remove background
    const outputBlob = await removeBackground(inputBuffer, {
      progress: (p) => console.log(`Progress: ${Math.round(Number(p) * 100)}%`)
    });

    const outputBuffer = Buffer.from(await outputBlob.arrayBuffer());

    // Gabungkan dengan template background
    const templatePath = path.join(process.cwd(), "public", "Image", "templatebg.jpeg");
    const templateBuffer = fs.readFileSync(templatePath);

    const result = await sharp(templateBuffer)
      .composite([
        {
          input: outputBuffer,
          gravity: "south", // posisi bawah tapi tetap tengah
        },
      ])
      .toFormat("webp", { quality: 85 })
      .toBuffer();

    // Return hasil base64
    const base64 = result.toString("base64");
    return NextResponse.json({
      success: true,
      image: `data:image/webp;base64,${base64}`,
    });
  } catch (error: any) {
    console.error("❌ Gagal remove background:", error);
    return NextResponse.json(
      { error: error.message || "Gagal memproses gambar." },
      { status: 500 }
    );
  }
}
