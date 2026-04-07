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
import {
  ArrowTrendingUpIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import type { TooltipContentProps } from "recharts";
import { LuActivity, LuShoppingCart } from "react-icons/lu";

// ======================= MOCK DATA (REPLACE WITH ADMIN API) =======================
const ordersByHour = Array.from({ length: 12 }, (_, i) => ({
  slot: `${8 + i}:00`,
  orders: 420 + i * 38 + (i % 3) * 120,
}));

type OrderRow = {
  id: string;
  ref: string;
  business: string;
  channel: string;
  total: number;
  when: string;
};

const recentOrders: OrderRow[] = [
  {
    id: "1",
    ref: "EP-104821",
    business: "Atlas Hardware",
    channel: "POS",
    total: 84_500,
    when: "2 min ago",
  },
  {
    id: "2",
    ref: "EP-104820",
    business: "Lagos Fresh Market",
    channel: "Online",
    total: 12_300,
    when: "6 min ago",
  },
  {
    id: "3",
    ref: "EP-104819",
    business: "Bright Pharmacy",
    channel: "POS",
    total: 228_000,
    when: "14 min ago",
  },
  {
    id: "4",
    ref: "EP-104818",
    business: "Sunrise Cafe Chain",
    channel: "POS",
    total: 45_600,
    when: "22 min ago",
  },
  {
    id: "5",
    ref: "EP-104817",
    business: "Pixel Digital Agency",
    channel: "Quote",
    total: 0,
    when: "31 min ago",
  },
];

const opsFeed = [
  {
    id: "o1",
    time: "4m ago",
    title: "Webhook retry",
    detail: "Stripe · invoice.paid — vendor 1006",
  },
  {
    id: "o2",
    time: "18m ago",
    title: "Catalog sync",
    detail: "12 SKUs pushed · Harbor Logistics",
  },
  {
    id: "o3",
    time: "1h ago",
    title: "Rate limit",
    detail: "Persona API — burst cleared",
  },
  {
    id: "o4",
    time: "Today",
    title: "Quotation peak",
    detail: "847 quotes issued platform-wide",
  },
];

// ======================= PLATFORM OPERATIONS (ADMIN) =======================
export default function PlatformOperationsView() {
  function OrdersTooltip({ active, payload }: TooltipContentProps) {
    if (active && payload?.length) {
      const row = payload[0]?.payload as { slot: string; orders: number };
      return (
        <div className="rounded-lg border border-[#E2E4E9] bg-white px-3 py-2.5 shadow-lg">
          <p className="mb-1 text-[11px] text-slate-400">{row.slot}</p>
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-full bg-slate-700">
              <LuShoppingCart className="size-4 text-white" />
            </div>
            <p className="text-sm font-semibold text-epos-text-primary">
              {row.orders.toLocaleString()} orders
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
          { label: "Orders & activity" },
        ]}
        title="Orders & platform activity"
        description="Tenant order flow, quotations, and operational signals — mirrors what merchants see in EPOS, aggregated for admins."
      />

      <div className="p-5 pt-3">
      <div className="flex flex-wrap bg-transparent lg:mb-0 lg:-mx-4">
        <div className="mb-4 flex w-full flex-col space-y-4 px-4 lg:mb-0 lg:w-[70%] 2xl:w-[75%]">
          <DashboardCard
            title="Throughput"
            icon={<LuActivity className="size-5 text-epos-text-secondary" />}
            bodyClassName="pt-2"
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <MetricCard
                title="Orders (today)"
                value="18,420"
                icon={<LuShoppingCart className="size-5" />}
                trend={{ direction: "up", percent: "3.4", label: "vs yesterday" }}
              />
              <MetricCard
                title="Quotations (today)"
                value="847"
                icon={<ClipboardDocumentListIcon className="size-5" />}
                trend={{ direction: "up", percent: "6.0", label: "vs yesterday" }}
              />
              <MetricCard
                title="Active stores (now)"
                value="286"
                icon={<LuActivity className="size-5" />}
                trend={{ direction: "up", percent: "1.2", label: "vs 7d avg" }}
              />
              <MetricCard
                title="Failed checkouts (24h)"
                value="124"
                icon={<LuShoppingCart className="size-5" />}
                trend={{
                  direction: "down",
                  percent: "9",
                  label: "vs prior day",
                  invertTone: true,
                }}
              />
            </div>
          </DashboardCard>

          <DashboardCard
            title="Order volume (today, by hour)"
            icon={<ArrowTrendingUpIcon className="size-5 text-epos-text-secondary" />}
            className="w-full"
          >
            <AreaChart
              data={ordersByHour}
              dataKey="orders"
              xAxisKey="slot"
              strokeColor="#475569"
              gradientId="platformOrdersGradient"
              gradientOpacityStart={0.18}
              customTooltip={OrdersTooltip}
              yAxisFormatter={(v) => `${Number(v) / 1000}k`}
              height={260}
            />
          </DashboardCard>

          <DashboardCard
            title="Recent checkouts & quotes"
            icon={<ClipboardDocumentListIcon className="size-5 text-epos-text-secondary" />}
          >
            <TableComponent
              className="overflow-hidden rounded-xl border border-gray-200"
              columns={[
                { key: "ref", title: "Reference" },
                { key: "business", title: "Business" },
                { key: "channel", title: "Channel" },
                { key: "total", title: "Total" },
                { key: "when", title: "" },
              ]}
              data={recentOrders}
              rowKey={(row) => row.id}
              renderRow={(row) => (
                <>
                  <TableCell>
                    <span className="font-mono text-[11px] text-epos-text-primary">{row.ref}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-epos-text-primary">{row.business}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-epos-text-secondary">{row.channel}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs tabular-nums text-epos-text-primary">
                      {row.channel === "Quote" ? "—" : formatCurrency(row.total, "NGN")}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-[11px] text-epos-text-secondary">{row.when}</span>
                  </TableCell>
                </>
              )}
            />
          </DashboardCard>
        </div>

        <div className="flex w-full flex-col space-y-4 px-4 pr-4 pl-4 lg:w-[30%] lg:pl-0 2xl:w-[25%]">
          <DashboardCard
            title="Integrations & jobs"
            icon={<LuActivity className="size-5 text-epos-text-secondary" />}
            bodyClassName="pt-2"
          >
            <p className="mb-3 text-[11px] leading-relaxed text-epos-text-secondary">
              Webhooks, sync, and API health (mock).
            </p>
            <ul className="divide-y divide-[#EAECF0]">
              {opsFeed.map((item) => (
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
