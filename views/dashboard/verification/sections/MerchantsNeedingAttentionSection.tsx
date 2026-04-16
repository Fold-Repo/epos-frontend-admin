"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardCard, Pagination, TableComponent } from "@/components";
import { TableCell } from "@/components/ui";
import { useGetMerchantsNeedingAttention } from "@/services";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { Chip } from "@heroui/react";

type AttentionRow = {
  id: string;
  businessId: number;
  business: string;
  issue: "Persona" | "Stripe";
  state: string;
  waiting: string;
};

export default function MerchantsNeedingAttentionSection() {
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { data, isLoading, isError } = useGetMerchantsNeedingAttention({
    page: currentPage,
    limit: itemsPerPage,
  });

  const rows: AttentionRow[] =
    data?.data.items.map((item) => ({
      id: `${item.business_id}-${item.area}`,
      businessId: item.business_id,
      business: item.business,
      issue: item.area,
      state: item.status,
      waiting: `${item.age_days}d`,
    })) ?? [];

  const totalItems = data?.data.pagination.count ?? 0;

  return (
    <DashboardCard
      title="Merchants needing attention"
      icon={<IdentificationIcon className="size-5 text-epos-text-secondary" />}
    >
      {isError ? (
        <p className="py-6 text-center text-sm text-epos-text-secondary">
          Unable to load merchants needing attention.
        </p>
      ) : (
        <>

          <TableComponent
            className="overflow-hidden rounded-xl border border-gray-200"
            loading={isLoading}
            columns={[
              { key: "business", title: "Business" },
              { key: "issue", title: "Area" },
              { key: "state", title: "Status" },
              { key: "waiting", title: "Age" },
            ]}
            data={rows}
            rowKey={(row) => row.id}
            renderRow={(row) => (
              <>
                <TableCell>
                  <Link
                    href={`/dashboard/businesses/${row.businessId}`}
                    className="text-xs font-medium text-primary-600 underline-offset-2 hover:underline"
                  >
                    {row.business}
                  </Link>
                </TableCell>
                <TableCell>
                  <span className="text-xs text-epos-text-secondary">{row.issue}</span>
                </TableCell>
                <TableCell>
                  <Chip
                    size="sm"
                    variant="flat"
                    className={
                      row.state === "Failed"
                        ? "bg-red-50 text-[11px] text-red-800"
                        : row.state === "Onboarding" ||
                          row.state === "Started" ||
                          row.state === "Pending"
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

          {totalItems > 0 ? (
            <Pagination
              className="mt-3 px-1"
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              showingText="merchants"
            />
          ) : null}
        </>
      )}
    </DashboardCard>
  );
}
