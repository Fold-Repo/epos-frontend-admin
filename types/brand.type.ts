import { PaginationResponse } from "./pagination";

export interface Brand {
  id: number;
  name: string;
  short_name: string;
  user_id: number;
  business_id: number;
  created_at: string;
  updated_at: string;
  productCount?: number;
  status?: "active" | "inactive";
}

export interface BrandsListResponse {
  status: number;
  data: Brand[];
  pagination: PaginationResponse;
}
