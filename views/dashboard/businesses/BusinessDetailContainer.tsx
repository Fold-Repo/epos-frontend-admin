"use client";

import { DashboardCard } from "@/components";
import {
  useActivateBusiness,
  useGetAdminBusinessDetails,
  useSuspendBusiness,
} from "@/services";
import type { AdminBusiness, AdminBusinessDetailsResponse } from "@/types/admin-business";
import BusinessDetailView from "./BusinessDetailView";
import {
  normalizeAccountStatus,
  normalizePersonaStatus,
  normalizeStripeStatus,
} from "./status";

function mapDetailsToAdminBusiness(data: AdminBusinessDetailsResponse["data"]): AdminBusiness {

  const info = data.business_information;
  const stats = data.business_stats;
  const verification = data.platform_verification;
  const locationParts = (info.location || "").split(",").map((part) => part.trim());
  const city = locationParts[0] || "";
  const country = locationParts.length > 1 ? locationParts[locationParts.length - 1] : "";

  return {
    id: String(info.business_id),
    businessId: info.business_id,
    businessname: info.business_name,
    businesstype: info.business_type,
    logo: info.business_logo,
    ownerEmail: info.contact_info.owner_email,
    ownerName: info.contact_info.owner_name,
    storeCount: stats.stores,
    personaStatus: normalizePersonaStatus(verification.persona_identity),
    stripe: normalizeStripeStatus(verification.stripe_connect),
    accountStatus: normalizeAccountStatus(info.business_status),
    createdAt: info.date_joined,
    bannerUrl: null,
    tin: info.tin,
    businessRegistrationNumber: info.registration_no,
    website: info.website,
    productService: info.product_service,
    productDescription: info.description,
    ownerPhone: info.contact_info.phone,
    city,
    country,
    stripeAccountId: null,
    stats: {
      customerCount: stats.customers ?? 0,
      totalOrders: stats.total_orders ?? 0,
      totalSales: stats.total_sales ?? 0,
      salesLast30Days: 0,
      productCount: stats.products_listed ?? 0,
      avgOrderValue: stats.avg_order_value ?? 0,
      lastOrderAt: stats.last_order_at,
      quotationCount: 0,
      staffCount: 0,
      refundCount: 0,
      refundsTotal: 0,
    },
  };
}

type BusinessDetailContainerProps = {
  businessId: string;
};

export default function BusinessDetailContainer({ businessId }: BusinessDetailContainerProps) {
  const { data, isLoading, isError } = useGetAdminBusinessDetails(businessId);
  const suspendBusinessMutation = useSuspendBusiness();
  const activateBusinessMutation = useActivateBusiness();
  const isUpdatingStatus =
    suspendBusinessMutation.isPending || activateBusinessMutation.isPending;

  if (isLoading) {
    return (
      <div className="min-h-screen p-5">
        <div className="mb-4 flex min-h-[calc(100vh-9rem)] flex-wrap lg:-mx-4 lg:mb-0">
          <div className="mb-4 flex w-full flex-col space-y-5 px-4 lg:mb-0 lg:w-[65%] 2xl:w-[70%]">
            <DashboardCard title="Business information">
              <div className="space-y-5 animate-pulse">
                <div className="h-8 w-72 rounded bg-slate-200" />
                {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="flex items-center justify-between gap-3">
                    <div className="h-5 w-44 rounded bg-slate-200" />
                    <div className="h-5 w-64 rounded bg-slate-200" />
                  </div>
                ))}
              </div>
            </DashboardCard>
          </div>

          <div className="flex w-full flex-col space-y-5 px-4 pl-4 pr-4 lg:w-[35%] lg:pl-0 2xl:w-[30%]">
            <DashboardCard title="Business stats">
              <div className="space-y-5 animate-pulse">
                {Array.from({ length: 7 }).map((_, index) => (
                  <div key={index} className="flex items-center justify-between gap-3">
                    <div className="h-5 w-36 rounded bg-slate-200" />
                    <div className="h-5 w-24 rounded bg-slate-200" />
                  </div>
                ))}
              </div>
            </DashboardCard>

            <DashboardCard title="Platform & verification">
              <div className="space-y-5 animate-pulse">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div key={index} className="flex items-center justify-between gap-3">
                    <div className="h-5 w-40 rounded bg-slate-200" />
                    <div className="h-7 w-24 rounded-full bg-slate-200" />
                  </div>
                ))}
              </div>
            </DashboardCard>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-5">
        <DashboardCard title="Business details">
          <p className="py-6 text-center text-sm text-epos-text-secondary">
            Unable to load business details.
          </p>
        </DashboardCard>
      </div>
    );
  }

  const business = mapDetailsToAdminBusiness(data);
  return (
    <BusinessDetailView
      business={business}
      onSuspend={async () => {
        await suspendBusinessMutation.mutateAsync(businessId);
      }}
      onActivate={async () => {
        await activateBusinessMutation.mutateAsync(businessId);
      }}
      isUpdatingStatus={isUpdatingStatus}
    />
  );
}
