import { Suspense } from "react";
import { RegisterReportView } from "@/views/dashboard/reports";

export default function BusinessRegisterReportViewPage() {
  return (
    <Suspense>
      <RegisterReportView />
    </Suspense>
  );
}
