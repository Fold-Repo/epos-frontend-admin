import BusinessReportsLayout from "@/views/dashboard/businesses/reports/BusinessReportsLayout";

export default function BusinessReportsSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BusinessReportsLayout>{children}</BusinessReportsLayout>;
}
