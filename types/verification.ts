export type MerchantsNeedingAttentionQueryParams = {
  page?: number;
  limit?: number;
};

export type MerchantsNeedingAttentionItem = {
  business_id: number;
  business: string;
  area: "Persona" | "Stripe";
  status: string;
  age_days: number;
};

export type MerchantsNeedingAttentionResponse = {
  status: number;
  message: string;
  data: {
    items: MerchantsNeedingAttentionItem[];
    pagination: {
      limit: number;
      count: number;
    };
  };
};

export type VerificationTrendResponse = {
  status: number;
  message: string;
  data: {
    period: {
      weeks: number;
      start_week: string;
      end_week: string;
    };
    persona_completions: {
      labels: string[];
      values: number[];
      total: number;
    };
  };
};

export type VerificationPipelineSnapshotCard = {
  key: string;
  label: string;
  value: number;
  change_pct: number | null;
  change_vs: string | null;
};

export type VerificationPipelineSnapshotResponse = {
  status: number;
  message: string;
  data: {
    period: string;
    cards: VerificationPipelineSnapshotCard[];
  };
};
