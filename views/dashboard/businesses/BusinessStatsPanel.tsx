"use client";

import moment from "moment";
import { DashboardCard } from "@/components";
import { formatCurrency } from "@/lib";
import type { AdminBusiness } from "@/types/admin-business";
import { ChartBarSquareIcon } from "@heroicons/react/24/outline";

type BusinessStatsPanelProps = {
  business: AdminBusiness;
};

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 py-3 first:pt-0 last:pb-0">
      <span className="text-xs font-medium leading-tight text-epos-text-primary">
        {label}
      </span>
      <span className="max-w-[58%] text-right text-xs tabular-nums text-epos-text-primary">
        {value}
      </span>
    </div>
  );
}

// ======================= BUSINESS STATS (ADMIN SIDEBAR) =======================
export default function BusinessStatsPanel({ business }: BusinessStatsPanelProps) {

  const { stats, storeCount } = business;
  const lastOrder = stats.lastOrderAt
    ? moment(stats.lastOrderAt).format("D MMM YYYY, HH:mm")
    : "—";

  return (
    <DashboardCard
      title="Business stats"
      icon={
        <ChartBarSquareIcon className="size-5 text-epos-text-secondary" />
      }>
      <div className="divide-y divide-[#EAECF0]">
        <StatRow label="Stores" value={storeCount.toLocaleString()} />
        <StatRow
          label="Customers"
          value={stats.customerCount.toLocaleString()}
        />
        <StatRow
          label="Total orders"
          value={stats.totalOrders.toLocaleString()}
        />
        <StatRow
          label="Total sales"
          value={formatCurrency(stats.totalSales)}
        />
        <StatRow
          label="Products listed"
          value={stats.productCount.toLocaleString()}
        />
        <StatRow
          label="Avg. order value"
          value={formatCurrency(stats.avgOrderValue)}
        />
        <StatRow label="Last order" value={lastOrder} />
      </div>
    </DashboardCard>
  );
}
