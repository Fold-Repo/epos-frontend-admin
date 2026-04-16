"use client";

import { DashboardBreadCrumb } from "@/components";
import {
  KeyPerformanceMetricsSection,
  RevenueDistributionSection,
  TopBusinessesSnapshot,
  WeeklyOrderVolumeSection,
} from "./sections";

// ======================= DASHBOARD HOME VIEW =======================
export default function DashboardHomeView() {
  return (
    <>

      <DashboardBreadCrumb
        title="Dashboard overview"
        description="Cross-tenant sales, purchases, and quotations; business verification, Stripe readiness, stores, and identity checks."
      />

      <div className="space-y-3 p-5">

        <KeyPerformanceMetricsSection />

        {/* ======================= WEEKLY ORDER VOLUME & REVENUE DISTRIBUTION ======================= */}
        <div className="flex flex-col gap-3 lg:flex-row">

          <div className="w-full lg:w-[55%]">
            <WeeklyOrderVolumeSection />
          </div>

          <div className="w-full lg:w-[45%]">
            <RevenueDistributionSection />
          </div>

        </div>

        {/* =============== TOP BUSINESSES SNAPSHOT (FULL WIDTH) =============== */}
        <div className="grid grid-cols-1">
          <TopBusinessesSnapshot />
        </div>

      </div>

    </>
  );
}
