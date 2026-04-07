"use client";

import { DashboardCard, AreaChart } from "@/components";
import { LuActivity } from "react-icons/lu";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import type { TooltipContentProps } from "recharts";

// ======================= DATE HELPERS =======================
function startOfWeekSunday(d: Date): Date {
  const copy = new Date(d);
  const day = copy.getDay();
  copy.setDate(copy.getDate() - day);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function addDays(d: Date, n: number): Date {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + n);
  return copy;
}

// ======================= WEEKDAY LABELS =======================
const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

// ======================= GET WEEK ORDER VOLUME =======================
function getWeekOrderVolume() {
  const weekStart = startOfWeekSunday(new Date());
  const orders = [1240, 1380, 1520, 1410, 1680, 1590, 1720];
  return orders.map((count, i) => {
    const date = addDays(weekStart, i);
    return {
      day: dayLabels[i],
      orders: count,
      date: date.toISOString().slice(0, 10),
    };
  });
}

// ======================= PLATFORM ACTIVITY TREND =======================
export default function PlatformActivityTrend() {
  const chartData = getWeekOrderVolume();

  // ======================= CHART TOOLTIP =======================
  function CustomTooltip({ active, payload }: TooltipContentProps) {
    if (active && payload?.length) {
      const data = payload[0]?.payload as {
        day: string;
        orders: number;
        date: string;
      };
      const label = new Date(data.date + "T12:00:00").toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      return (
        <div className="rounded-lg border border-[#E2E4E9] bg-white px-3 py-2.5 shadow-lg">
          <p className="mb-1.5 text-[11px] text-slate-400">{label}</p>
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-full bg-[#D97706]">
              <ArrowTrendingUpIcon className="size-4 text-white" />
            </div>
            <p className="text-sm font-semibold text-epos-text-primary">
              {data.orders.toLocaleString()} orders
            </p>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <DashboardCard
      title="Weekly order volume"
      className="h-full w-full"
      icon={<LuActivity className="size-5 text-epos-text-secondary" />}>
      <AreaChart
        data={chartData}
        dataKey="orders"
        xAxisKey="day"
        strokeColor="#D97706"
        gradientId="platformActivityGradient"
        gradientOpacityStart={0.2}
        customTooltip={CustomTooltip}
        yAxisFormatter={(value) => `${Number(value) / 1000}k`}
        height={250}
      />
    </DashboardCard>
  );
}
