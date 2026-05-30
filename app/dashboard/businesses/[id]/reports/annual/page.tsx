import { Suspense } from "react";
import { AnnualReportView } from "@/views/dashboard/reports";

export default function BusinessAnnualReportViewPage() {
  return (
    <Suspense>
      <AnnualReportView />
    </Suspense>
  );
}
