export interface RevenueOverviewCard {
  key: string;
  label: string;
  value: number;
  change_pct: number;
  change_vs: string;
}

export interface RevenueOverviewResponse {
  status: number;
  message: string;
  data: {
    period: {
      start_30d: string;
      end_30d: string;
    };
    cards: RevenueOverviewCard[];
    currency: string;
    notes: {
      net_to_tenants_formula: string;
    };
  };
}

export interface RevenueTrendResponse {
  status: number;
  message: string;
  data: {
    period: {
      start_month: string;
      end_month: string;
      months: number;
    };
    gmv_trend: {
      labels: string[];
      values: number[];
      total: number;
    };
    currency: string;
  };
}
