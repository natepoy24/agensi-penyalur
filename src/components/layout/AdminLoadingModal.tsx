"use client";

import React from "react";

interface AdminLoadingModalProps {
  title?: string;
  description?: string;
}

export default function AdminLoadingModal({
  title = "Memuat Halaman Admin...",
  description = "Sedang menyiapkan data, mohon tunggu sebentar...",
}: AdminLoadingModalProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200 select-none"
    >
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-slate-100 flex flex-col items-center text-center transform animate-in zoom-in-95 duration-200">
        {/* Animated Brand Spinner */}
        <div className="relative flex items-center justify-center mb-5">
          <div className="w-16 h-16 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin"></div>
          <div className="absolute w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-emerald-600/30 font-['Plus_Jakarta_Sans']">
            JM
          </div>
        </div>

        {/* Text Details */}
        <h3 className="text-lg font-bold text-slate-800 tracking-tight font-['Plus_Jakarta_Sans']">
          {title}
        </h3>
        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed max-w-[250px]">
          {description}
        </p>

        {/* Animated Progress Bar Indicator */}
        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-6 overflow-hidden relative">
          <div className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 rounded-full w-2/3 animate-[pulse_1.2s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  );
}
