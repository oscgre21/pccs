'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function StripeSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isValidating, setIsValidating] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const sessionId = searchParams.get('session_id');
        const orderNumber = searchParams.get('order');

        if (!sessionId) {
          throw new Error('Missing session ID');
        }

        console.log('[Stripe Success] Verifying session:', { sessionId, orderNumber });

        // Verify session with our API
        const res = await fetch('/api/stripe/verify-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId, orderNumber }),
        });

        const data = await res.json();

        if (!data.success) {
          throw new Error(data.error || 'Verification failed');
        }

        if (!data.transactionId) {
          throw new Error('Transaction ID not found');
        }

        console.log('[Stripe Success] Redirecting to transaction page:', data.transactionId);

        // Redirect to the transaction-specific page (reusing Approved page)
        router.push(`/Approved/${data.transactionId}`);
      } catch (err) {
        console.error('[Stripe Success] Verification error:', err);
        setError(err instanceof Error ? err.message : 'Failed to verify payment');
        setIsValidating(false);
      }
    };

    verifyPayment();
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-red-100">
            <svg className="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Verification Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <a
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            style={{ backgroundColor: '#1E1E8C' }}
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4" style={{ borderColor: '#1E1E8C' }}></div>
        <p className="text-gray-600">Verifying your donation...</p>
        <p className="text-sm text-gray-500 mt-2">Please wait while we confirm your payment</p>
      </div>
    </div>
  );
}

export default function StripeSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4" style={{ borderColor: '#1E1E8C' }}></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <StripeSuccessContent />
    </Suspense>
  );
}
