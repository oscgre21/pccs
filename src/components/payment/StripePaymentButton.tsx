'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { DonationFrequency } from '@/lib/stripe/types';

interface DonationType {
  id: string;
  name: string;
  description: string | null;
  amount: number;
}

interface StripePaymentButtonProps {
  amount: number;
  description?: string;
  donationTypeId?: string;
  frequency?: DonationFrequency;
  comment?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  className?: string;
  children?: React.ReactNode;
  // Allow passing donor info directly (for CustomDonationCard integration)
  showModal?: boolean;
}

type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

const frequencyLabels: Record<DonationFrequency, string> = {
  'one-time': 'One-time',
  'weekly': 'Weekly',
  'every-two-weeks': 'Every 2 Weeks',
  'monthly': 'Monthly',
};

/**
 * Stripe Payment Button Component
 * Creates a Stripe Checkout Session and redirects to Stripe's hosted payment page
 *
 * Brand Colors:
 * - Primary Blue: #1E1E8C
 * - Tropical Green: #2ECC40
 * - White: #FFFFFF
 */
export function StripePaymentButton({
  amount,
  description,
  donationTypeId: preSelectedDonationTypeId,
  frequency: initialFrequency = 'one-time',
  comment: initialComment = '',
  onSuccess,
  onError,
  className = '',
  children,
  showModal: controlledShowModal,
}: StripePaymentButtonProps) {
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Donor information
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [comment, setComment] = useState(initialComment);
  const [donationTypeId, setDonationTypeId] = useState(preSelectedDonationTypeId || '');
  const [frequency, setFrequency] = useState<DonationFrequency>(initialFrequency);

  // Donation types
  const [donationTypes, setDonationTypes] = useState<DonationType[]>([]);
  const [loadingTypes, setLoadingTypes] = useState(true);

  // Check if component is mounted (for portal)
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Update frequency if prop changes
  useEffect(() => {
    setFrequency(initialFrequency);
  }, [initialFrequency]);

  // Update comment if prop changes
  useEffect(() => {
    setComment(initialComment);
  }, [initialComment]);

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
            // Try to find "Custom Donation" type or use first one
            const customType = data.types.find((t: DonationType) =>
              t.name.toLowerCase().includes('custom') ||
              t.name.toLowerCase().includes('general')
            );
            setDonationTypeId(customType?.id || data.types[0].id);
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

  // Handle controlled modal state
  useEffect(() => {
    if (controlledShowModal !== undefined) {
      setShowForm(controlledShowModal);
    }
  }, [controlledShowModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!donorName.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!donorEmail.trim() || !donorEmail.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (!donationTypeId) {
      setError('Please select a donation type');
      return;
    }
    if (amount < 10) {
      setError('Minimum donation amount is $10');
      return;
    }

    try {
      setStatus('processing');
      setError(null);

      console.log('[Stripe Payment] Initiating checkout:', {
        amount,
        donorName,
        donorEmail,
        donationTypeId,
        frequency,
      });

      // Call server API to create Stripe Checkout Session
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          description: description || `Donation to PCCS - ${frequencyLabels[frequency]}`,
          donorName: donorName.trim(),
          donorEmail: donorEmail.trim(),
          donorPhone: donorPhone.trim() || undefined,
          comment: comment.trim() || undefined,
          donationTypeId,
          frequency,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      console.log('[Stripe Payment] Checkout session created:', data.orderNumber);

      // Call success callback if provided
      onSuccess?.();

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      setStatus('error');
      const errorMessage = err instanceof Error ? err.message : 'Payment initialization failed';
      setError(errorMessage);
      console.error('[Stripe Payment] Error:', errorMessage);
      onError?.(err instanceof Error ? err : new Error(errorMessage));
    }
  };

  const handleButtonClick = () => {
    if (loadingTypes) {
      return;
    }
    if (donationTypes.length === 0) {
      setError('Unable to load donation types. Please refresh the page.');
      return;
    }
    setShowForm(true);
  };

  const closeModal = () => {
    setShowForm(false);
    setError(null);
    setStatus('idle');
  };

  // Render modal using Portal to avoid z-index and overflow issues
  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold" style={{ color: '#1E1E8C' }}>
              Complete Your Donation
            </h2>
            <button
              onClick={closeModal}
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

          {/* Donation Summary */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Donation Amount</p>
                <p className="text-2xl font-bold" style={{ color: '#2ECC40' }}>
                  ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Frequency</p>
                <p className="text-lg font-semibold" style={{ color: '#1E1E8C' }}>
                  {frequencyLabels[frequency]}
                </p>
              </div>
            </div>
            {frequency !== 'one-time' && (
              <p className="text-xs text-gray-500 mt-2">
                You will be charged {frequencyLabels[frequency].toLowerCase()} until you cancel.
              </p>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
                maxLength={200}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Add a message with your donation..."
              />
              <p className="text-xs text-gray-500 mt-1 text-right">
                {comment.length}/200
              </p>
            </div>

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
                `Continue to Stripe - $${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
              )}
            </button>

            {/* Secure Payment Note */}
            <p className="text-xs text-gray-500 text-center mt-4">
              <svg className="inline-block w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Secure payment powered by Stripe
            </p>
          </form>
        </div>
      </div>
    </div>
  );

  // Only render portal if mounted and form is shown
  return (
    <>
      <button
        onClick={handleButtonClick}
        disabled={status === 'processing' || loadingTypes}
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
        style={{ backgroundColor: '#2ECC40' }}
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
      {mounted && showForm && createPortal(modalContent, document.body)}
    </>
  );
}
