/**
 * AZUL Payment Response Validator - Server-Side
 * Validates payment responses from AZUL
 */

import { createHmac } from 'crypto';
import { AzulPaymentResponse, RESPONSE_CODES, ResponseCode } from '../types';

/**
 * Generates HMAC SHA-512 for response validation
 * IMPORTANT: Data must be encoded as UTF-16LE (UNICODE) as per AZUL documentation
 */
function generateResponseHmac(data: string, key: string): string {
  // Convert string to UTF-16LE encoding (UNICODE) as required by AZUL
  const dataUtf16le = Buffer.from(data, 'utf16le');

  const hmac = createHmac('sha512', key);
  hmac.update(dataUtf16le);
  return hmac.digest('hex');
}

/**
 * Generates AuthHash for AZUL response validation
 * According to AZUL documentation (INTEGRACION_AZUL.md line 183):
 * OrderNumber + Amount + AuthorizationCode + DateTime + ResponseCode +
 * ISOCode + ResponseMessage + ErrorDescription + RRN + AuthKey
 *
 * NOTE: AzulOrderId is NOT included in response hash (only in request hash)
 */
export function generateResponseAuthHash(
  response: AzulPaymentResponse,
  authKey: string
): string {
  const dataToHash =
    response.OrderNumber +
    response.Amount +
    response.AuthorizationCode +
    response.DateTime +
    response.ResponseCode +
    response.IsoCode +
    response.ResponseMessage +
    response.ErrorDescription +
    response.RRN +
    authKey;

  console.log('[generateResponseAuthHash] Data for hashing:', {
    OrderNumber: response.OrderNumber,
    Amount: response.Amount,
    AuthorizationCode: response.AuthorizationCode,
    DateTime: response.DateTime,
    ResponseCode: response.ResponseCode,
    IsoCode: response.IsoCode,
    ResponseMessage: response.ResponseMessage,
    ErrorDescription: response.ErrorDescription || '(empty)',
    RRN: response.RRN,
    dataString: dataToHash.substring(0, 100) + '...',
  });

  return generateResponseHmac(dataToHash, authKey);
}

/**
 * Validates AZUL payment response (SERVER-SIDE ONLY)
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
    const expectedHash = generateResponseAuthHash(response, authKey);
    hashValid = expectedHash.toLowerCase() === response.AuthHash.toLowerCase();

    console.log('[Validator] Hash comparison:', {
      expected: expectedHash,
      received: response.AuthHash,
      match: hashValid,
    });

    if (!hashValid) {
      console.error('[Validator] Hash mismatch - full details:', {
        expectedFull: expectedHash,
        receivedFull: response.AuthHash,
        lengthExpected: expectedHash.length,
        lengthReceived: response.AuthHash.length,
      });
      errors.push('Invalid AuthHash - Response may have been tampered with');
    }
  } catch (error) {
    console.error('[Validator] Hash validation error:', error);
    errors.push(`AuthHash validation error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  // Get response code details
  const responseCode = RESPONSE_CODES[response.IsoCode] || {
    code: response.IsoCode,
    message: response.ResponseMessage || 'Unknown response',
    isApproved: false,
  };

  return {
    isValid: errors.length === 0 && hashValid,
    isApproved: responseCode.isApproved || response.IsoCode === '00',
    responseCode,
    errors,
  };
}

/**
 * Parses query parameters from AZUL callback URL
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
    DataVaultExpirationDate: searchParams.get('DataVaultExpiration') || undefined,
    CardNumber: searchParams.get('CardNumber') || undefined,
  };
}
