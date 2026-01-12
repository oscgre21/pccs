/**
 * Stripe Types - TypeScript interfaces for Stripe integration
 */

export type DonationFrequency = 'one-time' | 'weekly' | 'monthly' | 'every-two-weeks';

export interface StripeCheckoutRequest {
  amount: number;
  currency: 'usd';
  description: string;
  donorEmail: string;
  donorName: string;
  donorPhone?: string;
  donationTypeId: string;
  frequency: DonationFrequency;
  comment?: string;
}

export interface StripeCheckoutResponse {
  sessionId: string;
  url: string;
  orderNumber: string;
}

export interface StripePaymentConfig {
  secretKey: string;
  webhookSecret: string;
  successUrl: string;
  cancelUrl: string;
}

export interface StripeSessionVerification {
  success: boolean;
  transactionId?: string;
  status?: string;
  amountTotal?: number;
  customerEmail?: string | null;
  error?: string;
}

// Stripe interval mapping
export const FREQUENCY_TO_STRIPE_INTERVAL: Record<DonationFrequency, { interval: 'week' | 'month'; interval_count: number } | null> = {
  'one-time': null, // Not a subscription
  'weekly': { interval: 'week', interval_count: 1 },
  'every-two-weeks': { interval: 'week', interval_count: 2 },
  'monthly': { interval: 'month', interval_count: 1 },
};
