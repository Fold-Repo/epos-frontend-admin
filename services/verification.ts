'use client';

import { useQuery } from "@tanstack/react-query";
import { ENDPOINT } from "@/constants";
import { client } from "@/lib";
import type {
  MerchantsNeedingAttentionQueryParams,
  MerchantsNeedingAttentionResponse,
  VerificationPipelineSnapshotResponse,
  VerificationTrendResponse,
} from "@/types";

export async function getMerchantsNeedingAttention(
  params: MerchantsNeedingAttentionQueryParams = {}
): Promise<MerchantsNeedingAttentionResponse> {
  const queryParams = {
    limit: params.limit ?? 25,
    page: params.page ?? 1,
  };

  const response = await client.get<MerchantsNeedingAttentionResponse>(
    ENDPOINT.VERIFICATION.MERCHANTS_NEEDING_ATTENTION,
    {
      params: queryParams,
    }
  );
  return response.data;
}

export function useGetMerchantsNeedingAttention(
  params: MerchantsNeedingAttentionQueryParams = {}
) {
  const limit = params.limit ?? 25;
  const page = params.page ?? 1;

  return useQuery({
    queryKey: ["admin-merchants-needing-attention", page, limit],
    queryFn: () => getMerchantsNeedingAttention({ page, limit }),
    placeholderData: (previousData) => previousData,
  });
}

export async function getVerificationTrend(): Promise<VerificationTrendResponse> {
  const response = await client.get<VerificationTrendResponse>(
    ENDPOINT.VERIFICATION.TREND
  );
  return response.data;
}

export function useGetVerificationTrend() {
  return useQuery({
    queryKey: ["admin-verification-trend"],
    queryFn: getVerificationTrend,
  });
}

export async function getVerificationPipelineSnapshot(): Promise<VerificationPipelineSnapshotResponse> {
  const response = await client.get<VerificationPipelineSnapshotResponse>(
    ENDPOINT.VERIFICATION.PIPELINE_SNAPSHOT
  );
  return response.data;
}

export function useGetVerificationPipelineSnapshot() {
  return useQuery({
    queryKey: ["admin-verification-pipeline-snapshot"],
    queryFn: getVerificationPipelineSnapshot,
  });
}
