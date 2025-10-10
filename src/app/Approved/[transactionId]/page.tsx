'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PaymentStatus } from '@prisma/client';

interface DonationType {
  id: string;
  name: string;
  description: string | null;
  amount: number;
}

interface Donation {
  id: string;
  orderNumber: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string | null;
  comment: string | null;
  amount: number;
  status: PaymentStatus;
  authorizationCode: string | null;
  azulOrderId: string | null;
  rrn: string | null;
  isoCode: string | null;
  responseCode: string | null;
  responseMessage: string | null;
  errorDescription: string | null;
  validationErrors: string[];
  createdAt: string;
  approvedAt: string | null;
  declinedAt: string | null;
  cancelledAt: string | null;
  donationType: DonationType | null;
}

export default function ApprovedTransactionPage() {
  const params = useParams();
  const router = useRouter();
  const transactionId = params.transactionId as string;

  const [donation, setDonation] = useState<Donation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDonation = async () => {
      try {
        const response = await fetch(`/api/donations/${transactionId}`);
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Failed to load donation');
        }

        setDonation(data.donation);
      } catch (err) {
        console.error('[ApprovedTransaction] Error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load donation');
      } finally {
        setIsLoading(false);
      }
    };

    if (transactionId) {
      loadDonation();
    }
  }, [transactionId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4" style={{ borderColor: '#1E1E8C' }}></div>
          <p className="text-gray-600">Loading donation details...</p>
        </div>
      </div>
    );
  }

  if (error || !donation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-red-100">
            <svg className="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Donation Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The requested donation could not be found.'}</p>
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

  const isValid = donation.status === PaymentStatus.APPROVED;
  const displayAmount = donation.amount.toFixed(2);
  const formattedDate = donation.approvedAt
    ? new Date(donation.approvedAt).toLocaleString()
    : new Date(donation.createdAt).toLocaleString();

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div
            className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ backgroundColor: isValid ? '#2ECC40' : '#F59E0B' }}
          >
            <svg
              className="w-12 h-12 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              {isValid ? (
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {isValid ? 'Donation Received!' : 'Donation Received'}
          </h1>
          <p className="text-lg text-gray-600">
            {isValid
              ? 'Thank you for your generous donation to Punta Cana Christian School'
              : 'Your donation is being verified'}
          </p>
        </div>

        {/* Validation Warnings */}
        {!isValid && donation.validationErrors.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <svg
                className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="text-yellow-800 font-semibold mb-2">Validation Issues</h3>
                <ul className="list-disc list-inside text-yellow-700 text-sm">
                  {donation.validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Donor Information */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Donor Information</h2>
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Name</span>
              <span className="font-semibold text-gray-900">{donation.donorName}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Email</span>
              <span className="font-semibold text-gray-900">{donation.donorEmail}</span>
            </div>
            {donation.donorPhone && (
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Phone</span>
                <span className="font-semibold text-gray-900">{donation.donorPhone}</span>
              </div>
            )}
            {donation.donationType && (
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Donation Type</span>
                <span className="font-semibold text-gray-900">{donation.donationType.name}</span>
              </div>
            )}
            {donation.comment && (
              <div className="py-3">
                <span className="text-gray-600 block mb-2">Comment</span>
                <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{donation.comment}</p>
              </div>
            )}
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Transaction ID</span>
              <span className="font-mono text-sm text-gray-900">{donation.id}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Order Number</span>
              <span className="font-semibold text-gray-900">{donation.orderNumber}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Amount</span>
              <span className="font-semibold text-gray-900 text-lg">${displayAmount}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Date & Time</span>
              <span className="font-semibold text-gray-900">{formattedDate}</span>
            </div>
            {donation.authorizationCode && (
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="text-gray-600">Authorization Code</span>
                <span className="font-semibold text-gray-900">{donation.authorizationCode}</span>
              </div>
            )}
            <div className="flex justify-between py-3">
              <span className="text-gray-600">Status</span>
              <span
                className="font-semibold px-4 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: isValid ? '#D1FAE5' : '#FEF3C7',
                  color: isValid ? '#065F46' : '#92400E',
                }}
              >
                {donation.responseMessage || donation.status}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            style={{ backgroundColor: '#1E1E8C' }}
          >
            Return to Home
            <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="/donaciones"
            className="inline-flex items-center justify-center px-8 py-4 border-2 font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
            style={{
              borderColor: '#2ECC40',
              color: '#2ECC40',
            }}
          >
            Make Another Donation
          </a>
        </div>

        {/* Thank You Message */}
        <div className="mt-12 text-center">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Your Support Makes a Difference
            </h3>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Your generous donation helps us provide quality Christian education to children in
              Punta Cana. Every contribution directly impacts the future of our students and
              strengthens our educational mission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
