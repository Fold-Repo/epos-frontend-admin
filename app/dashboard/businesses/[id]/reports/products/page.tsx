import { Suspense } from "react";
import { ProductsReportView } from "@/views/dashboard/reports";

export default function BusinessProductsReportViewPage() {
  return (
    <Suspense>
      <ProductsReportView />
    </Suspense>
  );
}
