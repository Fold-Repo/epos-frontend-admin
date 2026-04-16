"use client";

import { DashboardCard, AreaChart } from "@/components";
import { useGetVerificationTrend } from "@/services";
import { ArrowTrendingUpIcon, IdentificationIcon } from "@heroicons/react/24/outline";
import type { TooltipContentProps } from "recharts";

type TrendRow = {
  week: string;
  count: number;
  dateRange: string;
};

function WeekTooltip({ active, payload }: TooltipContentProps) {
  if (active && payload?.length) {
    const row = payload[0]?.payload as TrendRow;
    return (
      <div className="rounded-lg border border-[#E2E4E9] bg-white px-3 py-2.5 shadow-lg">
        <p className="mb-1 text-[11px] text-slate-400">{row.week}</p>
        <p className="mb-2 text-[11px] text-slate-400">{row.dateRange}</p>
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-full bg-emerald-600">
            <IdentificationIcon className="size-4 text-white" />
          </div>
          <p className="text-sm font-semibold text-epos-text-primary">{row.count} completed</p>
        </div>
      </div>
    );
  }
  return null;
}

function addDaysUtc(date: Date, days: number) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function formatWeekRange(startDate: Date, endDate: Date) {
  const sameMonth = startDate.getUTCMonth() === endDate.getUTCMonth();
  const sameYear = startDate.getUTCFullYear() === endDate.getUTCFullYear();

  const startDay = startDate.getUTCDate();
  const endDay = endDate.getUTCDate();
  const startMonth = startDate.toLocaleString("en-GB", { month: "short", timeZone: "UTC" });
  const endMonth = endDate.toLocaleString("en-GB", { month: "short", timeZone: "UTC" });
  const endYear = endDate.getUTCFullYear();

  if (sameMonth && sameYear) return `${startDay}-${endDay} ${endMonth}`;
  if (sameYear) return `${startDay} ${startMonth}-${endDay} ${endMonth}`;
  return `${startDay} ${startMonth}-${endDay} ${endMonth} ${endYear}`;
}

export default function PersonaCompletionsTrendSection() {
  const { data, isLoading, isError } = useGetVerificationTrend();
  const trend = data?.data.persona_completions;
  const periodWeeks = data?.data.period.weeks ?? 8;
  const trendStart = data?.data.period.start_week
    ? new Date(`${data.data.period.start_week}T00:00:00Z`)
    : null;
  const trendEnd = data?.data.period.end_week
    ? new Date(`${data.data.period.end_week}T00:00:00Z`)
    : null;

  const chartData: TrendRow[] =
    trend?.labels.map((label, index) => ({
      ...(trendStart && trendEnd
        ? (() => {
            const weekStart = addDaysUtc(trendStart, index * 7);
            const rawWeekEnd = addDaysUtc(weekStart, 6);
            const weekEnd = rawWeekEnd > trendEnd ? trendEnd : rawWeekEnd;
            return { dateRange: formatWeekRange(weekStart, weekEnd) };
          })()
        : { dateRange: label }),
      week: label,
      count: trend.values[index] ?? 0,
    })) ?? [];

  return (
    <DashboardCard
      title={`Persona completions (${periodWeeks} weeks)`}
      icon={<ArrowTrendingUpIcon className="size-5 text-epos-text-secondary" />}
      className="w-full"
    >
      {isLoading ? (
        <div className="h-[260px] w-full animate-pulse rounded-xl bg-slate-100" />
      ) : isError ? (
        <p className="py-6 text-center text-sm text-epos-text-secondary">
          Unable to load verification trend.
        </p>
      ) : chartData.length === 0 ? (
        <p className="py-6 text-center text-sm text-epos-text-secondary">
          No verification trend data available.
        </p>
      ) : (
        <AreaChart
          data={chartData}
          dataKey="count"
          xAxisKey="week"
          strokeColor="#059669"
          gradientId="personaTrendGradient"
          gradientOpacityStart={0.2}
          customTooltip={WeekTooltip}
          height={260}
        />
      )}
    </DashboardCard>
  );
}
