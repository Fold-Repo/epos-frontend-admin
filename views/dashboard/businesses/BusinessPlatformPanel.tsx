"use client";

import { DashboardCard } from "@/components";
import { cn } from "@/lib/classname";
import type {
  AdminBusiness,
  AdminPersonaSummary,
  AdminStripeSummary,
} from "@/types/admin-business";
import { Chip } from "@heroui/react";
import {
  CreditCardIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";

type BusinessPlatformPanelProps = {
  business: AdminBusiness;
};

function stripeStatus(stripe: AdminStripeSummary) {
  switch (stripe) {
    case "live":
      return { label: "Completed", className: "bg-emerald-50 text-emerald-800" };
    case "onboarding":
      return { label: "Pending", className: "bg-amber-50 text-amber-950" };
    default:
      return { label: "Not started", className: "bg-neutral-100 text-neutral-600" };
  }
}

function personaStatus(status: AdminPersonaSummary) {
  switch (status) {
    case "completed":
      return { label: "Completed", className: "bg-emerald-50 text-emerald-800" };
    case "started":
      return { label: "Started", className: "bg-sky-50 text-sky-950" };
    case "failed":
      return { label: "Failed", className: "bg-red-50 text-red-800" };
    default:
      return { label: "Pending", className: "bg-amber-50 text-amber-950" };
  }
}

// ======================= PLATFORM & VERIFICATION (ADMIN SIDEBAR) =======================
export default function BusinessPlatformPanel({ business }: BusinessPlatformPanelProps) {
  const stripe = stripeStatus(business.stripe);
  const persona = personaStatus(business.personaStatus);

  return (
    <DashboardCard
      title="Platform & verification"
      icon={<IdentificationIcon className="size-5 text-epos-text-secondary" />}>
      <div className="divide-y divide-[#EAECF0]">
        <div className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0">
          <div className="flex items-center gap-2">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#EAECF0] bg-[#FAFBFC] text-epos-text-secondary">
              <IdentificationIcon className="size-4" aria-hidden />
            </span>
            <span className="text-xs font-medium text-epos-text-primary">
              Persona (identity)
            </span>
          </div>
          <Chip
            size="sm"
            variant="flat"
            className={cn("h-7 px-2.5 text-[11px] font-medium", persona.className)}
          >
            {persona.label}
          </Chip>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 py-3 last:pb-0">
          <div className="flex items-center gap-2">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-[#EAECF0] bg-[#FAFBFC] text-epos-text-secondary">
              <CreditCardIcon className="size-4" aria-hidden />
            </span>
            <span className="text-xs font-medium text-epos-text-primary">
              Stripe Connect
            </span>
          </div>
          <Chip
            size="sm"
            variant="flat"
            className={cn("h-7 px-2.5 text-[11px] font-medium", stripe.className)}
          >
            {stripe.label}
          </Chip>
        </div>
      </div>
    </DashboardCard>
  );
}
