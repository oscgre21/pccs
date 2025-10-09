/**
 * AZUL Payment Gateway - Server-Side Hash Generation
 * Uses Node.js crypto module (only available server-side)
 */

import { createHmac } from 'crypto';
import { AzulPaymentRequest } from '../types';

/**
 * Generates HMAC SHA-512 hash (SERVER-SIDE ONLY)
 */
export function generateHmacSha512(data: string, key: string): string {
  if (!key || key.trim() === '') {
    throw new Error('HMAC key cannot be empty');
  }

  const hmac = createHmac('sha512', key);
  hmac.update(data);
  return hmac.digest('hex');
}

/**
 * Generates AuthHash for AZUL payment request
 * According to AZUL documentation
 */
export function generatePaymentAuthHash(
  request: Omit<AzulPaymentRequest, 'AuthHash'>,
  authKey: string
): string {
  // Build data string according to AZUL spec
  const dataToHash =
    request.MerchantId +
    request.MerchantName +
    request.MerchantType +
    request.CurrencyCode +
    request.OrderNumber +
    request.Amount +
    request.ITBIS +
    request.ApprovedUrl +
    request.DeclinedUrl +
    request.CancelUrl +
    (request.UseCustomField1 || '0') +
    (request.CustomField1Label || '') +
    (request.CustomField1Value || '') +
    (request.UseCustomField2 || '0') +
    (request.CustomField2Label || '') +
    (request.CustomField2Value || '') +
    authKey;

  return generateHmacSha512(dataToHash, authKey);
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
 * Minimum 3 digits (padded with zeros if needed)
 * Example: 0.00 -> "000", 10.00 -> "1000", 25.00 -> "2500", 174.83 -> "17483"
 */
export function formatAmount(amount: number): string {
  const cents = Math.round(amount * 100);
  // AZUL requires at least 3 digits, pad with zeros if needed
  return cents.toString().padStart(3, '0');
}
