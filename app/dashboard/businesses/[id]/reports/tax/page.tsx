import { Suspense } from "react";
import { TaxReportView } from "@/views/dashboard/reports";

export default function BusinessTaxReportViewPage() {
  return (
    <Suspense>
      <TaxReportView />
    </Suspense>
  );
}
