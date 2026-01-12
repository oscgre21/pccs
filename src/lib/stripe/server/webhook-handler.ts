/**
 * Stripe Webhook Handler
 * Validates and processes Stripe webhook events
 */

import Stripe from 'stripe';
import { getStripeInstance, getServerStripeConfig } from './config';

/**
 * Construct and validate a Stripe webhook event
 */
export async function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
): Promise<Stripe.Event> {
  const stripe = getStripeInstance();
  const config = getServerStripeConfig();

  if (!config.webhookSecret) {
    throw new Error('Missing STRIPE_WEBHOOK_SECRET environment variable');
  }

  return stripe.webhooks.constructEvent(payload, signature, config.webhookSecret);
}

/**
 * Check if event indicates successful payment
 */
export function isPaymentSuccessEvent(event: Stripe.Event): boolean {
  return [
    'checkout.session.completed',
    'payment_intent.succeeded',
    'invoice.payment_succeeded',
  ].includes(event.type);
}

/**
 * Check if event indicates payment failure
 */
export function isPaymentFailedEvent(event: Stripe.Event): boolean {
  return [
    'checkout.session.expired',
    'payment_intent.payment_failed',
    'invoice.payment_failed',
  ].includes(event.type);
}

/**
 * Check if event is related to subscriptions
 */
export function isSubscriptionEvent(event: Stripe.Event): boolean {
  return event.type.startsWith('customer.subscription');
}

/**
 * Extract order number from Stripe event metadata
 */
export function extractOrderNumber(event: Stripe.Event): string | null {
  const data = event.data.object as { metadata?: Record<string, string> };

  // Try to get from direct metadata
  if (data.metadata && typeof data.metadata === 'object') {
    if (data.metadata.orderNumber) {
      return data.metadata.orderNumber;
    }
  }

  return null;
}

/**
 * Extract relevant data from checkout.session.completed event
 */
export function extractCheckoutSessionData(session: Stripe.Checkout.Session) {
  return {
    sessionId: session.id,
    paymentIntentId: typeof session.payment_intent === 'string'
      ? session.payment_intent
      : session.payment_intent?.id || null,
    subscriptionId: typeof session.subscription === 'string'
      ? session.subscription
      : session.subscription?.id || null,
    customerId: typeof session.customer === 'string'
      ? session.customer
      : session.customer?.id || null,
    amountTotal: session.amount_total,
    currency: session.currency,
    customerEmail: session.customer_email,
    paymentStatus: session.payment_status,
    metadata: session.metadata,
  };
}
