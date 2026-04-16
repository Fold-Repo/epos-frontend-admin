"use client";

import { DashboardCard } from "@/components";
import { LuActivity } from "react-icons/lu";
import { useGetDashboardTrends } from "@/services";
import PlatformActivityTrend from "./PlatformActivityTrend";

export default function WeeklyOrderVolumeSection() {
  const { data: trendsData, isLoading, isError } = useGetDashboardTrends();

  const chartData =
    trendsData?.weekly_order_volume.labels.map((label, index) => {
      const startDate = new Date(`${trendsData.weekly_order_volume.week_start}T00:00:00`);
      startDate.setDate(startDate.getDate() + index);
      return {
        day: label,
        orders: trendsData.weekly_order_volume.values[index] ?? 0,
        date: startDate.toISOString().slice(0, 10),
      };
    }) ?? [];

  if (isLoading) {
    return (
      <DashboardCard
        title="Weekly order volume"
        className="h-full w-full"
        icon={<LuActivity className="size-5 text-epos-text-secondary" />}
      >
        <div className="h-[250px] w-full animate-pulse rounded-xl bg-slate-100" />
      </DashboardCard>
    );
  }

  if (isError) {
    return (
      <DashboardCard
        title="Weekly order volume"
        className="h-full w-full"
        icon={<LuActivity className="size-5 text-epos-text-secondary" />}
      >
        <div className="flex h-[250px] items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm text-slate-500">
          Unable to load weekly order volume
        </div>
      </DashboardCard>
    );
  }

  if (!chartData.length) {
    return (
      <DashboardCard
        title="Weekly order volume"
        className="h-full w-full"
        icon={<LuActivity className="size-5 text-epos-text-secondary" />}
      >
        <div className="flex h-[250px] items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm text-slate-500">
          No data available
        </div>
      </DashboardCard>
    );
  }

  return <PlatformActivityTrend data={chartData} />;
}
