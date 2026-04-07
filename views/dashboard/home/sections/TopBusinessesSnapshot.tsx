"use client";

import { DashboardCard, TableComponent } from "@/components";
import { TableCell } from "@/components/ui";
import { formatCurrency } from "@/lib";
import { User } from "@heroui/react";
import { LuTrophy } from "react-icons/lu";

// ======================= TYPES =======================
type TopBusinessRow = {
  id: string;
  rank: number;
  name: string;
  slug: string;
  avatar: string;
  volume7d: number;
  stores: number;
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

// ======================= MOCK TOP BUSINESSES =======================
const topBusinesses: TopBusinessRow[] = [
  {
    id: "b1",
    rank: 1,
    name: "Northwind Traders",
    slug: "northwind",
    avatar: "https://i.pravatar.cc/150?u=northwind",
    volume7d: 42_800_000,
    stores: 12,
    stripe: true,
  },
  {
    id: "b2",
    rank: 2,
    name: "Lagos Fresh Market",
    slug: "lagos-fresh",
    avatar: "https://i.pravatar.cc/150?u=lagosfresh",
    volume7d: 31_200_000,
    stores: 6,
    stripe: true,
  },
  {
    id: "b3",
    rank: 3,
    name: "Urban Electronics Co.",
    slug: "urban-electronics",
    avatar: "https://i.pravatar.cc/150?u=urbanelec",
    volume7d: 28_950_000,
    stores: 4,
    stripe: true,
  },
  {
    id: "b4",
    rank: 4,
    name: "GreenLeaf Organics",
    slug: "greenleaf",
    avatar: "https://i.pravatar.cc/150?u=greenleaf",
    volume7d: 19_400_000,
    stores: 3,
    stripe: false,
  },
  {
    id: "b5",
    rank: 5,
    name: "Studio Nine Retail",
    slug: "studio-nine",
    avatar: "https://i.pravatar.cc/150?u=studionine",
    volume7d: 14_100_000,
    stores: 2,
    stripe: true,
  },
];

// ======================= STRIPE PAYOUT PILL =======================
function StripePill({ enabled }: { enabled: boolean }) {
  return (
    <span
      className={
        enabled
          ? "rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700"
          : "rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-800"
      }
    >
      {enabled ? "Stripe" : "Pending"}
    </span>
  );
}

// ======================= TOP BUSINESSES SNAPSHOT =======================
export default function TopBusinessesSnapshot() {
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
                description={`@${row.slug}`}
                avatarProps={{
                  src: row.avatar,
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
              <StripePill enabled={row.stripe} />
            </TableCell>
          </>
        )}
      />
    </DashboardCard>
  );
}
