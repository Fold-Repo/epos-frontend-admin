"use client";

import { DashboardBreadCrumb } from "@/components";
import { DASHBOARD_ROOT } from "@/constants/dashboard-nav";
import { AdminUsersSection } from "./components";

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
        description="System settings for this admin console."
      />

      <div className="p-5 pt-3">
        <AdminUsersSection />
      </div>
    </>
  );
}
