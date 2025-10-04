// src/components/FeaturedWorkers.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { createClient } from '@/utils/supabase/client';
import { type PekerjaProps } from './PekerjaCard';
import { ArrowRightCircle, Briefcase, MapPin, Wallet, Users } from 'lucide-react';

// Fungsi format Rupiah
const formatRupiah = (number: number | null | undefined) => {
  if (!number) return 'N/A';
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
}

// Komponen untuk satu kartu pekerja di dalam slider
const WorkerCard = ({ worker }: { worker: PekerjaProps }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
        <div className="p-6 flex-grow">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <img src={worker.fotoUrl} alt={worker.nama} className="w-16 h-16 rounded-full object-cover border-2 border-gray-100" />
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">{worker.nama}</h3>
                        <p className="text-blue-600 font-semibold">{worker.kategori}</p>
                    </div>
                </div>
                {/* --- PERUBAHAN 1: Tambahkan Suku sebagai Badge --- */}
                <div className="flex flex-col items-end gap-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-800 flex-shrink-0">{worker.status}</span>
                    {worker.suku && (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 flex-shrink-0">{worker.suku}</span>
                    )}
                </div>
            </div>
            <div className="space-y-2 text-gray-600 text-sm">
                <p><Briefcase className="inline-block w-4 h-4 mr-2" /><strong>Pengalaman:</strong> {worker.pengalaman} tahun</p>
                <p><MapPin className="inline-block w-4 h-4 mr-2" /><strong>Kota Asal:</strong> {worker.lokasi}</p>
                <p><Wallet className="inline-block w-4 h-4 mr-2" /><strong>Gaji:</strong> {formatRupiah(worker.gaji)}</p>
            </div>
        </div>
        <Link href={`/pekerja/${worker.id}`} className="block w-full text-center bg-blue-600 text-white font-semibold py-3 px-4 hover:bg-blue-700 transition">
            Lihat Detail
        </Link>
    </div>
);

export default function FeaturedWorkers() {
    const [workers, setWorkers] = useState<PekerjaProps[]>([]);
    const [filter, setFilter] = useState('Semua');
    const supabase = createClient();

    useEffect(() => {
        const fetchWorkers = async () => {
            let query = supabase
                .from('pekerja')
                .select('*')
                .eq('status', 'Tersedia')
                // --- PERUBAHAN 2: Ubah limit menjadi 6 ---
                .limit(6);

            if (filter !== 'Semua') {
                query = query.eq('kategori', filter);
            }
            
            const { data } = await query;
            
            if (data) setWorkers(data);
        };

        fetchWorkers();
    }, [filter]);

    const filters = ['Semua', 'Baby Sitter', 'Perawat Lansia', 'Asisten Rumah Tangga'];

    const viewAllUrl = filter === 'Semua' 
      ? '/pekerja' 
      : `/pekerja?kategori=${encodeURIComponent(filter)}`;

    return (
        <section className="mt-20">
            <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-800">Kandidat Unggulan Kami</h3>
                <p className="mt-2 text-lg text-gray-500">Pilih kategori untuk melihat kandidat terbaik.</p>
            </div>
            
            <div className="flex justify-center flex-wrap gap-2 md:gap-4 my-8">
                {filters.map(f => (
                    <button 
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`filter-btn py-2 px-4 rounded-full font-semibold shadow-sm hover:bg-gray-100 transition ${filter === f ? 'active bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                    >
                        {f === 'Asisten Rumah Tangga' ? 'ART' : f}
                    </button>
                ))}
            </div>

            <div className="relative">
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
                    className="pb-12"
                >
                    {workers.map(worker => (
                        <SwiperSlide key={worker.id} className="p-2 h-auto flex">
                            <WorkerCard worker={worker} />
                        </SwiperSlide>
                    ))}
                    <SwiperSlide className="p-2 h-auto flex">
                        <Link href={viewAllUrl} className="w-full">
                            <div className="cursor-pointer bg-white rounded-xl shadow-lg w-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 h-full">
                                <ArrowRightCircle className="h-12 w-12 text-blue-500"/>
                                <h3 className="mt-4 text-xl font-semibold">Lihat Semua {filter === 'Asisten Rumah Tangga' ? 'ART' : filter}</h3>
                            </div>
                        </Link>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    );
}