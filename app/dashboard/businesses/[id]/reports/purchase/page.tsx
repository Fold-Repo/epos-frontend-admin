import { Suspense } from "react";
import { PurchaseReportView } from "@/views/dashboard/reports";

export default function BusinessPurchaseReportViewPage() {
  return (
    <Suspense>
      <PurchaseReportView />
    </Suspense>
  );
}
