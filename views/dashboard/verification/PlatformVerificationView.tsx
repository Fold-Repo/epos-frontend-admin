"use client";

import {
  DashboardBreadCrumb,
  DashboardCard,
  MetricCard,
  AreaChart,
  TableComponent,
} from "@/components";
import { TableCell } from "@/components/ui";
import { Chip } from "@heroui/react";
import { DASHBOARD_ROOT } from "@/constants/dashboard-nav";
import {
  ArrowTrendingUpIcon,
  CreditCardIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import type { TooltipContentProps } from "recharts";

// ======================= MOCK DATA (REPLACE WITH ADMIN API) =======================
const personaCompletedByWeek = [
  { week: "W1", count: 42 },
  { week: "W2", count: 51 },
  { week: "W3", count: 38 },
  { week: "W4", count: 47 },
  { week: "W5", count: 55 },
  { week: "W6", count: 49 },
  { week: "W7", count: 61 },
  { week: "W8", count: 58 },
];

type ActionRow = {
  id: string;
  business: string;
  issue: "persona" | "stripe";
  state: string;
  waiting: string;
};

const needsAction: ActionRow[] = [
  {
    id: "1",
    business: "Urban Electronics",
    issue: "persona",
    state: "Started",
    waiting: "4d",
  },
  {
    id: "2",
    business: "Studio Nine Retail",
    issue: "stripe",
    state: "Not connected",
    waiting: "12d",
  },
  {
    id: "3",
    business: "Cocoa Exports NG",
    issue: "persona",
    state: "Failed",
    waiting: "2d",
  },
  {
    id: "4",
    business: "Atlas Hardware",
    issue: "stripe",
    state: "Onboarding",
    waiting: "1d",
  },
];

const verificationFeed = [
  {
    id: "v1",
    time: "25m ago",
    title: "Persona approved",
    detail: "Bright Pharmacy · case closed",
  },
  {
    id: "v2",
    time: "2h ago",
    title: "Stripe requirements",
    detail: "GreenLeaf Organics · bank pending",
  },
  {
    id: "v3",
    time: "5h ago",
    title: "Document resubmit",
    detail: "Metro Builders · ID clarity",
  },
  {
    id: "v4",
    time: "Yesterday",
    title: "Account updated",
    detail: "Harbor Logistics · TIN verified",
  },
];

// ======================= VERIFICATION & PAYMENTS READINESS (ADMIN) =======================
export default function PlatformVerificationView() {
  function WeekTooltip({ active, payload }: TooltipContentProps) {
    if (active && payload?.length) {
      const row = payload[0]?.payload as { week: string; count: number };
      return (
        <div className="rounded-lg border border-[#E2E4E9] bg-white px-3 py-2.5 shadow-lg">
          <p className="mb-1 text-[11px] text-slate-400">{row.week}</p>
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-full bg-emerald-600">
              <IdentificationIcon className="size-4 text-white" />
            </div>
            <p className="text-sm font-semibold text-epos-text-primary">
              {row.count} completed
            </p>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <>
      <DashboardBreadCrumb
        items={[
          { label: "Dashboard", href: DASHBOARD_ROOT },
          { label: "Verification" },
        ]}
        title="Verification & Stripe readiness"
        description="Persona identity lifecycle and Stripe Connect status across all EPOS merchants — same concerns as merchant onboarding in e-pos."
      />

      <div className="p-5 pt-3">
      <div className="flex flex-wrap bg-transparent lg:mb-0 lg:-mx-4">
        <div className="mb-4 flex w-full flex-col space-y-4 px-4 lg:mb-0 lg:w-[70%] 2xl:w-[75%]">
          <DashboardCard
            title="Pipeline snapshot"
            icon={<IdentificationIcon className="size-5 text-epos-text-secondary" />}
            bodyClassName="pt-2"
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <MetricCard
                title="Persona completed"
                value="112"
                icon={<IdentificationIcon className="size-5" />}
                trend={{ direction: "up", percent: "4", label: "vs last month" }}
              />
              <MetricCard
                title="Persona in progress"
                value="24"
                icon={<IdentificationIcon className="size-5" />}
              />
              <MetricCard
                title="Stripe live"
                value="98"
                icon={<CreditCardIcon className="size-5" />}
                trend={{ direction: "up", percent: "2", label: "vs last month" }}
              />
              <MetricCard
                title="Stripe onboarding"
                value="22"
                icon={<CreditCardIcon className="size-5" />}
              />
              <MetricCard
                title="New Registrations"
                value="22"
                icon={<CreditCardIcon className="size-5" />}
              />
            </div>
          </DashboardCard>

          <DashboardCard
            title="Persona completions (8 weeks)"
            icon={<ArrowTrendingUpIcon className="size-5 text-epos-text-secondary" />}
            className="w-full"
          >
            <AreaChart
              data={personaCompletedByWeek}
              dataKey="count"
              xAxisKey="week"
              strokeColor="#059669"
              gradientId="personaTrendGradient"
              gradientOpacityStart={0.2}
              customTooltip={WeekTooltip}
              height={260}
            />
          </DashboardCard>

          <DashboardCard
            title="Merchants needing attention"
            icon={<IdentificationIcon className="size-5 text-epos-text-secondary" />}
          >
            <TableComponent
              className="overflow-hidden rounded-xl border border-gray-200"
              columns={[
                { key: "business", title: "Business" },
                { key: "issue", title: "Area" },
                { key: "state", title: "Status" },
                { key: "waiting", title: "Age" },
              ]}
              data={needsAction}
              rowKey={(row) => row.id}
              renderRow={(row) => (
                <>
                  <TableCell>
                    <span className="text-xs font-medium text-epos-text-primary">{row.business}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-epos-text-secondary">
                      {row.issue === "persona" ? "Persona" : "Stripe"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="sm"
                      variant="flat"
                      className={
                        row.state === "Failed"
                          ? "bg-red-50 text-[11px] text-red-800"
                          : row.state === "Onboarding" || row.state === "Started"
                            ? "bg-amber-50 text-[11px] text-amber-950"
                            : "bg-neutral-100 text-[11px] text-epos-text-primary"
                      }
                    >
                      {row.state}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <span className="text-[11px] text-epos-text-secondary">{row.waiting}</span>
                  </TableCell>
                </>
              )}
            />
          </DashboardCard>
        </div>

        <div className="flex w-full flex-col space-y-4 px-4 pr-4 pl-4 lg:w-[30%] lg:pl-0 2xl:w-[25%]">
          <DashboardCard
            title="Recent verification events"
            icon={<IdentificationIcon className="size-5 text-epos-text-secondary" />}
            bodyClassName="pt-2"
          >
            <p className="mb-3 text-[11px] leading-relaxed text-epos-text-secondary">
              Persona and Stripe activity.
            </p>
            <ul className="divide-y divide-[#EAECF0]">
              {verificationFeed.map((item) => (
                <li key={item.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                  <span className="w-16 shrink-0 text-[10px] text-epos-text-secondary">
                    {item.time}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-epos-text-primary">{item.title}</p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-epos-text-secondary">
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </DashboardCard>
        </div>
      </div>
      </div>
    </>
  );
}
