"use client";

import { DashboardBreadCrumb } from "@/components";
import { DASHBOARD_ROOT } from "@/constants/dashboard-nav";
import { RevenueOverviewSection, RevenueTrendSection } from "./sections";

// ======================= PLATFORM REVENUE (ADMIN) =======================
export default function PlatformRevenueView() {
  return (
    <>
      <DashboardBreadCrumb
        items={[
          { label: "Dashboard", href: DASHBOARD_ROOT },
          { label: "Revenue" },
        ]}
        title="Platform revenue"
        description="Cross-tenant GMV, fee mix, and payout signals — aligned with merchant sales and Stripe activity on EPOS."
      />

      <div className="p-5 pt-3">

        <div className="flex flex-wrap bg-transparent lg:mb-0 lg:-mx-4">

          <div className="mb-4 flex w-full flex-col space-y-4 px-4 lg:mb-0">

            <RevenueOverviewSection />
            
            <RevenueTrendSection />

          </div>

        </div>

      </div>
    </>
  );
}
