"use client";

import moment from "moment";
import { DashboardBreadCrumb } from "@/components";
import { DASHBOARD_ROOT } from "@/constants/dashboard-nav";
import type { AdminBusiness } from "@/types/admin-business";
import BusinessInformation from "./BusinessInformation";
import BusinessPlatformPanel from "./BusinessPlatformPanel";
import BusinessStatsPanel from "./BusinessStatsPanel";

type BusinessDetailViewProps = {
  business: AdminBusiness;
  onSuspend: () => Promise<void>;
  onActivate: () => Promise<void>;
  isUpdatingStatus?: boolean;
};

// ======================= BUSINESS DETAIL PAGE VIEW =======================
export default function BusinessDetailView({
  business,
  onSuspend,
  onActivate,
  isUpdatingStatus = false,
}: BusinessDetailViewProps) {
  const registered = moment(business.createdAt).format("D MMM YYYY, HH:mm");

  return (
    <>
      <DashboardBreadCrumb
        className="text-left [&_ol]:justify-start"
        items={[
          { label: "Dashboard", href: DASHBOARD_ROOT },
          { label: "Businesses", href: `${DASHBOARD_ROOT}/businesses` },
          { label: business.businessname },
        ]}
        title={business.businessname}
        description={`Business ID #${business.businessId} · Registered ${registered}`}
      />

      <div className="p-5">

        <div className="mb-4 flex flex-wrap lg:-mx-4 lg:mb-0">
          
          <div className="mb-4 flex w-full flex-col space-y-5 px-4 lg:mb-0 lg:w-[65%] 2xl:w-[70%]">
            <BusinessInformation
              business={business}
              onSuspend={onSuspend}
              onActivate={onActivate}
              isUpdatingStatus={isUpdatingStatus}
            />
          </div>

          <div className="flex w-full flex-col space-y-5 px-4 pl-4 pr-4 lg:w-[35%] lg:pl-0 2xl:w-[30%]">
            
            <BusinessStatsPanel business={business} />

            <BusinessPlatformPanel business={business} />

          </div>

        </div>

      </div>

    </>
  );
}
