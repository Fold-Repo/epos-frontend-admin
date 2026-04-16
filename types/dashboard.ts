export interface KeyPerformanceMetricCard {
  key: string;
  label: string;
  value: number;
  change_pct: number;
}

export interface KeyPerformanceMetricsResponse {
  status: number;
  message: string;
  data: {
    period: string;
    cards: KeyPerformanceMetricCard[];
  };
}

export interface TopBusinessItem {
  rank: number;
  business_id: number;
  business_name: string;
  handle: string;
  owner: {
    user_id: number;
    firstname: string;
    lastname: string;
  };
  seven_day_volume: number;
  stores_count: number;
  payouts_status: string;
  payouts_enabled: boolean;
}

export interface TopBusinessesResponse {
  status: number;
  message: string;
  data: {
    period: {
      start: string;
      end: string;
      days: number;
    };
    items: TopBusinessItem[];
  };
}

export interface DashboardTrendRevenueItem {
  key: string;
  label: string;
  value: number;
}

export interface DashboardTrendsResponse {
  status: number;
  message: string;
  data: {
    weekly_order_volume: {
      labels: string[];
      values: number[];
      total_orders: number;
      week_start: string;
      week_end: string;
    };
    revenue_distribution: DashboardTrendRevenueItem[];
    currency: string;
  };
}
