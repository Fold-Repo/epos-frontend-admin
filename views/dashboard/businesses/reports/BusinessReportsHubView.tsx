"use client";

import Link from "next/link";
import { DashboardBreadCrumb, DashboardCard } from "@/components";
import { getBusinessReportNavItems } from "@/constants/business-reports-nav";
import { DASHBOARD_ROOT } from "@/constants/dashboard-nav";
import { useBusinessReportsScope } from "@/context/BusinessReportsScope";

export default function BusinessReportsHubView() {
  const { businessId, businessName } = useBusinessReportsScope();
  const reportItems = getBusinessReportNavItems(businessId);

  return (
    <>
      <DashboardBreadCrumb
        className="text-left [&_ol]:justify-start"
        items={[
          { label: "Dashboard", href: DASHBOARD_ROOT },
          { label: "Businesses", href: `${DASHBOARD_ROOT}/businesses` },
          {
            label: businessName,
            href: `${DASHBOARD_ROOT}/businesses/${businessId}`,
          },
          { label: "Reports" },
        ]}
        title="Reports"
        description={`View merchant reports for ${businessName}`}
      />

      <div className="p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {reportItems.map((item) => (
            <Link key={item.key} href={item.href}>
              <DashboardCard
                className="h-full transition-shadow hover:shadow-md"
                bodyClassName="flex items-start gap-3 p-4"
              >
                <span className="rounded-lg bg-primary-100 p-2 text-primary-700">
                  {item.icon}
                </span>
                <div>
                  <p className="text-sm font-medium text-epos-text-primary">
                    {item.text}
                  </p>
                  <p className="mt-1 text-xs text-epos-text-secondary">
                    Open {item.text.toLowerCase()} for this business.
                  </p>
                </div>
              </DashboardCard>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
