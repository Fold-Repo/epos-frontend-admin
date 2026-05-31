import { useQuery } from "@tanstack/react-query";
import { ENDPOINT } from "@/constants";
import { client, getScopedBusinessId } from "@/lib";
import type { ActiveExpenseCategoriesResponse } from "@/types/expense-category.type";

export async function getActiveExpenseCategories(): Promise<ActiveExpenseCategoriesResponse> {
  const response = await client.get(`${ENDPOINT.EXPENSE_CATEGORIES}/active`);
  return response.data;
}

export const useGetActiveExpenseCategories = () => {
  const businessId = getScopedBusinessId();
  const { data, isLoading, error } = useQuery({
    queryKey: ["expense-categories-active", businessId],
    queryFn: async () => {
      const response = await getActiveExpenseCategories();
      return response.data;
    },
  });

  return {
    data: data || [],
    isLoading,
    error,
    activeCategories: data || [],
  };
};
