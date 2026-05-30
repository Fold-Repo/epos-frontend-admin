"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BusinessReportsScopeProvider, useBusinessReportsScope } from "@/context/BusinessReportsScope";
import {
  getBusinessReportNavItems,
  getBusinessReportNavKeyFromPathname,
} from "@/constants/business-reports-nav";
import { cn } from "@/lib";

type BusinessReportsLayoutProps = {
  children: React.ReactNode;
};

function BusinessReportsSubNav() {
  const pathname = usePathname();
  const { businessId } = useBusinessReportsScope();
  const items = getBusinessReportNavItems(businessId);
  const activeKey = getBusinessReportNavKeyFromPathname(pathname);

  return (
    <div className="border-b border-slate-200 bg-white px-5 py-3">
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const isActive = activeKey === item.key;
          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-medium transition-colors",
                isActive
                  ? "border-primary-200 bg-primary-100 text-primary-700"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              )}
            >
              {item.icon}
              {item.text}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function BusinessReportsLayoutInner({ children }: BusinessReportsLayoutProps) {
  const pathname = usePathname();
  const isHub = pathname.endsWith("/reports");

  return (
    <>
      {!isHub ? <BusinessReportsSubNav /> : null}
      {children}
    </>
  );
}

export default function BusinessReportsLayout({
  children,
}: BusinessReportsLayoutProps) {
  return (
    <BusinessReportsScopeProvider>
      <BusinessReportsLayoutInner>{children}</BusinessReportsLayoutInner>
    </BusinessReportsScopeProvider>
  );
}
