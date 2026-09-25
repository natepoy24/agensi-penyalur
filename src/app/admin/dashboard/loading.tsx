import AdminLoadingModal from "@/components/layout/AdminLoadingModal";

export default function DashboardLoading() {
  return (
    <AdminLoadingModal
      title="Memuat Dashboard Admin..."
      description="Menghubungkan ke server dan mengambil data terbaru..."
    />
  );
}
