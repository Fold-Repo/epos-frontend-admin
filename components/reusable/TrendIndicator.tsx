import type { FC } from "react";
import { ArrowDownLeftIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/classname";

interface TrendIndicatorProps {
  trend: "up" | "down";
  percentage: number | string;
  description: string;
  /** When true, a downward trend is styled as positive (e.g. fewer pending tickets). */
  invertTone?: boolean;
}

const TrendIndicator: FC<TrendIndicatorProps> = ({
  trend,
  percentage,
  description,
  invertTone = false,
}) => {
  const isUp = trend === "up";
  const looksPositive = invertTone ? !isUp : isUp;

  return (
    <div className="inline-flex items-center gap-x-1.5 text-[11px] leading-tight">
      {isUp ? (
        <ArrowUpRightIcon
          className={cn(
            "size-3 shrink-0",
            looksPositive ? "text-emerald-800/75" : "text-rose-700/75",
          )}
        />
      ) : (
        <ArrowDownLeftIcon
          className={cn(
            "size-3 shrink-0",
            looksPositive ? "text-emerald-800/75" : "text-rose-700/75",
          )}
        />
      )}
      <span
        className={
          looksPositive ? "text-emerald-800/85" : "text-rose-700/85"
        }
      >
        {percentage}% {description}
      </span>
    </div>
  );
};

export default TrendIndicator;
