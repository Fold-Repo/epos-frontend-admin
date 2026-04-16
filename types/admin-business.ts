/**
 * Admin list row — mirrors e-pos merchant profile/business payloads
 * (`ProfileBusiness`, `ProfileUser` persona flags, `BusinessConnectStatusData`, stores count).
 */
export type AdminStripeSummary = "live" | "onboarding" | "not_connected";

/** Persona / identity verification lifecycle for admin UI. */
export type AdminPersonaSummary =
  | "completed"
  | "pending"
  | "started"
  | "failed";

/** Admin-controlled access: merchant can trade and sign in when active. */
export type AdminBusinessAccountStatus = "active" | "suspended";

export type AdminBusinessListRow = {
  id: string;
  businessId: number;
  businessname: string;
  businesstype: string;
  logo: string | null;
  ownerEmail: string;
  ownerName: string;
  storeCount: number;
  personaStatus: AdminPersonaSummary;
  stripe: AdminStripeSummary;
  accountStatus: AdminBusinessAccountStatus;
  createdAt: string;
};

export type AdminBusinessesSort = "newest" | "oldest";
export type AdminBusinessesIdentityFilter = "all" | "started" | "pending" | "failed" | "completed";
export type AdminBusinessesStripeFilter = "all" | "live" | "onboarding" | "not_connected";

export type AdminBusinessesQueryParams = {
  page?: number;
  limit?: number;
  search?: string | null;
  identity?: AdminBusinessesIdentityFilter;
  stripe?: AdminBusinessesStripeFilter;
  sort?: AdminBusinessesSort;
  start_date?: string | null;
  end_date?: string | null;
};

export type AdminBusinessesApiItem = {
  business_id: number;
  business_name: string;
  business_code: string;
  type: string;
  owner_email: string;
  stores: number;
  identity_status: string;
  business_status: string;
  stripe_status: string;
  registered_at: string;
};

export type AdminBusinessesResponse = {
  status: number;
  message: string;
  data: AdminBusinessesApiItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: {
    identity: string;
    stripe: string;
    sort: string;
    search: string | null;
    start_date: string | null;
    end_date: string | null;
  };
};

/** e-pos `ProfileBusiness` / address-style fields for admin detail page */
export type AdminBusinessDetailFields = {
  /** Store / storefront banner (e-pos profile branding) */
  bannerUrl: string | null;
  tin: string;
  businessRegistrationNumber: string;
  website: string | null;
  productService: string;
  productDescription: string;
  ownerPhone: string;
  city: string;
  country: string;
  stripeAccountId: string | null;
};

/** Aggregated activity for admin business detail (replace with admin API). */
export type AdminBusinessStats = {
  customerCount: number;
  totalOrders: number;
  /** Lifetime gross sales, major currency units */
  totalSales: number;
  /** Approx. gross in the last 30 days */
  salesLast30Days: number;
  productCount: number;
  avgOrderValue: number;
  lastOrderAt: string | null;
  quotationCount: number;
  staffCount: number;
  refundCount: number;
  refundsTotal: number;
};

export type AdminBusiness = AdminBusinessListRow &
  AdminBusinessDetailFields & {
    stats: AdminBusinessStats;
  };

export type AdminBusinessDetailsResponse = {
  status: number;
  message: string;
  data: {
    business_information: {
      business_id: number;
      business_status: string;
      business_logo: string | null;
      business_name: string;
      contact_info: {
        owner_name: string;
        owner_email: string;
        phone: string;
      };
      business_type: string;
      product_service: string;
      description: string;
      tin: string;
      registration_no: string;
      location: string;
      website: string | null;
      date_joined: string;
    };
    business_stats: {
      stores: number;
      customers: number;
      total_orders: number;
      total_sales: number;
      products_listed: number | null;
      avg_order_value: number;
      last_order_at: string | null;
    };
    platform_verification: {
      persona_identity: string;
      stripe_connect: string;
    };
  };
};
