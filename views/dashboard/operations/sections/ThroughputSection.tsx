"use client";

import type { ReactNode } from "react";
import { DashboardCard, MetricCard } from "@/components";
import { useGetOrdersActivityThroughput } from "@/services";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { LuActivity, LuShoppingCart } from "react-icons/lu";

const iconByKey: Record<string, ReactNode> = {
  orders_today: <LuShoppingCart className="size-5" />,
  quotations_today: <ClipboardDocumentListIcon className="size-5" />,
  active_stores_now: <LuActivity className="size-5" />,
  failed_checkouts_24h: <LuShoppingCart className="size-5" />,
};

const formatChangeLabel = (value: string | null) => {
  if (!value) return "";
  if (value === "yesterday") return "vs yesterday";
  if (value === "prior_day") return "vs prior day";
  if (value === "7d_avg") return "vs 7d avg";
  return `vs ${value.replaceAll("_", " ")}`;
};

export default function ThroughputSection() {
  const { data, isLoading, isError } = useGetOrdersActivityThroughput();
  const cards = data?.cards ?? [];

  return (
    <DashboardCard
      title="Throughput"
      icon={<LuActivity className="size-5 text-epos-text-secondary" />}
      bodyClassName="pt-2"
    >
      {isLoading ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-[124px] animate-pulse rounded-xl bg-slate-100" />
          ))}
        </div>
      ) : isError ? (
        <p className="py-6 text-center text-sm text-epos-text-secondary">
          Unable to load throughput.
        </p>
      ) : cards.length === 0 ? (
        <p className="py-6 text-center text-sm text-epos-text-secondary">
          No throughput data available.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <MetricCard
              key={card.key}
              title={card.label}
              value={card.value.toLocaleString()}
              icon={iconByKey[card.key] ?? <LuActivity className="size-5" />}
              trend={
                card.change_pct !== null && card.change_vs
                  ? {
                      direction: card.change_pct >= 0 ? "up" : "down",
                      percent: `${Math.abs(card.change_pct)}`,
                      label: formatChangeLabel(card.change_vs),
                      invertTone: card.key === "failed_checkouts_24h",
                    }
                  : undefined
              }
            />
          ))}
        </div>
      )}
    </DashboardCard>
  );
}
