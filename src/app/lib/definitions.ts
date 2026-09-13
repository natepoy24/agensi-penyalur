// src/app/lib/definitions.ts

export type FormState = {
  success?: string;
  error?: string;
};

export interface LowonganKerja {
  id: number;
  created_at?: string;
  updated_at?: string;
  judul: string;
  slug: string;
  kategori: string;
  tipe_sistem_kerja: string;
  tipe_pekerjaan: string;
  lokasi: string;
  provinsi: string;
  gaji_min: number;
  gaji_max: number;
  deskripsi: string;
  persyaratan: string[];
  fasilitas: string[];
  is_evergreen: boolean;
  status: 'Buka' | 'Tutup' | string;
  date_posted?: string;
  valid_through?: string;
}