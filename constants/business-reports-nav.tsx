import React from "react";
import {
  ChartBarIcon,
  ChartPieIcon,
  CubeIcon,
  DocumentDuplicateIcon,
  DocumentTextIcon,
  ReceiptRefundIcon,
  TagIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { DASHBOARD_ROOT } from "./dashboard-nav";

export type BusinessReportNavItem = {
  key: string;
  href: string;
  text: string;
  icon: React.ReactNode;
};

export function getBusinessReportNavItems(
  businessId: string
): BusinessReportNavItem[] {
  const root = `${DASHBOARD_ROOT}/businesses/${businessId}/reports`;

  return [
    {
      key: "sales",
      href: `${root}/sales`,
      text: "Sales Report",
      icon: <ChartPieIcon className="size-4" />,
    },
    {
      key: "purchase",
      href: `${root}/purchase`,
      text: "Purchase Report",
      icon: <TagIcon className="size-4" />,
    },
    {
      key: "inventory",
      href: `${root}/inventory`,
      text: "Inventory Report",
      icon: <CubeIcon className="size-4" />,
    },
    {
      key: "customer",
      href: `${root}/customer`,
      text: "Customer Report",
      icon: <UsersIcon className="size-4" />,
    },
    {
      key: "products",
      href: `${root}/products`,
      text: "Products Report",
      icon: <CubeIcon className="size-4" />,
    },
    {
      key: "expenses",
      href: `${root}/expenses`,
      text: "Expenses Report",
      icon: <ReceiptRefundIcon className="size-4" />,
    },
    {
      key: "tax",
      href: `${root}/tax`,
      text: "Tax Report",
      icon: <DocumentTextIcon className="size-4" />,
    },
    {
      key: "profit-loss",
      href: `${root}/profit-loss`,
      text: "Profit & Loss",
      icon: <ChartBarIcon className="size-4" />,
    },
    {
      key: "annual",
      href: `${root}/annual`,
      text: "Annual Report",
      icon: <DocumentDuplicateIcon className="size-4" />,
    },
    {
      key: "register",
      href: `${root}/register`,
      text: "Register Report",
      icon: <DocumentTextIcon className="size-4" />,
    },
  ];
}

export function getBusinessReportNavKeyFromPathname(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const reportsIndex = segments.indexOf("reports");
  if (reportsIndex === -1 || reportsIndex === segments.length - 1) {
    return "hub";
  }
  return segments[reportsIndex + 1] ?? "hub";
}
