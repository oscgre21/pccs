/**
 * AZUL Payment Gateway Configuration
 * Centralizes all AZUL-related configuration
 */

import { AzulPaymentConfig } from './types';

/**
 * Gets AZUL configuration from environment variables
 */
export function getAzulConfig(): AzulPaymentConfig {
  // Get base URL for callbacks
  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin
    : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    merchantId: process.env.NEXT_PUBLIC_AZUL_MERCHANT_ID || '',
    merchantName: process.env.NEXT_PUBLIC_AZUL_MERCHANT_NAME || '',
    merchantType: process.env.NEXT_PUBLIC_AZUL_MERCHANT_TYPE || '',
    currencyCode: process.env.NEXT_PUBLIC_AZUL_CURRENCY_CODE || '$',
    paymentUrl: process.env.NEXT_PUBLIC_AZUL_PAYMENT_URL || '',
    authKey: process.env.AZUL_AUTH_KEY || '',
    approvedUrl: process.env.NEXT_PUBLIC_AZUL_APPROVED_URL || `${baseUrl}/Approved`,
    declinedUrl: process.env.NEXT_PUBLIC_AZUL_DECLINED_URL || `${baseUrl}/Declined`,
    cancelUrl: process.env.NEXT_PUBLIC_AZUL_CANCEL_URL || `${baseUrl}/Cancel`,
  };
}

/**
 * Validates that all required configuration is present
 */
export function validateConfig(config: AzulPaymentConfig): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!config.merchantId) errors.push('Missing NEXT_PUBLIC_AZUL_MERCHANT_ID');
  if (!config.merchantName) errors.push('Missing NEXT_PUBLIC_AZUL_MERCHANT_NAME');
  if (!config.merchantType) errors.push('Missing NEXT_PUBLIC_AZUL_MERCHANT_TYPE');
  if (!config.paymentUrl) errors.push('Missing NEXT_PUBLIC_AZUL_PAYMENT_URL');
  if (!config.authKey) errors.push('Missing AZUL_AUTH_KEY');

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Gets auth key (server-side only)
 */
export function getAuthKey(): string {
  if (typeof window !== 'undefined') {
    throw new Error('Auth key should only be accessed server-side');
  }
  return process.env.AZUL_AUTH_KEY || '';
}
