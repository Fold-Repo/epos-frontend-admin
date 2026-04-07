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
