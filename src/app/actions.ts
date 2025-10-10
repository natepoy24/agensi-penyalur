// src/app/actions.ts
"use server";

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { type FormState } from './lib/definitions';
import slugify from 'slugify';

// --- Perubahan di sini fungsi tambah pekerja: ganti 'any' dengan 'FormState' ---
export async function addPekerja(prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createClient();

  const bahasaAsing = formData.getAll('bahasa_asing') as string[];
  const bahasaLain = formData.get('bahasa_lain_text') as string;
  if (bahasaLain) {
    bahasaAsing.push(bahasaLain);
  }

  // Proses masakan khusus
  const masakanKhusus = formData.get('masakan_khusus_radio') === 'true'
    ? formData.get('masakan_khusus_text') as string
    : null;

  const fotoFile = formData.get('fotoUrl') as File;
  const nama =formData.get('nama') as string;
  const slug = slugify(nama, {lower: true, strict: true, remove: /[*+~.()'"!:@]/g});
  const dataToInsert = {
    nama: formData.get('nama') as string,
    slug: slug,
    kategori: formData.get('kategori') as string,
    status: formData.get('status') as string,
    pengalaman: parseInt(formData.get('pengalaman') as string, 10),
    lokasi: formData.get('lokasi') as string,
    deskripsi: formData.get('deskripsi') as string,
    gaji: parseInt(formData.get('gaji') as string, 10),
    keterampilan: formData.get('keterampilan') as string,
    umur: parseInt(formData.get('umur') as string, 10), 
    suku: formData.get('suku') as string,
    kekurangan: formData.get('kekurangan') as string,
    bisa_bawa_motor: formData.get('bisa_bawa_motor') === 'true',
    takut_anjing: formData.get('takut_anjing') === 'true',
    status_perkawinan: formData.get('status_perkawinan') as string,
    agama: formData.get('agama') as string,
    bahasa_asing: bahasaAsing, // Simpan sebagai array
    bisa_masak_babi: formData.get('bisa_masak_babi') === 'true',
    masakan_khusus: masakanKhusus,
    keahlian_khusus: formData.get('keahlian_khusus') as string,
    
  };

  if (!fotoFile || fotoFile.size === 0) {
    return { error: 'Foto pekerja wajib diisi.' };
  }

  const filePath = `public/${Date.now()}_${fotoFile.name}`;
  const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, fotoFile);
  if (uploadError) { return { error: `Gagal mengunggah foto: ${uploadError.message}` }; }

  const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(filePath);
  const fotoUrl = publicUrlData.publicUrl;

  const { error: insertError } = await supabase.from('pekerja').insert([{ ...dataToInsert, fotoUrl }]);
  if (insertError) { return { error: `Gagal menyimpan data: ${insertError.message}` }; }
  
  revalidatePath('/admin/dashboard'); 
  redirect('/admin/dashboard?message=Data pekerja berhasil ditambahkan!'); 

}

// --- Perubahan di sini fungsi edit pekerja: ganti 'any' dengan 'FormState' ---
export async function updatePekerja(prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = await createClient();

  const bahasaAsing = formData.getAll('bahasa_asing') as string[];
  const bahasaLain = formData.get('bahasa_lain_text') as string;
  if (bahasaLain) {
    bahasaAsing.push(bahasaLain);
  }

  // Proses masakan khusus
  const masakanKhusus = formData.get('masakan_khusus_radio') === 'true'
    ? formData.get('masakan_khusus_text') as string
    : null;

  const id = formData.get('id') as string;
  const fotoFile = formData.get('fotoUrl') as File;
  let fotoUrl = formData.get('currentFotoUrl') as string;
  const nama= formData.get('nama') as string;
  const slug = slugify(nama, { lower: true, strict: true, remove: /[*+~.()'"!:@]/g });

  if (fotoFile && fotoFile.size > 0) {
    const filePath = `public/${Date.now()}_${fotoFile.name}`;
    const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, fotoFile);
    if (uploadError) { return { error: `Gagal mengunggah foto baru: ${uploadError.message}` }; }
    fotoUrl = supabase.storage.from('avatars').getPublicUrl(filePath).data.publicUrl;
  }

  const dataToUpdate = {
    nama: formData.get('nama') as string,
    slug: slug,
    kategori: formData.get('kategori') as string,
    status: formData.get('status') as string,
    pengalaman: parseInt(formData.get('pengalaman') as string, 10),
    lokasi: formData.get('lokasi') as string,
    deskripsi: formData.get('deskripsi') as string,
    gaji: parseInt(formData.get('gaji') as string, 10),
    keterampilan: formData.get('keterampilan') as string,
    fotoUrl: fotoUrl,
    umur: parseInt(formData.get('umur') as string, 10), 
    suku: formData.get('suku') as string, 
    kekurangan: formData.get('kekurangan') as string,
    bisa_bawa_motor: formData.get('bisa_bawa_motor') === 'true',
    takut_anjing: formData.get('takut_anjing') === 'true',
    status_perkawinan: formData.get('status_perkawinan') as string,
    agama: formData.get('agama') as string,
    bahasa_asing: bahasaAsing, // Simpan sebagai array
    bisa_masak_babi: formData.get('bisa_masak_babi') === 'true',
    masakan_khusus: masakanKhusus,
    keahlian_khusus: formData.get('keahlian_khusus') as string,
  };

  const { error: updateError } = await supabase.from('pekerja').update(dataToUpdate).eq('id', id);
  if (updateError) { return { error: `Gagal memperbarui data: ${updateError.message}` }; }

  revalidatePath('/admin/dashboard');
  revalidatePath(`/pekerja/${id}`);
  // Kirim pesan sukses melalui URL
  redirect('/admin/dashboard?message=Data pekerja berhasil diperbarui!');
}

//hapus pekerja//
export async function deletePekerjaById(id: number, fotoUrl: string | null) {
  "use server";

  const supabase = await createClient();

  // Hapus dari database
  const { error: deleteError } = await supabase.from('pekerja').delete().eq('id', id);

  if (deleteError) {
    console.error('Direct Delete Error:', deleteError);
    throw new Error(`Gagal menghapus data dari database: ${deleteError.message}`);
  }

  // Hapus dari storage hanya jika fotoUrl ada dan valid
  if (fotoUrl && fotoUrl.includes('/avatars/')) {
    const filePath = fotoUrl.split('/avatars/')[1];
    if (filePath) {
      const { error: storageError } = await supabase.storage.from('avatars').remove([filePath]);
      
      // JIKA GAGAL HAPUS FILE, LEMPAR ERROR
      if (storageError) {
        console.error("Storage Delete Error:", storageError.message);
        throw new Error(`Data berhasil dihapus, tapi gagal hapus file di storage: ${storageError.message}`);
      }
    }
  }

  revalidatePath('/admin/dashboard');
  redirect('/admin/dashboard?message=Data pekerja berhasil dihapus!');
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  
  // Redirect ke halaman utama setelah logout
  redirect('/?message=Logout berhasil!');
}