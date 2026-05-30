import { PaginationResponse } from "./pagination";

export interface Category {
  category_id: number;
  category_name: string;
  user_id: number;
  image?: string;
  productCount?: number;
  created_at?: string;
  last_modified?: string;
  status?: "active" | "inactive";
}

export interface CategoriesListResponse {
  status: number;
  data: Category[];
  pagination: PaginationResponse;
}
