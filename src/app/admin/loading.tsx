import AdminLoadingModal from "@/components/layout/AdminLoadingModal";

export default function AdminRootLoading() {
  return (
    <AdminLoadingModal
      title="Memuat Halaman Admin..."
      description="Mohon tunggu sebentar, sedang menyiapkan antarmuka admin..."
    />
  );
}
