import { Suspense } from "react";
import { SalesReportView } from "@/views/dashboard/reports";

export default function BusinessSalesReportViewPage() {
  return (
    <Suspense>
      <SalesReportView />
    </Suspense>
  );
}
