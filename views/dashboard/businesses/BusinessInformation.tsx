"use client";

import { useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";
import type { AdminBusiness, AdminBusinessAccountStatus } from "@/types/admin-business";
import { Chip, Image, Button } from "@heroui/react";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/classname";

type BusinessInformationProps = {
  business: AdminBusiness;
};

const logoFallback = (id: string) => `https://i.pravatar.cc/150?u=${encodeURIComponent(id)}`;

// ======================= BUSINESS INFORMATION =======================
export default function BusinessInformation({ business }: BusinessInformationProps) {
  const [accountStatus, setAccountStatus] = useState<AdminBusinessAccountStatus>(
    business.accountStatus,
  );
  useEffect(() => {
    setAccountStatus(business.accountStatus);
  }, [business.id, business.accountStatus]);

  const logoSrc = business.logo ?? logoFallback(business.id);
  const dateJoined = moment(business.createdAt).format("D MMM YYYY, HH:mm");

  const isActive = accountStatus === "active";

  const handleSuspend = () => {
    const ok = window.confirm(
      `Suspend "${business.businessname}"? The merchant will lose access to EPOS immediately until you activate them again.`,
    );
    if (ok) setAccountStatus("suspended");
  };

  const handleActivate = () => {
    const ok = window.confirm(
      `Activate "${business.businessname}"? They will be able to sign in and trade on EPOS again.`,
    );
    if (ok) setAccountStatus("active");
  };

  return (
    <div className="rounded-2xl border border-[#E2E4E9] bg-white p-5 shadow-[0px_1px_2px_0px_#E4E5E73D]">

      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-base font-medium text-epos-text-primary 2xl:text-lg">
          Business information
        </h2>
      </div>

      <div className="flex flex-col divide-y divide-[#EAECF0]">

        <div className="py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xs font-medium leading-tight text-epos-text-primary">
              Business status
            </h3>
            <div className="flex flex-wrap items-center justify-end gap-2">
              <Chip
                size="sm"
                variant="flat"
                className={cn(
                  "px-2.5 text-[11px] font-medium",
                  isActive ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800",
                )}>
                {isActive ? "Active" : "Suspended"}
              </Chip>
              {isActive ? (
                <Button size="sm" radius="md" variant="bordered"
                  className="h-8 min-h-8 border-red-200 text-[11px] font-medium text-red-800"
                  onPress={handleSuspend}>
                  Suspend
                </Button>
              ) : (
                <Button size="sm" radius="md" color="primary"
                  className="h-8 min-h-8 text-[11px] font-medium"
                  onPress={handleActivate}>
                  Activate
                </Button>
              )}
            </div>
          </div>
          <p className="-mt-1 max-w-xl text-[11px] leading-relaxed text-epos-text-secondary">
            {isActive
              ? "Merchants with active status can sign in and trade. Suspending blocks access immediately."
              : "This merchant cannot sign in or trade until you activate the account again."}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 py-4">
          <h3 className="text-xs font-medium leading-tight text-epos-text-primary">
            Business logo
          </h3>
          <Image alt="" radius="full"
              className="size-16 object-cover"
              src={logoSrc}
              width={64}
              height={64}
            />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 py-4">
          <h3 className="text-xs font-medium leading-tight text-epos-text-primary">Business name</h3>
          <p className="text-left text-xs text-epos-text-primary">{business.businessname}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 py-4">
          <h3 className="text-xs font-medium leading-tight text-epos-text-primary">Contact info</h3>
          <div className="flex flex-wrap items-center gap-x-2">
            <LockClosedIcon className="mb-0.5 size-4 shrink-0 text-epos-text-secondary" />
            <Link href={`mailto:${business.ownerEmail}`}
              className="text-xs text-primary-600 underline-offset-2 hover:underline">
              {business.ownerEmail}
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 py-4">
          <h3 className="text-xs font-medium leading-tight text-epos-text-primary">Business type</h3>
          <Chip size="sm" variant="flat" className="bg-neutral-100 px-2 text-[11px] text-epos-text-primary">
            {business.businesstype}
          </Chip>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 py-4">
          <h3 className="text-xs font-medium leading-tight text-epos-text-primary">
            Product / service
          </h3>
          <p className="max-w-md text-left text-xs text-epos-text-primary">{business.productService}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 py-4">
          <h3 className="text-xs font-medium leading-tight text-epos-text-primary">Description</h3>
          <p className="max-w-md text-left text-xs text-epos-text-secondary">
            {business.productDescription}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 py-4">
          <h3 className="text-xs font-medium leading-tight text-epos-text-primary">TIN</h3>
          <p className="text-left text-xs font-mono text-epos-text-primary">{business.tin}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 py-4">
          <h3 className="text-xs font-medium leading-tight text-epos-text-primary">Registration no.</h3>
          <p className="text-left text-xs font-mono text-epos-text-primary">
            {business.businessRegistrationNumber}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 py-4">
          <h3 className="text-xs font-medium leading-tight text-epos-text-primary">Location</h3>
          <p className="text-left text-xs text-epos-text-primary">
            {[business.city, business.country].filter(Boolean).join(", ") || "—"}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 py-4">
          <h3 className="text-xs font-medium leading-tight text-epos-text-primary">Phone</h3>
          <a
            href={`tel:${business.ownerPhone.replace(/\s/g, "")}`}
            className="text-left text-xs text-primary-600 underline-offset-2 hover:underline"
          >
            {business.ownerPhone}
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 py-4">
          <h3 className="text-xs font-medium leading-tight text-epos-text-primary">Website</h3>
          {business.website ? (
            <a
              href={business.website}
              target="_blank"
              rel="noopener noreferrer"
              className="max-w-md break-all text-left text-xs text-primary-600 underline-offset-2 hover:underline"
            >
              {business.website.replace(/^https?:\/\//, "")}
            </a>
          ) : (
            <p className="text-left text-xs text-epos-text-primary">—</p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 py-4">
          <h3 className="text-xs font-medium leading-tight text-epos-text-primary">Date joined</h3>
          <p className="text-left text-xs text-epos-text-primary">{dateJoined}</p>
        </div>

      </div>
    </div>
  );
}
