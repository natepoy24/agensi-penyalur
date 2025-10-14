"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

export default function GoogleAnalytics() {
  const pathname = usePathname();

  // Jangan tampilkan skrip di halaman admin
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-W87TWMQ12J"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-W87TWMQ12J');
        `}
      </Script>
    </>
  );
}