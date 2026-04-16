const BASE_URL = {
  development:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.dfoldlab.co.uk/api/v1",
  production:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.dfoldlab.co.uk/api/v1",
} as const;

type Env = keyof typeof BASE_URL;
const currentEnv: Env = (process.env.NODE_ENV as Env) || "development";

export const API_BASE_URL = BASE_URL[currentEnv];

export const ENDPOINT = {
  USERS: {
    PROFILE: "/users/profile",
    ADMINS: "/admin/users/admins",
  },
  BUSINESSES: {
    ADMIN_LIST: "/admin/businesses",
  },
  DASHBOARD: {
    KEY_PERFORMANCE_METRICS: "/admin/dashboard/key-performance-metrics",
    TOP_BUSINESSES: "/admin/dashboard/top-businesses",
    TRENDS: "/admin/dashboard/trends",
  },
  REVENUE: {
    OVERVIEW: "/admin/revenue/overview",
    TREND: "/admin/revenue/trend",
  },
  VERIFICATION: {
    MERCHANTS_NEEDING_ATTENTION: "/admin/verification/merchants-needing-attention",
    TREND: "/admin/verification/trend",
    PIPELINE_SNAPSHOT: "/admin/verification/pipeline-snapshot",
  },
  ORDERS_ACTIVITY: {
    THROUGHPUT: "/admin/orders-activity/throughput",
    ORDER_VOLUME: "/admin/orders-activity/order-volume",
    RECENT_CHECKOUT: "/admin/orders-activity/recent-checkout",
  },
  AUTH: {
    LOGIN: "/admin/auth/login",
    LOGOUT: "/auth/signout",
  },
} as const;
