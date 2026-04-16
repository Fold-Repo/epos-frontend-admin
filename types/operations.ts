export type OrdersActivityThroughputCard = {
  key: string;
  label: string;
  value: number;
  change_pct: number | null;
  change_vs: string | null;
};

export type OrdersActivityThroughputResponse = {
  status: number;
  message: string;
  data: {
    period: {
      today: string;
      yesterday: string;
      last_24h_start: string;
      last_24h_end: string;
    };
    cards: OrdersActivityThroughputCard[];
  };
};

export type OrdersActivityOrderVolumeResponse = {
  status: number;
  message: string;
  data: {
    period: {
      date: string;
      timezone: string;
    };
    order_volume: {
      labels: string[];
      values: number[];
      total_orders: number;
      peak_hour: string;
    };
    source: string;
  };
};

export type OrdersActivityRecentCheckoutItem = {
  reference: string;
  business: string;
  channel: string;
  total: number;
  type: string;
  created_at: string;
  time_ago: string;
};

export type OrdersActivityRecentCheckoutResponse = {
  status: number;
  message: string;
  data: {
    items: OrdersActivityRecentCheckoutItem[];
    pagination: {
      limit: number;
      count: number;
    };
  };
};
