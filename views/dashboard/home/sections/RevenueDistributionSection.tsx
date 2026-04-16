"use client";

import { DashboardCard } from "@/components";
import { LuChartColumnIncreasing } from "react-icons/lu";
import { formatCurrency } from "@/lib";
import { useGetDashboardTrends } from "@/services";
import { Earnings, type EarningsItem } from "../components";

export default function RevenueDistributionSection() {
  const { data: trendsData, isLoading, isError } = useGetDashboardTrends();

  const revenueDistributionData: EarningsItem[] = trendsData?.revenue_distribution
    ? (() => {
        const total = trendsData.revenue_distribution.reduce(
          (sum, item) => sum + item.value,
          0
        );
        const colorMap: Record<string, string> = {
          total_sales: "mint",
          total_purchases: "sky",
          sales_return: "violet",
          today_sales: "coral",
        };

        return trendsData.revenue_distribution.map((item) => ({
          id: item.key,
          label: item.label,
          amount: item.value,
          percentage: total > 0 ? Math.round((item.value / total) * 100) : 0,
          color: colorMap[item.key] ?? "orange",
        }));
      })()
    : [];

  if (isLoading) {
    return (
      <DashboardCard
        title="Revenue distribution"
        className="flex h-full w-full flex-col"
        icon={<LuChartColumnIncreasing className="size-5 text-epos-text-secondary" />}
      >
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="h-3 w-32 rounded bg-slate-200" />
                <div className="h-3 w-16 rounded bg-slate-200" />
              </div>
              <div className="h-5 w-full rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </DashboardCard>
    );
  }

  if (isError) {
    return (
      <DashboardCard
        title="Revenue distribution"
        className="flex h-full w-full flex-col"
        icon={<LuChartColumnIncreasing className="size-5 text-epos-text-secondary" />}
      >
        <div className="flex h-[250px] items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm text-slate-500">
          Unable to load revenue distribution
        </div>
      </DashboardCard>
    );
  }

  if (!revenueDistributionData.length) {
    return (
      <DashboardCard
        title="Revenue distribution"
        className="flex h-full w-full flex-col"
        icon={<LuChartColumnIncreasing className="size-5 text-epos-text-secondary" />}
      >
        <div className="flex h-[250px] items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm text-slate-500">
          No data available
        </div>
      </DashboardCard>
    );
  }

  return (
    <Earnings
      title="Revenue distribution"
      data={revenueDistributionData}
      formatAmount={(amount) => formatCurrency(amount, "GBP")}
    />
  );
}
