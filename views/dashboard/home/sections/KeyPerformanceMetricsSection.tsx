"use client";

import type { ReactNode } from "react";
import { DashboardCard, MetricCard, type MetricTrend } from "@/components";
import { formatCurrency } from "@/lib";
import { useGetKeyPerformanceMetrics } from "@/services";
import { ClipboardDocumentListIcon, CreditCardIcon, IdentificationIcon } from "@heroicons/react/24/outline";
import { BuildingStorefrontIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";
import { LuChartSpline, LuReceiptText } from "react-icons/lu";
import { TbBuildingCommunity, TbBuildingStore } from "react-icons/tb";

type HomeMetric = {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: MetricTrend;
};

const metricIconMap: Record<string, ReactNode> = {
  total_sales: <LuChartSpline className="size-5" />,
  total_purchases: <BuildingStorefrontIcon className="size-5" />,
  total_quotations: <ClipboardDocumentListIcon className="size-5" />,
  total_businesses: <TbBuildingCommunity className="size-5" />,
  verified_businesses: <ShieldCheckIcon className="size-5" />,
  stripe_enabled_businesses: <CreditCardIcon className="size-5" />,
  total_stores: <TbBuildingStore className="size-5" />,
  pending_persona_verification: <IdentificationIcon className="size-5" />,
};

const currencyMetricKeys = new Set(["total_sales", "total_purchases"]);

const MetricCardSkeleton = () => (
  <div className="rounded-xl border border-[#E6E9EF] bg-white p-3 animate-pulse">
    <div className="flex items-start justify-between gap-1">
      <div className="h-3 w-24 rounded bg-slate-200" />
      <div className="h-8 w-8 rounded-lg bg-slate-200" />
    </div>
    <div className="mt-2 space-y-2">
      <div className="h-5 w-28 rounded bg-slate-200" />
      <div className="h-3 w-20 rounded bg-slate-200" />
    </div>
  </div>
);

export default function KeyPerformanceMetricsSection() {

  const { data: kpiData, isLoading, isError } = useGetKeyPerformanceMetrics();

  const metricsData: HomeMetric[] =
    kpiData?.cards.map((card) => ({
      title: card.label,
      value: currencyMetricKeys.has(card.key)
        ? formatCurrency(card.value)
        : card.value.toLocaleString(),
      icon: metricIconMap[card.key] ?? <LuReceiptText className="size-5" />,
      trend: {
        direction: card.change_pct < 0 ? "down" : "up",
        percent: Math.abs(card.change_pct).toString(),
        label: "vs last month",
        invertTone: card.change_pct < 0,
      },
    })) ?? [];

  return (
    <DashboardCard
      title="Key performance metrics"
      icon={<LuReceiptText className="size-5 text-epos-text-secondary" />}
      bodyClassName="pt-2">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => <MetricCardSkeleton key={index} />)
          : isError
          ? (
            <div className="col-span-full flex min-h-[124px] items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm text-slate-500">
              Unable to load key performance metrics
            </div>
          )
          : metricsData.length === 0
          ? (
            <div className="col-span-full flex min-h-[124px] items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm text-slate-500">
              No data available
            </div>
          )
          : metricsData.map((metric) => (
              <MetricCard
                key={metric.title}
                title={metric.title}
                value={metric.value}
                icon={metric.icon}
                trend={metric.trend}
              />
            ))}
      </div>
    </DashboardCard>
  );
}
