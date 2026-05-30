import { useQuery } from "@tanstack/react-query";
import { ENDPOINT } from "@/constants";
import { client, getScopedBusinessId } from "@/lib";
import type { CategoriesListResponse } from "@/types/category.type";

export async function getCategories(
  page: number = 1,
  limit: number = 200
): Promise<CategoriesListResponse> {
  const response = await client.get(ENDPOINT.CATEGORIES, {
    params: { page, limit },
  });
  return response.data;
}

export const useGetCategories = (page: number = 1, limit: number = 25) => {
  const businessId = getScopedBusinessId();
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories-list", businessId, page, limit],
    queryFn: async () => {
      const response = await getCategories(page, limit);
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
