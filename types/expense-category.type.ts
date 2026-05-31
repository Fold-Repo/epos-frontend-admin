import { PaginationResponse } from "./pagination";

export interface ExpenseCategory {
  id: number;
  business_id?: number;
  name: string;
  description?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ActiveExpenseCategory {
  id: number;
  name: string;
}

export interface ExpenseCategoriesListResponse {
  status: number;
  data: ExpenseCategory[];
  pagination: PaginationResponse;
}

export interface ActiveExpenseCategoriesResponse {
  status: number;
  data: ActiveExpenseCategory[];
}
