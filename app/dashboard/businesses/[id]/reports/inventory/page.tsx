import { Suspense } from "react";
import { InventoryReportView } from "@/views/dashboard/reports";

export default function BusinessInventoryReportViewPage() {
  return (
    <Suspense>
      <InventoryReportView />
    </Suspense>
  );
}
