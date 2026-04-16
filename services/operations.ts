'use client';

import { useQuery } from "@tanstack/react-query";
import { ENDPOINT } from "@/constants";
import { client } from "@/lib";
import type {
  OrdersActivityOrderVolumeResponse,
  OrdersActivityRecentCheckoutResponse,
  OrdersActivityThroughputResponse,
} from "@/types";

export async function getOrdersActivityThroughput(): Promise<OrdersActivityThroughputResponse["data"]> {
  const response = await client.get<OrdersActivityThroughputResponse>(
    ENDPOINT.ORDERS_ACTIVITY.THROUGHPUT
  );

  if (!response.data?.data) {
    throw new Error(response.data?.message || "Failed to fetch throughput");
  }

  return response.data.data;
}

export function useGetOrdersActivityThroughput() {
  return useQuery({
    queryKey: ["admin-orders-activity-throughput"],
    queryFn: getOrdersActivityThroughput,
  });
}

export async function getOrdersActivityOrderVolume(): Promise<OrdersActivityOrderVolumeResponse["data"]> {
  const response = await client.get<OrdersActivityOrderVolumeResponse>(
    ENDPOINT.ORDERS_ACTIVITY.ORDER_VOLUME
  );

  if (!response.data?.data) {
    throw new Error(response.data?.message || "Failed to fetch order volume");
  }

  return response.data.data;
}

export function useGetOrdersActivityOrderVolume() {
  return useQuery({
    queryKey: ["admin-orders-activity-order-volume"],
    queryFn: getOrdersActivityOrderVolume,
  });
}

export async function getOrdersActivityRecentCheckout(
  params: { limit?: number; page?: number } = {}
): Promise<OrdersActivityRecentCheckoutResponse["data"]> {
  const queryParams = {
    limit: params.limit ?? 20,
    page: params.page ?? 1,
  };

  const response = await client.get<OrdersActivityRecentCheckoutResponse>(
    ENDPOINT.ORDERS_ACTIVITY.RECENT_CHECKOUT,
    {
      params: queryParams,
    }
  );

  if (!response.data?.data) {
    throw new Error(response.data?.message || "Failed to fetch recent checkouts");
  }

  return response.data.data;
}

export function useGetOrdersActivityRecentCheckout(limit: number = 20) {
  const page = 1;
  return useQuery({
    queryKey: ["admin-orders-activity-recent-checkout", page, limit],
    queryFn: () => getOrdersActivityRecentCheckout({ page, limit }),
  });
}

export function useGetOrdersActivityRecentCheckoutPaginated(
  params: { limit?: number; page?: number } = {}
) {
  const limit = params.limit ?? 20;
  const page = params.page ?? 1;

  return useQuery({
    queryKey: ["admin-orders-activity-recent-checkout", page, limit],
    queryFn: () => getOrdersActivityRecentCheckout({ page, limit }),
    placeholderData: (previousData) => previousData,
  });
}
