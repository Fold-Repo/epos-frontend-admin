"use client";

import { useState } from "react";
import { DashboardCard, TableComponent } from "@/components";
import { TableCell } from "@/components/ui";
import { Pagination } from "@/components";
import { useGetOrdersActivityRecentCheckoutPaginated } from "@/services";
import { formatCurrency } from "@/lib";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

type OrderRow = {
  id: string;
  ref: string;
  business: string;
  channel: string;
  total: number;
  when: string;
};

export default function RecentCheckoutsQuotesSection() {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;
  const { data, isLoading, isError } = useGetOrdersActivityRecentCheckoutPaginated({
    page: currentPage,
    limit: itemsPerPage,
  });

  const recentOrders: OrderRow[] =
    data?.items.map((item) => ({
      id: item.reference,
      ref: item.reference,
      business: item.business,
      channel: item.channel,
      total: item.total,
      when: item.time_ago,
    })) ?? [];
  const totalItems = data?.pagination.count ?? 0;

  return (
    <DashboardCard
      title="Recent checkouts & quotes"
      icon={<ClipboardDocumentListIcon className="size-5 text-epos-text-secondary" />}
    >
      {isError ? (
        <p className="py-6 text-center text-sm text-epos-text-secondary">
          Unable to load recent checkouts.
        </p>
      ) : (
        <>
          <TableComponent
            className="overflow-hidden rounded-xl border border-gray-200"
            loading={isLoading}
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
                    {row.channel === "Quote" ? "—" : formatCurrency(row.total)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-[11px] text-epos-text-secondary">{row.when}</span>
                </TableCell>
              </>
            )}
          />

          {totalItems > 0 ? (
            <Pagination
              className="mt-3 px-1"
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              showingText="checkouts"
            />
          ) : null}
        </>
      )}
    </DashboardCard>
  );
}
