"use client";

import { DashboardCard, MetricCard } from "@/components";
import { formatCurrency } from "@/lib";
import { useGetRevenueOverview } from "@/services";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from "react";
import { LuBanknote, LuScale } from "react-icons/lu";

const overviewIconMap: Record<string, ReactNode> = {
  gmv_30d: <LuBanknote className="size-5" />,
  net_to_tenants: <LuScale className="size-5" />,
  refunds_30d: <LuBanknote className="size-5" />,
  active_stripe_accounts: <CreditCardIcon className="size-5" />,
};

const countMetricKeys = new Set(["active_stripe_accounts"]);

const changeLabelMap: Record<string, string> = {
  prior_30d: "vs prior 30d",
  last_month: "vs last month",
};

export default function RevenueOverviewSection() {
  const { data: overviewData, isLoading: isOverviewLoading, isError: isOverviewError } = useGetRevenueOverview();

  return (
    <DashboardCard
      title="Overview"
      icon={<LuBanknote className="size-5 text-epos-text-secondary" />}
      bodyClassName="pt-2"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {isOverviewLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-[124px] animate-pulse rounded-xl border border-[#E6E9EF] bg-white p-3" />
          ))
        ) : isOverviewError ? (
          <div className="col-span-full flex min-h-[124px] items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm text-slate-500">
            Unable to load revenue overview
          </div>
        ) : overviewData?.cards.length ? (
          overviewData.cards.map((card) => (
            <MetricCard
              key={card.key}
              title={card.label}
              value={
                countMetricKeys.has(card.key)
                  ? card.value.toLocaleString()
                  : formatCurrency(card.value)
              }
              icon={overviewIconMap[card.key] ?? <LuBanknote className="size-5" />}
              trend={{
                direction: card.change_pct < 0 ? "down" : "up",
                percent: Math.abs(card.change_pct).toString(),
                label:
                  changeLabelMap[card.change_vs] ??
                  `vs ${card.change_vs.replaceAll("_", " ")}`,
                invertTone: card.change_pct < 0,
              }}
            />
          ))
        ) : (
          <div className="col-span-full flex min-h-[124px] items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm text-slate-500">
            No revenue overview data available
          </div>
        )}
      </div>
    </DashboardCard>
  );
}
