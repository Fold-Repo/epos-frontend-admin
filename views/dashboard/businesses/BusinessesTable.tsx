"use client";

import moment from "moment";
import Link from "next/link";
import { TableComponent } from "@/components";
import { TableCell } from "@/components/ui";
import { DASHBOARD_ROOT } from "@/constants/dashboard-nav";
import type { AdminBusinessListRow } from "@/types/admin-business";
import { User, Chip, Button } from "@heroui/react";

type BusinessesTableProps = {
  data: AdminBusinessListRow[];
};

// ======================= STRIPE STATUS CHIP =======================
function stripeChipProps(status: AdminBusinessListRow["stripe"]) {
  switch (status) {
    case "live":
      return { className: "bg-emerald-50 text-emerald-800", text: "Live" };
    case "onboarding":
      return { className: "bg-amber-50 text-amber-900", text: "Onboarding" };
    default:
      return { className: "bg-neutral-100 text-neutral-600", text: "Not connected" };
  }
}

// ======================= PERSONA CHIP =======================
function personaChipProps(status: AdminBusinessListRow["personaStatus"]) {
  switch (status) {
    case "completed":
      return { className: "bg-emerald-50 text-emerald-800", text: "Completed" };
    case "started":
      return { className: "bg-sky-50 text-sky-950", text: "Started" };
    case "failed":
      return { className: "bg-red-50 text-red-800", text: "Failed" };
    default:
      return { className: "bg-amber-50 text-amber-900", text: "Pending" };
  }
}

// ======================= BUSINESSES TABLE =======================
export default function BusinessesTable({ data }: BusinessesTableProps) {
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
      rowKey={(row) => row.id}
      renderRow={(row) => {
        const stripe = stripeChipProps(row.stripe);
        const persona = personaChipProps(row.personaStatus);
        const registered = moment(row.createdAt).format("D MMM YYYY");

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
                {persona.text}
              </Chip>
            </TableCell>
            <TableCell>
              <Chip size="sm" variant="flat" className={`text-[11px] ${stripe.className}`}>
                {stripe.text}
              </Chip>
            </TableCell>
            <TableCell>
              <span className="text-xs text-epos-text-secondary">{registered}</span>
            </TableCell>
            <TableCell className="w-px whitespace-nowrap">
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
            </TableCell>
          </>
        );
      }}
    />
  );
}
