// supabase/functions/process-worker-image/index.ts

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
// DIUBAH: Impor 'env' untuk konfigurasi
import { pipeline, RawImage, env } from 'npm:@xenova/transformers';
import { Image } from 'https://deno.land/x/imagescript@1.2.15/mod.ts';

// --- KONFIGURASI PENTING UNTUK LINGKUNGAN DENO/SUPABASE ---
// 1. Matikan pencarian model lokal, kita hanya akan mengambil dari Hugging Face Hub.
env.allowLocalModels = false;
// 2. Paksa penggunaan backend WASM dan matikan multithreading untuk menghindari error
//    'Shared Memory' dan 'native .node module'. Ini adalah kunci utamanya.
env.backends.onnx.wasm.numThreads = 1;
// ---------------------------------------------------------

// GANTI DENGAN URL PUBLIK DARI SUPABASE STORAGE ANDA
const TEMPLATE_URL = 'https://qhuayxqevvznebdrowax.supabase.co/storage/v1/object/public/function-assets/templatebg.jpeg';

// Singleton pattern untuk pipeline
class SegmentationPipeline {
  static task = 'image-segmentation';
  static model = 'Xenova/u2net';
  static instance: any = null;

  static async getInstance(progress_callback: any = null) {
    if (this.instance === null) {
      this.instance = await pipeline(this.task, this.model, { progress_callback });
    }
    return this.instance;
  }
}

serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { image: croppedImageBase64 } = await req.json();
    if (!croppedImageBase64) throw new Error("Image data is required");

    const segmenter = await SegmentationPipeline.getInstance();
    const image = await RawImage.fromURL(croppedImageBase64);
    const masks = await segmenter(image);

    const originalImage = await Image.decode(await image.toTensor().toImageData());
    const backgroundMaskData = masks.find((m: any) => m.label === 'background')?.mask;
    if (!backgroundMaskData) throw new Error("Background mask not found in model output.");
    
    const maskImage = await Image.decode(await backgroundMaskData.toTensor().toImageData());
    originalImage.composite(maskImage, 0, 0, { mode: Image.CompositeMode.DSTATOP });
    const transparentForegroundBuffer = await originalImage.encode(0);

    const templateResponse = await fetch(TEMPLATE_URL);
    if (!templateResponse.ok) throw new Error(`Failed to fetch template: ${templateResponse.statusText}`);
    const templateBgBuffer = await templateResponse.arrayBuffer();

    const [bgImage, fgImage] = await Promise.all([
      Image.decode(templateBgBuffer),
      Image.decode(transparentForegroundBuffer)
    ]);

    fgImage.resize(bgImage.width * 0.8, Image.RESIZE_AUTO);
    bgImage.composite(fgImage, (bgImage.width - fgImage.width) / 2, (bgImage.height - fgImage.height) / 2);
    
    const finalImageBuffer = await bgImage.encode(0.9, Image.MIME_WEBP);

    return new Response(finalImageBuffer, {
      headers: { ...corsHeaders, 'Content-Type': 'image/webp' },
    });

  } catch (error) {
    console.error('Error processing image:', error);
    return new Response(JSON.stringify({ error: 'Failed to process image', details: error.message }), { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
})