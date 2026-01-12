/**
 * Stripe Checkout Session Builder
 * Creates Checkout Sessions for one-time payments and subscriptions
 */

import Stripe from 'stripe';
import { getStripeInstance, getServerStripeConfig } from './config';
import { StripeCheckoutRequest, StripeCheckoutResponse, FREQUENCY_TO_STRIPE_INTERVAL } from '../types';

/**
 * Generate a unique order number for Stripe transactions
 * Prefixed with 'STR' to differentiate from Azul orders
 */
function generateOrderNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');

  return `STR-${year}${month}${day}-${hours}${minutes}${seconds}-${random}`;
}

/**
 * Create a Stripe Checkout Session
 * Handles both one-time payments and subscriptions based on frequency
 */
export async function createCheckoutSession(
  params: StripeCheckoutRequest
): Promise<StripeCheckoutResponse> {
  const stripe = getStripeInstance();
  const config = getServerStripeConfig();

  const orderNumber = generateOrderNumber();
  const isRecurring = params.frequency !== 'one-time';

  // Common metadata for tracking
  const metadata: Record<string, string> = {
    orderNumber,
    donationTypeId: params.donationTypeId,
    donorName: params.donorName,
    donorEmail: params.donorEmail,
    donorPhone: params.donorPhone || '',
    comment: params.comment || '',
    frequency: params.frequency,
    provider: 'stripe',
  };

  let sessionParams: Stripe.Checkout.SessionCreateParams;

  if (isRecurring) {
    // Subscription mode for recurring donations
    const intervalConfig = FREQUENCY_TO_STRIPE_INTERVAL[params.frequency];

    if (!intervalConfig) {
      throw new Error(`Invalid frequency for subscription: ${params.frequency}`);
    }

    sessionParams = {
      mode: 'subscription',
      customer_email: params.donorEmail,
      line_items: [
        {
          price_data: {
            currency: params.currency,
            unit_amount: Math.round(params.amount * 100), // Stripe uses cents
            product_data: {
              name: params.description,
              description: `Recurring donation - ${params.frequency.replace('-', ' ')}`,
            },
            recurring: {
              interval: intervalConfig.interval,
              interval_count: intervalConfig.interval_count,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${config.successUrl}?session_id={CHECKOUT_SESSION_ID}&order=${orderNumber}`,
      cancel_url: `${config.cancelUrl}?order=${orderNumber}`,
      metadata,
      subscription_data: {
        metadata,
      },
    };
  } else {
    // Payment mode for one-time donations
    sessionParams = {
      mode: 'payment',
      customer_email: params.donorEmail,
      line_items: [
        {
          price_data: {
            currency: params.currency,
            unit_amount: Math.round(params.amount * 100), // Stripe uses cents
            product_data: {
              name: params.description,
              description: 'One-time donation to PCCS',
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${config.successUrl}?session_id={CHECKOUT_SESSION_ID}&order=${orderNumber}`,
      cancel_url: `${config.cancelUrl}?order=${orderNumber}`,
      payment_intent_data: {
        metadata,
      },
      metadata,
    };
  }

  console.log('[Stripe Checkout] Creating session:', {
    mode: sessionParams.mode,
    amount: params.amount,
    frequency: params.frequency,
    orderNumber,
  });

  const session = await stripe.checkout.sessions.create(sessionParams);

  if (!session.url) {
    throw new Error('Failed to create Stripe Checkout session URL');
  }

  return {
    sessionId: session.id,
    url: session.url,
    orderNumber,
  };
}

/**
 * Retrieve a Checkout Session by ID
 */
export async function getCheckoutSession(sessionId: string): Promise<Stripe.Checkout.Session> {
  const stripe = getStripeInstance();
  return stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['payment_intent', 'subscription'],
  });
}
