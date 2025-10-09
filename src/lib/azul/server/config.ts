/**
 * AZUL Payment Gateway - Server-Side Configuration
 * This file should ONLY be imported in server-side code (API routes, server components)
 */

import { AzulPaymentConfig } from '../types';

/**
 * Gets AZUL configuration from environment variables (SERVER-SIDE ONLY)
 * @throws Error if running on client-side
 */
export function getServerAzulConfig(): AzulPaymentConfig {
  // Ensure this only runs on server
  if (typeof window !== 'undefined') {
    throw new Error('getServerAzulConfig can only be called server-side');
  }

  const config: AzulPaymentConfig = {
    merchantId: process.env.NEXT_PUBLIC_AZUL_MERCHANT_ID || '',
    merchantName: process.env.NEXT_PUBLIC_AZUL_MERCHANT_NAME || '',
    merchantType: process.env.NEXT_PUBLIC_AZUL_MERCHANT_TYPE || '',
    currencyCode: process.env.NEXT_PUBLIC_AZUL_CURRENCY_CODE || '$',
    paymentUrl: process.env.NEXT_PUBLIC_AZUL_PAYMENT_URL || '',
    authKey: process.env.AZUL_AUTH_KEY || '',
    approvedUrl: process.env.NEXT_PUBLIC_AZUL_APPROVED_URL || '',
    declinedUrl: process.env.NEXT_PUBLIC_AZUL_DECLINED_URL || '',
    cancelUrl: process.env.NEXT_PUBLIC_AZUL_CANCEL_URL || '',
  };

  return config;
}

/**
 * Validates server-side AZUL configuration
 */
export function validateServerConfig(config: AzulPaymentConfig): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!config.merchantId) errors.push('Missing NEXT_PUBLIC_AZUL_MERCHANT_ID');
  if (!config.merchantName) errors.push('Missing NEXT_PUBLIC_AZUL_MERCHANT_NAME');
  if (!config.merchantType) errors.push('Missing NEXT_PUBLIC_AZUL_MERCHANT_TYPE');
  if (!config.paymentUrl) errors.push('Missing NEXT_PUBLIC_AZUL_PAYMENT_URL');
  if (!config.authKey) errors.push('Missing AZUL_AUTH_KEY');
  if (!config.approvedUrl) errors.push('Missing NEXT_PUBLIC_AZUL_APPROVED_URL');
  if (!config.declinedUrl) errors.push('Missing NEXT_PUBLIC_AZUL_DECLINED_URL');
  if (!config.cancelUrl) errors.push('Missing NEXT_PUBLIC_AZUL_CANCEL_URL');

  return {
    isValid: errors.length === 0,
    errors,
  };
}
