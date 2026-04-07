import { notFound } from "next/navigation";
import BusinessDetailView from "@/views/dashboard/businesses/BusinessDetailView";
import { getBusinessById } from "@/views/dashboard/businesses/mock-data";

type PageProps = {
  params: Promise<{ id: string }>;
};

// ======================= BUSINESS DETAIL PAGE =======================
export default async function BusinessDetailPage({ params }: PageProps) {
  const { id } = await params;
  const business = getBusinessById(id);
  if (!business) {
    notFound();
  }
  return <BusinessDetailView business={business} />;
}
