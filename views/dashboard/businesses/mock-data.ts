import type {
  AdminBusiness,
  AdminBusinessListRow,
  AdminBusinessStats,
} from "@/types/admin-business";

function mockStatsForBusiness(row: AdminBusinessListRow): AdminBusinessStats {
  const n = row.businessId;
  const customerCount = 200 + (n * 97) % 9_500;
  const totalOrders = 80 + (n * 53) % 15_000;
  const avgOrderValue = 2_500 + (n % 120) * 50;
  const totalSales = Math.round(avgOrderValue * totalOrders * 0.92);
  const productCount = 12 + (n % 180);
  const lastOrderAt =
    row.stripe === "not_connected"
      ? null
      : new Date(Date.now() - (n % 72) * 3_600_000).toISOString();

  const quotationCount = 30 + (n * 41) % 2_000;
  const staffCount = 1 + (n % 12);
  const refundCount = (n * 17) % 80;
  const refundsTotal = Math.round(refundCount * avgOrderValue * 0.12);
  const salesLast30Days = Math.round(
    totalSales * (0.06 + ((n % 25) / 500)),
  );

  return {
    customerCount,
    totalOrders,
    totalSales,
    salesLast30Days,
    productCount,
    avgOrderValue,
    lastOrderAt,
    quotationCount,
    staffCount,
    refundCount,
    refundsTotal,
  };
}

// ======================= MOCK LIST ROWS (REPLACE WITH ADMIN API) =======================
const MOCK_BASE: AdminBusinessListRow[] = [
  {
    id: "b1",
    businessId: 1001,
    businessname: "Northwind Traders Ltd",
    businesstype: "Retail",
    logo: "https://i.pravatar.cc/150?u=northwind",
    ownerEmail: "ada@northwind.test",
    ownerName: "Ada N.",
    storeCount: 4,
    personaStatus: "completed",
    stripe: "live",
    accountStatus: "active",
    createdAt: "2024-06-12T10:00:00.000Z",
  },
  {
    id: "b2",
    businessId: 1002,
    businessname: "Lagos Fresh Market",
    businesstype: "Food & beverage",
    logo: null,
    ownerEmail: "owner@lagosfresh.ng",
    ownerName: "Chidi O.",
    storeCount: 2,
    personaStatus: "completed",
    stripe: "live",
    accountStatus: "active",
    createdAt: "2024-08-01T14:30:00.000Z",
  },
  {
    id: "b3",
    businessId: 1003,
    businessname: "Urban Electronics",
    businesstype: "Retail",
    logo: "https://i.pravatar.cc/150?u=urbanelec",
    ownerEmail: "sales@urbanelec.com",
    ownerName: "Sarah K.",
    storeCount: 1,
    personaStatus: "started",
    stripe: "onboarding",
    accountStatus: "active",
    createdAt: "2025-01-20T09:15:00.000Z",
  },
  {
    id: "b4",
    businessId: 1004,
    businessname: "GreenLeaf Organics",
    businesstype: "Retail",
    logo: "https://i.pravatar.cc/150?u=greenleaf",
    ownerEmail: "hello@greenleaf.co",
    ownerName: "Maya T.",
    storeCount: 3,
    personaStatus: "completed",
    stripe: "onboarding",
    accountStatus: "active",
    createdAt: "2024-11-05T16:45:00.000Z",
  },
  {
    id: "b5",
    businessId: 1005,
    businessname: "Studio Nine Retail",
    businesstype: "Fashion",
    logo: null,
    ownerEmail: "nine@studio.ng",
    ownerName: "James R.",
    storeCount: 1,
    personaStatus: "pending",
    stripe: "not_connected",
    accountStatus: "suspended",
    createdAt: "2025-03-10T11:00:00.000Z",
  },
  {
    id: "b6",
    businessId: 1006,
    businessname: "Harbor Logistics Co.",
    businesstype: "Services",
    logo: "https://i.pravatar.cc/150?u=harbor",
    ownerEmail: "ops@harborlog.io",
    ownerName: "Liam P.",
    storeCount: 6,
    personaStatus: "completed",
    stripe: "live",
    accountStatus: "active",
    createdAt: "2023-12-18T08:20:00.000Z",
  },
  {
    id: "b7",
    businessId: 1007,
    businessname: "Bright Pharmacy",
    businesstype: "Healthcare",
    logo: "https://i.pravatar.cc/150?u=brightpharm",
    ownerEmail: "admin@brightpharm.ng",
    ownerName: "Dr. Funke A.",
    storeCount: 2,
    personaStatus: "completed",
    stripe: "live",
    accountStatus: "active",
    createdAt: "2024-04-22T13:10:00.000Z",
  },
  {
    id: "b8",
    businessId: 1008,
    businessname: "Metro Builders Supply",
    businesstype: "Wholesale",
    logo: null,
    ownerEmail: "orders@metrobuilders.ng",
    ownerName: "Yusuf M.",
    storeCount: 5,
    personaStatus: "completed",
    stripe: "onboarding",
    accountStatus: "active",
    createdAt: "2024-09-30T07:55:00.000Z",
  },
  {
    id: "b9",
    businessId: 1009,
    businessname: "Cocoa Exports NG",
    businesstype: "Export",
    logo: "https://i.pravatar.cc/150?u=cocoaex",
    ownerEmail: "trade@cocoaex.ng",
    ownerName: "Amina B.",
    storeCount: 1,
    personaStatus: "failed",
    stripe: "not_connected",
    accountStatus: "active",
    createdAt: "2025-02-14T12:00:00.000Z",
  },
  {
    id: "b10",
    businessId: 1010,
    businessname: "Pixel Digital Agency",
    businesstype: "Services",
    logo: "https://i.pravatar.cc/150?u=pixel",
    ownerEmail: "team@pixel.agency",
    ownerName: "Chris V.",
    storeCount: 1,
    personaStatus: "completed",
    stripe: "live",
    accountStatus: "active",
    createdAt: "2024-07-07T15:40:00.000Z",
  },
  {
    id: "b11",
    businessId: 1011,
    businessname: "Sunrise Cafe Chain",
    businesstype: "Food & beverage",
    logo: null,
    ownerEmail: "founder@sunrisecafe.ng",
    ownerName: "Elena G.",
    storeCount: 8,
    personaStatus: "completed",
    stripe: "live",
    accountStatus: "active",
    createdAt: "2023-05-29T10:25:00.000Z",
  },
  {
    id: "b12",
    businessId: 1012,
    businessname: "Atlas Hardware",
    businesstype: "Retail",
    logo: "https://i.pravatar.cc/150?u=atlas",
    ownerEmail: "store@atlashw.com",
    ownerName: "Tom H.",
    storeCount: 2,
    personaStatus: "started",
    stripe: "onboarding",
    accountStatus: "active",
    createdAt: "2025-04-01T09:30:00.000Z",
  },
];

// ======================= EXTEND WITH PROFILE DETAIL (e-pos SHAPES) =======================
export function extendWithDetail(row: AdminBusinessListRow): AdminBusiness {
  return {
    ...row,
    bannerUrl: `https://picsum.photos/seed/eposbanner${row.businessId}/720/180`,
    tin: `TIN-${row.businessId}-NG-2024`,
    businessRegistrationNumber: `RC ${780000 + row.businessId}`,
    website: row.logo ? `https://www.biz-${row.businessId}.example.com` : null,
    productService: `${row.businesstype} — EPOS merchant operations`,
    productDescription: `Registered on EPOS. Primary trade: ${row.businesstype}.`,
    ownerPhone: "+234 801 234 5678",
    city: row.businessId % 3 === 0 ? "Abuja" : "Lagos",
    country: "Nigeria",
    stripeAccountId:
      row.stripe === "live"
        ? `acct_live_${row.businessId}`
        : row.stripe === "onboarding"
          ? `acct_pending_${row.businessId}`
          : null,
    stats: mockStatsForBusiness(row),
  };
}

export const MOCK_BUSINESSES: AdminBusiness[] = MOCK_BASE.map(extendWithDetail);

export function getBusinessById(id: string): AdminBusiness | undefined {
  return MOCK_BUSINESSES.find((b) => b.id === id);
}
