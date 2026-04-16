"use client";

import {
  DashboardBreadCrumb,
  DashboardCard
} from "@/components";
import { DASHBOARD_ROOT } from "@/constants/dashboard-nav";
import {
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import {
  MerchantsNeedingAttentionSection,
  PipelineSnapshotSection,
  PersonaCompletionsTrendSection,
} from "./sections";

// ======================= VERIFICATION & PAYMENTS READINESS (ADMIN) =======================
export default function PlatformVerificationView() {
  return (
    <>
      <DashboardBreadCrumb
        items={[
          { label: "Dashboard", href: DASHBOARD_ROOT },
          { label: "Verification" },
        ]}
        title="Verification & Stripe readiness"
        description="Persona identity lifecycle and Stripe Connect status across all EPOS merchants — same concerns as merchant onboarding in e-pos."
      />

      <div className="p-5 pt-3">
        <div className="flex flex-wrap bg-transparent lg:mb-0 lg:-mx-4">
          <div className="mb-4 flex w-full flex-col space-y-4 px-4 lg:mb-0">
            <PipelineSnapshotSection />

            <PersonaCompletionsTrendSection />

            <MerchantsNeedingAttentionSection />
          </div>
        </div>

      </div>
    </>
  );
}
