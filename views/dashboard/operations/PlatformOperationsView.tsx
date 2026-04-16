"use client";

import {
  DashboardBreadCrumb,
} from "@/components";
import { DASHBOARD_ROOT } from "@/constants/dashboard-nav";
import {
  OrderVolumeByHourSection,
  RecentCheckoutsQuotesSection,
  ThroughputSection,
} from "./sections";

// ======================= PLATFORM OPERATIONS (ADMIN) =======================
export default function PlatformOperationsView() {
  return (
    <>
      <DashboardBreadCrumb
        items={[
          { label: "Dashboard", href: DASHBOARD_ROOT },
          { label: "Orders & activity" },
        ]}
        title="Orders & platform activity"
        description="Tenant order flow, quotations, and operational signals — mirrors what merchants see in EPOS, aggregated for admins."
      />

      <div className="p-5 pt-3">
      <div className="flex flex-wrap bg-transparent lg:mb-0 lg:-mx-4">
        <div className="mb-4 flex w-full flex-col space-y-4 px-4 lg:mb-0">
          <ThroughputSection />
          <OrderVolumeByHourSection />
          <RecentCheckoutsQuotesSection />
        </div>
      </div>
      </div>
    </>
  );
}
