// src/data/subscriptionPlans.ts

export interface SubscriptionPlan {
  boxSize: number;
  frequency: 'weekly' | 'bi-weekly' | 'monthly';
  planCode: string;
  monthlyPrice: number;
  label: string;
}

export const SUBSCRIPTION_PLANS: Record<string, SubscriptionPlan> = {
  // --- 6-PIECE BOX ---
  "6_weekly": {
    boxSize: 6,
    frequency: 'weekly',
    planCode: "PLN_v0kwiibhdinr4ry",
    monthlyPrice: 360,
    label: "6-Piece Box - Weekly Delivery (Billed Monthly)"
  },
  "6_bi-weekly": {
    boxSize: 6,
    frequency: 'bi-weekly',
    planCode: "PLN_dlxoaen9lb1rs8s",
    monthlyPrice: 180,
    label: "6-Piece Box - Bi-Weekly Delivery (Billed Monthly)"
  },
  "6_monthly": {
    boxSize: 6,
    frequency: 'monthly',
    planCode: "PLN_u3u5lz2mzg4qiml",
    monthlyPrice: 90,
    label: "6-Piece Box - Monthly Delivery"
  },

  // --- 15-PIECE BOX ---
  "15_weekly": {
    boxSize: 15,
    frequency: 'weekly',
    planCode: "PLN_snrvu2q3yhvavof",
    monthlyPrice: 720,
    label: "15-Piece Box - Weekly Delivery (Billed Monthly)"
  },
  "15_bi-weekly": {
    boxSize: 15,
    frequency: 'bi-weekly',
    planCode: "PLN_tor8inrj0mwivbe",
    monthlyPrice: 360,
    label: "15-Piece Box - Bi-Weekly Delivery (Billed Monthly)"
  },
  "15_monthly": {
    boxSize: 15,
    frequency: 'monthly',
    planCode: "PLN_ajs54qlputj3rgw",
    monthlyPrice: 180,
    label: "15-Piece Box - Monthly Delivery"
  },

  // --- 20-PIECE BOX ---
  "20_weekly": {
    boxSize: 20,
    frequency: 'weekly',
    planCode: "PLN_iwqkj5pasji63y5",
    monthlyPrice: 960,
    label: "20-Piece Box - Weekly Delivery (Billed Monthly)"
  },
  "20_bi-weekly": {
    boxSize: 20,
    frequency: 'bi-weekly',
    planCode: "PLN_bmv3i3fzhhlnk94",
    monthlyPrice: 480,
    label: "20-Piece Box - Bi-Weekly Delivery (Billed Monthly)"
  },
  "20_monthly": {
    boxSize: 20,
    frequency: 'monthly',
    planCode: "PLN_uplh2zok6olnl90",
    monthlyPrice: 240,
    label: "20-Piece Box - Monthly Delivery"
  },

  // --- 30-PIECE BOX ---
  "30_weekly": {
    boxSize: 30,
    frequency: 'weekly',
    planCode: "PLN_t3jm1f1jxufswv4",
    monthlyPrice: 1440,
    label: "30-Piece Box - Weekly Delivery (Billed Monthly)"
  },
  "30_bi-weekly": {
    boxSize: 30,
    frequency: 'bi-weekly',
    planCode: "PLN_1ozr1btykt7hfva",
    monthlyPrice: 720,
    label: "30-Piece Box - Bi-Weekly Delivery (Billed Monthly)"
  },
  "30_monthly": {
    boxSize: 30,
    frequency: 'monthly',
    planCode: "PLN_ms45qnje6rh2cno",
    monthlyPrice: 360,
    label: "30-Piece Box - Monthly Delivery"
  }
};

export function getSubscriptionPlan(
  boxSize: number | string,
  frequency: 'weekly' | 'bi-weekly' | 'monthly'
): SubscriptionPlan | null {
  const key = `${boxSize}_${frequency}`;
  return SUBSCRIPTION_PLANS[key] || null;
}