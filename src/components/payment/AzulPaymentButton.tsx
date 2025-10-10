'use client';

import React, { useState, useEffect } from 'react';
import { PaymentButtonProps, PaymentStatus } from '@/lib/azul/types';

interface DonationType {
  id: string;
  name: string;
  description: string | null;
  amount: number;
}

/**
 * AZUL Payment Button Component - Secure Version with Donor Information
 * Reusable payment button following PCCS brand guidelines
 *
 * SECURITY: This component only sends minimal data to the server.
 * All sensitive logic (MerchantID, AuthHash, etc.) is handled server-side.
 *
 * Brand Colors:
 * - Primary Blue: #1E1E8C
 * - Tropical Green: #2ECC40
 * - White: #FFFFFF
 */
export function AzulPaymentButton({
  amount,
  description,
  donationTypeId: preSelectedDonationTypeId,
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
  const [showForm, setShowForm] = useState(false);

  // Donor information
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [comment, setComment] = useState('');
  const [donationTypeId, setDonationTypeId] = useState(preSelectedDonationTypeId || '');

  // Donation types
  const [donationTypes, setDonationTypes] = useState<DonationType[]>([]);
  const [loadingTypes, setLoadingTypes] = useState(true);

  // Load donation types on mount
  useEffect(() => {
    const loadDonationTypes = async () => {
      try {
        const response = await fetch('/api/donation-types');
        const data = await response.json();
        if (data.success) {
          setDonationTypes(data.types);
          // Only set default if no pre-selected type
          if (!preSelectedDonationTypeId && data.types.length > 0) {
            setDonationTypeId(data.types[0].id);
          }
        }
      } catch (error) {
        console.error('Failed to load donation types:', error);
      } finally {
        setLoadingTypes(false);
      }
    };
    loadDonationTypes();
  }, [preSelectedDonationTypeId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!donorName.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!donorEmail.trim()) {
      setError('Please enter your email');
      return;
    }
    if (!donationTypeId) {
      setError('Please select a donation type');
      return;
    }

    // Get amount from selected donation type
    const selectedType = donationTypes.find(t => t.id === donationTypeId);
    const donationAmount = selectedType?.amount || amount;

    try {
      setStatus('processing');
      setError(null);

      console.log('[Payment] Initiating payment:', {
        amount: donationAmount,
        donorName,
        donorEmail,
        donationTypeId,
      });

      // Call server API with donor information and donation type
      const response = await fetch('/api/azul/initiate-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: donationAmount,
          description,
          donorName,
          donorEmail,
          donorPhone: donorPhone || undefined,
          comment: comment || undefined,
          donationTypeId,
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

  const handleButtonClick = () => {
    if (loadingTypes) {
      // If still loading, wait
      return;
    }
    if (donationTypes.length === 0) {
      setError('Unable to load donation types. Please refresh the page.');
      return;
    }
    setShowForm(true);
  };

  if (!showForm) {
    return (
      <button
        onClick={handleButtonClick}
        disabled={status === 'processing'}
        className={`
          inline-flex items-center justify-center
          px-8 py-4
          font-semibold text-white
          rounded-full
          transition-all duration-300
          transform hover:scale-105
          shadow-lg hover:shadow-xl
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
        style={{ backgroundColor: '#1E1E8C' }}
      >
        {loadingTypes ? (
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
            Loading...
          </>
        ) : (
          <>
            {children || `Donate $${amount}`}
            <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </>
        )}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold" style={{ color: '#1E1E8C' }}>
              Complete Your Donation
            </h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Donation Type - Only show if not pre-selected */}
            {!preSelectedDonationTypeId && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Donation Type *
                </label>
                <select
                  value={donationTypeId}
                  onChange={(e) => setDonationTypeId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {donationTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name} {type.description && `- ${type.description}`}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Show selected donation type if pre-selected */}
            {preSelectedDonationTypeId && !loadingTypes && donationTypes.find(t => t.id === preSelectedDonationTypeId) && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Donation Type</p>
                    <p className="text-lg font-semibold" style={{ color: '#1E1E8C' }}>
                      {donationTypes.find(t => t.id === preSelectedDonationTypeId)?.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Amount</p>
                    <p className="text-2xl font-bold" style={{ color: '#2ECC40' }}>
                      ${donationTypes.find(t => t.id === preSelectedDonationTypeId)?.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="john@example.com"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                value={donorPhone}
                onChange={(e) => setDonorPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+1 (809) 555-1234"
              />
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Comment (Optional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Add a message with your donation..."
              />
            </div>

            {/* Amount Display - Only show if no pre-selected type */}
            {!preSelectedDonationTypeId && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Donation Amount:</span>
                  <span className="text-2xl font-bold" style={{ color: '#1E1E8C' }}>
                    ${donationTypes.find(t => t.id === donationTypeId)?.amount?.toFixed(2) || amount.toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div
                className="p-4 rounded-lg text-sm"
                style={{ backgroundColor: '#FEE2E2', color: '#991B1B' }}
                role="alert"
              >
                <p className="font-semibold">Error</p>
                <p>{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'processing'}
              className="w-full py-4 font-semibold text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{
                backgroundColor: status === 'processing' ? '#6B7280' : '#2ECC40',
              }}
            >
              {status === 'processing' ? (
                <span className="flex items-center justify-center">
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
                </span>
              ) : (
                `Proceed to Payment - $${donationTypes.find(t => t.id === donationTypeId)?.amount?.toFixed(2) || amount.toFixed(2)}`
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
