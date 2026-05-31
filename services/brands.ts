import { useQuery } from "@tanstack/react-query";
import { ENDPOINT } from "@/constants";
import { client, getScopedBusinessId } from "@/lib";
import type { BrandsListResponse } from "@/types/brand.type";

export async function getBrands(
  page: number = 1,
  limit: number = 200
): Promise<BrandsListResponse> {
  const response = await client.get(ENDPOINT.BRANDS, {
    params: { page, limit },
  });
  return response.data;
}

export const useGetBrands = (page: number = 1, limit: number = 25) => {
  const businessId = getScopedBusinessId();
  const { data, isLoading, error } = useQuery({
    queryKey: ["brands-list", businessId, page, limit],
    queryFn: async () => {
      const response = await getBrands(page, limit);
      return {
        data: response.data,
        pagination: response.pagination,
      };
    },
  });

  return {
    data: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    error,
  };
};
