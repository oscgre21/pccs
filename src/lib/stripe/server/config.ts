/**
 * Stripe Server Configuration
 * Server-only configuration - NEVER import this on the client side
 */

import Stripe from 'stripe';
import { StripePaymentConfig } from '../types';

let stripeInstance: Stripe | null = null;

/**
 * Get Stripe instance for server-side operations
 * Uses the latest Stripe API version
 */
export function getStripeInstance(): Stripe {
  if (typeof window !== 'undefined') {
    throw new Error('Stripe instance should only be created server-side');
  }

  if (!stripeInstance) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error('Missing STRIPE_SECRET_KEY environment variable');
    }

    stripeInstance = new Stripe(secretKey, {
      apiVersion: '2025-11-17.clover',
      typescript: true,
    });
  }

  return stripeInstance;
}

/**
 * Get server-side Stripe configuration
 */
export function getServerStripeConfig(): StripePaymentConfig {
  if (typeof window !== 'undefined') {
    throw new Error('getServerStripeConfig can only be called server-side');
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
    successUrl: process.env.NEXT_PUBLIC_STRIPE_SUCCESS_URL || `${baseUrl}/stripe/success`,
    cancelUrl: process.env.NEXT_PUBLIC_STRIPE_CANCEL_URL || `${baseUrl}/stripe/cancel`,
  };
}

/**
 * Validate server configuration
 */
export function validateServerConfig(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!process.env.STRIPE_SECRET_KEY) {
    errors.push('Missing STRIPE_SECRET_KEY');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
