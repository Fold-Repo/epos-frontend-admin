"use client";

import { AreaChart, DashboardCard } from "@/components";
import { formatCurrency } from "@/lib";
import { useGetRevenueTrend } from "@/services";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";
import type { TooltipContentProps } from "recharts";

export default function RevenueTrendSection() {
  const { data: trendData, isLoading: isTrendLoading, isError: isTrendError } = useGetRevenueTrend();

  const gmvTrendData = useMemo(() => {
    if (!trendData) {
      return [];
    }

    return trendData.gmv_trend.labels.map((month, index) => ({
      month,
      gmv: trendData.gmv_trend.values[index] ?? 0,
    }));
  }, [trendData]);

  function GmvTooltip({ active, payload }: TooltipContentProps) {
    if (active && payload?.length) {
      const row = payload[0]?.payload as { month: string; gmv: number };
      return (
        <div className="rounded-lg border border-[#E2E4E9] bg-white px-3 py-2.5 shadow-lg">
          <p className="mb-1 text-[11px] text-slate-400">{row.month}</p>
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-full bg-amber-600">
              <ArrowTrendingUpIcon className="size-4 text-white" />
            </div>
            <p className="text-sm font-semibold text-epos-text-primary">
              {formatCurrency(row.gmv)} GMV
            </p>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <DashboardCard
      title="GMV trend (12 months)"
      icon={<ArrowTrendingUpIcon className="size-5 text-epos-text-secondary" />}
      className="w-full"
    >
      {isTrendLoading ? (
        <div className="h-[280px] animate-pulse rounded-xl border border-[#E6E9EF] bg-white" />
      ) : isTrendError ? (
        <div className="flex min-h-[280px] items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm text-slate-500">
          Unable to load GMV trend
        </div>
      ) : gmvTrendData.length ? (
        <AreaChart
          data={gmvTrendData}
          dataKey="gmv"
          xAxisKey="month"
          strokeColor="#D97706"
          gradientId="platformGmvGradient"
          gradientOpacityStart={0.2}
          customTooltip={GmvTooltip}
          yAxisFormatter={(v) => formatCurrency(Number(v))}
          height={280}
        />
      ) : (
        <div className="flex min-h-[280px] items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm text-slate-500">
          No GMV trend data available
        </div>
      )}
    </DashboardCard>
  );
}
