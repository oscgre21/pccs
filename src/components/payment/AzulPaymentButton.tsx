'use client';

import React, { useState } from 'react';
import { PaymentButtonProps, PaymentStatus } from '@/lib/azul/types';

/**
 * AZUL Payment Button Component - Secure Version
 * Reusable payment button following PCCS brand guidelines
 *
 * SECURITY: This component only sends minimal data to the server.
 * All sensitive logic (MerchantID, AuthHash, etc.) is handled server-side.
 *
 * Brand Colors:
 * - Primary Blue: #1E1E8C
 * - Tropical Green: #2ECC40
 * - White: #FFFFFF
 *
 * @example
 * <AzulPaymentButton
 *   amount={500}
 *   description="Donation to PCCS"
 * >
 *   Donate $500
 * </AzulPaymentButton>
 */
export function AzulPaymentButton({
  amount,
  description,
  customOrderId,
  customField1,
  customField2,
  onSuccess,
  onError,
  className = '',
  children,
}: PaymentButtonProps) {
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    try {
      setStatus('processing');
      setError(null);

      console.log('[Payment] Initiating payment:', { amount, description });

      // Call server API with minimal data - NO SENSITIVE INFO
      const response = await fetch('/api/azul/initiate-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          description,
          customOrderId,
          customField1,
          customField2,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to initiate payment');
      }

      console.log('[Payment] Payment initiated successfully:', data.orderNumber);

      // Create a temporary container for the form
      const container = document.createElement('div');
      container.style.display = 'none';
      container.innerHTML = data.formHtml;
      document.body.appendChild(container);

      // Find and submit the form
      const form = container.querySelector('form');
      if (form) {
        document.body.appendChild(form);
        form.submit();
      } else {
        throw new Error('Payment form not found');
      }

      // Call success callback if provided
      onSuccess?.({
        OrderNumber: data.orderNumber,
        Amount: amount.toString(),
        DateTime: new Date().toISOString(),
        ResponseCode: '00',
        IsoCode: '',
        ResponseMessage: 'Payment initiated',
        ErrorDescription: '',
        RRN: '',
        AzulOrderId: '',
        AuthorizationCode: '',
        AuthHash: '',
      });

    } catch (err) {
      setStatus('error');
      const errorMessage = err instanceof Error ? err.message : 'Payment initialization failed';
      setError(errorMessage);
      console.error('[Payment] Error:', errorMessage);
      onError?.(err instanceof Error ? err : new Error(errorMessage));
    }
  };

  return (
    <>
      <button
        onClick={handlePayment}
        disabled={status === 'processing'}
        className={`
          inline-flex items-center justify-center
          px-8 py-4
          font-semibold text-white
          rounded-full
          transition-all duration-300
          transform hover:scale-105
          shadow-lg hover:shadow-xl
          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          ${className}
        `}
        style={{
          backgroundColor: status === 'processing' ? '#6B7280' : '#1E1E8C',
        }}
        aria-label={`Pay ${amount} dollars`}
      >
        {status === 'processing' ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </>
        ) : (
          <>
            {children || `Pay $${amount}`}
            <svg
              className="w-5 h-5 ml-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </>
        )}
      </button>

      {error && (
        <div
          className="mt-4 p-4 rounded-lg text-sm"
          style={{ backgroundColor: '#FEE2E2', color: '#991B1B' }}
          role="alert"
        >
          <p className="font-semibold">Payment Error</p>
          <p>{error}</p>
        </div>
      )}
    </>
  );
}
