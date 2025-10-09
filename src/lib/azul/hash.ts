/**
 * AZUL Payment Gateway - Hash Generation Utilities
 * Client-side utilities for order numbers and amount formatting
 *
 * NOTE: HMAC generation is done server-side via API route for security
 */

import { AzulPaymentRequest, AzulPaymentResponse } from './types';

/**
 * NOTE: These hash functions are not used client-side anymore.
 * Hash generation is done server-side via /api/azul/generate-hash
 * Keeping these exports for backward compatibility with server-side code
 */

/**
 * Generates AuthHash for payment request
 * @deprecated Use /api/azul/generate-hash API route instead
 */
export async function generatePaymentAuthHash(
  request: Omit<AzulPaymentRequest, 'AuthHash'>,
  authKey: string
): Promise<string> {
  throw new Error('Hash generation must be done server-side via /api/azul/generate-hash');
}

/**
 * Generates AuthHash for payment response validation
 * @deprecated Use server-side validation
 */
export async function generateResponseAuthHash(
  response: AzulPaymentResponse,
  authKey: string
): Promise<string> {
  throw new Error('Hash validation must be done server-side');
}

/**
 * Validates the AuthHash from AZUL response
 * @deprecated Use server-side validation
 */
export async function validateResponseHash(
  response: AzulPaymentResponse,
  authKey: string
): Promise<boolean> {
  throw new Error('Hash validation must be done server-side');
}

/**
 * Generates a unique order number
 * Format: PCCS-YYYYMMDD-HHMMSS-RANDOM
 */
export function generateOrderNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');

  return `PCCS-${year}${month}${day}-${hours}${minutes}${seconds}-${random}`;
}

/**
 * Formats amount for AZUL
 * Amount must be sent without decimal point; last two digits represent decimals
 * Example: 25.00 -> "2500", 174.83 -> "17483"
 */
export function formatAmount(amount: number): string {
  // Multiply by 100 to convert dollars to cents, then remove decimal point
  const cents = Math.round(amount * 100);
  return cents.toString();
}
