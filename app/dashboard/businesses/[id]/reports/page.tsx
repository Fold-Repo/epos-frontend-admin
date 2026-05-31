import { Suspense } from "react";
import BusinessReportsHubView from "@/views/dashboard/businesses/reports/BusinessReportsHubView";

export default function BusinessReportsHubPage() {
  return (
    <Suspense>
      <BusinessReportsHubView />
    </Suspense>
  );
}
