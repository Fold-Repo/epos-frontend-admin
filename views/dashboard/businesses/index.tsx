"use client";

import { useEffect, useMemo, useState } from "react";
import { endOfDay, startOfDay } from "date-fns";
import {
  DashboardBreadCrumb,
  DashboardCard,
  FilterBar,
  Pagination,
} from "@/components";
import {
  AdjustmentsHorizontalIcon,
  CreditCardIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import BusinessesTable from "./BusinessesTable";
import { MOCK_BUSINESSES } from "./mock-data";

// ======================= BUSINESSES VIEW =======================
export default function BusinessesView() {
  const [search, setSearch] = useState("");
  const [identityFilter, setIdentityFilter] = useState("all");
  const [stripeFilter, setStripeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [rangeStart, setRangeStart] = useState(() => startOfDay(new Date(2023, 0, 1)));
  const [rangeEnd, setRangeEnd] = useState(() => endOfDay(new Date()));
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let rows = [...MOCK_BUSINESSES];

    if (q) {
      rows = rows.filter(
        (b) =>
          b.businessname.toLowerCase().includes(q) ||
          String(b.businessId).includes(q) ||
          b.ownerEmail.toLowerCase().includes(q) ||
          b.ownerName.toLowerCase().includes(q) ||
          b.businesstype.toLowerCase().includes(q),
      );
    }

    if (identityFilter === "verified") {
      rows = rows.filter((b) => b.personaStatus === "completed");
    } else if (identityFilter === "pending") {
      rows = rows.filter((b) => b.personaStatus !== "completed");
    }

    if (stripeFilter === "live") {
      rows = rows.filter((b) => b.stripe === "live");
    } else if (stripeFilter === "onboarding") {
      rows = rows.filter((b) => b.stripe === "onboarding");
    } else if (stripeFilter === "none") {
      rows = rows.filter((b) => b.stripe === "not_connected");
    }

    const from = rangeStart.getTime();
    const to = rangeEnd.getTime();
    rows = rows.filter((b) => {
      const t = new Date(b.createdAt).getTime();
      return t >= from && t <= to;
    });

    rows.sort((a, b) => {
      const ta = new Date(a.createdAt).getTime();
      const tb = new Date(b.createdAt).getTime();
      return sortBy === "oldest" ? ta - tb : tb - ta;
    });

    return rows;
  }, [search, identityFilter, stripeFilter, sortBy, rangeStart, rangeEnd]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, identityFilter, stripeFilter, sortBy, rangeStart, rangeEnd]);

  const totalItems = filtered.length;
  const pageRows = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage]);

  const filterItems = [
    {
      type: "dropdown" as const,
      label: undefined,
      startContent: <UserCircleIcon className="size-4 text-slate-400" />,
      showChevron: false,
      items: [
        { label: "Identity: All", key: "all" },
        { label: "Identity: Verified", key: "verified" },
        { label: "Identity: Pending", key: "pending" },
      ],
      value: identityFilter,
      onChange: (key: string) => setIdentityFilter(key),
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
        { label: "Stripe: Not connected", key: "none" },
      ],
      value: stripeFilter,
      onChange: (key: string) => setStripeFilter(key),
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
      onChange: (key: string) => setSortBy(key),
    },
    {
      type: "dateRange" as const,
      startDate: rangeStart,
      endDate: rangeEnd,
      onChange: (value: Date | { startDate: Date; endDate: Date }) => {
        if (value instanceof Date) return;
        setRangeStart(startOfDay(value.startDate));
        setRangeEnd(endOfDay(value.endDate));
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
          bodyClassName="space-y-3 pt-2"
        >
          <FilterBar
            searchInput={{
              placeholder: "Search name, business ID, owner email…",
              className: "w-full md:w-80",
              onSearch: setSearch,
            }}
            items={filterItems}
          />

          {/* ======================= BUSINESSES TABLE ======================= */}
          {totalItems === 0 ? (
            <p className="py-10 text-center text-sm text-epos-text-secondary">
              No businesses match your search or filters.
            </p>
          ) : (
            <BusinessesTable data={pageRows} />
          )}

          {totalItems > 0 ? (
            <Pagination
              className="px-1"
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              showingText="businesses"
            />
          ) : null}
        </DashboardCard>
      </div>
    </>
  );
}
