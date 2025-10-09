/**
 * AZUL Payment Builder - Server-Side Only
 * Constructs complete payment requests with all sensitive data
 */

import { AzulPaymentRequest } from '../types';
import { getServerAzulConfig, validateServerConfig } from './config';
import { generateOrderNumber, formatAmount, generatePaymentAuthHash } from './hash';

export interface PaymentParams {
  amount: number;
  description: string;
  customOrderId?: string;
  customField1?: {
    label: string;
    value: string;
  };
  customField2?: {
    label: string;
    value: string;
  };
}

export interface PaymentRequestResult {
  success: boolean;
  request?: AzulPaymentRequest;
  orderNumber?: string;
  error?: string;
  errors?: string[];
}

/**
 * Builds a complete AZUL payment request (SERVER-SIDE ONLY)
 * All sensitive data is handled here and never exposed to client
 */
export function buildPaymentRequest(params: PaymentParams): PaymentRequestResult {
  try {
    // Get server configuration
    const config = getServerAzulConfig();

    // Validate configuration
    const validation = validateServerConfig(config);
    if (!validation.isValid) {
      return {
        success: false,
        error: 'Invalid AZUL configuration',
        errors: validation.errors,
      };
    }

    // Validate payment parameters
    if (!params.amount || params.amount <= 0) {
      return {
        success: false,
        error: 'Invalid amount',
      };
    }

    // Generate unique order number
    const orderNumber = generateOrderNumber();

    // Build request (without AuthHash first)
    const requestWithoutHash: Omit<AzulPaymentRequest, 'AuthHash'> = {
      MerchantId: config.merchantId,
      MerchantName: config.merchantName,
      MerchantType: config.merchantType,
      CurrencyCode: config.currencyCode,
      OrderNumber: orderNumber,
      Amount: formatAmount(params.amount),
      ITBIS: formatAmount(0), // Tax (0 for donations)
      ApprovedUrl: config.approvedUrl,
      DeclinedUrl: config.declinedUrl,
      CancelUrl: config.cancelUrl,
      // Custom fields must always be present for hash calculation
      UseCustomField1: params.customField1 ? '1' : '0',
      CustomField1Label: params.customField1?.label || '',
      CustomField1Value: params.customField1?.value || '',
      UseCustomField2: params.customField2 ? '1' : '0',
      CustomField2Label: params.customField2?.label || '',
      CustomField2Value: params.customField2?.value || '',
    };

    // Add custom order ID if provided
    if (params.customOrderId) {
      requestWithoutHash.CustomOrderId = params.customOrderId;
    }

    // Generate AuthHash
    const authHash = generatePaymentAuthHash(requestWithoutHash, config.authKey);

    // Complete request with AuthHash
    const completeRequest: AzulPaymentRequest = {
      ...requestWithoutHash,
      AuthHash: authHash,
    };

    return {
      success: true,
      request: completeRequest,
      orderNumber,
    };
  } catch (error) {
    console.error('[Payment Builder] Error building payment request:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Generates HTML form for AZUL payment
 */
export function generatePaymentFormHtml(
  request: AzulPaymentRequest,
  paymentUrl: string
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Processing Payment...</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background: linear-gradient(135deg, #1E1E8C 0%, #2ECC40 100%);
    }
    .loader {
      text-align: center;
      color: white;
    }
    .spinner {
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-top: 4px solid white;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <div class="loader">
    <div class="spinner"></div>
    <h2>Processing your payment...</h2>
    <p>Please wait while we redirect you to AZUL Payment Gateway</p>
  </div>

  <form id="azulPaymentForm" method="POST" action="${paymentUrl}">
    <input type="hidden" name="MerchantId" value="${request.MerchantId}" />
    <input type="hidden" name="MerchantName" value="${request.MerchantName}" />
    <input type="hidden" name="MerchantType" value="${request.MerchantType}" />
    <input type="hidden" name="CurrencyCode" value="${request.CurrencyCode}" />
    <input type="hidden" name="OrderNumber" value="${request.OrderNumber}" />
    <input type="hidden" name="Amount" value="${request.Amount}" />
    <input type="hidden" name="ITBIS" value="${request.ITBIS}" />
    <input type="hidden" name="ApprovedUrl" value="${request.ApprovedUrl}" />
    <input type="hidden" name="DeclinedUrl" value="${request.DeclinedUrl}" />
    <input type="hidden" name="CancelUrl" value="${request.CancelUrl}" />
    <input type="hidden" name="UseCustomField1" value="${request.UseCustomField1}" />
    <input type="hidden" name="CustomField1Label" value="${request.CustomField1Label || ''}" />
    <input type="hidden" name="CustomField1Value" value="${request.CustomField1Value || ''}" />
    <input type="hidden" name="UseCustomField2" value="${request.UseCustomField2}" />
    <input type="hidden" name="CustomField2Label" value="${request.CustomField2Label || ''}" />
    <input type="hidden" name="CustomField2Value" value="${request.CustomField2Value || ''}" />
    <input type="hidden" name="AuthHash" value="${request.AuthHash}" />
    ${request.CustomOrderId ? `<input type="hidden" name="CustomOrderId" value="${request.CustomOrderId}" />` : ''}
  </form>

  <script>
    // Auto-submit form after a brief delay
    setTimeout(function() {
      document.getElementById('azulPaymentForm').submit();
    }, 1000);
  </script>
</body>
</html>
  `.trim();
}
