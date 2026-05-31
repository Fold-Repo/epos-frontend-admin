export interface PaginationResponse {
  page: string;
  limit: string;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
