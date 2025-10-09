/**
 * AZUL Payment Gateway - Response Validator
 * Validates and processes AZUL payment responses
 */

import { AzulPaymentResponse, RESPONSE_CODES, ResponseCode } from './types';
import { validateResponseHash } from './hash';

/**
 * Validates AZUL payment response
 * @param response - Response data from AZUL
 * @param authKey - Secret authentication key
 * @returns Validation result with details
 */
export async function validatePaymentResponse(
  response: AzulPaymentResponse,
  authKey: string
): Promise<{
  isValid: boolean;
  isApproved: boolean;
  responseCode: ResponseCode;
  errors: string[];
}> {
  const errors: string[] = [];

  // Validate required fields
  if (!response.OrderNumber) errors.push('Missing OrderNumber');
  if (!response.Amount) errors.push('Missing Amount');
  if (!response.ResponseCode) errors.push('Missing ResponseCode');
  if (!response.AuthHash) errors.push('Missing AuthHash');

  // Validate AuthHash
  let hashValid = false;
  try {
    hashValid = await validateResponseHash(response, authKey);
    if (!hashValid) {
      errors.push('Invalid AuthHash - Response may have been tampered with');
    }
  } catch (error) {
    errors.push(`AuthHash validation error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  // Get response code details
  const responseCode = RESPONSE_CODES[response.ResponseCode] || {
    code: response.ResponseCode,
    message: response.ResponseMessage || 'Unknown response',
    isApproved: false,
  };

  return {
    isValid: errors.length === 0 && hashValid,
    isApproved: responseCode.isApproved,
    responseCode,
    errors,
  };
}

/**
 * Parses query parameters from AZUL callback URL
 * @param searchParams - URLSearchParams from callback
 * @returns Parsed AzulPaymentResponse
 */
export function parseCallbackParams(searchParams: URLSearchParams): AzulPaymentResponse {
  return {
    OrderNumber: searchParams.get('OrderNumber') || '',
    Amount: searchParams.get('Amount') || '',
    DateTime: searchParams.get('DateTime') || '',
    ResponseCode: searchParams.get('ResponseCode') || '',
    IsoCode: searchParams.get('IsoCode') || '',
    ResponseMessage: searchParams.get('ResponseMessage') || '',
    ErrorDescription: searchParams.get('ErrorDescription') || '',
    RRN: searchParams.get('RRN') || '',
    AzulOrderId: searchParams.get('AzulOrderId') || '',
    CustomOrderId: searchParams.get('CustomOrderId') || undefined,
    AuthorizationCode: searchParams.get('AuthorizationCode') || '',
    AuthHash: searchParams.get('AuthHash') || '',
    CustomField1Value: searchParams.get('CustomField1Value') || undefined,
    CustomField2Value: searchParams.get('CustomField2Value') || undefined,
    DataVaultToken: searchParams.get('DataVaultToken') || undefined,
    DataVaultBrand: searchParams.get('DataVaultBrand') || undefined,
    DataVaultExpirationDate: searchParams.get('DataVaultExpirationDate') || undefined,
    CardNumber: searchParams.get('CardNumber') || undefined,
  };
}

/**
 * Formats response for display/logging
 */
export function formatResponseForDisplay(response: AzulPaymentResponse): {
  orderNumber: string;
  amount: string;
  date: string;
  status: string;
  message: string;
  authorizationCode: string;
} {
  const responseCode = RESPONSE_CODES[response.ResponseCode] || {
    code: response.ResponseCode,
    message: response.ResponseMessage,
    isApproved: false,
  };

  return {
    orderNumber: response.OrderNumber,
    amount: `${response.Amount}`,
    date: response.DateTime,
    status: responseCode.isApproved ? 'Approved' : 'Declined',
    message: responseCode.message,
    authorizationCode: response.AuthorizationCode,
  };
}

/**
 * Gets user-friendly error message
 */
export function getErrorMessage(responseCode: string): string {
  const code = RESPONSE_CODES[responseCode];
  if (!code) return 'Unknown error occurred';

  const messages: Record<string, string> = {
    '01': 'Please contact your card issuer',
    '03': 'Invalid merchant configuration',
    '04': 'Card blocked - please contact your bank',
    '05': 'Transaction declined by bank',
    '12': 'Invalid transaction',
    '13': 'Invalid amount',
    '14': 'Invalid card number',
    '30': 'Format error - please try again',
    '41': 'Lost card - please contact your bank',
    '43': 'Stolen card - please contact your bank',
    '51': 'Insufficient funds',
    '54': 'Card has expired',
    '55': 'Incorrect PIN',
    '57': 'Transaction not permitted',
    '58': 'Transaction not permitted for this terminal',
    '61': 'Withdrawal limit exceeded',
    '62': 'Restricted card',
    '63': 'Security violation',
    '65': 'Activity limit exceeded',
    '91': 'Bank unavailable - please try again later',
    '96': 'System error - please try again later',
  };

  return messages[responseCode] || code.message;
}
