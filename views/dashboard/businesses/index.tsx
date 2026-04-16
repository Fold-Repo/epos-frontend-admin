"use client";

import { useMemo } from "react";
import {
  DashboardBreadCrumb,
  DashboardCard,
  FilterBar,
  Pagination,
} from "@/components";
import { useQueryParams } from "@/hooks";
import { useGetAdminBusinesses } from "@/services";
import type {
  AdminBusinessListRow,
  AdminBusinessesIdentityFilter,
  AdminBusinessesStripeFilter,
  AdminBusinessesSort,
} from "@/types/admin-business";
import {
  AdjustmentsHorizontalIcon,
  CreditCardIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import BusinessesTable from "./BusinessesTable";
import {
  normalizeAccountStatus,
  normalizePersonaStatus,
  normalizeStripeStatus,
} from "./status";

// ======================= BUSINESSES VIEW =======================
export default function BusinessesView() {
  const { searchParams, updateQueryParams } = useQueryParams();

  const currentPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const itemsPerPage = Math.max(1, parseInt(searchParams.get("limit") || "20", 10));
  const searchValue = searchParams.get("search") || "";
  const identityFilter =
    (searchParams.get("identity") as AdminBusinessesIdentityFilter) || "all";
  const stripeFilter =
    (searchParams.get("stripe") as AdminBusinessesStripeFilter) || "all";
  const sortBy = (searchParams.get("sort") as AdminBusinessesSort) || "newest";
  const startDate = searchParams.get("start_date");
  const endDate = searchParams.get("end_date");

  const apiQueryParams = useMemo(
    () => ({
      page: currentPage,
      limit: itemsPerPage,
      search: searchValue.trim() || null,
      identity: identityFilter === "all" ? undefined : identityFilter,
      stripe: stripeFilter === "all" ? undefined : stripeFilter,
      sort: sortBy === "newest" ? undefined : sortBy,
      start_date: startDate || null,
      end_date: endDate || null,
    }),
    [
      currentPage,
      itemsPerPage,
      searchValue,
      identityFilter,
      stripeFilter,
      sortBy,
      startDate,
      endDate,
    ]
  );

  const rangeStart = startDate ? new Date(`${startDate}T00:00:00`) : undefined;
  const rangeEnd = endDate ? new Date(`${endDate}T23:59:59`) : undefined;

  const { data: businessesResponse, isLoading, isError } = useGetAdminBusinesses(
    apiQueryParams
  );

  const pageRows: AdminBusinessListRow[] = useMemo(() => {
    return (
      businessesResponse?.data.map((item) => ({
        id: String(item.business_id),
        businessId: item.business_id,
        businessname: item.business_name,
        businesstype: item.type,
        logo: null,
        ownerEmail: item.owner_email,
        ownerName: "",
        storeCount: item.stores,
        personaStatus: normalizePersonaStatus(item.identity_status),
        stripe: normalizeStripeStatus(item.stripe_status),
        accountStatus: normalizeAccountStatus(item.business_status),
        createdAt: item.registered_at,
      })) ?? []
    );
  }, [businessesResponse]);

  const totalItems = businessesResponse?.pagination.total ?? 0;

  const filterItems = [
    {
      type: "dropdown" as const,
      label: undefined,
      startContent: <UserCircleIcon className="size-4 text-slate-400" />,
      showChevron: false,
      items: [
        { label: "Identity: All", key: "all" },
        { label: "Identity: Completed", key: "completed" },
        { label: "Identity: Started", key: "started" },
        { label: "Identity: Pending", key: "pending" },
        { label: "Identity: Failed", key: "failed" },
      ],
      value: identityFilter,
      onChange: (key: string) =>
        updateQueryParams({
          identity: key === "all" ? null : key,
          page: 1,
        }),
    },
    {
      type: "dropdown" as const,
      label: undefined,
      startContent: <CreditCardIcon className="size-4 text-slate-400" />,
      showChevron: false,
      items: [
        { label: "Stripe: All", key: "all" },
        { label: "Stripe: Live", key: "live" },
        { label: "Stripe: Onboarding", key: "onboarding" },
        { label: "Stripe: Not connected", key: "not_connected" },
      ],
      value: stripeFilter,
      onChange: (key: string) =>
        updateQueryParams({
          stripe: key === "all" ? null : key,
          page: 1,
        }),
    },
    {
      type: "dropdown" as const,
      label: undefined,
      startContent: <AdjustmentsHorizontalIcon className="size-4 text-slate-400" />,
      showChevron: false,
      items: [
        { label: "Sort: Newest registered", key: "newest" },
        { label: "Sort: Oldest registered", key: "oldest" },
      ],
      value: sortBy,
      onChange: (key: string) =>
        updateQueryParams({
          sort: key === "newest" ? null : key,
          page: 1,
        }),
    },
    {
      type: "dateRange" as const,
      startDate: rangeStart,
      endDate: rangeEnd,
      onChange: (value: Date | { startDate: Date; endDate: Date }) => {
        if (value instanceof Date) return;
        const formatDate = (date: Date) =>
          `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2, "0")}-${`${date.getDate()}`.padStart(2, "0")}`;
        updateQueryParams({
          start_date: formatDate(value.startDate),
          end_date: formatDate(value.endDate),
          page: 1,
        });
      },
    },
  ];

  return (
    <>
      <DashboardBreadCrumb
        title="Businesses"
        description="Merchant accounts on EPOS — business profile, stores, Persona identity, and Stripe Connect (from e-pos profile & connect APIs)."
      />

      <div className="space-y-3 p-5">
        <DashboardCard
          title="All businesses"
          titleClassName="font-normal"
          bodyClassName="space-y-3 pt-2">
          <FilterBar
            searchInput={{
              placeholder: "Search name, business ID, owner email…",
              className: "w-full md:w-80",
              onSearch: (value) => {
                const trimmed = value.trim();
                const existing = searchParams.get("search") || "";

                if (!trimmed && !existing) return;
                if (trimmed === existing) return;

                updateQueryParams({
                  search: trimmed || null,
                  page: 1,
                });
              },
            }}
            items={filterItems}
          />

          {/* ======================= BUSINESSES TABLE ======================= */}
          <BusinessesTable data={pageRows} loading={isLoading} />

          {totalItems > 0 && !isError ? (
            <Pagination
              className="px-1"
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={(page) => updateQueryParams({ page })}
              showingText="businesses"
            />
          ) : null}
        </DashboardCard>
      </div>
    </>
  );
}
