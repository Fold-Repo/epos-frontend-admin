"use client";

import type { ReactNode } from "react";
import { DashboardCard, ProgressBar } from "@/components";
import { formatCurrency } from "@/lib";
import { LuChartColumnIncreasing } from "react-icons/lu";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

// ======================= EARNINGS (TRANSACTION MIX) TYPES =======================
export interface EarningsItem {
  id: string;
  label: string;
  amount: number;
  percentage: number;
  color?: "orange" | "green" | "blue" | string;
}

export interface EarningsProps {
  title?: string;
  icon?: ReactNode;
  data: EarningsItem[];
  className?: string;
  showTooltip?: boolean;
  tooltipIcon?: ReactNode;
  formatAmount?: (amount: number) => string;
  animationDelayMultiplier?: number;
}

// ======================= EARNINGS CARD =======================
export default function Earnings({
  title = "Revenue distribution",
  icon = <LuChartColumnIncreasing className="size-5 text-epos-text-secondary" />,
  data,
  className,
  showTooltip = true,
  tooltipIcon = <ArrowTrendingUpIcon className="size-4 text-white" />,
  formatAmount = (amount: number) => formatCurrency(amount, "NGN"),
  animationDelayMultiplier = 0.15,
}: EarningsProps) {
  return (
    <DashboardCard
      title={title}
      className={className ?? "flex h-full w-full flex-col"}
      icon={icon}
    >
      <div className="mt-auto space-y-5">
        {data.map((earning, index) => (
          <ProgressBar
            key={earning.id}
            label={earning.label}
            amount={formatAmount(earning.amount)}
            percentage={earning.percentage}
            color={earning.color ?? "orange"}
            showTooltip={showTooltip}
            tooltipLabel={earning.label}
            tooltipIcon={tooltipIcon}
            animationDelay={index * animationDelayMultiplier}
          />
        ))}
      </div>
    </DashboardCard>
  );
}
