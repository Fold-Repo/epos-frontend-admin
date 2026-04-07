"use client";

import type { ReactNode } from "react";
import {
  MetricCard,
  DashboardCard,
  DashboardBreadCrumb,
  type MetricTrend,
} from "@/components";
import { formatCurrency } from "@/lib";
import {
  ClipboardDocumentListIcon,
  CreditCardIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import {
  BuildingStorefrontIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import { LuChartSpline, LuReceiptText } from "react-icons/lu";
import { TbBuildingCommunity, TbBuildingStore } from "react-icons/tb";
import { Earnings, type EarningsItem } from "./components";
import { PlatformActivityTrend, TopBusinessesSnapshot } from "./sections";

// ======================= TYPES =======================
type HomeMetric = {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: MetricTrend;
  children?: ReactNode;
};

// ======================= METRICS DATA =======================
const metricsData: HomeMetric[] = [
  {
    title: "Total sales",
    value: formatCurrency(18_420_000),
    icon: <LuChartSpline className="size-5" />,
    trend: { direction: "up", percent: "6.1", label: "vs last month" },
  },
  {
    title: "Total purchases",
    value: formatCurrency(4_280_500),
    icon: <BuildingStorefrontIcon className="size-5" />,
    trend: { direction: "up", percent: "3.2", label: "vs last month" },
  },
  {
    title: "Total quotations",
    value: "2,847",
    icon: <ClipboardDocumentListIcon className="size-5" />,
    trend: { direction: "up", percent: "4.8", label: "vs last month" },
  },
  {
    title: "Total businesses",
    value: "128",
    icon: <TbBuildingCommunity className="size-5" />,
    trend: { direction: "up", percent: "4.2", label: "vs last month" },
  },
  {
    title: "Verified businesses",
    value: "112",
    icon: <ShieldCheckIcon className="size-5" />,
    trend: { direction: "up", percent: "3.1", label: "vs last month" },
  },
  {
    title: "Stripe-enabled businesses",
    value: "98",
    icon: <CreditCardIcon className="size-5" />,
    trend: { direction: "up", percent: "2.4", label: "vs last month" },
  },
  {
    title: "Total stores",
    value: "342",
    icon: <TbBuildingStore className="size-5" />,
    trend: { direction: "up", percent: "2.1", label: "vs last month" },
  },
  {
    title: "Pending persona verification",
    value: "16",
    icon: <IdentificationIcon className="size-5" />,
    trend: {
      direction: "down",
      percent: "11",
      label: "vs last month",
      invertTone: true,
    },
  },
];

// ======================= REVENUE DISTRIBUTION DATA (EPOS HOME CARDS) =======================
/** Mirrors e-pos summary emphasis: Total sales, Total purchases, Sales return, Today's sales — platform totals (mock). */
const revenueMixData: EarningsItem[] = [
  {
    id: "total-sales",
    label: "Total sales (all tenants)",
    amount: 18_420_000_000,
    percentage: 58,
    color: "mint",
  },
  {
    id: "total-purchases",
    label: "Total purchases (all tenants)",
    amount: 4_280_500_000,
    percentage: 28,
    color: "sky",
  },
  {
    id: "sales-return",
    label: "Sales return (all tenants)",
    amount: 920_000_000,
    percentage: 9,
    color: "violet",
  },
  {
    id: "today-sales",
    label: "Today's sales (all tenants)",
    amount: 410_000_000,
    percentage: 5,
    color: "coral",
  },
];

// ======================= DASHBOARD HOME VIEW =======================
export default function DashboardHomeView() {
  return (
    <>

      <DashboardBreadCrumb
        title="Dashboard overview"
        description="Cross-tenant sales, purchases, and quotations; business verification, Stripe readiness, stores, and identity checks."
      />

      <div className="space-y-3 p-5">

        {/* =============== KEY PERFORMANCE METRICS =============== */}
        <DashboardCard
          title="Key performance metrics"
          icon={
            <LuReceiptText className="size-5 text-epos-text-secondary" />
          }
          bodyClassName="pt-2">

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {metricsData.map((metric) => (
              <MetricCard
                key={metric.title}
                title={metric.title}
                value={metric.value}
                icon={metric.icon}
                trend={metric.trend}>
                {metric.children}
              </MetricCard>
            ))}
          </div>

        </DashboardCard>

        {/* ======================= WEEKLY ORDER VOLUME & REVENUE DISTRIBUTION ======================= */}
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="w-full lg:w-[55%]">
            <PlatformActivityTrend />
          </div>
          <div className="w-full lg:w-[45%]">
            <Earnings title="Revenue distribution" data={revenueMixData} />
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
