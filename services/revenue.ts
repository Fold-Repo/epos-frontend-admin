'use client'

import { useQuery } from "@tanstack/react-query";
import { ENDPOINT } from "@/constants";
import { client } from "@/lib";
import { RevenueOverviewResponse, RevenueTrendResponse } from "@/types";

export async function getRevenueOverview(): Promise<RevenueOverviewResponse["data"]> {
  const response = await client.get<RevenueOverviewResponse>(ENDPOINT.REVENUE.OVERVIEW);

  if (!response.data?.data) {
    throw new Error(response.data?.message || "Failed to fetch revenue overview");
  }

  return response.data.data;
}

export function useGetRevenueOverview() {
  return useQuery({
    queryKey: ["admin-revenue-overview"],
    queryFn: getRevenueOverview,
  });
}

export async function getRevenueTrend(): Promise<RevenueTrendResponse["data"]> {
  const response = await client.get<RevenueTrendResponse>(ENDPOINT.REVENUE.TREND);

  if (!response.data?.data) {
    throw new Error(response.data?.message || "Failed to fetch revenue trend");
  }

  return response.data.data;
}

export function useGetRevenueTrend() {
  return useQuery({
    queryKey: ["admin-revenue-trend"],
    queryFn: getRevenueTrend,
  });
}
