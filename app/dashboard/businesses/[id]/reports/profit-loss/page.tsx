import { Suspense } from "react";
import { ProfitLossReportView } from "@/views/dashboard/reports";

export default function BusinessProfitLossReportViewPage() {
  return (
    <Suspense>
      <ProfitLossReportView />
    </Suspense>
  );
}
