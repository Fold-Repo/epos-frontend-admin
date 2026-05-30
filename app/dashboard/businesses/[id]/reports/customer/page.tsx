import { Suspense } from "react";
import { CustomerReportView } from "@/views/dashboard/reports";

export default function BusinessCustomerReportViewPage() {
  return (
    <Suspense>
      <CustomerReportView />
    </Suspense>
  );
}
