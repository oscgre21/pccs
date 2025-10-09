/**
 * AZUL Payment Gateway Types
 * Based on INTEGRACION_AZUL.md documentation
 */

export interface AzulPaymentRequest {
  // Required fields
  MerchantId: string;
  MerchantName: string;
  MerchantType: string;
  CurrencyCode: string;
  OrderNumber: string;
  Amount: string;
  ITBIS: string;
  ApprovedUrl: string;
  DeclinedUrl: string;
  CancelUrl: string;
  AuthHash: string;

  // Optional fields
  CustomOrderId?: string;
  ECommerceUrl?: string;
  UseCustomField1?: '0' | '1';
  CustomField1Label?: string;
  CustomField1Value?: string;
  UseCustomField2?: '0' | '1';
  CustomField2Label?: string;
  CustomField2Value?: string;
  SaveToDataVault?: '0' | '1';
  DataVaultToken?: string;
  ForceAuthOnlyTransaction?: '0' | '1';
}

export interface AzulPaymentResponse {
  OrderNumber: string;
  Amount: string;
  DateTime: string;
  ResponseCode: string;
  IsoCode: string;
  ResponseMessage: string;
  ErrorDescription: string;
  RRN: string;
  AzulOrderId: string;
  CustomOrderId?: string;
  AuthorizationCode: string;
  AuthHash: string;
  CustomField1Value?: string;
  CustomField2Value?: string;
  DataVaultToken?: string;
  DataVaultBrand?: string;
  DataVaultExpirationDate?: string;
  CardNumber?: string;
}

export interface AzulPaymentConfig {
  merchantId: string;
  merchantName: string;
  merchantType: string;
  currencyCode: string;
  paymentUrl: string;
  authKey: string;
  approvedUrl: string;
  declinedUrl: string;
  cancelUrl: string;
}

export interface PaymentButtonProps {
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
  onSuccess?: (response: AzulPaymentResponse) => void;
  onError?: (error: Error) => void;
  className?: string;
  children?: React.ReactNode;
}

export type PaymentStatus = 'idle' | 'processing' | 'success' | 'error' | 'cancelled';

export interface ResponseCode {
  code: string;
  message: string;
  isApproved: boolean;
}

// Response codes according to documentation
export const RESPONSE_CODES: Record<string, ResponseCode> = {
  '00': { code: '00', message: 'Approved', isApproved: true },
  '01': { code: '01', message: 'Refer to card issuer', isApproved: false },
  '03': { code: '03', message: 'Invalid merchant', isApproved: false },
  '04': { code: '04', message: 'Pick up card', isApproved: false },
  '05': { code: '05', message: 'Do not honor', isApproved: false },
  '12': { code: '12', message: 'Invalid transaction', isApproved: false },
  '13': { code: '13', message: 'Invalid amount', isApproved: false },
  '14': { code: '14', message: 'Invalid card number', isApproved: false },
  '30': { code: '30', message: 'Format error', isApproved: false },
  '41': { code: '41', message: 'Lost card', isApproved: false },
  '43': { code: '43', message: 'Stolen card', isApproved: false },
  '51': { code: '51', message: 'Insufficient funds', isApproved: false },
  '54': { code: '54', message: 'Expired card', isApproved: false },
  '55': { code: '55', message: 'Incorrect PIN', isApproved: false },
  '57': { code: '57', message: 'Transaction not permitted', isApproved: false },
  '58': { code: '58', message: 'Transaction not permitted to terminal', isApproved: false },
  '61': { code: '61', message: 'Exceeds withdrawal limit', isApproved: false },
  '62': { code: '62', message: 'Restricted card', isApproved: false },
  '63': { code: '63', message: 'Security violation', isApproved: false },
  '65': { code: '65', message: 'Activity limit exceeded', isApproved: false },
  '91': { code: '91', message: 'Issuer unavailable', isApproved: false },
  '96': { code: '96', message: 'System malfunction', isApproved: false },
};
