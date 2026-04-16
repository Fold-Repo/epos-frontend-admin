"use client";

import type { ReactNode } from "react";
import { DashboardCard, MetricCard } from "@/components";
import { useGetVerificationPipelineSnapshot } from "@/services";
import {
  CreditCardIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";

const iconByKey: Record<string, ReactNode> = {
  persona_completed: <IdentificationIcon className="size-5" />,
  persona_in_progress: <IdentificationIcon className="size-5" />,
  stripe_live: <CreditCardIcon className="size-5" />,
  stripe_onboarding: <CreditCardIcon className="size-5" />,
  new_registrations: <CreditCardIcon className="size-5" />,
};

const getTrendLabel = (changeVs?: string | null) => {
  if (!changeVs) return "";
  if (changeVs === "last_month") return "vs last month";
  return `vs ${changeVs.replaceAll("_", " ")}`;
};

export default function PipelineSnapshotSection() {
  const { data, isLoading, isError } = useGetVerificationPipelineSnapshot();
  const cards = data?.data.cards ?? [];

  return (
    <DashboardCard
      title="Pipeline snapshot"
      icon={<IdentificationIcon className="size-5 text-epos-text-secondary" />}
      bodyClassName="pt-2"
    >
      {isLoading ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-[124px] animate-pulse rounded-xl bg-slate-100" />
          ))}
        </div>
      ) : isError ? (
        <p className="py-6 text-center text-sm text-epos-text-secondary">
          Unable to load pipeline snapshot.
        </p>
      ) : cards.length === 0 ? (
        <p className="py-6 text-center text-sm text-epos-text-secondary">
          No pipeline snapshot data available.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {cards.map((card) => (
            <MetricCard
              key={card.key}
              title={card.label}
              value={card.value}
              icon={iconByKey[card.key] ?? <IdentificationIcon className="size-5" />}
              trend={
                card.change_pct !== null && card.change_vs
                  ? {
                      direction: card.change_pct >= 0 ? "up" : "down",
                      percent: `${Math.abs(card.change_pct)}`,
                      label: getTrendLabel(card.change_vs),
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
