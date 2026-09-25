"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import AdminLoadingModal from "./AdminLoadingModal";

type LoadingType = "admin" | "public" | null;

interface LoadingOptions {
  title?: string;
  description?: string;
}

export default function NavigationLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [loadingType, setLoadingType] = useState<LoadingType>(null);
  const [modalOptions, setModalOptions] = useState<LoadingOptions>({});
  const [publicProgress, setPublicProgress] = useState(0);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const stopLoading = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setPublicProgress(100);

    // Beri buffer sejenak agar animasi 100% / transisi selesai dengan halus
    const timer = setTimeout(() => {
      setLoadingType(null);
      setPublicProgress(0);
      setModalOptions({});
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const startLoading = useCallback((type: "admin" | "public", options?: LoadingOptions) => {
    // Reset timer sebelumnya jika ada
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setLoadingType(type);
    if (options) setModalOptions(options);

    if (type === "public") {
      setPublicProgress(25);
      progressIntervalRef.current = setInterval(() => {
        setPublicProgress((prev) => {
          if (prev >= 85) {
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
            return 85;
          }
          return prev + Math.floor(Math.random() * 15 + 10);
        });
      }, 250);
    }

    // Safety timeout: jangan biarkan loading macet selamanya jika navigasi gagal/dibatalkan
    timeoutRef.current = setTimeout(() => {
      stopLoading();
    }, 8000);
  }, [stopLoading]);

  // Pantau perubahan URL / searchParams untuk menandai bahwa halaman baru telah selesai dimuat
  useEffect(() => {
    stopLoading();
  }, [pathname, searchParams, stopLoading]);

  // Event listener link click & popstate
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      // Abaikan jika klik dimodifikasi (misal buka tab baru dengan Ctrl/Cmd) atau bukan klik kiri
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref) return;

      // Abaikan link hash, tel, mailto, javascript, external, atau download
      if (
        rawHref.startsWith("#") ||
        rawHref.startsWith("tel:") ||
        rawHref.startsWith("mailto:") ||
        rawHref.startsWith("javascript:") ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      ) {
        return;
      }

      try {
        const currentUrl = new URL(window.location.href);
        const targetUrl = new URL(anchor.href, window.location.href);

        // Hanya tangani link internal domain yang sama
        if (targetUrl.origin !== currentUrl.origin) return;

        // Abaikan jika mengarah ke halaman & search query yang sama persis
        if (targetUrl.pathname === currentUrl.pathname && targetUrl.search === currentUrl.search) {
          return;
        }

        const isAdmin = targetUrl.pathname.startsWith("/admin") || currentUrl.pathname.startsWith("/admin");
        startLoading(isAdmin ? "admin" : "public");
      } catch {
        // Abaikan URL parsing error
      }
    };

    const handlePopState = () => {
      const isAdmin = window.location.pathname.startsWith("/admin");
      startLoading(isAdmin ? "admin" : "public");
    };

    const handleCustomStart = (e: Event) => {
      const customEvent = e as CustomEvent<{ target?: "admin" | "public"; title?: string; description?: string }>;
      const target = customEvent.detail?.target || (window.location.pathname.startsWith("/admin") ? "admin" : "public");
      startLoading(target, {
        title: customEvent.detail?.title,
        description: customEvent.detail?.description,
      });
    };

    const handleCustomStop = () => {
      stopLoading();
    };

    document.addEventListener("click", handleAnchorClick, true);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("app:loading:start", handleCustomStart as EventListener);
    window.addEventListener("app:loading:stop", handleCustomStop);

    return () => {
      document.removeEventListener("click", handleAnchorClick, true);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("app:loading:start", handleCustomStart as EventListener);
      window.removeEventListener("app:loading:stop", handleCustomStop);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [startLoading, stopLoading]);

  return (
    <>
      {/* 1. ADMIN LOADING MODAL */}
      {loadingType === "admin" && (
        <AdminLoadingModal
          title={modalOptions.title || "Memuat Halaman Admin..."}
          description={modalOptions.description || "Sedang menyiapkan data, mohon tunggu sebentar..."}
        />
      )}

      {/* 2. PUBLIC TOP PROGRESS BAR */}
      {loadingType === "public" && publicProgress > 0 && (
        <div
          role="progressbar"
          aria-valuenow={publicProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          className="fixed top-0 left-0 right-0 h-1 z-[99999] pointer-events-none transition-opacity duration-300"
        >
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 transition-all duration-300 ease-out shadow-[0_0_12px_rgba(16,185,129,0.8)]"
            style={{ width: `${publicProgress}%` }}
          />
        </div>
      )}
    </>
  );
}
