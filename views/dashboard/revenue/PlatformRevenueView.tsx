"use client";

import {
  DashboardBreadCrumb,
  DashboardCard,
  MetricCard,
  AreaChart,
  TableComponent,
} from "@/components";
import { TableCell } from "@/components/ui";
import { DASHBOARD_ROOT } from "@/constants/dashboard-nav";
import { formatCurrency } from "@/lib";
import type { EarningsItem } from "@/views/dashboard/home/components/Earnings";
import Earnings from "@/views/dashboard/home/components/Earnings";
import { ArrowTrendingUpIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import type { TooltipContentProps } from "recharts";
import { LuBanknote, LuScale } from "react-icons/lu";

// ======================= MOCK DATA (REPLACE WITH ADMIN API) =======================
const gmvByMonth = [
  { month: "Jan", gmv: 1_420_000_000 },
  { month: "Feb", gmv: 1_510_000_000 },
  { month: "Mar", gmv: 1_480_000_000 },
  { month: "Apr", gmv: 1_620_000_000 },
  { month: "May", gmv: 1_700_000_000 },
  { month: "Jun", gmv: 1_660_000_000 },
  { month: "Jul", gmv: 1_740_000_000 },
  { month: "Aug", gmv: 1_810_000_000 },
  { month: "Sep", gmv: 1_780_000_000 },
  { month: "Oct", gmv: 1_850_000_000 },
  { month: "Nov", gmv: 1_920_000_000 },
  { month: "Dec", gmv: 1_980_000_000 },
];

const feeMixData: EarningsItem[] = [
  {
    id: "processing",
    label: "Card processing (est.)",
    amount: 184_000_000,
    percentage: 52,
    color: "mint",
  },
  {
    id: "platform",
    label: "EPOS platform fee",
    amount: 112_000_000,
    percentage: 31,
    color: "sky",
  },
  {
    id: "adjustments",
    label: "Refunds & chargebacks",
    amount: 58_000_000,
    percentage: 17,
    color: "violet",
  },
];

type PayoutRow = {
  id: string;
  business: string;
  amount: number;
  status: string;
  when: string;
};

const recentPayouts: PayoutRow[] = [
  {
    id: "1",
    business: "Northwind Traders Ltd",
    amount: 4_200_000,
    status: "Paid",
    when: "2h ago",
  },
  {
    id: "2",
    business: "Bright Pharmacy",
    amount: 1_890_000,
    status: "Paid",
    when: "5h ago",
  },
  {
    id: "3",
    business: "Sunrise Cafe Chain",
    amount: 6_120_000,
    status: "Pending",
    when: "Today",
  },
  {
    id: "4",
    business: "Metro Builders Supply",
    amount: 2_340_000,
    status: "Held",
    when: "Today",
  },
];

const payoutAlerts = [
  {
    id: "a1",
    time: "12m ago",
    title: "Payout hold",
    detail: "Metro Builders — Stripe risk review",
  },
  {
    id: "a2",
    time: "1h ago",
    title: "Large refund",
    detail: "₦2.1M reversal · Urban Electronics",
  },
  {
    id: "a3",
    time: "3h ago",
    title: "Dispute opened",
    detail: "Cardholder claim · Lagos Fresh Market",
  },
  {
    id: "a4",
    time: "Yesterday",
    title: "Settlement batch",
    detail: "142 merchants · NGN corridor",
  },
];

// ======================= PLATFORM REVENUE (ADMIN) =======================
export default function PlatformRevenueView() {
  function GmvTooltip({ active, payload }: TooltipContentProps) {
    if (active && payload?.length) {
      const row = payload[0]?.payload as { month: string; gmv: number };
      return (
        <div className="rounded-lg border border-[#E2E4E9] bg-white px-3 py-2.5 shadow-lg">
          <p className="mb-1 text-[11px] text-slate-400">{row.month}</p>
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-full bg-amber-600">
              <ArrowTrendingUpIcon className="size-4 text-white" />
            </div>
            <p className="text-sm font-semibold text-epos-text-primary">
              {formatCurrency(row.gmv, "NGN")} GMV
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
          { label: "Revenue" },
        ]}
        title="Platform revenue"
        description="Cross-tenant GMV, fee mix, and payout signals — aligned with merchant sales and Stripe activity on EPOS."
      />

      <div className="p-5 pt-3">
      <div className="flex flex-wrap bg-transparent lg:mb-0 lg:-mx-4">
        <div className="mb-4 flex w-full flex-col space-y-4 px-4 lg:mb-0 lg:w-[70%] 2xl:w-[75%]">
          <DashboardCard
            title="Overview"
            icon={<LuBanknote className="size-5 text-epos-text-secondary" />}
            bodyClassName="pt-2"
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <MetricCard
                title="GMV (30d)"
                value={formatCurrency(58_400_000, "NGN")}
                icon={<LuBanknote className="size-5" />}
                trend={{ direction: "up", percent: "5.2", label: "vs prior 30d" }}
              />
              <MetricCard
                title="Net to tenants"
                value={formatCurrency(51_200_000, "NGN")}
                icon={<LuScale className="size-5" />}
                trend={{ direction: "up", percent: "4.1", label: "vs prior 30d" }}
              />
              <MetricCard
                title="Refunds (30d)"
                value={formatCurrency(2_180_000, "NGN")}
                icon={<LuBanknote className="size-5" />}
                trend={{ direction: "down", percent: "8", label: "vs prior 30d" }}
              />
              <MetricCard
                title="Active Stripe accounts"
                value="98"
                icon={<CreditCardIcon className="size-5" />}
                trend={{ direction: "up", percent: "2", label: "vs last month" }}
              />
            </div>
          </DashboardCard>

          <DashboardCard
            title="GMV trend (12 months)"
            icon={<ArrowTrendingUpIcon className="size-5 text-epos-text-secondary" />}
            className="w-full"
          >
            <AreaChart
              data={gmvByMonth}
              dataKey="gmv"
              xAxisKey="month"
              strokeColor="#D97706"
              gradientId="platformGmvGradient"
              gradientOpacityStart={0.2}
              customTooltip={GmvTooltip}
              yAxisFormatter={(v) =>
                `${(Number(v) / 1_000_000_000).toFixed(1)}B`
              }
              height={280}
            />
          </DashboardCard>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <DashboardCard
              title="Recent settlements"
              icon={<LuScale className="size-5 text-epos-text-secondary" />}
              className="min-h-0 md:col-span-1"
            >
              <TableComponent
                className="overflow-hidden rounded-xl border border-gray-200"
                columns={[
                  { key: "biz", title: "Business" },
                  { key: "amount", title: "Amount" },
                  { key: "status", title: "Status" },
                  { key: "when", title: "" },
                ]}
                data={recentPayouts}
                rowKey={(row) => row.id}
                renderRow={(row) => (
                  <>
                    <TableCell>
                      <span className="text-xs text-epos-text-primary">{row.business}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs tabular-nums text-epos-text-primary">
                        {formatCurrency(row.amount, "NGN")}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          row.status === "Paid"
                            ? "text-xs text-emerald-700"
                            : row.status === "Held"
                              ? "text-xs text-amber-800"
                              : "text-xs text-epos-text-secondary"
                        }
                      >
                        {row.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-[11px] text-epos-text-secondary">{row.when}</span>
                    </TableCell>
                  </>
                )}
              />
            </DashboardCard>

            <Earnings title="Fee & adjustment mix (est.)" data={feeMixData} />
          </div>
        </div>

        <div className="flex w-full flex-col space-y-4 px-4 pr-4 pl-4 lg:w-[30%] lg:pl-0 2xl:w-[25%]">
          <DashboardCard
            title="Payouts & risk"
            icon={<LuScale className="size-5 text-epos-text-secondary" />}
            bodyClassName="pt-2"
          >
            <p className="mb-3 text-[11px] leading-relaxed text-epos-text-secondary">
              Stripe-linked signals across tenants.
            </p>
            <ul className="divide-y divide-[#EAECF0]">
              {payoutAlerts.map((item) => (
                <li key={item.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                  <span className="w-14 shrink-0 text-[10px] text-epos-text-secondary">
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
