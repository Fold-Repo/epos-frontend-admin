import { Suspense } from "react";
import { ExpensesReportView } from "@/views/dashboard/reports";

export default function BusinessExpensesReportViewPage() {
  return (
    <Suspense>
      <ExpensesReportView />
    </Suspense>
  );
}
