'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ENDPOINT } from "@/constants";
import { client } from "@/lib";
import type {
  AdminBusinessDetailsResponse,
  AdminBusinessesQueryParams,
  AdminBusinessesResponse,
} from "@/types/admin-business";

export async function getAdminBusinesses(
  params: AdminBusinessesQueryParams
): Promise<AdminBusinessesResponse> {
  const response = await client.get<AdminBusinessesResponse>(
    ENDPOINT.BUSINESSES.ADMIN_LIST,
    { params }
  );
  return response.data;
}

export function useGetAdminBusinesses(params: AdminBusinessesQueryParams) {
  return useQuery({
    queryKey: [
      "admin-businesses",
      params.page,
      params.limit,
      params.search,
      params.identity,
      params.stripe,
      params.sort,
      params.start_date,
      params.end_date,
    ],
    queryFn: () => getAdminBusinesses(params),
    placeholderData: (previousData) => previousData,
  });
}

export async function getAdminBusinessDetails(
  businessId: string | number
): Promise<AdminBusinessDetailsResponse["data"]> {
  const response = await client.get<AdminBusinessDetailsResponse>(
    `${ENDPOINT.BUSINESSES.ADMIN_LIST}/${businessId}`
  );
  return response.data.data;
}

export function useGetAdminBusinessDetails(businessId: string | number) {
  return useQuery({
    queryKey: ["admin-business-details", businessId],
    queryFn: () => getAdminBusinessDetails(businessId),
    enabled: Boolean(businessId),
  });
}

export async function suspendBusiness(businessId: string | number) {
  const response = await client.patch(`${ENDPOINT.BUSINESSES.ADMIN_LIST}/${businessId}/suspend`);
  return response.data;
}

export async function activateBusiness(businessId: string | number) {
  const response = await client.patch(`${ENDPOINT.BUSINESSES.ADMIN_LIST}/${businessId}/activate`);
  return response.data;
}

export function useSuspendBusiness() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: suspendBusiness,
    onSuccess: (_, businessId) => {
      queryClient.invalidateQueries({ queryKey: ["admin-business-details", String(businessId)] });
      queryClient.invalidateQueries({ queryKey: ["admin-businesses"] });
    },
  });
}

export function useActivateBusiness() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: activateBusiness,
    onSuccess: (_, businessId) => {
      queryClient.invalidateQueries({ queryKey: ["admin-business-details", String(businessId)] });
      queryClient.invalidateQueries({ queryKey: ["admin-businesses"] });
    },
  });
}
