import BusinessesView from "@/views/dashboard/businesses";
import { Suspense } from "react";

export default function BusinessesPage() {
  return (
    <Suspense fallback={null}>
      <BusinessesView />
    </Suspense>
  );
}
