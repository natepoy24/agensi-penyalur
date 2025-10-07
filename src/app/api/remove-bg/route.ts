import { NextRequest, NextResponse } from "next/server";
import { removeBackground } from "@imgly/background-removal";
import sharp from "sharp";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "File tidak ditemukan." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    // Jalankan proses background removal
    const outputBlob = await removeBackground(inputBuffer, {
      progress: (p) => {
            if (typeof p === "number" && !isNaN(p)) {
                console.log(`Progress: ${Math.round(p * 100)}%`);
                 } else {
              console.log("Progress update:", p);
            }
        }

    });

    const outputBuffer = Buffer.from(await outputBlob.arrayBuffer());

    // Gabungkan dengan template background
    const templatePath = path.join(process.cwd(), "public", "Image", "templatebg.jpeg");
    const templateBuffer = fs.readFileSync(templatePath);

    const result = await sharp(templateBuffer)
      .composite([{ input: outputBuffer, gravity: "south" }])
      .toFormat("webp", { quality: 85 })
      .toBuffer();

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
