"use client";

import { DashboardCard, TableComponent } from "@/components";
import { TableCell } from "@/components/ui";
import { formatCurrency } from "@/lib";
import { useGetTopBusinesses } from "@/services";
import { User } from "@heroui/react";
import { LuTrophy } from "react-icons/lu";

// ======================= TYPES =======================
type TopBusinessRow = {
  id: string;
  rank: number;
  name: string;
  handle: string;
  ownerName: string;
  volume7d: number;
  stores: number;
  payoutsStatus: string;
  stripe: boolean;
};

// ======================= TABLE COLUMNS =======================
const columns = [
  { key: "rank", title: "#" },
  { key: "business", title: "Business" },
  { key: "volume", title: "7d volume" },
  { key: "stores", title: "Stores" },
  { key: "stripe", title: "Payouts" },
];

// ======================= STRIPE PAYOUT PILL =======================
function StripePill({ enabled, label }: { enabled: boolean; label?: string }) {
  return (
    <span
      className={
        enabled
          ? "rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700"
          : "rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-800"
      }
    >
      {enabled ? label || "Stripe" : label || "Pending"}
    </span>
  );
}

// ======================= TOP BUSINESSES SNAPSHOT =======================
export default function TopBusinessesSnapshot() {
  const { data, isLoading } = useGetTopBusinesses();

  const topBusinesses: TopBusinessRow[] =
    data?.items.map((item) => ({
      id: item.business_id.toString(),
      rank: item.rank,
      name: item.business_name,
      handle: item.handle,
      ownerName: `${item.owner.firstname} ${item.owner.lastname}`.trim(),
      volume7d: item.seven_day_volume,
      stores: item.stores_count,
      payoutsStatus: item.payouts_status,
      stripe: item.payouts_enabled,
    })) ?? [];

  return (
    <DashboardCard
      title="Top businesses"
      className="h-full w-full"
      bodyClassName="p-0 pt-0"
      icon={<LuTrophy className="size-5 text-epos-text-secondary" />}
    >
      <TableComponent
        columns={columns}
        data={topBusinesses}
        loading={isLoading}
        skeletonRowCount={5}
        rowKey={(row) => row.id}
        tableClassName="divide-y divide-gray-100"
        renderRow={(row) => (
          <>
            <TableCell>
              <span className="text-xs font-medium text-epos-text-secondary">{row.rank}</span>
            </TableCell>
            <TableCell>
              <User
                name={row.name}
                description={`${row.handle} • ${row.ownerName}`}
                avatarProps={{
                  size: "sm",
                }}
                classNames={{
                  name: "text-[13px] font-normal text-epos-text-primary",
                  description: "text-xs text-epos-text-secondary",
                }}
              />
            </TableCell>
            <TableCell>
              <span className="text-xs font-medium text-epos-text-primary">
                {formatCurrency(row.volume7d)}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-xs text-epos-text-secondary">{row.stores}</span>
            </TableCell>
            <TableCell>
              <StripePill enabled={row.stripe} label={row.payoutsStatus} />
            </TableCell>
          </>
        )}
      />
    </DashboardCard>
  );
}
