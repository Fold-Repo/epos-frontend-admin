'use client'

import { useQuery } from "@tanstack/react-query";
import { ENDPOINT } from "@/constants";
import { client } from "@/lib";
import {
  DashboardTrendsResponse,
  KeyPerformanceMetricsResponse,
  TopBusinessesResponse,
} from "@/types";

export async function getKeyPerformanceMetrics(): Promise<KeyPerformanceMetricsResponse["data"]> {
  const response = await client.get<KeyPerformanceMetricsResponse>(
    ENDPOINT.DASHBOARD.KEY_PERFORMANCE_METRICS
  );

  if (!response.data?.data) {
    throw new Error(response.data?.message || "Failed to fetch key performance metrics");
  }

  return response.data.data;
}

export function useGetKeyPerformanceMetrics() {
  return useQuery({
    queryKey: ["admin-key-performance-metrics"],
    queryFn: getKeyPerformanceMetrics,
  });
}

export async function getTopBusinesses(): Promise<TopBusinessesResponse["data"]> {
  const response = await client.get<TopBusinessesResponse>(
    ENDPOINT.DASHBOARD.TOP_BUSINESSES
  );

  if (!response.data?.data) {
    throw new Error(response.data?.message || "Failed to fetch top businesses");
  }

  return response.data.data;
}

export function useGetTopBusinesses() {
  return useQuery({
    queryKey: ["admin-top-businesses"],
    queryFn: getTopBusinesses,
  });
}

export async function getDashboardTrends(): Promise<DashboardTrendsResponse["data"]> {
  const response = await client.get<DashboardTrendsResponse>(
    ENDPOINT.DASHBOARD.TRENDS
  );

  if (!response.data?.data) {
    throw new Error(response.data?.message || "Failed to fetch dashboard trends");
  }

  return response.data.data;
}

export function useGetDashboardTrends() {
  return useQuery({
    queryKey: ["admin-dashboard-trends"],
    queryFn: getDashboardTrends,
  });
}
