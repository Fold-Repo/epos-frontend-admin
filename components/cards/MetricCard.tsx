import type { ReactNode } from "react";
import { cn } from "@/lib/classname";
import TrendIndicator from "@/components/reusable/TrendIndicator";

export type MetricTrend = {
  direction: "up" | "down";
  percent: string;
  label: string;
  invertTone?: boolean;
};

type MetricCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: MetricTrend;
  children?: ReactNode;
  className?: string;
};

/** One neutral accent for title + icon (no per-card colors). */
const METRIC_ACCENT = "text-epos-text-secondary";
const METRIC_ICON_WELL = "bg-epos-text-secondary/[0.08]";

const MetricCard = ({
  title,
  value,
  description,
  icon,
  trend,
  children,
  className,
}: MetricCardProps) => {
  return (
    <div className={cn(
        "flex min-h-[124px] flex-col rounded-xl border border-[#E6E9EF] bg-white p-3.5 2xl:p-4",
        className,
      )}>

      <div className="flex items-start justify-between gap-2">
        <h3
          className={cn(
            "text-left text-xs font-medium leading-snug 2xl:text-sm",
            METRIC_ACCENT,
          )}>
          {title}
        </h3>
        {icon ? (
          <div className={cn("shrink-0 rounded-lg p-1.5", METRIC_ICON_WELL)}>
            <div className={METRIC_ACCENT}>{icon}</div>
          </div>
        ) : null}
      </div>

      <div className="mt-1.5 min-w-0 flex-1 space-y-1">
        <p className="text-[15px] font-semibold leading-tight tracking-tight text-epos-text-primary">
          {value}
        </p>
        {description ? (
          <p className="text-xs font-light leading-relaxed text-slate-400">
            {description}
          </p>
        ) : null}
        {trend ? (
          <div className="pt-1">
            <TrendIndicator
              trend={trend.direction}
              percentage={trend.percent}
              description={trend.label}
              invertTone={trend.invertTone}
            />
          </div>
        ) : null}
      </div>

      {children ? <div className="mt-2 shrink-0">{children}</div> : null}
      
    </div>
  );
};

export default MetricCard;
