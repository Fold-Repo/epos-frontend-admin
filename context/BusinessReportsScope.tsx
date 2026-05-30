"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { useParams } from "next/navigation";
import { registerBusinessIdGetter, unregisterBusinessIdGetter } from "@/lib";
import { useGetAdminBusinessDetails } from "@/services";

type BusinessReportsScopeContextValue = {
  businessId: string;
  businessName: string;
};

const BusinessReportsScopeContext =
  createContext<BusinessReportsScopeContextValue | null>(null);

type BusinessReportsScopeProviderProps = {
  children: ReactNode;
};

export function BusinessReportsScopeProvider({
  children,
}: BusinessReportsScopeProviderProps) {
  const params = useParams<{ id: string }>();
  const businessId = params.id ?? "";
  const { data } = useGetAdminBusinessDetails(businessId);

  useEffect(() => {
    if (!businessId) return;
    registerBusinessIdGetter(() => businessId);
    return () => unregisterBusinessIdGetter();
  }, [businessId]);

  const value = useMemo(
    () => ({
      businessId,
      businessName: data?.business_information.business_name ?? "Business",
    }),
    [businessId, data?.business_information.business_name]
  );

  return (
    <BusinessReportsScopeContext.Provider value={value}>
      {children}
    </BusinessReportsScopeContext.Provider>
  );
}

export function useBusinessReportsScope() {
  const context = useContext(BusinessReportsScopeContext);
  if (!context) {
    throw new Error(
      "useBusinessReportsScope must be used within BusinessReportsScopeProvider"
    );
  }
  return context;
}
