import BusinessDetailContainer from "@/views/dashboard/businesses/BusinessDetailContainer";

type PageProps = {
  params: Promise<{ id: string }>;
};

// ======================= BUSINESS DETAIL PAGE =======================
export default async function BusinessDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <BusinessDetailContainer businessId={id} />;
}
