"use client";

import { AreaChart, DashboardCard } from "@/components";
import { useGetOrdersActivityOrderVolume } from "@/services";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import { LuShoppingCart } from "react-icons/lu";
import type { TooltipContentProps } from "recharts";

type OrderVolumePoint = {
  slot: string;
  displaySlot: string;
  orders: number;
};

function to12HourLabel(slot: string) {
  const [hourPart] = slot.split(":");
  const hour = Number(hourPart);
  if (Number.isNaN(hour)) return slot;
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12} ${suffix}`;
}

function formatDisplayDate(date: string | undefined) {
  if (!date) return "";
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function OrderVolumeByHourSection() {
  const { data, isLoading, isError } = useGetOrdersActivityOrderVolume();
  const volume = data?.order_volume;
  const displayDate = formatDisplayDate(data?.period.date);
  const chartData: OrderVolumePoint[] =
    volume?.labels.map((label, index) => ({
      slot: label,
      displaySlot: to12HourLabel(label),
      orders: volume.values[index] ?? 0,
    })) ?? [];

  return (
    <DashboardCard
      title="Order volume (today, by hour)"
      icon={<ArrowTrendingUpIcon className="size-5 text-epos-text-secondary" />}
      className="w-full"
    >
      {isLoading ? (
        <div className="h-[260px] w-full animate-pulse rounded-xl bg-slate-100" />
      ) : isError ? (
        <p className="py-6 text-center text-sm text-epos-text-secondary">
          Unable to load order volume.
        </p>
      ) : chartData.length === 0 ? (
        <p className="py-6 text-center text-sm text-epos-text-secondary">
          No order volume data available.
        </p>
      ) : (
        <AreaChart
          data={chartData}
          dataKey="orders"
          xAxisKey="slot"
          strokeColor="#475569"
          gradientId="platformOrdersGradient"
          gradientOpacityStart={0.18}
          customTooltip={({ active, payload }: TooltipContentProps) => {
            if (active && payload?.length) {
              const row = payload[0]?.payload as OrderVolumePoint;
              return (
                <div className="rounded-lg border border-[#E2E4E9] bg-white px-3 py-2.5 shadow-lg">
                  <p className="mb-1 text-[11px] text-slate-400">{row.displaySlot}</p>
                  {displayDate ? (
                    <p className="mb-2 text-[11px] text-slate-400">{displayDate}</p>
                  ) : null}
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-full bg-slate-700">
                      <LuShoppingCart className="size-4 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-epos-text-primary">
                      {row.orders.toLocaleString()} orders
                    </p>
                  </div>
                </div>
              );
            }
            return null;
          }}
          xAxisFormatter={(value) => to12HourLabel(String(value))}
          yAxisFormatter={(v) => `${Number(v) / 1000}k`}
          height={260}
        />
      )}
    </DashboardCard>
  );
}
