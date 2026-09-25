export default function PublicRootLoading() {
  return (
    <div
      role="progressbar"
      aria-label="Memuat halaman"
      className="fixed top-0 left-0 right-0 h-1 z-[99999] pointer-events-none"
    >
      <div className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 w-full animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
    </div>
  );
}
