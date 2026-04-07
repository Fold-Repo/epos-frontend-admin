"use client";

import { DashboardBreadCrumb } from "@/components";
import { DASHBOARD_ROOT } from "@/constants/dashboard-nav";
import {
  AccountSettingsCard,
  PasswordSettingsCard,
} from "./components";

// ======================= ADMIN SETTINGS =======================
export default function AdminSettingsView() {
  return (
    <>
      <DashboardBreadCrumb
        items={[
          { label: "Dashboard", href: DASHBOARD_ROOT },
          { label: "Settings" },
        ]}
        title="Settings"
        description="Account, password, and notification preferences for this admin console."
      />

      <div className="max-w-3xl space-y-4 p-5 pt-3">
        
        <AccountSettingsCard />

        <PasswordSettingsCard />

      </div>
    </>
  );
}
