import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import removeBackground from 'npm:@imgly/background-removal'
// Kita gunakan library 'canvas' untuk menggabungkan gambar
import { createCanvas, loadImage } from 'npm:canvas'

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { image: croppedImageBase64 } = await req.json();
    if (!croppedImageBase64) {
      return new Response(JSON.stringify({ error: 'Image data is required' }), { status: 400 });
    }

    // 1. HAPUS BACKGROUND dari gambar yang sudah di-crop
    const imageBlob = await fetch(croppedImageBase64).then(res => res.blob());
    const transparentForegroundBlob = await removeBackground(imageBlob);
    const transparentForegroundBuffer = await transparentForegroundBlob.arrayBuffer();

    // 2. BACA TEMPLATE BACKGROUND
    // Pastikan file ini ada di dalam folder function Anda
    // Path: supabase/functions/process-worker-image/templatebg.jpeg
    const templateBgBuffer = await Deno.readFile('./templatebg.jpeg');

    // 3. GABUNGKAN GAMBAR MENGGUNAKAN CANVAS
    const bgImage = await loadImage(templateBgBuffer);
    const fgImage = await loadImage(new Uint8Array(transparentForegroundBuffer));

    // Buat canvas seukuran background
    const canvas = createCanvas(bgImage.width, bgImage.height);
    const ctx = canvas.getContext('2d');

    // Gambar background terlebih dahulu
    ctx.drawImage(bgImage, 0, 0);

    // Gambar foreground (hasil remove bg) di atasnya
    // Anda bisa mengatur posisi dan ukurannya di sini jika perlu
    ctx.drawImage(fgImage, 0, 0, bgImage.width, bgImage.height);

    // 4. KEMBALIKAN HASIL AKHIR
    // Kita kembalikan sebagai JPEG
    const finalImageBuffer = canvas.toBuffer('image/jpeg');

    return new Response(finalImageBuffer, {
      headers: { 'Content-Type': 'image/jpeg' },
      status: 200,
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to process image' }), { status: 500 });
  }
})