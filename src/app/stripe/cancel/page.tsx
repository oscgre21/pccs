'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function StripeCancelContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        {/* Cancel Icon */}
        <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-yellow-100">
          <svg className="w-12 h-12 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Donation Cancelled
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          Your donation was not completed. No charges have been made to your payment method.
        </p>

        {/* Order Reference */}
        {orderNumber && (
          <p className="text-sm text-gray-500 mb-6">
            Reference: {orderNumber}
          </p>
        )}

        {/* Actions */}
        <div className="space-y-4">
          <Link
            href="/donations"
            className="block w-full px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            style={{ backgroundColor: '#1E1E8C' }}
          >
            Try Again
          </Link>

          <Link
            href="/"
            className="block w-full px-8 py-4 text-gray-700 font-semibold rounded-full transition-all duration-300 border-2 border-gray-300 hover:border-gray-400"
          >
            Return to Home
          </Link>
        </div>

        {/* Help Text */}
        <p className="text-sm text-gray-500 mt-8">
          If you experienced any issues, please{' '}
          <Link href="/contact" className="text-blue-600 hover:underline">
            contact us
          </Link>
          {' '}for assistance.
        </p>
      </div>
    </div>
  );
}

export default function StripeCancelPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4" style={{ borderColor: '#1E1E8C' }}></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <StripeCancelContent />
    </Suspense>
  );
}
