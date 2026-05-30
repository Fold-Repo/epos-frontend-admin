"use client";

import moment from "moment";
import Link from "next/link";
import { TableComponent } from "@/components";
import { TableCell } from "@/components/ui";
import { DASHBOARD_ROOT } from "@/constants/dashboard-nav";
import type { AdminBusinessListRow } from "@/types/admin-business";
import { User, Chip, Button } from "@heroui/react";
import { getPersonaStatusMeta, getStripeStatusMeta } from "./status";

type BusinessesTableProps = {
  data: AdminBusinessListRow[];
  loading?: boolean;
};

// ======================= BUSINESSES TABLE =======================
export default function BusinessesTable({ data, loading = false }: BusinessesTableProps) {
  const columns = [
    { key: "business", title: "Business" },
    { key: "id", title: "Business ID" },
    { key: "type", title: "Type" },
    { key: "stores", title: "Stores" },
    { key: "identity", title: "Identity" },
    { key: "stripe", title: "Stripe" },
    { key: "registered", title: "Registered" },
    { key: "actions", title: "" },
  ];

  return (
    <TableComponent
      className="overflow-hidden rounded-xl border border-gray-200"
      columns={columns}
      data={data}
      loading={loading}
      rowKey={(row) => row.id}
      renderRow={(row) => {
        const stripe = getStripeStatusMeta(row.stripe);
        const persona = getPersonaStatusMeta(row.personaStatus);
        const registered = moment(row.createdAt).format("llll");

        return (
          <>
            <TableCell>
              <User
                name={row.businessname}
                description={row.ownerEmail}
                avatarProps={{
                  src: row.logo ?? undefined,
                  name: row.businessname,
                  size: "sm",
                }}
                classNames={{
                  name: "text-xs font-medium text-epos-text-primary",
                  description: "text-[11px] text-epos-text-secondary",
                }}
              />
            </TableCell>
            <TableCell>
              <span className="text-xs text-epos-text-primary">#{row.businessId}</span>
            </TableCell>
            <TableCell>
              <span className="text-xs text-epos-text-secondary">{row.businesstype}</span>
            </TableCell>
            <TableCell>
              <span className="text-xs text-epos-text-primary">{row.storeCount}</span>
            </TableCell>
            <TableCell>
              <Chip size="sm" variant="flat" className={`text-[11px] ${persona.className}`}>
                {persona.label}
              </Chip>
            </TableCell>
            <TableCell>
              <Chip size="sm" variant="flat" className={`text-[11px] ${stripe.className}`}>
                {stripe.label}
              </Chip>
            </TableCell>
            <TableCell>
              <span className="text-xs text-epos-text-secondary">{registered}</span>
            </TableCell>
            <TableCell className="w-px whitespace-nowrap">
              <div className="flex items-center gap-2">
                <Button
                  as={Link}
                  href={`${DASHBOARD_ROOT}/businesses/${row.id}/reports`}
                  size="sm"
                  radius="md"
                  variant="flat"
                  className="h-7 min-w-0 bg-slate-100 px-3 text-[11px] font-medium text-slate-700"
                >
                  View reports
                </Button>
                <Button
                  as={Link}
                  href={`${DASHBOARD_ROOT}/businesses/${row.id}`}
                  size="sm"
                  radius="md"
                  variant="flat"
                  className="h-7 min-w-0 bg-primary-100 px-3 text-[11px] font-medium text-primary-700"
                >
                  View
                </Button>
              </div>
            </TableCell>
          </>
        );
      }}
    />
  );
}
