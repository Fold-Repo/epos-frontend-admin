import type { CSSProperties, ReactNode } from "react";
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
  colorClass?: string;
  bgColorClass?: string;
  useColorForDescription?: boolean;
  trend?: MetricTrend;
  children?: ReactNode;
  className?: string;
};

const METRIC_ACCENT = "text-epos-text-secondary";
const METRIC_ICON_WELL = "bg-epos-text-secondary/[0.08]";

const getBgColorClass = (textClass: string): string => {
  if (!textClass) return "";

  if (textClass.startsWith("text-")) {
    const colorPart = textClass.replace("text-", "");
    if (colorPart.startsWith("[")) {
      return "";
    }
    return `bg-${colorPart}/10`;
  }

  return "";
};

const getBgColorStyle = (textClass: string): CSSProperties | undefined => {
  if (!textClass) return undefined;

  if (textClass.startsWith("text-[")) {
    const colorMatch = textClass.match(/text-\[(.*?)\]/);
    if (colorMatch) {
      const color = colorMatch[1];
      const hex = color.replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return { backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)` };
    }
  }

  return undefined;
};

const MetricCard = ({
  title,
  value,
  description,
  icon,
  colorClass,
  bgColorClass,
  useColorForDescription = false,
  trend,
  children,
  className,
}: MetricCardProps) => {
  const usesReportStyle = Boolean(colorClass);
  const computedBgColorClass =
    bgColorClass || (colorClass ? getBgColorClass(colorClass) : "");
  const bgColorStyle = bgColorClass ? undefined : getBgColorStyle(colorClass ?? "");

  return (
    <div
      className={cn(
        usesReportStyle
          ? "space-y-1 rounded-xl border border-slate-100 bg-white p-3 2xl:p-4"
          : "flex min-h-[124px] flex-col rounded-xl border border-[#E6E9EF] bg-white p-3.5 2xl:p-4",
        className
      )}
    >
      <div
        className={cn(
          usesReportStyle
            ? "flex items-center justify-between"
            : "flex items-start justify-between gap-2"
        )}
      >
        <h3
          className={cn(
            usesReportStyle
              ? "text-xs text-gray-500"
              : "text-left text-xs font-medium leading-snug 2xl:text-sm",
            !usesReportStyle && METRIC_ACCENT
          )}
        >
          {title}
        </h3>
        {icon ? (
          usesReportStyle ? (
            <div
              className={cn("rounded-md p-2", computedBgColorClass || undefined)}
              style={bgColorStyle}
            >
              <div className={colorClass}>{icon}</div>
            </div>
          ) : (
            <div className={cn("shrink-0 rounded-lg p-1.5", METRIC_ICON_WELL)}>
              <div className={METRIC_ACCENT}>{icon}</div>
            </div>
          )
        ) : null}
      </div>

      <div className={usesReportStyle ? undefined : "mt-1.5 min-w-0 flex-1 space-y-1"}>
        <p
          className={
            usesReportStyle
              ? "text-lg font-medium text-black"
              : "text-[15px] font-semibold leading-tight tracking-tight text-epos-text-primary"
          }
        >
          {value}
        </p>
        {description ? (
          <p
            className={cn(
              usesReportStyle
                ? "pt-1 text-[12px]"
                : "text-xs font-light leading-relaxed text-slate-400",
              usesReportStyle && useColorForDescription && colorClass
                ? colorClass
                : usesReportStyle
                  ? "text-gray-400"
                  : undefined
            )}
          >
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

      {children ? (
        <div className={usesReportStyle ? undefined : "mt-2 shrink-0"}>{children}</div>
      ) : null}
    </div>
  );
};

export default MetricCard;
