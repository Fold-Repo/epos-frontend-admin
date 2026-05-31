"use client";

import { DASHBOARD_ROOT } from "@/constants/dashboard-nav";
import { useBusinessReportsScope } from "@/context/BusinessReportsScope";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function useBusinessReportBreadcrumb(
  title: string,
  description?: string
) {
  const { businessId, businessName } = useBusinessReportsScope();

  const items: BreadcrumbItem[] = [
    { label: "Dashboard", href: DASHBOARD_ROOT },
    { label: "Businesses", href: `${DASHBOARD_ROOT}/businesses` },
    {
      label: businessName,
      href: `${DASHBOARD_ROOT}/businesses/${businessId}`,
    },
    { label: "Reports", href: `${DASHBOARD_ROOT}/businesses/${businessId}/reports` },
    { label: title },
  ];

  return { items, title, description };
}
